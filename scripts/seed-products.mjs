// Run with: node scripts/seed-products.mjs
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cmztxwfyvicchystjwwt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtenR4d2Z5dmljY2h5c3Rqd3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNTA4ODAsImV4cCI6MjA4ODYyNjg4MH0.XZDfKtDX1bF_XFD5_4mX36fwDVXk3aiyJtJf7eoAMz8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const products = [
  // ── EARRINGS ──────────────────────────────────────────────────────────────
  { name: 'Diamond Drop Earrings',   category: 'earrings', price: 5,   description: 'Exquisitely crafted statement earrings featuring premium stones. Perfect for elevating any ensemble with timeless elegance.',                         images: ['/images/earings/pic1.jpeg'],  is_sold: false },
  { name: 'Gold Elegance Hoops',     category: 'earrings', price: 10,  description: 'Handcrafted gold hoops that embody sophistication. A versatile piece that transitions seamlessly from day to night.',                                      images: ['/images/earings/pic2.jpeg'],  is_sold: false },
  { name: 'Pearl Perfection Studs',  category: 'earrings', price: 10,  description: 'Classic pearl studs with a modern twist. Each pearl is carefully selected for its luster and exceptional quality.',                                         images: ['/images/earings/pic3.jpeg'],  is_sold: false },
  { name: 'Chandelier Luxe',         category: 'earrings', price: 10,  description: 'Dramatic chandelier earrings that command attention. Designed for the confident woman who embraces luxury.',                                                images: ['/images/earings/pic4.jpeg'],  is_sold: false },
  { name: 'Royal Statement Gems',    category: 'earrings', price: 20,  description: 'Bold and beautiful earrings inspired by African royalty. A masterpiece of craftsmanship and design excellence.',                                            images: ['/images/earings/pic5.jpeg'],  is_sold: false },
  { name: 'Designer Collection',     category: 'earrings', price: 5,   description: 'Limited edition designer earrings that blend contemporary aesthetics with traditional Ghanaian motifs.',                                                    images: ['/images/earings/pic6.jpeg'],  is_sold: false },
  { name: 'Crystal Elegance',        category: 'earrings', price: 10,  description: 'Dazzling crystal earrings that capture and reflect light beautifully. The epitome of refined luxury.',                                                     images: ['/images/earings/pic7.jpeg'],  is_sold: false },
  { name: 'Sapphire Elegance',       category: 'earrings', price: 10,  description: 'Exquisite sapphire earrings featuring stunning gemstones. A luxurious choice for the discerning collector of fine jewelry.',                               images: ['/images/earings/pic8.jpeg'],  is_sold: false },
  { name: 'Ruby Radiance',           category: 'earrings', price: 10,  description: 'Stunning ruby earrings that radiate elegance and sophistication. Perfect for making a bold, luxurious statement.',                                          images: ['/images/earings/pic9.jpeg'],  is_sold: false },
  { name: 'Emerald Dream',           category: 'earrings', price: 10,  description: 'Beautiful emerald earrings with luxurious appeal. A timeless piece that captures the essence of African royalty.',                                          images: ['/images/earings/pic10.jpeg'], is_sold: false },
  { name: 'Onyx Mystery',            category: 'earrings', price: 10,  description: 'Sleek onyx earrings with modern sophistication. Dark, mysterious, and undeniably elegant.',                                                                 images: ['/images/earings/pic11.jpeg'], is_sold: false },
  { name: 'Topaz Sparkle',           category: 'earrings', price: 10,  description: 'Radiant topaz earrings that sparkle with every movement. A perfect balance of beauty and luxury.',                                                          images: ['/images/earings/pic12.jpeg'], is_sold: false },
  { name: 'Amethyst Charm',          category: 'earrings', price: 10,  description: 'Enchanting amethyst earrings with calming beauty. A luxurious choice for those who appreciate artistic elegance.',                                          images: ['/images/earings/pic13.jpeg'], is_sold: false },
  { name: 'Jade Harmony',            category: 'earrings', price: 10,  description: 'Serene jade earrings embodying balance and harmony. A sophisticated accessory for the modern luxury seeker.',                                               images: ['/images/earings/pic14.jpeg'], is_sold: false },
  { name: 'Diamond Cascade',         category: 'earrings', price: 10,  description: 'Cascading diamond earrings that create an unforgettable statement. The ultimate symbol of luxury and elegance.',                                            images: ['/images/earings/pic15.jpeg'], is_sold: false },
  { name: 'Pearl Moonlight',         category: 'earrings', price: 10,  description: 'Luminous pearl earrings that glow like moonlight. A timeless classic with contemporary sophistication.',                                                    images: ['/images/earings/pic16.jpeg'], is_sold: false },
  { name: 'Gold Harmony',            category: 'earrings', price: 10,  description: 'Harmonious gold earrings with intricate detailing. A masterpiece of craftsmanship and timeless beauty.',                                                    images: ['/images/earings/pic17.jpeg'], is_sold: false },

  // ── FOOTWEAR ─────────────────────────────────────────────────────────────
  { name: 'Signature Stilettos',     category: 'footwear', price: 100, description: 'Step into confidence with these exquisite designer heels. Crafted from premium materials for ultimate comfort and style.',                                  images: ['/images/footwear/pic1.jpeg'], is_sold: false },
  { name: 'Luxe Footwear Collection',category: 'footwear', price: 150, description: 'Exclusive designer footwear that combines African-inspired elegance with international luxury standards.',                                                   images: ['/images/footwear/pic2.jpeg'], is_sold: false },
  { name: 'Elite Heels',             category: 'footwear', price: 150, description: 'Sophisticated heels that blend modern design with timeless elegance. The perfect statement piece for any occasion.',                                        images: ['/images/footwear/pic3.jpeg'], is_sold: false },
  { name: 'Luxe Mules',              category: 'footwear', price: 80,  description: 'Elegant mules featuring premium craftsmanship. Comfortable yet stylish, perfect for any occasion from casual to formal events.',                           images: ['/images/footwear/pic4.jpeg'], is_sold: false },
  { name: 'Designer Sandals',        category: 'footwear', price: 80,  description: 'Sophisticated designer sandals that blend comfort with luxury. Perfect for warm weather while maintaining an air of elegance and refinement.',              images: ['/images/footwear/pic5.jpeg'], is_sold: false },
  { name: 'Premium Leather Boots',   category: 'footwear', price: 60,  description: 'Exquisite leather boots crafted for the sophisticated woman. Versatile enough for day wear yet refined enough for evening occasions.',                      images: ['/images/footwear/pic6.jpeg'], is_sold: false },
  { name: 'Signature Loafers',       category: 'footwear', price: 65,  description: 'Timeless loafers featuring premium craftsmanship and materials. A wardrobe staple that combines comfort with undeniable luxury and style.',                 images: ['/images/footwear/pic7.jpeg'], is_sold: false },
  { name: 'Velvet Evening Heels',    category: 'footwear', price: 65,  description: 'Stunning velvet heels designed for special occasions. These elegant shoes add a touch of glamour and sophistication to any formal ensemble.',               images: ['/images/footwear/pic8.jpeg'], is_sold: false },
  { name: 'Chic Ankle Boots',        category: 'footwear', price: 60,  description: 'Stylish ankle boots that blend modern design with timeless appeal. Perfect for elevating any outfit with an air of luxury and sophistication.',             images: ['/images/footwear/pic9.jpeg'], is_sold: false },

  // ── BAGS ─────────────────────────────────────────────────────────────────
  { name: 'Signature Tote',          category: 'bags',     price: 80,  description: 'An iconic tote bag crafted from premium leather. Spacious, elegant, and perfect for the modern woman on the go.',                                          images: ['/images/bags/pic1.jpeg'],    is_sold: false },
  { name: 'Evening Clutch Luxe',     category: 'bags',     price: 90,  description: 'A stunning evening clutch adorned with elegant detailing. The perfect accessory for special occasions and luxury events.',                                  images: ['/images/bags/pic2.jpeg'],    is_sold: false },
  { name: 'Heritage Crossbody',      category: 'bags',     price: 70,  description: 'Exquisite crossbody bag featuring authentic craftsmanship. Combines functionality with luxury for everyday elegance.',                                      images: ['/images/bags/pic3.jpeg'],    is_sold: false },
  { name: 'Metropolitan Shoulder Bag',category: 'bags',    price: 95,  description: 'A sophisticated shoulder bag perfect for the modern professional. Designed with both style and practicality for the busy lifestyle.',                       images: ['/images/bags/pic4.jpeg'],    is_sold: false },
  { name: 'Chic Satchel Collection', category: 'bags',     price: 95,  description: 'A timeless satchel that combines vintage charm with modern luxury. The perfect accessory for anyone who appreciates timeless elegance.',                    images: ['/images/bags/pic5.jpeg'],    is_sold: false },
  { name: 'Travel Luxe Weekender',   category: 'bags',     price: 95,  description: 'Elegant weekender bag for the luxury traveler. Spacious compartments combined with refined design make this the perfect travel companion.',                  images: ['/images/bags/pic6.jpeg'],    is_sold: false },
  { name: 'Premium Shopping Tote',   category: 'bags',     price: 85,  description: 'An oversized yet refined shopping tote that brings luxury to everyday moments. Perfect for shopping excursions and daily adventures.',                      images: ['/images/bags/pic7.jpeg'],    is_sold: false },
  { name: 'Artisan Heritage Collection',category: 'bags',  price: 70,  description: "Handcrafted with meticulous attention to detail, this bag celebrates African artistry. A true collector's piece for the discerning luxury enthusiast.",    images: ['/images/bags/pic8.jpeg'],    is_sold: false },
  { name: 'Bold Statement Tote',     category: 'bags',     price: 75,  description: 'Make a statement with this luxurious tote that combines bold design with premium craftsmanship. Perfect for those who embrace confidence and elegance.',    images: ['/images/bags/pic9.jpeg'],    is_sold: false },
];

async function seed() {
  console.log(`\n🌱  Seeding ${products.length} products into Supabase...\n`);

  // Check for existing products first (avoid duplicates on re-run)
  const { data: existing } = await supabase.from('products').select('name');
  const existingNames = new Set((existing || []).map(p => p.name));

  const toInsert = products.filter(p => !existingNames.has(p.name));

  if (toInsert.length === 0) {
    console.log('✅  All products already exist in the database. Nothing to insert.');
    return;
  }

  console.log(`ℹ️   ${existingNames.size} already in DB — inserting ${toInsert.length} new products...\n`);

  // Insert in batches of 10
  const batchSize = 10;
  let inserted = 0;
  for (let i = 0; i < toInsert.length; i += batchSize) {
    const batch = toInsert.slice(i, i + batchSize);
    const { error } = await supabase.from('products').insert(batch);
    if (error) {
      console.error(`❌  Error on batch ${Math.floor(i / batchSize) + 1}:`, error.message);
      process.exit(1);
    }
    inserted += batch.length;
    batch.forEach(p => console.log(`  ✔  [${p.category.padEnd(8)}]  ${p.name}`));
  }

  console.log(`\n✅  Done! ${inserted} products added to Supabase.\n`);
}

seed().catch(err => { console.error('Fatal error:', err); process.exit(1); });
