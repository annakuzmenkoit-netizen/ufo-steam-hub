import type { ImgHTMLAttributes } from "react";
import { imageSources } from "@/lib/image-sources";

/** Small screens receive smaller files; reserve space before the image decodes. */
export function ResponsiveImage({
  src,
  alt,
  loading = "lazy",
  decoding = "async",
  sizes = "(min-width: 1024px) 640px, (min-width: 640px) 50vw, 100vw",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const image = src ? imageSources[src] : undefined;
  return (
    <img
      width={image?.width}
      height={image?.height}
      srcSet={image?.srcSet}
      sizes={image || props.srcSet ? sizes : undefined}
      {...props}
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
    />
  );
}
