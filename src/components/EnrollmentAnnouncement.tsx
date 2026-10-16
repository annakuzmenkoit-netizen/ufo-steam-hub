import { Calendar, Clock3, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openRegistration } from "@/components/RegistrationModal";

const PROMO_INFO = "Тематичний мінікурс із 4 занять. Акція: знижка 20% при бронюванні до 31.10.2026.";

const newGroups = [
  {
    id: "new-group-animation",
    category: "Анімація та мультиплікація",
    title: "Театр тіней 🎭",
    registrationTitle: "Запис на мінікурс: Театр тіней",
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
    category: "Робототехніка",
    title: "Космічна експедиція 🪐",
    registrationTitle: "Запис на мінікурс: Космічна експедиція",
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
        <div className="parent-section-heading">
          <p className="parent-eyebrow inline-flex items-center gap-2"><Rocket className="h-4 w-4" />Листопад 2026 · новий набір</p>
          <h2 id="new-groups-title">Спробуйте напрям за 4 заняття</h2>
          <p>−20% за бронювання до 31 жовтня 2026 року.</p>
        </div>
        <div className={`mt-5 grid gap-4 ${compact ? "md:grid-cols-2" : "md:grid-cols-2 md:gap-6"}`}>
          {newGroups.map((g) => (
            <article key={g.id} id={g.id} className="promo-card flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm">
              <div className="flex flex-1 flex-col p-4 md:p-5">
                <p className="text-xs font-semibold uppercase text-primary">{g.category}</p>
                <h3 className="mt-1 text-xl font-semibold text-foreground">{g.title}</h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-primary"><span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{g.start}</span><span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{g.time}</span></p>
                <details className="mt-1 text-sm text-muted-foreground"><summary className="min-h-11 cursor-pointer py-3 font-semibold text-primary">Що створюватимемо?</summary><p className="leading-relaxed">{g.description[1]}</p></details>
                <Button
                  type="button"
                  onClick={() =>
                    openRegistration({
                      registrationType: "course",
                      sourcePage,
                      title: g.registrationTitle,
                      program: g.program,
                      day: g.day,
                      date: g.date,
                      time: g.time,
                      additionalInfo: `Категорія: ${g.category}. Розклад: ${g.schedule}. ${PROMO_INFO}`,
                    })
                  }
                  className="mt-1 min-h-11 w-full rounded-full bg-ufo-yellow font-semibold text-primary hover:bg-ufo-yellow/90"
                >
                  Хочу на мінікурс
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
