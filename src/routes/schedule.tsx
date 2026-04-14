import { createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Розклад — UFO STEAM HUB" },
      { name: "description", content: "Розклад занять UFO STEAM HUB — знайдіть зручний час для вашої дитини." },
      { property: "og:title", content: "Розклад — UFO STEAM HUB" },
      { property: "og:description", content: "Розклад занять дитячого освітнього центру." },
    ],
  }),
  component: SchedulePage,
});

const days = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

const schedule: Record<string, { time: string; course: string; color: string }[]> = {
  "Понеділок": [
    { time: "15:00–16:30", course: "STEAM-гурток (7-9)", color: "bg-ufo-blue/20 text-primary" },
    { time: "17:00–18:30", course: "Робототехніка (6-9)", color: "bg-ufo-green/20 text-ufo-green" },
  ],
  "Вівторок": [
    { time: "15:00–16:30", course: "Анімація (7-10)", color: "bg-ufo-pink/20 text-ufo-pink" },
    { time: "17:00–18:30", course: "Math&mind (3-4 кл)", color: "bg-ufo-yellow/20 text-foreground" },
  ],
  "Середа": [
    { time: "15:00–16:30", course: "Математика (5-6 кл)", color: "bg-ufo-blue/20 text-primary" },
    { time: "17:00–18:30", course: "3D моделювання (10-14)", color: "bg-ufo-green/20 text-ufo-green" },
  ],
  "Четвер": [
    { time: "15:00–16:30", course: "STEAM-гурток (10-12)", color: "bg-ufo-blue/20 text-primary" },
    { time: "17:00–18:30", course: "Робототехніка (10-12)", color: "bg-ufo-green/20 text-ufo-green" },
  ],
  "П'ятниця": [
    { time: "15:00–16:30", course: "Анімація (10-12)", color: "bg-ufo-pink/20 text-ufo-pink" },
    { time: "17:00–18:30", course: "Math&mind (5-6 кл)", color: "bg-ufo-yellow/20 text-foreground" },
  ],
  "Субота": [
    { time: "10:00–11:30", course: "STEAM-гурток (7-9)", color: "bg-ufo-blue/20 text-primary" },
    { time: "12:00–13:30", course: "3D моделювання (7-10)", color: "bg-ufo-green/20 text-ufo-green" },
    { time: "14:00–15:30", course: "Математика (7-9 кл)", color: "bg-ufo-blue/20 text-primary" },
  ],
};

function SchedulePage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-ufo-cream text-center">
        <AnimatedSection className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Розклад</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Оберіть зручний час для занять вашої дитини
          </p>
        </AnimatedSection>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Desktop table */}
          <div className="hidden md:block">
            <AnimatedSection>
              <div className="rounded-2xl border border-border overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="px-6 py-4 text-left text-sm font-semibold">День</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Час</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Курс</th>
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((day) =>
                      schedule[day].map((slot, j) => (
                        <tr key={`${day}-${j}`} className="border-t border-border hover:bg-muted/30 transition-colors">
                          {j === 0 && (
                            <td className="px-6 py-4 text-sm font-semibold text-foreground align-top" rowSpan={schedule[day].length}>
                              {day}
                            </td>
                          )}
                          <td className="px-6 py-4 text-sm text-muted-foreground">{slot.time}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-block text-sm font-medium rounded-full px-3 py-1 ${slot.color}`}>
                              {slot.course}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </AnimatedSection>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-6">
            {days.map((day, i) => (
              <AnimatedSection key={day} delay={i * 0.05}>
                <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
                  <h3 className="font-bold text-foreground mb-3">{day}</h3>
                  <div className="space-y-3">
                    {schedule[day].map((slot, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-24 shrink-0">{slot.time}</span>
                        <span className={`text-xs font-medium rounded-full px-3 py-1 ${slot.color}`}>
                          {slot.course}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
