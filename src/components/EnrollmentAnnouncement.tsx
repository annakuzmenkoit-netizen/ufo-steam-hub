import { ArrowUpRight, Calendar, Clock3, Film, Orbit, Rocket } from "lucide-react";
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
        <div className={`mt-5 grid gap-4 ${compact ? "md:grid-cols-2" : "md:grid-cols-2 md:gap-6"}`}>
          {newGroups.map((g) => (
            <article key={g.id} id={g.id} className={`minicourse-card minicourse-card--${g.theme}`}>
              <div className="minicourse-card__banner">
                <g.icon className="minicourse-card__art" aria-hidden="true" />
                <p>{g.category}</p>
                <h3>{g.title}</h3>
              </div>
              <div className="minicourse-card__body">
                <div className="minicourse-card__when"><span><Calendar className="h-4 w-4" aria-hidden="true" />{g.start}</span><span><Clock3 className="h-4 w-4" aria-hidden="true" />{g.schedule}</span></div>
                <p className="minicourse-card__intro">{g.description[0]}</p>
                <details className="minicourse-card__more"><summary>Про мінікурс</summary><p>{g.description[1]}</p></details>
                <p className="minicourse-card__price"><span>Вартість мінікурсу</span><strong>{g.price}</strong></p>
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
      </div>
    </section>
  );
}
