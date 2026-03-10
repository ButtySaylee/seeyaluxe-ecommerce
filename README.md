# SEEYA LUXE — E-Commerce Platform

Ghanaian luxury e-commerce platform built with **Next.js 16**, **Supabase**, and **Cloudinary**. Features a full storefront with cart & WhatsApp checkout, plus an integrated admin dashboard.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Supabase** — product database
- **Cloudinary** — image uploads
- **Tailwind CSS**

## Features

- 35 curated products (earrings, footwear, bags) with images, prices & descriptions
- Category filters + product search
- Quick-view modal per product
- Slide-in shopping cart with quantity controls
- WhatsApp checkout
- `/admin` — password-protected admin panel: add, edit, delete, mark sold, upload images

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/seeyaluxe-next.git
cd seeyaluxe-next
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Supabase, Cloudinary, and admin password values.

### 3. Seed the database

```bash
node scripts/seed-products.mjs
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the store and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin.

## Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo
3. Add all five variables from `.env.example` under **Environment Variables** with your real values
4. Click **Deploy**

## Project Structure

```
app/
  page.tsx            Storefront
  admin/page.tsx      Admin dashboard
components/           Header, Cart, ProductCard, etc.
lib/
  supabase.ts         Supabase client + Product type
  products.ts         Static product fallback data
scripts/
  seed-products.mjs   Seeds 35 products into Supabase
public/images/        Product images (earings/, footwear/, bags/)
```
