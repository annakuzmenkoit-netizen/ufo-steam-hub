import { createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CalendarDays, Star, Snowflake, Leaf, Sun, Flower2 } from "lucide-react";

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
  { title: "Літній STEAM-табір", date: "Червень 2026", desc: "Два тижні досліджень, експериментів та пригод.", color: "border-l-ufo-blue" },
  { title: "Табір з робототехніки", date: "Липень 2026", desc: "Створюємо роботів та змагаємося у робо-баталіях.", color: "border-l-ufo-green" },
  { title: "Анімаційний табір", date: "Серпень 2026", desc: "Від ідеї до готового мультфільму за один тиждень.", color: "border-l-ufo-pink" },
];

const seasons = [
  {
    name: "Зимовий",
    desc: "присвячуємо магії свят і пошуку світла в собі",
    icon: Snowflake,
    bg: "bg-ufo-blue",
    text: "text-white",
    accent: "bg-white/20",
  },
  {
    name: "Осінній",
    desc: "енергія міста, табір для підлітків щоб полюбити себе і знайти себе у цьому місті",
    icon: Leaf,
    bg: "bg-ufo-pink",
    text: "text-white",
    accent: "bg-white/20",
  },
  {
    name: "Літній",
    desc: "у ритмі з природою а також тематичні табори",
    icon: Sun,
    bg: "bg-ufo-yellow",
    text: "text-primary",
    accent: "bg-primary/15",
  },
  {
    name: "Весняний",
    desc: "детективні пригоди",
    icon: Flower2,
    bg: "bg-ufo-green",
    text: "text-white",
    accent: "bg-white/20",
  },
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
        <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-ufo-yellow/30 blur-2xl" />
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-ufo-green/20 blur-xl" />
        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-black text-foreground">
            Наші <span className="text-ufo-pink">табори</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Канікули з користю — STEAM-табори, де діти відкривають нове, знаходять друзів та отримують незабутні враження.
          </p>
        </AnimatedSection>
      </section>

      {/* Upcoming */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Майбутні <span className="text-primary">табори</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingCamps.map((camp, i) => (
              <AnimatedSection key={camp.title} delay={i * 0.1}>
                <div className={`rounded-3xl bg-card border-l-4 ${camp.color} border border-border p-6 shadow-md hover:shadow-xl transition-shadow h-full`}>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
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

      {/* Past camps — seasonal */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Минулі <span className="text-ufo-green">табори за сезонами</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Кожен сезон — нова тема, нові пригоди, нові відкриття.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {seasons.map((s, i) => {
              const seasonPhotos: Record<string, string> = {
                "Зимовий": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&q=80",
                "Осінній": "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=700&q=80",
                "Літній":  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=700&q=80",
                "Весняний":"https://images.unsplash.com/photo-1490718720478-364a07a997cd?auto=format&fit=crop&w=700&q=80",
              };
              return (
                <AnimatedSection key={s.name} delay={i * 0.1}>
                  <div className={`${s.bg} ${s.text} rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all h-full flex flex-col`}>
                    <div className="flex items-center gap-4">
                      <div className={`${s.accent} rounded-2xl w-14 h-14 flex items-center justify-center shrink-0`}>
                        <s.icon className="h-7 w-7" />
                      </div>
                      <h3 className="text-2xl font-black">{s.name}</h3>
                    </div>
                    <p className="mt-4 text-base leading-relaxed opacity-95">{s.desc}</p>
                    <div className="mt-5 rounded-2xl overflow-hidden aspect-[16/9]">
                      <img src={seasonPhotos[s.name]} alt={`${s.name} табір`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Фотогалерея</h2>
            <p className="mt-4 text-muted-foreground">Моменти з наших таборів</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80",
              "https://images.unsplash.com/photo-1564429097439-e4ffafb0c40b?auto=format&fit=crop&w=500&q=80",
              "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&w=500&q=80",
              "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&w=500&q=80",
              "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=500&q=80",
              "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=500&q=80",
              "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80",
              "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=500&q=80",
            ].map((src, n) => (
              <AnimatedSection key={n} delay={n * 0.05}>
                <div className="aspect-square rounded-2xl overflow-hidden border-2 border-border hover:border-ufo-yellow transition-colors">
                  <img src={src} alt={`Галерея ${n + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Відгуки <span className="text-ufo-pink">батьків</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <AnimatedSection key={r.name} delay={i * 0.1}>
                <div className="rounded-3xl bg-card border-2 border-border p-6 shadow-md hover:shadow-lg transition-shadow h-full">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-ufo-yellow text-ufo-yellow" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{r.text}"</p>
                  <p className="mt-4 text-sm font-bold text-foreground">— {r.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
