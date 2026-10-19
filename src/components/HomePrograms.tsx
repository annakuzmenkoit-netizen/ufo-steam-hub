import { containedImageSizes } from "@/lib/contained-image-sizes";
import { imageSources } from "@/lib/image-sources";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { courses } from "@/lib/courses";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const previews: Record<string, { name: string; invitation: string; summary: string }> = {
  steam: { name: "STEAM", invitation: "Досліджую світ", summary: "Для тих, хто постійно питає «чому?». Досліди й власні наукові відкриття." },
  robotics: { name: "Робототехніка", invitation: "Збираю роботів", summary: "Любить майструвати? Тут дитина створюватиме та програмуватиме своїх роботів." },
  animation: { name: "Анімація", invitation: "Оживляю історії", summary: "Вигадуємо персонажів і створюємо власні мультфільми — від ідеї до озвучки." },
  "math-mind": { name: "Math&mind", invitation: "Шукаю рішення", summary: "Логічні задачі й головоломки, які вчать мислити та знаходити власний шлях." },
  math: { name: "Математика", invitation: "Розумію складне", summary: "Розбираємо шкільні теми й тренуємося розв’язувати задачі зрозуміло та впевнено." },
  "3d-modeling": { name: "3D-моделювання", invitation: "Створюю власне", summary: "Від ідеї до 3D-моделі та власного надрукованого виробу." },
};

export function HomePrograms() {
  const viewport = useRef<HTMLDivElement>(null);
  const programmaticSelection = useRef<number | null>(null);
  const [selected, setSelected] = useState(0);

  function select(index: number) {
    const element = viewport.current;
    const card = element?.children[index] as HTMLElement | undefined;
    if (!element || !card) return;
    programmaticSelection.current = index;
    setSelected(index);
    element.scrollTo({
      left: card.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  function syncSelection(element: HTMLDivElement) {
    if (programmaticSelection.current !== null) return;
    const cards = Array.from(element.children) as HTMLElement[];
    const atEnd = element.scrollLeft >= element.scrollWidth - element.clientWidth - 3;
    const closest = atEnd ? cards.length - 1 : cards.reduce((best, card, index) =>
      Math.abs(card.offsetLeft - element.scrollLeft) < Math.abs(cards[best].offsetLeft - element.scrollLeft) ? index : best, 0);
    setSelected(closest);
  }

  return (
    <div className="program-carousel" role="region" aria-roledescription="карусель" aria-label="Програми навчання">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">6 напрямів · гортайте й порівнюйте</p>
        <p className="sr-only" aria-live="polite" aria-atomic="true">Обрано: {courses[selected].title}</p>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label="Попередній курс" disabled={selected === 0} onClick={() => select(selected - 1)} className="program-carousel__arrow"><ArrowLeft className="h-5 w-5" /></button>
          <button type="button" aria-label="Наступний курс" disabled={selected === courses.length - 1} onClick={() => select(selected + 1)} className="program-carousel__arrow"><ArrowRight className="h-5 w-5" /></button>
        </div>
      </div>
      <div
        ref={viewport}
        className="program-card-rail"
        tabIndex={0}
        aria-label="Курси: гортайте або оберіть назву нижче"
        onPointerDown={() => { programmaticSelection.current = null; }}
        onWheel={() => { programmaticSelection.current = null; }}
        onScroll={(event) => syncSelection(event.currentTarget)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            select(Math.max(0, Math.min(courses.length - 1, selected + (event.key === "ArrowRight" ? 1 : -1))));
          }
        }}
      >
        {courses.map((course, index) => {
          const preview = previews[course.id];
          // Portraits stay whole in a portrait-sized area, without cutting off faces.
          const photo = course.id === "math" ? course.gallery[1] : course.gallery[0];
          return (
            <article key={course.id} id={`home-program-${course.id}`} className={`program-card program-card--${course.id}`} data-selected={selected === index} role="group" aria-roledescription="слайд" aria-label={`${index + 1} із ${courses.length}: ${course.title}`}>
              <div className="program-card__top">
                <div className="program-card__invitation"><course.icon className="h-7 w-7" /><span>{preview.invitation}</span><small>{course.age}</small></div>
                <div className="program-card__photo"><ResponsiveImage src={photo} alt={`Заняття: ${course.title}`} sizes={containedImageSizes(imageSources[photo], 160, 160, 180)} className="h-full w-full object-contain" /></div>
              </div>
              <div className="program-card__body">
                <h3>{course.title}</h3>
                <p>{preview.summary}</p>
                <div className="program-card__footer">
                  <span className="program-card__price">{course.price.replace("Вартість: ", "").replace("/місяць", "")}<small>на місяць</small></span>
                  <Link to="/courses" hash={course.id} hashScrollIntoView={{ behavior: "instant", block: "start" }} onFocus={() => { programmaticSelection.current = index; setSelected(index); }} aria-label={`Детальніше: ${course.title}`}>Детальніше <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2" role="group" aria-label="Оберіть курс">
        {courses.map((course, index) => (
          <button key={course.id} type="button" aria-pressed={selected === index} aria-controls={`home-program-${course.id}`} onClick={() => select(index)} className="program-carousel__label">{previews[course.id].name}</button>
        ))}
      </div>
    </div>
  );
}
