/**
 * Generates all required PWA icon PNG files from the SVG source.
 *
 * Usage:
 *   npm install sharp --save-dev
 *   node scripts/generate-icons.mjs
 *
 * Output: public/icons/icon-{size}.png for all required sizes
 */

import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const iconsDir = join(root, 'public', 'icons');

mkdirSync(iconsDir, { recursive: true });

const svgBuffer = readFileSync(join(iconsDir, 'icon.svg'));

const sizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];

console.log('Generating icons...\n');

for (const size of sizes) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(join(iconsDir, `icon-${size}.png`));
  console.log(`  ✓ icon-${size}.png`);
}

// Maskable icon — same as 512 but with extra safe-zone padding (20% per side)
// The icon is smaller so the background fills the safe zone
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#6b5b6e"/>
  <text
    x="50%" y="54%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="165"
    font-weight="700"
    fill="#d4a5a5"
    letter-spacing="-6"
  >SL</text>
</svg>`;

await sharp(Buffer.from(maskableSvg))
  .resize(512, 512)
  .png()
  .toFile(join(iconsDir, 'icon-512-maskable.png'));
console.log('  ✓ icon-512-maskable.png');

console.log('\n✅ All icons generated in public/icons/');
console.log('   Replace with branded assets from your designer if available.\n');
