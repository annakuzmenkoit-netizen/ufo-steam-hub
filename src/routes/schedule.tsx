import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Users, ArrowRight, CalendarDays } from "lucide-react";
import { openRegistration } from "@/components/RegistrationModal";
import { Star4, Dot, Squiggle, BlobShape } from "@/components/Blobs";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Розклад — UFO STEAM HUB" },
      {
        name: "description",
        content:
          "Орієнтовний розклад занять UFO STEAM HUB на 2026–2027 навчальний рік.",
      },
      {
        property: "og:title",
        content: "Розклад — UFO STEAM HUB",
      },
      {
        property: "og:description",
        content:
          "Орієнтовний розклад занять освітнього центру UFO STEAM HUB на 2026–2027 навчальний рік.",
      },
    ],
  }),
  component: SchedulePage,
});

type Slot = {
  id: string;
  day: string;
  time: string;
  course: string;
  age: string;
  teacher?: string;
  description: string;
  color: string;
  accent: string;
};

const slots: Slot[] = [
  {
    id: "tue-1",
    day: "Вівторок",
    time: "15:00",
    course: "Математика",
    age: "5–6 клас",
    teacher: "Анна",
    description:
      "Розбираємо шкільні теми зрозуміло, заповнюємо прогалини та закріплюємо знання через практичні вправи.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-blue",
  },
  {
    id: "tue-2",
    day: "Вівторок",
    time: "16:00",
    course: "STEAM-гурток",
    age: "7–12 років",
    description:
      "Досліджуємо фізику, хімію, технології та інженерію через експерименти, конструювання і власні проєкти.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "tue-3",
    day: "Вівторок",
    time: "17:30",
    course: "Математика",
    age: "7–8 клас",
    description:
      "Систематизуємо шкільні знання, тренуємо розв’язування задач і готуємося до контрольних робіт.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-blue",
  },
  {
    id: "wed-1",
    day: "Середа",
    time: "16:00",
    course: "STEAM-гурток",
    age: "7–12 років",
    teacher: "Катерина",
    description:
      "Проводимо наукові досліди, перевіряємо гіпотези та створюємо практичні STEAM-проєкти власними руками.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "thu-1",
    day: "Четвер",
    time: "15:00",
    course: "Математика",
    age: "5–6 клас",
    teacher: "Анна",
    description:
      "Пояснюємо складні теми просто, працюємо з прогалинами та розвиваємо впевненість у розв’язуванні задач.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-blue",
  },
  {
    id: "thu-2",
    day: "Четвер",
    time: "16:00",
    course: "Анімація",
    age: "7–12 років",
    teacher: "Анна",
    description:
      "Створюємо персонажів і сюжети, вивчаємо stop-motion, знімаємо кадри та монтуємо власні мультфільми.",
    color: "bg-ufo-pink/15 text-ufo-pink",
    accent: "border-l-ufo-pink",
  },
  {
    id: "thu-3",
    day: "Четвер",
    time: "17:30",
    course: "Математика",
    age: "7–8 клас",
    teacher: "Анна",
    description:
      "Поглиблюємо знання зі шкільної математики, розвиваємо логіку та відпрацьовуємо алгоритми розв’язування задач.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-blue",
  },
  {
    id: "fri-1",
    day: "П'ятниця",
    time: "15:30",
    course: "Робототехніка",
    age: "7–10 років",
    teacher: "Анна",
    description:
      "Конструюємо роботів і механізми, знайомимося з датчиками та вчимося керувати моделями за допомогою програм.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "fri-2",
    day: "П'ятниця",
    time: "17:00",
    course: "3D-моделювання",
    age: "10–15 років",
    teacher: "Анна",
    description:
      "Створюємо власні 3D-моделі, готуємо їх до друку та перетворюємо цифрові ідеї на реальні вироби.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "sat-1",
    day: "Субота",
    time: "10:00",
    course: "Math&mind",
    age: "7–9 клас",
    teacher: "Анна",
    description:
      "Олімпіадна математика, алгоритми та основи програмування. Вчимося знаходити нестандартні способи розв’язання задач.",
    color: "bg-ufo-yellow/30 text-primary",
    accent: "border-l-ufo-yellow",
  },
  {
    id: "sat-2",
    day: "Субота",
    time: "11:00",
    course: "Math&mind",
    age: "5–6 клас",
    teacher: "Анна",
    description:
      "Розвиваємо логіку, математичне мислення та навички роботи з нестандартними й олімпіадними задачами.",
    color: "bg-ufo-yellow/30 text-primary",
    accent: "border-l-ufo-yellow",
  },
{
    id: "sat-3",
    day: "Субота",
    time: "12:00",
    course: "Анімація",
    age: "7–12 років",
    teacher: "Анна",
    description:
      "Вигадуємо історії, створюємо персонажів і декорації та знімаємо власну анімацію кадр за кадром.",
    color: "bg-ufo-pink/15 text-ufo-pink",
    accent: "border-l-ufo-pink",
  },
  
  {
    id: "sat-4",
    day: "Субота",
    time: "13:30",
    course: "Math&mind",
    age: "3–4 клас",
    teacher: "Катерина",
    description:
      "Розв’язуємо головоломки, логічні задачі та математичні ігри, вчимося міркувати й пояснювати свої рішення.",
    color: "bg-ufo-yellow/30 text-primary",
    accent: "border-l-ufo-yellow",
  },
  
  {
    id: "sat-5",
    day: "Субота",
    time: "14:30",
    course: "STEAM-гурток",
    age: "7–12 років",
    description:
      "Досліджуємо фізику, хімію, технології та інженерію через експерименти, конструювання і власні проєкти.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "sat-6",
    day: "Субота",
    time: "16:00",
    course: "Підлітковий клуб",
    age: "12–16 років",
    teacher: "Катерина",
    description:
      "Безпечний простір для спілкування, командних ігор, творчих активностей, обговорення важливих тем і нових знайомств.",
    color: "bg-ufo-pink/15 text-ufo-pink",
    accent: "border-l-ufo-pink",
  },
  {
    id: "sun-1",
    day: "Неділя",
    time: "10:00",
    course: "3D-моделювання",
    age: "10–15 років",
    teacher: "Анна",
    description:
      "Вивчаємо основи просторового дизайну, створюємо 3D-об’єкти та готуємо власні моделі до друку.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "sun-2",
    day: "Неділя",
    time: "11:30",
    course: "Maker Lab",
    age: "11-15 років",
    teacher: "Анна",
    description:
      "Поєднуємо науку, інженерію та творчість: створюємо моделі, механізми й практичні проєкти власними руками.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-blue",
  },
  {
    id: "sun-3",
    day: "Неділя",
    time: "14:00",
    course: "Робототехніка",
    age: "7–10 років",
    teacher: "Анна",
    description:
      "Будуємо роботів, досліджуємо принципи роботи механізмів і створюємо прості програми для керування моделями.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
];

const days = [
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
  "Неділя",
];

function SchedulePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ufo-cream py-16 text-center md:py-28">
        <Star4
          className="absolute left-5 top-8 md:left-10 md:top-10"
          color="#f7df5d"
          size={50}
        />

        <Dot
          className="absolute right-8 top-20 hidden md:block"
          color="#f04770"
          size={20}
        />

        <Squiggle
          className="absolute bottom-10 right-10 hidden opacity-70 md:block"
          color="#17c590"
          size={130}
        />

        <BlobShape
          className="absolute -bottom-12 -left-12 opacity-25"
          color="#3056dd"
          size={200}
        />

        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-semibold text-foreground md:text-5xl">
            Наш <span className="text-primary">розклад</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
            Орієнтовний розклад занять на 2026–2027 навчальний рік.
            Час може змінюватися залежно від формування груп.
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 md:space-y-10 lg:px-8">
          {days.map((day, dayIdx) => {
            const daySlots = slots.filter((slot) => slot.day === day);

            return (
              <AnimatedSection key={day} delay={dayIdx * 0.04}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-ufo-yellow shadow-md">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>

                  <h2 className="text-xl font-semibold text-foreground md:text-2xl">
                    {day}
                  </h2>
                </div>

                {daySlots.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border bg-card/60 px-5 py-5 text-sm text-muted-foreground">
                    Занять поки немає.
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="space-y-3">
                    {daySlots.map((slot) => (
                      <AccordionItem
                        key={slot.id}
                        value={slot.id}
                        className="border-none"
                      >
                        <div
                          className={`overflow-hidden rounded-2xl border border-l-4 border-border bg-card shadow-sm transition-all hover:shadow-md ${slot.accent}`}
                        >
                          <AccordionTrigger className="px-4 py-4 hover:no-underline md:px-5">
                            <div className="flex w-full flex-wrap items-center gap-2.5 pr-2 text-left md:flex-nowrap md:gap-5">
                              <div className="flex min-w-[76px] shrink-0 items-center gap-2 text-sm font-bold text-foreground md:min-w-[100px]">
                                <Clock className="h-4 w-4 text-primary" />
                                {slot.time}
                              </div>

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold md:text-sm ${slot.color}`}
                              >
                                {slot.course}
                              </span>

                              <span className="rounded-full bg-muted/60 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                                {slot.age}
                              </span>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="px-4 pb-5 md:px-5">
                            <div className="space-y-4 border-t border-border pt-4">
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {slot.description}
                              </p>

                              {slot.teacher && (
                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                                    <Users className="h-4 w-4 text-primary" />
                                    Викладач:
                                    <span className="font-semibold text-foreground">
                                      {slot.teacher}
                                    </span>
                                  </span>
                                </div>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  openRegistration({
                                    registrationType: "schedule",
                                    sourcePage: "Розклад",
                                    title: `Запис на заняття: ${slot.course}`,
                                    program: slot.course,
                                    day: slot.day,
                                    time: slot.time,
                                    age: slot.age,
                                    teacher: slot.teacher,
                                  })
                                }
                                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-ufo-yellow px-6 py-3 text-sm font-semibold text-primary shadow-md transition-all hover:scale-[1.02] hover:shadow-lg sm:w-auto"
                              >
                                Записатись
                                <ArrowRight className="h-4 w-4" />
                              </button>
                            </div>
                          </AccordionContent>
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </AnimatedSection>
            );
          })}

          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl border-2 border-ufo-yellow bg-ufo-cream px-5 py-7 text-center shadow-md md:px-10 md:py-10">
              <Star4
                className="absolute -right-2 -top-2 opacity-70"
                color="#f7df5d"
                size={46}
              />

              <Dot
                className="absolute bottom-4 left-5 opacity-60"
                color="#17c590"
                size={20}
              />

              <div className="relative">
                <h2 className="text-xl font-semibold text-foreground md:text-3xl">
                  Не знайшли зручного часу?
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Напишіть нам — ми врахуємо ваші побажання та спробуємо
                  запропонувати інший час або повідомимо про відкриття
                  нової групи.
                </p>

                <Link
                  to="/contacts"
                  className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ufo-yellow px-7 py-3 text-sm font-semibold text-primary shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
                >
                  Написати нам
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
