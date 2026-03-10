'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase, Product } from '@/lib/supabase';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Seeya@2026!';
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

type Tab = 'add' | 'manage';
type Category = 'earrings' | 'footwear' | 'bags' | 'others';
type FilterCategory = 'all' | Category;

const emptyForm = { name: '', category: '' as Category | '', price: '', description: '', imageUrl: '' };

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<Tab>('add');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      loadProducts();
    } else {
      showMessage('error', 'Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data) setProducts(data);
    setLoading(false);
  };

  const uploadImage = () => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      showMessage('error', 'Cloudinary not configured. Paste an image URL directly in the field.');
      return;
    }
    const widget = (window as any).cloudinary.createUploadWidget(
      { cloudName: CLOUDINARY_CLOUD_NAME, uploadPreset: CLOUDINARY_UPLOAD_PRESET, sources: ['local', 'url', 'camera'], multiple: false, maxFileSize: 5000000, clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'], folder: 'seeyaluxe-products' },
      (_: any, result: any) => {
        if (result.event === 'success') {
          const url = result.info.secure_url;
          setForm(f => ({ ...f, imageUrl: url }));
          setImagePreview(url);
        }
      }
    );
    widget.open();
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        category: form.category as Category,
        price: parseFloat(form.price),
        description: form.description,
        images: form.imageUrl ? [form.imageUrl] : [],
      };
      if (editId) {
        const { error } = await supabase.from('products').update(payload).eq('id', editId);
        if (error) throw error;
        showMessage('success', 'Product updated successfully!');
      } else {
        const { error } = await supabase.from('products').insert([{ ...payload, is_sold: false }]);
        if (error) throw error;
        showMessage('success', 'Product added successfully!');
      }
      resetForm();
      await loadProducts();
      setTab('manage');
    } catch (err: any) {
      showMessage('error', 'Error saving product: ' + err.message);
    }
    setSaving(false);
  };

  const editProduct = (product: Product) => {
    setEditId(product.id);
    setForm({ name: product.name, category: product.category, price: String(product.price), description: product.description || '', imageUrl: (product.images && product.images[0]) || '' });
    setImagePreview((product.images && product.images[0]) || '');
    setTab('add');
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) showMessage('error', 'Error deleting: ' + error.message);
    else { showMessage('success', 'Product deleted.'); await loadProducts(); }
  };

  const toggleSold = async (product: Product) => {
    const { error } = await supabase.from('products').update({ is_sold: !product.is_sold }).eq('id', product.id);
    if (error) showMessage('error', 'Error updating: ' + error.message);
    else await loadProducts();
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
    setImagePreview('');
  };

  const filteredProducts = products.filter(p => {
    const matchCat = filterCat === 'all' || p.category === filterCat;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const tabBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '1rem 2rem', background: 'none', border: 'none', fontWeight: 600,
    color: active ? 'var(--primary-dark)' : 'var(--text-dark)', cursor: 'pointer',
    borderBottom: active ? '3px solid var(--gold-accent)' : '3px solid transparent',
    marginBottom: -2, transition: 'all 0.3s', fontSize: '1rem',
  });

  const filterBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem', background: active ? 'var(--primary-dark)' : 'transparent',
    border: '2px solid var(--primary-dark)', color: active ? 'white' : 'var(--primary-dark)',
    cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.3s',
  });

  if (!loggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--light-gray)', display: 'flex', flexDirection: 'column' }}>
        <header style={{ background: 'rgba(26,26,26,0.95)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold-accent)', letterSpacing: '2px' }}>SEEYA LUXE</span>
          <Link href="/" style={{ background: 'var(--primary-dark)', color: 'white', padding: '0.7rem 1.5rem', textDecoration: 'none', fontWeight: 600, transition: 'all 0.3s' }}>← Back to Store</Link>
        </header>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: 'white', padding: '3rem 2rem', maxWidth: 400, width: '100%', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h2>
            {message && <div style={{ padding: '0.8rem 1rem', background: message.type === 'error' ? '#fde8e8' : '#e8fde8', color: message.type === 'error' ? '#c0392b' : '#27ae60', marginBottom: '1rem', fontSize: '0.9rem' }}>{message.text}</div>}
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter admin password"
                  style={{ width: '100%', padding: '0.8rem', border: '2px solid #ddd', fontSize: '1rem', outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '1rem', background: 'var(--primary-dark)', color: 'white', border: 'none', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', fontSize: '1rem' }}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light-gray)' }}>
      {/* Header */}
      <header style={{ background: 'rgba(26,26,26,0.95)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
        <span style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold-accent)', letterSpacing: '2px' }}>SEEYA LUXE</span>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: 'white', fontSize: '0.9rem' }}>Admin Panel</span>
          <Link href="/" style={{ background: 'var(--primary-dark)', color: 'white', padding: '0.7rem 1.5rem', textDecoration: 'none', fontWeight: 600, transition: 'all 0.3s' }}>← Back to Store</Link>
          <button onClick={() => setLoggedIn(false)} style={{ background: '#e74c3c', color: 'white', padding: '0.7rem 1.2rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>Logout</button>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '2rem', textAlign: 'center' }}>Admin Panel</h1>

        {message && (
          <div style={{ padding: '1rem', background: message.type === 'error' ? '#fde8e8' : '#e8fde8', color: message.type === 'error' ? '#c0392b' : '#27ae60', marginBottom: '1.5rem', fontWeight: 600 }}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '2px solid #ddd', marginBottom: '2rem' }}>
          <button style={tabBtnStyle(tab === 'add')} onClick={() => setTab('add')}>{editId ? 'Edit Product' : 'Add Product'}</button>
          <button style={tabBtnStyle(tab === 'manage')} onClick={() => { setTab('manage'); loadProducts(); }}>Manage Products ({products.length})</button>
        </div>

        {/* Add/Edit Product Tab */}
        {tab === 'add' && (
          <div style={{ background: 'white', padding: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '2rem' }}>{editId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={saveProduct}>
              {[
                { label: 'Product Name', id: 'name', type: 'text', value: form.name, onChange: (v: string) => setForm(f => ({ ...f, name: v })) },
                { label: 'Price (₵)', id: 'price', type: 'number', value: form.price, onChange: (v: string) => setForm(f => ({ ...f, price: v })) },
              ].map(({ label, id, type, value, onChange }) => (
                <div key={id} style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{label}</label>
                  <input type={type} required value={value} onChange={e => onChange(e.target.value)}
                    step={type === 'number' ? '0.01' : undefined} min={type === 'number' ? '0' : undefined}
                    style={{ width: '100%', padding: '0.8rem', border: '2px solid #ddd', fontSize: '1rem', outline: 'none', fontFamily: 'inherit' }} />
                </div>
              ))}

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Category</label>
                <select required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
                  style={{ width: '100%', padding: '0.8rem', border: '2px solid #ddd', fontSize: '1rem', outline: 'none', fontFamily: 'inherit' }}>
                  <option value="">Select Category</option>
                  <option value="earrings">Earrings</option>
                  <option value="footwear">Footwear</option>
                  <option value="bags">Bags</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description</label>
                <textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  style={{ width: '100%', padding: '0.8rem', border: '2px solid #ddd', fontSize: '1rem', outline: 'none', fontFamily: 'inherit', minHeight: 100, resize: 'vertical' }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Product Image</label>
                <input type="url" value={form.imageUrl} placeholder="Paste image URL, or use Upload button"
                  onChange={e => { setForm(f => ({ ...f, imageUrl: e.target.value })); if (e.target.value.startsWith('http')) setImagePreview(e.target.value); }}
                  style={{ width: '100%', padding: '0.8rem', border: '2px solid #ddd', fontSize: '1rem', outline: 'none', fontFamily: 'inherit', marginBottom: '0.5rem' }} />
                <button type="button" onClick={uploadImage} style={{ padding: '0.7rem 1.5rem', background: 'transparent', border: '2px solid var(--primary-dark)', color: 'var(--primary-dark)', fontWeight: 600, cursor: 'pointer' }}>
                  <i className="fas fa-cloud-upload-alt" /> Upload via Cloudinary
                </button>
                {imagePreview && (
                  <div style={{ marginTop: '1rem', position: 'relative', width: 200, height: 150 }}>
                    <Image src={imagePreview} alt="Preview" fill style={{ objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: '1rem', background: 'var(--primary-dark)', color: 'white', border: 'none', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, fontSize: '1rem' }}>
                  {saving ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
                </button>
                <button type="button" onClick={resetForm} style={{ flex: 1, padding: '1rem', background: 'transparent', border: '2px solid var(--primary-dark)', color: 'var(--primary-dark)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', fontSize: '1rem' }}>
                  Clear
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Products Tab */}
        {tab === 'manage' && (
          <div>
            <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', border: '2px solid #ddd', fontSize: '1rem', outline: 'none', fontFamily: 'inherit', marginBottom: '1rem' }} />

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {(['all', 'earrings', 'footwear', 'bags', 'others'] as FilterCategory[]).map(cat => (
                <button key={cat} style={filterBtnStyle(filterCat === cat)} onClick={() => setFilterCat(cat)}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {loading ? (
              <p style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>No products found.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
                {filteredProducts.map(product => (
                  <div key={product.id} style={{ border: '2px solid #ddd', padding: '1rem', background: 'white', position: 'relative' }}>
                    {product.is_sold && (
                      <div style={{ position: 'absolute', top: 10, right: 10, background: '#e74c3c', color: 'white', padding: '0.3rem 0.7rem', fontSize: '0.75rem', fontWeight: 700 }}>SOLD</div>
                    )}
                    <div style={{ position: 'relative', height: 150, marginBottom: '1rem' }}>
                      <Image src={(product.images && product.images[0]) || '/placeholder.svg'} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <p style={{ fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>{product.name}</p>
                    <p style={{ color: 'var(--gold-accent)', fontWeight: 700, marginBottom: '0.3rem' }}>₵{product.price.toLocaleString()}</p>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>Category: {product.category}</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => editProduct(product)} style={{ flex: 1, padding: '0.5rem', background: 'var(--primary-dark)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>Edit</button>
                      <button onClick={() => toggleSold(product)} style={{ flex: 1, padding: '0.5rem', background: '#f39c12', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>{product.is_sold ? 'Unsold' : 'Mark Sold'}</button>
                      <button onClick={() => deleteProduct(product.id)} style={{ flex: 1, padding: '0.5rem', background: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
