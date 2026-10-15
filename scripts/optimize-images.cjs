// Run from the repository root; see docs/images.md for the optional tooling.
const sharp = require(process.env.UFO_SHARP_MODULE || 'sharp');
const fs = require('node:fs');
const path = require('node:path');

async function optimizeImages() {
  const assets = 'src/assets';
  const files = fs.readdirSync(assets, { recursive: true })
    .filter((file) => /\.(jpg|png)$/i.test(file));
  const imports = [];
  const entries = [];
  let originalBytes = 0;
  let webpBytes = 0;

  for (const [index, file] of files.entries()) {
    const input = path.join(assets, file);
    const base = file.replace(/\.(jpg|png)$/i, '.webp');
    originalBytes += fs.statSync(input).size;
    const image = await sharp(input).rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(assets, base));
    webpBytes += image.size;
    imports.push(`import image${index} from '@/assets/${base}';`);
    const sources = [];

    for (const width of [320, 640, 960]) {
      if (image.width <= width) continue;
      const variant = base.replace('.webp', `-${width}.webp`);
      const resized = await sharp(input).rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 76, effort: 6 })
        .toFile(path.join(assets, variant));
      imports.push(`import image${index}_${width} from '@/assets/${variant}';`);
      sources.push(`\${image${index}_${width}} ${resized.width}w`);
    }

    sources.push(`\${image${index}} ${image.width}w`);
    entries.push(`  [image${index}]: { width: ${image.width}, height: ${image.height}, srcSet: \`${sources.join(', ')}\` },`);
  }

  fs.writeFileSync('src/lib/image-sources.ts',
    '// Generated responsive image metadata.\n' + imports.join('\n') +
    '\n\nexport const imageSources: Record<string, { width: number; height: number; srcSet: string }> = {\n' +
    entries.join('\n') + '\n};\n');
  console.log(JSON.stringify({ images: files.length, originalBytes, webpBytes }));
}

optimizeImages().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
