import { Calendar, Clock3, Rocket, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openRegistration } from "@/components/RegistrationModal";
import animationImage from "@/assets/courses/animation2.jpg";
import roboticsImage from "@/assets/courses/robotics1.jpg";

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
    image: animationImage,
    imageAlt: "Діти на занятті з анімації",
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
    image: roboticsImage,
    imageAlt: "Діти на занятті з робототехніки",
  },
];

export function EnrollmentAnnouncement({ compact = false }: { sourcePage?: string; compact?: boolean }) {
  return (
    <section id="new-groups" aria-labelledby="new-groups-title" className="scroll-mt-24">
      <div className={compact ? "" : "mx-auto max-w-6xl px-4"}>
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ufo-yellow/30 px-3 py-1 text-xs font-semibold text-primary">
            <Rocket className="h-3.5 w-3.5" /> Тематичні мінікурси
          </span>
          <h2 id="new-groups-title" className={`mt-3 font-semibold text-foreground ${compact ? "text-xl" : "text-2xl md:text-4xl"}`}>
            Нові тематичні мінікурси! 🚀
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            4 заняття, одна захоплива пригода та власний творчий результат! Обирайте мінікурс і бронюйте місце для дитини.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border-2 border-dashed border-ufo-pink/50 bg-ufo-pink/10 p-4 text-center md:mt-8">
          <p className="text-base font-semibold text-foreground md:text-lg">🎁 -20% на мінікурс!</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Забронюйте місце до 31 жовтня та отримайте знижку 20% на навчання!
          </p>
        </div>

        <div className={`mt-5 grid gap-4 ${compact ? "" : "md:grid-cols-2 md:gap-6"}`}>
          {newGroups.map((g) => (
            <article key={g.id} id={g.id} className="flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={g.image} alt={g.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-ufo-yellow px-3 py-1 text-xs font-bold text-primary shadow-sm">
                  <BookOpen className="h-3.5 w-3.5" /> 4 заняття
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4 md:p-5">
                <p className="text-xs font-semibold uppercase text-primary">{g.category}</p>
                <h3 className="mt-1 text-xl font-semibold text-foreground">{g.title}</h3>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1 rounded-full bg-ufo-yellow/30 px-2.5 py-1 text-foreground">
                    <Calendar className="h-3.5 w-3.5" /> Старт: {g.start}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                    <Clock3 className="h-3.5 w-3.5" /> {g.schedule}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-ufo-green/15 px-2.5 py-1 text-foreground">
                    Набір відкрито
                  </span>
                </div>
                {g.description.map((p) => (
                  <p key={p} className="mt-3 text-sm leading-relaxed text-muted-foreground">{p}</p>
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    openRegistration({
                      registrationType: "course",
                      sourcePage: "Тематичні мінікурси",
                      title: g.registrationTitle,
                      program: g.program,
                      day: g.day,
                      date: g.date,
                      time: g.time,
                      additionalInfo: `Категорія: ${g.category}. Розклад: ${g.schedule}. ${PROMO_INFO}`,
                    })
                  }
                  className="mt-4 min-h-11 w-full rounded-full bg-ufo-yellow font-semibold text-primary hover:bg-ufo-yellow/90"
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
