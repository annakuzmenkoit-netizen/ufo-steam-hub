import { slots } from "@/lib/schedule";
import { useState } from "react";
import { SectionDecor } from "@/components/SectionDecor";
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
  const [selectedDay, setSelectedDay] = useState(days.find((day) => slots.some((slot) => slot.day === day)) ?? days[0]);
  return (
    <>
      <section className="page-intro relative overflow-hidden bg-ufo-cream py-16 text-center md:py-28">
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

      <section className="section-art bg-background py-12 md:py-20">
        <SectionDecor tone="mint" side="right" />
        <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 md:space-y-10 lg:px-8">
          <div className="day-picker" role="group" aria-label="Оберіть день занять">{days.map((day) => <button key={day} type="button" aria-pressed={day === selectedDay} onClick={() => setSelectedDay(day)}>{day}</button>)}</div>
          {days.filter((day) => day === selectedDay).map((day, dayIdx) => {
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
                                className={`rounded-lg px-3 py-1 text-xs font-semibold md:text-sm ${slot.color}`}
                              >
                                {slot.course}
                              </span>

                              <span className="rounded-lg bg-muted/60 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
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
                                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-ufo-yellow px-6 py-3 text-sm font-semibold text-primary shadow-md transition-all hover:scale-[1.02] hover:shadow-lg sm:w-auto"
                              >
                                Хочу спробувати
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
                  className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ufo-yellow px-7 py-3 text-sm font-semibold text-primary shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
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
