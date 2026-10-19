import { useCoursePuzzle } from "@/components/useCoursePuzzle";
import { initialPuzzle } from "@/lib/alien-puzzle";
import { formatCourseTimes } from "@/lib/course-times";
import alienArt from "@/assets/puzzle-alien.webp";
import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock, Gift, Grip, Plus, X } from "lucide-react";
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
function courseTimes(id: string, title: string) {
  return formatCourseTimes(slots.filter(slot => slot.course === (scheduleNames[id] ?? title)));
}

export function HomePrograms() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const puzzle = useCoursePuzzle(() => setExpanded(null));
  const { board } = puzzle;
  const [inView, setInView] = useState(false);
  const [swayIndex, setSwayIndex] = useState(0);

  useEffect(() => {
    if (!inView || expanded || puzzle.dragging) return;
    const timer = window.setInterval(() => setSwayIndex(index => (index + 1) % courses.length), 2200);
    return () => window.clearInterval(timer);
  }, [inView, expanded, puzzle.dragging]);

  useEffect(() => {
    if (!board.current) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(board.current);
    return () => observer.disconnect();
  }, [board]);

  useEffect(() => {
    if (!expanded) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(`program-details-${expanded}`)?.scrollIntoView({
        block: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [expanded]);

  useEffect(() => {
    if (puzzle.solved) document.getElementById("alien-puzzle-reward")?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [puzzle.solved]);

  function closeCourse(id: string) {
    setExpanded(null);
    const trigger = document.getElementById(`program-trigger-${id}`);
    trigger?.focus({ preventScroll: true });
    trigger?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }

  return (
    <div className="program-discovery" onKeyDown={(event) => {
      if (event.key === "Escape") { puzzle.cancel(); if (expanded) { event.preventDefault(); closeCourse(expanded); } }
    }}>
      <div className="program-discovery__top">
        <h2 className="program-discovery__heading">Знайдіть свій курс</h2>
        <p className="program-discovery__help">Натисніть на пазл, щоб дізнатися більше про курс.</p>
      </div>
      <p id="course-puzzle-help" className="sr-only">Натисніть назву, щоб прочитати про курс. Тягніть за значок із крапками або натисніть два такі значки, щоб переставити пазли.</p>
        <div className="program-notes" ref={board} data-in-view={inView}>
          {puzzle.order.map((piece, index) => {
            const course = courses[piece];
            const fragment = initialPuzzle[piece];
            const open = expanded === course.id;
            const triggerId = `program-trigger-${course.id}`;
            const panelId = `program-details-${course.id}`;
            return (
              <article key={course.id} className={`program-note program-note--${course.id}`} data-open={open} data-sway={inView && !expanded && !puzzle.dragging && index === swayIndex} style={{
                "--alien-art": `url("${alienArt}")`,
                "--alien-mobile-x": `${fragment % 2 * 100}%`,
                "--alien-mobile-y": `${Math.floor(fragment / 2) * 50}%`,
                "--alien-desktop-x": `${fragment % 3 * 50}%`,
                "--alien-desktop-y": `${Math.floor(fragment / 3) * 100}%`,
                "--panel-pointer": `${(index % 2 + 0.5) * 50}%`,
                "--panel-desktop-pointer": `${(index % 3 + 0.5) * 100 / 3}%`,
                "--puzzle-row": Math.floor(index / 2) * 2 + 1,
                "--puzzle-column": index % 2 + 1,
                "--puzzle-desktop-row": Math.floor(index / 3) * 2 + 1,
                "--puzzle-desktop-column": index % 3 + 1,
              } as CSSProperties}>
                <h3 data-puzzle-slot={index} data-piece={piece} data-selected={puzzle.selected === index} data-target={puzzle.target === index} data-dragging={puzzle.dragging?.from === index} style={{ transform: puzzle.dragging?.from === index ? `translate(${puzzle.dragging.x}px, ${puzzle.dragging.y}px)` : undefined }}>
                  <button id={triggerId} type="button" className="program-note__trigger" aria-label={`${course.title}, ${course.age}`} aria-expanded={open} aria-controls={panelId} onClick={() => setExpanded(open ? null : course.id)}>
                    <span className="program-note__name">{course.id === "animation" ? "Анімація" : course.title}<span className="program-note__age">{course.age}</span></span>
                    <span className="program-note__hint">{open ? <>Відкрито <Check aria-hidden="true" /></> : <>Про курс <Plus aria-hidden="true" /></>}</span>
                  </button>
                  <button type="button" className="program-note__drag" aria-label={`Переставити курс: ${course.title}`} aria-describedby="course-puzzle-help" aria-pressed={puzzle.selected === index} onPointerDown={event => puzzle.startDrag(event, index)} onPointerMove={puzzle.moveDrag} onPointerUp={event => puzzle.finishDrag(event)} onPointerCancel={event => puzzle.finishDrag(event, true)} onLostPointerCapture={event => puzzle.finishDrag(event, true)} onClick={event => puzzle.handleClick(event.detail, index)}><Grip className="h-4 w-4" aria-hidden="true" /></button>
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
                    <span>{courseTimes(course.id, course.title)}</span>
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
      <p className="sr-only" aria-live="polite">{puzzle.announcement}</p>
      <div id="alien-puzzle-reward" role="status" className="alien-game__reward" hidden={!puzzle.solved}>
        {puzzle.solved && <><Gift className="h-8 w-8" aria-hidden="true" /><h3>Таємницю UFO розкрито!</h3><p>У нас є для вас подарунок! Зробіть скриншот і покажіть його в UFO STEAM HUB.</p></>}
      </div>
    </div>
  );
}
