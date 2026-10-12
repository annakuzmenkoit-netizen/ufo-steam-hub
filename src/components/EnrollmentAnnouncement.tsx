import { Calendar, Clock3, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openRegistration } from "@/components/RegistrationModal";
import animationImage from "@/assets/courses/animation2.jpg";
import roboticsImage from "@/assets/courses/robotics1.jpg";

const newGroups = [
  {
    id: "new-group-animation",
    title: "Анімація та мультиплікація 🎬",
    program: "Анімація і мультиплікація",
    day: "Четвер",
    time: "15:30",
    start: "12 листопада 2026 року",
    description:
      "Створюй власні мультфільми, вигадуй персонажів та оживляй історії! На заняттях діти знайомляться з основами анімації та вчаться втілювати творчі ідеї.",
    button: "Записатися на анімацію",
    image: animationImage,
    imageAlt: "Діти на занятті з анімації",
  },
  {
    id: "new-group-robotics",
    title: "Робототехніка 🤖",
    program: "Робототехніка",
    day: "П'ятниця",
    time: "15:30",
    start: "13 листопада 2026 року",
    description:
      "Конструюй, експериментуй і створюй власних роботів! Діти розвивають інженерне мислення, логіку та навички роботи з технологіями.",
    button: "Записатися на робототехніку",
    image: roboticsImage,
    imageAlt: "Діти на занятті з робототехніки",
  },
];

export function EnrollmentAnnouncement({ sourcePage, compact = false }: { sourcePage: string; compact?: boolean }) {
  return (
    <section id="new-groups" aria-labelledby="new-groups-title" className="scroll-mt-24">
      <div className={compact ? "" : "mx-auto max-w-6xl px-4"}>
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ufo-yellow/30 px-3 py-1 text-xs font-semibold text-primary">
            <Rocket className="h-3.5 w-3.5" /> Новини та набір у групи
          </span>
          <h2 id="new-groups-title" className={`mt-3 font-semibold text-foreground ${compact ? "text-xl" : "text-2xl md:text-4xl"}`}>
            Відкриваємо набір у нові групи! 🚀
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Нові пригоди, творчість і технології вже чекають! Обирайте напрямок та приєднуйтеся до UFO STEAM HUB.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border-2 border-dashed border-ufo-pink/50 bg-ufo-pink/10 p-4 text-center md:mt-8">
          <p className="text-base font-semibold text-foreground md:text-lg">🎁 -20% на перший місяць навчання!</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Забронюйте місце до 25 листопада 2026 року та отримайте знижку 20% на перший місяць навчання.
          </p>
        </div>

        <div className={`mt-5 grid gap-4 ${compact ? "" : "md:grid-cols-2 md:gap-6"}`}>
          {newGroups.map((g) => (
            <article key={g.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={g.image} alt={g.imageAlt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-4 md:p-5">
                <h3 className="text-lg font-semibold text-foreground">{g.title}</h3>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                    <Calendar className="h-3.5 w-3.5" /> {g.day}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                    <Clock3 className="h-3.5 w-3.5" /> {g.time}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-ufo-yellow/30 px-2.5 py-1 text-foreground">
                    Старт: {g.start}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{g.description}</p>
                <Button
                  type="button"
                  onClick={() =>
                    openRegistration({
                      registrationType: "course",
                      sourcePage,
                      title: `Набір у нову групу: ${g.program}`,
                      program: g.program,
                      day: g.day,
                      time: g.time,
                      date: `Старт ${g.start}`,
                      additionalInfo: "Нова група · знижка -20% на перший місяць при бронюванні до 25.11.2026",
                    })
                  }
                  className="mt-4 min-h-11 w-full rounded-full bg-ufo-yellow font-semibold text-primary hover:bg-ufo-yellow/90"
                >
                  {g.button}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
