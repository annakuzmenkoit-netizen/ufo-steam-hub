import { createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CalendarDays, Star, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/camps")({
  head: () => ({
    meta: [
      { title: "Табори — UFO STEAM HUB" },
      { name: "description", content: "STEAM-табори для дітей — літні, зимові та тематичні програми." },
      { property: "og:title", content: "Табори — UFO STEAM HUB" },
      { property: "og:description", content: "Літні та тематичні STEAM-табори для дітей." },
    ],
  }),
  component: CampsPage,
});

const upcomingCamps = [
  { title: "Літній STEAM-табір", date: "Червень 2026", desc: "Два тижні досліджень, експериментів та пригод.", color: "border-ufo-blue" },
  { title: "Табір з робототехніки", date: "Липень 2026", desc: "Створюємо роботів та змагаємося у робо-баталіях.", color: "border-ufo-green" },
  { title: "Анімаційний табір", date: "Серпень 2026", desc: "Від ідеї до готового мультфільму за один тиждень.", color: "border-ufo-pink" },
];

const reviews = [
  { name: "Олена М.", text: "Дитина просто в захваті! Кожен день розповідала про нові відкриття. Дякуємо команді за турботу та креативність!" },
  { name: "Ігор К.", text: "Чудова організація, безпечна атмосфера. Син хоче повернутися знову!" },
  { name: "Марина С.", text: "Вперше бачила, щоб дитина сама просилася на заняття. Рекомендую всім батькам!" },
];

function CampsPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-ufo-cream text-center relative overflow-hidden">
        <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-ufo-pink/20 blur-xl" />
        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Табори</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Канікули з користю — STEAM-табори, де діти відкривають нове, знаходять друзів та отримують незабутні враження.
          </p>
        </AnimatedSection>
      </section>

      {/* Upcoming */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">Майбутні табори</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingCamps.map((camp, i) => (
              <AnimatedSection key={camp.title} delay={i * 0.1}>
                <div className={`rounded-2xl bg-card border-t-4 ${camp.color} border border-border p-6 shadow-sm hover:shadow-lg transition-shadow h-full`}>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                    <CalendarDays className="h-4 w-4" /> {camp.date}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{camp.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{camp.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">Фотогалерея</h2>
            <p className="mt-4 text-muted-foreground">Моменти з наших минулих таборів</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <AnimatedSection key={n} delay={n * 0.05}>
                <div className="aspect-square rounded-2xl bg-muted/50 border border-border flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">Відгуки батьків</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <AnimatedSection key={r.name} delay={i * 0.1}>
                <div className="rounded-2xl bg-card border border-border p-6 shadow-sm h-full">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-ufo-yellow text-ufo-yellow" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{r.text}"</p>
                  <p className="mt-4 text-sm font-semibold text-foreground">— {r.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
