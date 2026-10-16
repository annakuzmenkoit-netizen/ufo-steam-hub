import { imageSources } from "@/lib/image-sources";
import { useState } from "react";
import { Expand } from "lucide-react";
import { ResponsiveImage } from "@/components/ResponsiveImage";

export function CourseGallery({ title, images, onOpen }: { title: string; images: string[]; onOpen: (index: number) => void }) {
  const [selected, setSelected] = useState(0);
  const image = imageSources[images[selected]];
  const ratio = image ? image.width / image.height : 1;
  return (
    <div className="course-gallery">
      <button type="button" onClick={() => onOpen(selected)} aria-label={`Відкрити фото ${selected + 1} курсу ${title}`} className="course-gallery__main">
        <ResponsiveImage src={images[selected]} alt={`${title}: фото заняття ${selected + 1}`} sizes={`(min-width: 768px) ${Math.min(520, 280 * ratio)}px, ${Math.min(520, 210 * ratio)}px`} className="h-full w-full object-contain" />
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-semibold text-primary"><Expand className="h-3.5 w-3.5" />Збільшити</span>
      </button>
      <div className="mt-2 flex items-center gap-2" role="group" aria-label={`Фото курсу ${title}`}>
        {images.map((src, index) => <button key={src} type="button" onClick={() => setSelected(index)} aria-pressed={index === selected} aria-label={`Показати фото ${index + 1} курсу ${title}`} className="course-gallery__thumb"><ResponsiveImage src={src} alt="" sizes="64px" className="h-full w-full object-contain" /></button>)}
        <span className="ml-auto text-xs text-muted-foreground">{selected + 1} / {images.length}</span>
      </div>
    </div>
  );
}
