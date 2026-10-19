import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock3, Film, Orbit, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openRegistration } from "@/components/RegistrationModal";

const PROMO_INFO = "Тематичний мінікурс із 4 занять. Акція: знижка 20% при бронюванні до 31.10.2026.";

const newGroups = [
  {
    id: "new-group-animation",
    icon: Film,
    theme: "blue",
    category: "Анімація та мультиплікація",
    title: "Театр тіней 🎭",
    price: "1500 грн",
    inquiryTitle: "Запитання про мінікурс: Театр тіней",
    program: "Анімація — Театр тіней",
    day: "Четвер",
    schedule: "щочетверга о 15:30",
    time: "15:30",
    start: "12 листопада 2026",
    date: "12.11.2026",
    description: [
      "А що, як створити цілу історію за допомогою світла й тіней?",
      "За 4 заняття діти придумають власний сюжет, створять персонажів і декорації та оживлять свою історію в театрі тіней!",
    ],
  },
  {
    id: "new-group-robotics",
    icon: Orbit,
    theme: "green",
    category: "Робототехніка",
    title: "Космічна експедиція 🪐",
    price: "1800 грн",
    inquiryTitle: "Запитання про мінікурс: Космічна експедиція",
    program: "Робототехніка — Космічна експедиція",
    day: "П'ятниця",
    schedule: "щоп’ятниці о 15:30",
    time: "15:30",
    start: "13 листопада 2026",
    date: "13.11.2026",
    description: [
      "Готуємося до власної космічної місії!",
      "Протягом 4 занять діти створять космічні конструкції, познайомляться з механізмами та виконають інженерні завдання, натхненні дослідженням космосу.",
    ],
  },
];

export function EnrollmentAnnouncement({ compact = false, sourcePage = "Тематичні мінікурси" }: { sourcePage?: string; compact?: boolean }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function select(index: number) {
    const viewport = rail.current;
    const card = viewport?.children[index] as HTMLElement | undefined;
    if (!viewport || !card) return;
    setActive(index);
    viewport.scrollTo({ left: card.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section id="new-groups" aria-labelledby="new-groups-title" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="minicourse-heading">
          <div>
            <p className="parent-eyebrow inline-flex items-center gap-2"><Rocket className="h-4 w-4" />Листопад 2026</p>
            <h2 id="new-groups-title">Набір на <span>мінікурси</span></h2>
            <p className="minicourse-heading__intro">Оберіть мінікурс за інтересами дитини. Розкажемо деталі та відповімо на запитання.</p>
          </div>
          <p className="minicourse-offer"><strong>−20%</strong><span>за бронювання<br />до 31 жовтня 2026</span></p>
        </div>
        <div className="minicourse-carousel" data-compact={compact}>
        <div className="minicourse-rail" ref={rail} tabIndex={0} aria-label="Мінікурси: гортайте вбік" onScroll={event => {
          const viewport = event.currentTarget;
          setActive(viewport.scrollLeft > (viewport.scrollWidth - viewport.clientWidth) / 2 ? 1 : 0);
        }} onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); select(event.key === "ArrowRight" ? 1 : 0); }
        }}>
          {newGroups.map((g, index) => (
            <article key={g.id} id={g.id} className={`minicourse-card minicourse-card--${g.theme}`}>
              <div className="minicourse-card__banner">
                <g.icon className="minicourse-card__art" aria-hidden="true" />
                <div className="minicourse-card__ticket"><span>Мінікурс</span><span>UFO / 0{index + 1}</span></div>
                <p>{g.category}</p>
                <h3>{g.title}</h3>
              </div>
              <div className="minicourse-card__body">
                <div className="minicourse-card__when"><span><Calendar className="h-4 w-4" aria-hidden="true" />{g.start}</span><span><Clock3 className="h-4 w-4" aria-hidden="true" />{g.schedule}</span></div>
                <p className="minicourse-card__intro">{g.description[0]}</p>
                <details className="minicourse-card__more"><summary>Про мінікурс</summary><p>{g.description[1]}</p></details>
              </div>
              <div className="minicourse-card__stub">
                <p className="minicourse-card__price"><span>Вартість</span><strong>{g.price}</strong></p>
                <Button
                  type="button"
                  onClick={() =>
                    openRegistration({
                      registrationType: "course",
                      intent: "inquiry",
                      sourcePage,
                      title: g.inquiryTitle,
                      program: g.program,
                      day: g.day,
                      date: g.date,
                      time: g.time,
                      additionalInfo: `Запит про деталі мінікурсу, без бронювання. Категорія: ${g.category}. Розклад: ${g.schedule}. Вартість мінікурсу: ${g.price}. ${PROMO_INFO}`,
                    })
                  }
                  className="minicourse-card__button"
                >
                  Запитати про мінікурс <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className="minicourse-carousel__controls" role="group" aria-label="Оберіть мінікурс">
          <button type="button" aria-label="Попередній мінікурс" disabled={active === 0} onClick={() => select(0)}><ArrowLeft className="h-5 w-5" /></button>
          <div className="minicourse-carousel__positions">{newGroups.map((g, index) => <button key={g.id} type="button" aria-label={`Показати: ${g.title}`} aria-controls={g.id} aria-pressed={active === index} onClick={() => select(index)}><span /></button>)}</div>
          <span className="sr-only" aria-live="polite">Мінікурс {active + 1} із 2</span>
          <button type="button" aria-label="Наступний мінікурс" disabled={active === 1} onClick={() => select(1)}><ArrowRight className="h-5 w-5" /></button>
        </div>
        </div>
      </div>
    </section>
  );
}
