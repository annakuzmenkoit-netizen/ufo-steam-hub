import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { slots } from "@/lib/schedule";
import { courses } from "@/lib/courses";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const names: Record<string, string> = {
  steam: "STEAM", robotics: "Робототехніка", animation: "Анімація",
  "math-mind": "Math&mind", math: "Математика", "3d-modeling": "3D-моделювання",
};

const summaries: Record<string, string> = {
  steam: "Досліди з водою, світлом і магнітами. Дитина перевіряє свої ідеї та відкриває, як працює світ.",
  robotics: "Зібрати робота, запрограмувати рух і випробувати його в дії — знайомство з інженерією через гру.",
  animation: "Від власного персонажа до мультфільму: дитина вигадує сюжет, анімує та озвучує свою історію.",
  "math-mind": "Головоломки й нестандартні задачі. Вчимося помічати закономірності та пояснювати власні рішення.",
  math: "Розбираємо незрозумілі шкільні теми, заповнюємо прогалини й тренуємося розв’язувати задачі самостійно.",
  "3d-modeling": "Створити власну 3D-модель і надрукувати її на принтері — шлях від задуму до реального виробу.",
};

const scheduleNames: Record<string, string> = { animation: "Анімація", "3d-modeling": "3D-моделювання" };
const shortDays: Record<string, string> = { "Вівторок": "Вт", "Середа": "Ср", "Четвер": "Чт", "П'ятниця": "Пт", "Субота": "Сб", "Неділя": "Нд" };

function courseTimes(id: string, title: string) {
  const byDay = new Map<string, string[]>();
  for (const slot of slots.filter(slot => slot.course === (scheduleNames[id] ?? title))) {
    byDay.set(slot.day, [...(byDay.get(slot.day) ?? []), slot.time]);
  }
  const grouped = new Map<string, string[]>();
  for (const [day, times] of byDay) {
    const time = times.join(", ");
    grouped.set(time, [...(grouped.get(time) ?? []), shortDays[day] ?? day]);
  }
  return Array.from(grouped, ([time, days]) => `${days.join(", ")} ${time}`);
}

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
      <div className="program-discovery-heading">
        <h2>Знайдіть свій курс</h2>
        <div className="program-discovery-heading__courses" role="group" aria-label="Оберіть курс">
          {courses.map((course, index) => (
            <button key={course.id} type="button" aria-pressed={selected === index} aria-controls={`home-program-${course.id}`} onClick={() => select(index)} className="program-carousel__label">{names[course.id]}</button>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label="Попередній курс" disabled={selected === 0} onClick={() => select(selected - 1)} className="program-carousel__arrow"><ArrowLeft className="h-5 w-5" /></button>
          <button type="button" aria-label="Наступний курс" disabled={selected === courses.length - 1} onClick={() => select(selected + 1)} className="program-carousel__arrow"><ArrowRight className="h-5 w-5" /></button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">Обрано: {courses[selected].title}</p>
      <div
        ref={viewport}
        className="program-card-rail"
        tabIndex={0}
        aria-label="Курси: гортайте або оберіть назву вгорі"
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
                <p>{summaries[course.id]}</p>
                <Link to="/schedule" className="program-card__schedule" aria-label={`Орієнтовний розклад: ${course.title}. Час і вік для кожної групи — у розкладі.`}>
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{courseTimes(course.id, course.title).map(time => <span key={time}>{time}</span>)}</span>
                </Link>
                <span className="program-card__price">{course.price.replace("Вартість: ", "")} </span>
              </div>
              <div className="program-card__photo">
                <ResponsiveImage src={photo} alt={`Заняття: ${course.title}`} sizes="(min-width: 640px) 260px, 76vw" className="h-full w-full object-cover" />
                <Link to="/courses" hash={course.id} hashScrollIntoView={{ behavior: "instant", block: "start" }} onFocus={() => { programmaticSelection.current = index; setSelected(index); }} className="program-card__photo-link" aria-label={`Про курс: ${course.title}`}>Детальніше <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </article>
          );
        })}
      </div>

    </div>
  );
}
