import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Users, ArrowRight, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Розклад — UFO STEAM HUB" },
      { name: "description", content: "Розклад занять UFO STEAM HUB — знайдіть зручний час для вашої дитини." },
      { property: "og:title", content: "Розклад — UFO STEAM HUB" },
      { property: "og:description", content: "Розклад занять освітнього центру." },
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
  teacher: string;
  description: string;
  color: string; // pill color
  accent: string; // border color
};

const slots: Slot[] = [
  { id: "mon-1", day: "Понеділок", time: "15:00–16:30", course: "STEAM-гурток", age: "7-9 років", teacher: "Анна", description: "Досліджуємо нову тему місяця через експерименти, гру та проєктну роботу.", color: "bg-ufo-blue/15 text-primary", accent: "border-l-ufo-blue" },
  { id: "mon-2", day: "Понеділок", time: "17:00–18:30", course: "Робототехніка", age: "6-9 років", teacher: "Станіслав", description: "Конструюємо та програмуємо перших роботів. Базовий рівень.", color: "bg-ufo-green/15 text-ufo-green", accent: "border-l-ufo-green" },
  { id: "tue-1", day: "Вівторок", time: "15:00–16:30", course: "Анімація", age: "7-10 років", teacher: "Олександра", description: "Вчимося оживляти персонажів, малюємо кадри, створюємо власний мультфільм.", color: "bg-ufo-pink/15 text-ufo-pink", accent: "border-l-ufo-pink" },
  { id: "tue-2", day: "Вівторок", time: "17:00–18:30", course: "Math&mind", age: "3-4 клас", teacher: "Валерія", description: "Логіка, олімпіадні задачі, головоломки в ігровому форматі.", color: "bg-ufo-yellow/30 text-primary", accent: "border-l-ufo-yellow" },
  { id: "wed-1", day: "Середа", time: "15:00–16:30", course: "Математика", age: "5-6 клас", teacher: "Валерія", description: "Шкільна програма, заповнення пробілів, підготовка до контрольних.", color: "bg-ufo-blue/15 text-primary", accent: "border-l-ufo-blue" },
  { id: "wed-2", day: "Середа", time: "17:00–18:30", course: "3D моделювання", age: "10-14 років", teacher: "Станіслав", description: "Створюємо 3D-моделі та друкуємо власні вироби на 3D-принтері.", color: "bg-ufo-green/15 text-ufo-green", accent: "border-l-ufo-green" },
  { id: "thu-1", day: "Четвер", time: "15:00–16:30", course: "STEAM-гурток", age: "10-12 років", teacher: "Анна", description: "Старша група: складніші експерименти та більш самостійні проєкти.", color: "bg-ufo-blue/15 text-primary", accent: "border-l-ufo-blue" },
  { id: "thu-2", day: "Четвер", time: "17:00–18:30", course: "Робототехніка", age: "10-12 років", teacher: "Станіслав", description: "Просунутий рівень: складні механізми, автономні роботи, змагання.", color: "bg-ufo-green/15 text-ufo-green", accent: "border-l-ufo-green" },
  { id: "fri-1", day: "П'ятниця", time: "15:00–16:30", course: "Анімація", age: "10-12 років", teacher: "Олександра", description: "Старша група: цифрова анімація, монтаж та озвучка.", color: "bg-ufo-pink/15 text-ufo-pink", accent: "border-l-ufo-pink" },
  { id: "fri-2", day: "П'ятниця", time: "17:00–18:30", course: "Math&mind", age: "5-6 клас", teacher: "Валерія", description: "Олімпіадна математика для середньої школи.", color: "bg-ufo-yellow/30 text-primary", accent: "border-l-ufo-yellow" },
  { id: "sat-1", day: "Субота", time: "10:00–11:30", course: "STEAM-гурток", age: "7-9 років", teacher: "Анна", description: "Ранкова субота для активних дослідників.", color: "bg-ufo-blue/15 text-primary", accent: "border-l-ufo-blue" },
  { id: "sat-2", day: "Субота", time: "12:00–13:30", course: "3D моделювання", age: "7-10 років", teacher: "Станіслав", description: "Молодша група: знайомство з 3D-середовищем.", color: "bg-ufo-green/15 text-ufo-green", accent: "border-l-ufo-green" },
  { id: "sat-3", day: "Субота", time: "14:00–15:30", course: "Математика", age: "7-9 клас", teacher: "Валерія", description: "Підготовка до ДПА та поглиблене вивчення.", color: "bg-ufo-blue/15 text-primary", accent: "border-l-ufo-blue" },
];

const days = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

function SchedulePage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-ufo-cream text-center relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-ufo-yellow/30 blur-2xl" />
        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground">
            Наш <span className="text-primary">розклад</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Натисніть на заняття, щоб побачити деталі та одразу записатись.
          </p>
        </AnimatedSection>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          {days.map((day, dayIdx) => {
            const daySlots = slots.filter((s) => s.day === day);
            if (daySlots.length === 0) return null;
            return (
              <AnimatedSection key={day} delay={dayIdx * 0.04}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-ufo-yellow flex items-center justify-center shadow-md">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">{day}</h2>
                </div>
                <Accordion type="single" collapsible className="space-y-3">
                  {daySlots.map((slot) => (
                    <AccordionItem key={slot.id} value={slot.id} className="border-none">
                      <div className={`rounded-2xl bg-card border-l-4 ${slot.accent} border border-border shadow-sm hover:shadow-md transition-all overflow-hidden`}>
                        <AccordionTrigger className="px-5 py-4 hover:no-underline">
                          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-5 w-full text-left pr-2">
                            <div className="flex items-center gap-2 text-sm font-bold text-foreground shrink-0 min-w-[110px]">
                              <Clock className="h-4 w-4 text-primary" /> {slot.time}
                            </div>
                            <span className={`text-sm font-semibold rounded-full px-3 py-1 ${slot.color}`}>
                              {slot.course}
                            </span>
                            <span className="text-xs font-semibold text-muted-foreground bg-muted/60 rounded-full px-2.5 py-0.5">
                              {slot.age}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-5">
                          <div className="border-t border-border pt-4 space-y-4">
                            <p className="text-sm text-muted-foreground">{slot.description}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                                <Users className="h-4 w-4 text-primary" /> Викладач: <span className="font-semibold text-foreground">{slot.teacher}</span>
                              </span>
                            </div>
                            <Link
                              to="/contacts"
                              className="inline-flex items-center gap-2 rounded-full bg-ufo-yellow px-6 py-3 text-sm font-bold text-primary shadow-md hover:shadow-lg hover:scale-105 transition-all"
                            >
                              Записатись <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </AccordionContent>
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AnimatedSection>
            );
          })}
        </div>
      </section>
    </>
  );
}
