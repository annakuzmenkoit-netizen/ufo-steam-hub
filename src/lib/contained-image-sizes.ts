/** Missing image metadata must never prevent a page from rendering. */
export function containedImageSizes(
  image: { width: number; height: number } | undefined,
  mobileHeight: number,
  desktopHeight: number,
  maxWidth = 560,
) {
  const ratio = image && Number.isFinite(image.width) && Number.isFinite(image.height) && image.width > 0 && image.height > 0
    ? image.width / image.height
    : 1;
  return `(min-width: 768px) ${Math.min(maxWidth, desktopHeight * ratio)}px, ${Math.min(maxWidth, mobileHeight * ratio)}px`;
}
