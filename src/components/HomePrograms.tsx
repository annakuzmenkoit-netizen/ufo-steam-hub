import { imageSources } from "@/lib/image-sources";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { courses } from "@/lib/courses";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const shortNames: Record<string, string> = { steam: "STEAM", robotics: "Робототехніка", animation: "Анімація", "math-mind": "Math&mind", math: "Математика", "3d-modeling": "3D-моделювання" };

const summaries: Record<string, string> = {
  steam: "Досліди, експерименти та власні наукові проєкти.",
  robotics: "Конструювання, програмування та створення власних роботів.",
  animation: "Власні персонажі й мультфільми — від ідеї до озвучки.",
  "math-mind": "Цікава математика, логічні задачі та головоломки.",
  math: "Шкільна математика зрозуміло та ефективно.",
  "3d-modeling": "Створення 3D-моделей і друк власних виробів.",
};

export function HomePrograms() {
  const viewport = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);

  function select(index: number) {
    const element = viewport.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({ left: element.clientWidth * index, behavior: reduce ? "instant" : "smooth" });
  }

  return (
    <div className="program-carousel" role="region" aria-roledescription="карусель" aria-label="Програми навчання">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-primary" aria-live="polite" aria-atomic="true">{String(selected + 1).padStart(2, "0")} <span className="font-normal text-muted-foreground">/ 06 · {courses[selected].title}</span></p>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label="Попередній курс" disabled={selected === 0} onClick={() => select(selected - 1)} className="program-carousel__arrow"><ArrowLeft className="h-5 w-5" /></button>
          <button type="button" aria-label="Наступний курс" disabled={selected === courses.length - 1} onClick={() => select(selected + 1)} className="program-carousel__arrow"><ArrowRight className="h-5 w-5" /></button>
        </div>
      </div>
      <div
        ref={viewport}
        className="program-carousel__viewport"
        tabIndex={0}
        aria-label="Курси: гортайте або оберіть назву нижче"
        onScroll={(event) => {
          const element = event.currentTarget;
          setSelected(Math.max(0, Math.min(courses.length - 1, Math.round(element.scrollLeft / element.clientWidth))));
        }}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            select(Math.max(0, Math.min(courses.length - 1, selected + (event.key === "ArrowRight" ? 1 : -1))));
          }
        }}
      >
        {courses.map((course, index) => (
          <article key={course.id} id={`home-program-${course.id}`} className={`program-slide program-slide--${course.id}`} role="group" aria-roledescription="слайд" aria-label={`${index + 1} із ${courses.length}: ${course.title}`} inert={selected !== index}>
            <div className="program-slide__photo">
              <ResponsiveImage src={course.gallery[0]} alt={`Заняття: ${course.title}`} sizes={`(min-width: 768px) ${Math.min(560, 320 * imageSources[course.gallery[0]].width / imageSources[course.gallery[0]].height)}px, ${Math.min(360, 155 * imageSources[course.gallery[0]].width / imageSources[course.gallery[0]].height)}px`} className="h-full w-full object-contain" />
              <span className="program-slide__number" aria-hidden="true">0{index + 1}</span>
            </div>
            <div className="program-slide__body">
              <div className="flex flex-wrap gap-2"><span className="program-slide__age">{course.age}</span><span className="program-slide__age">{course.price.replace("Вартість: ", "").replace("/місяць", "/міс.")}</span></div>
              <h3 className="mt-3 flex items-start gap-3 text-xl leading-tight md:text-3xl"><course.icon className="mt-0.5 h-7 w-7 shrink-0" />{course.title}</h3>
              <p className="mt-2 text-sm leading-relaxed md:text-base">{summaries[course.id]}</p>
              <Link to="/courses" hash={course.id} hashScrollIntoView={{ behavior: "instant", block: "start" }} aria-label={`Детальніше: ${course.title}`} className="program-slide__link">Детальніше <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Оберіть курс">
        {courses.map((course, index) => (
          <button key={course.id} type="button" aria-pressed={selected === index} aria-controls={`home-program-${course.id}`} onClick={() => select(index)} className="program-carousel__label">{shortNames[course.id]}</button>
        ))}
      </div>
    </div>
  );
}
