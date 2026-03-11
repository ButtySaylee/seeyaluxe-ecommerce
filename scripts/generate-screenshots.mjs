/**
 * Generates placeholder PWA screenshots required by PWABuilder.
 * Run: node scripts/generate-screenshots.mjs
 * Replace the output images with real app screenshots before submitting to stores.
 */

import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const screenshotsDir = join(root, 'public', 'screenshots');
mkdirSync(screenshotsDir, { recursive: true });

// Mobile screenshot — 1080×1920 (portrait)
const mobileSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffc0cb"/>
      <stop offset="50%" style="stop-color:#dda0d9"/>
      <stop offset="100%" style="stop-color:#b28dd9"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <rect x="0" y="0" width="1080" height="120" fill="#6b5b6e"/>
  <text x="540" y="78" text-anchor="middle" font-family="Georgia,serif" font-size="64" font-weight="900" fill="#d4a5a5" letter-spacing="4">SEEYA LUXE</text>
  <text x="540" y="960" text-anchor="middle" font-family="Georgia,serif" font-size="72" font-weight="700" fill="#6b5b6e">Premium Luxury</text>
  <text x="540" y="1056" text-anchor="middle" font-family="Georgia,serif" font-size="48" fill="#5a4a5a">Accessories</text>
  <rect x="290" y="1150" width="500" height="100" rx="8" fill="#6b5b6e"/>
  <text x="540" y="1213" text-anchor="middle" font-family="Georgia,serif" font-size="40" fill="white" letter-spacing="2">SHOP COLLECTION</text>
</svg>`;

// Desktop screenshot — 1920×1080 (landscape)
const desktopSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffc0cb"/>
      <stop offset="50%" style="stop-color:#dda0d9"/>
      <stop offset="100%" style="stop-color:#b28dd9"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg)"/>
  <rect x="0" y="0" width="1920" height="80" fill="#6b5b6e"/>
  <text x="200" y="54" font-family="Georgia,serif" font-size="40" font-weight="900" fill="#d4a5a5" letter-spacing="4">SEEYA LUXE</text>
  <text x="960" y="480" text-anchor="middle" font-family="Georgia,serif" font-size="96" font-weight="900" fill="#6b5b6e">SEEYA LUXE</text>
  <text x="960" y="590" text-anchor="middle" font-family="Georgia,serif" font-size="52" fill="#5a4a5a">Premium Luxury Accessories</text>
  <text x="960" y="670" text-anchor="middle" font-family="Georgia,serif" font-size="36" fill="#5a4a5a">Curated for the African woman of distinction</text>
  <rect x="760" y="750" width="400" height="80" rx="6" fill="#6b5b6e"/>
  <text x="960" y="800" text-anchor="middle" font-family="Georgia,serif" font-size="32" fill="white" letter-spacing="2">SHOP NOW</text>
</svg>`;

await sharp(Buffer.from(mobileSvg))
  .resize(1080, 1920)
  .png()
  .toFile(join(screenshotsDir, 'screenshot-mobile.png'));
console.log('  ✓ screenshot-mobile.png  (1080×1920)');

await sharp(Buffer.from(desktopSvg))
  .resize(1920, 1080)
  .png()
  .toFile(join(screenshotsDir, 'screenshot-desktop.png'));
console.log('  ✓ screenshot-desktop.png (1920×1080)');

console.log('\n✅ Screenshots generated in public/screenshots/');
console.log('   Replace with real app screenshots before submitting to stores.\n');
