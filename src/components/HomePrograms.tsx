import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock, Plus, X } from "lucide-react";
import { slots } from "@/lib/schedule";
import { courses } from "@/lib/courses";

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
  const [expanded, setExpanded] = useState<string | null>(null);
  const board = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!board.current) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(board.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(`program-details-${expanded}`)?.scrollIntoView({
        block: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [expanded]);

  function closeCourse(id: string) {
    setExpanded(null);
    const trigger = document.getElementById(`program-trigger-${id}`);
    trigger?.focus({ preventScroll: true });
    trigger?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }

  return (
    <div className="program-discovery" onKeyDown={(event) => {
      if (event.key === "Escape" && expanded) { event.preventDefault(); closeCourse(expanded); }
    }}>
      <h2 className="program-discovery__heading">Знайдіть свій курс</h2>
      <div className="program-notes" ref={board} data-in-view={inView}>
        {courses.map((course, index) => {
          const open = expanded === course.id;
          const triggerId = `program-trigger-${course.id}`;
          const panelId = `program-details-${course.id}`;
          return (
            <article key={course.id} className={`program-note program-note--${course.id}`} data-open={open} style={{
              "--sway-duration": `${5.5 + index * 0.45}s`,
              "--sway-delay": `${index * -0.8}s`,
              "--panel-pointer": `${(index % 2 + 0.5) * 50}%`,
              "--panel-desktop-pointer": `${(index % 3 + 0.5) * 100 / 3}%`,
              "--puzzle-row": Math.floor(index / 2) * 2 + 1,
              "--puzzle-column": index % 2 + 1,
              "--puzzle-desktop-row": Math.floor(index / 3) * 2 + 1,
              "--puzzle-desktop-column": index % 3 + 1,
            } as CSSProperties}>
              <h3>
                <button id={triggerId} type="button" className="program-note__trigger" aria-label={`${course.title}, ${course.age}`} aria-expanded={open} aria-controls={panelId} onClick={() => setExpanded(open ? null : course.id)}>
                  <span className="program-note__name">{course.id === "animation" ? "Анімація" : course.title}<span className="program-note__age">{course.age}</span></span>
                  <span className="program-note__hint">{open ? <>Відкрито <Check aria-hidden="true" /></> : <>Про курс <Plus aria-hidden="true" /></>}</span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={`${panelId}-title`} hidden={!open} className="program-note__details">
                <div className="program-note__details-heading">
                  <div className="program-note__details-title">
                    <span className="program-note__course-icon"><course.icon className="h-5 w-5" aria-hidden="true" /></span>
                    <div><h4 id={`${panelId}-title`}>{course.title}</h4><span>{course.age}</span></div>
                  </div>
                  <button type="button" onClick={() => closeCourse(course.id)} className="program-note__close" aria-label={`Закрити опис: ${course.title}`}>Закрити <X className="h-4 w-4" aria-hidden="true" /></button>
                </div>
                <p>{summaries[course.id]}</p>
                <Link to="/schedule" className="program-note__schedule" aria-label={`Орієнтовний розклад: ${course.title}. Час і вік для кожної групи — у розкладі.`}>
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>{courseTimes(course.id, course.title).map(time => <span key={time}>{time}</span>)}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </Link>
                <div className="program-note__footer">
                  <span>{course.price.replace("Вартість: ", "")}</span>
                  <Link to="/courses" hash={course.id} hashScrollIntoView={{ behavior: "instant", block: "start" }} aria-label={`Детальніше: ${course.title}`}>Детальніше <ArrowUpRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
