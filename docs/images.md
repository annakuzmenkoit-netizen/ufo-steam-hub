# Responsive images

The original JPEG/PNG files remain as source assets. Pages import the WebP versions and render them through `ResponsiveImage`, which provides intrinsic dimensions, lazy loading, async decoding and width-based sources. Above-the-fold images explicitly use eager loading; the home hero also has high fetch priority. Set `sizes` to the rendered width when adding a thumbnail or a full-width gallery image.

To regenerate the WebP assets and `src/lib/image-sources.ts` from the originals, run from the repository root (Node 24 was used):

```sh
npm install --prefix /tmp/ufo-image-tools --no-package-lock sharp@0.35.5
UFO_SHARP_MODULE=/tmp/ufo-image-tools/node_modules/sharp node scripts/optimize-images.cjs
```

This tooling is only needed to regenerate assets. Development and production builds use the checked-in files. The generator preserves aspect ratio, applies camera orientation, limits the largest image to 1600px wide and creates 320/640/960px variants where applicable. Import the `.webp` base file in the page, rather than the original photo.
