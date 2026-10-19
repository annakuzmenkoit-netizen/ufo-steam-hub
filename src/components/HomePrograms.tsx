import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { courses } from "@/lib/courses";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const names: Record<string, string> = {
  steam: "STEAM", robotics: "Робототехніка", animation: "Анімація",
  "math-mind": "Math&mind", math: "Математика", "3d-modeling": "3D-моделювання",
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
          const photo = course.id === "math" ? course.gallery[1] : course.gallery[0];
          return (
            <article key={course.id} id={`home-program-${course.id}`} className={`program-card program-card--${course.id}`} data-selected={selected === index} role="group" aria-roledescription="слайд" aria-label={`${index + 1} із ${courses.length}: ${course.title}`}>
              <div className="program-card__body">
                <div className="program-card__meta">
                  <span className="program-card__age">{course.age}</span>
                  <Link to="/courses" hash={course.id} hashScrollIntoView={{ behavior: "instant", block: "start" }} onFocus={() => { programmaticSelection.current = index; setSelected(index); }} className="program-card__details" aria-label={`Детальніше: ${course.title}`}><ArrowUpRight className="h-5 w-5" /></Link>
                </div>
                <h3>{course.title}</h3>
                <p>{course.id === "steam" ? "Діти досліджують явища через дослід, гру та власні проєкти." : course.desc}</p>
                <span className="program-card__price">{course.price.replace("Вартість: ", "")} </span>
              </div>
              <div className="program-card__photo">
                <ResponsiveImage src={photo} alt={`Заняття: ${course.title}`} sizes="(min-width: 1280px) 340px, (min-width: 1024px) 30vw, (min-width: 640px) 44vw, 84vw" className="h-full w-full object-cover" />
                <Link to="/courses" hash={course.id} hashScrollIntoView={{ behavior: "instant", block: "start" }} onFocus={() => { programmaticSelection.current = index; setSelected(index); }} className="program-card__photo-link" aria-label={`Про курс: ${course.title}`}>Детальніше <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2" role="group" aria-label="Оберіть курс">
        {courses.map((course, index) => (
          <button key={course.id} type="button" aria-pressed={selected === index} aria-controls={`home-program-${course.id}`} onClick={() => select(index)} className="program-carousel__label">{names[course.id]}</button>
        ))}
      </div>
    </div>
  );
}
