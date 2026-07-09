import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  CalendarDays, Star, Snowflake, Leaf, Sun, Flower2,
  Heart, Sparkles, Trees, Smartphone, Smile, ArrowRight,
  Rocket, Users2, Lightbulb, Compass, Handshake, Target,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { openRegistration } from "@/components/RegistrationModal";
import { Star4, Dot, Squiggle, BlobShape } from "@/components/Blobs";

export const Route = createFileRoute("/camps")({
  head: () => ({
    meta: [
      { title: "Табори — UFO STEAM HUB" },
      { name: "description", content: "STEAM-табори для дітей — літні школи, підліткові табори та сезонні програми." },
      { property: "og:title", content: "Табори — UFO STEAM HUB" },
      { property: "og:description", content: "Літні школи, підліткові табори та тематичні програми UFO STEAM HUB." },
    ],
  }),
  component: CampsPage,
});

const campRules = [
  { title: "Повага", icon: Heart, bg: "bg-ufo-pink/10", color: "text-ufo-pink", accent: "border-ufo-pink" },
  { title: "Самозарадність", icon: Sparkles, bg: "bg-ufo-blue/10", color: "text-primary", accent: "border-ufo-blue" },
  { title: "Гуляємо щодня", icon: Trees, bg: "bg-ufo-green/10", color: "text-ufo-green", accent: "border-ufo-green" },
  { title: "Без гаджетів", icon: Smartphone, bg: "bg-ufo-yellow/30", color: "text-primary", accent: "border-ufo-yellow" },
  { title: "Бу-бу-бу", icon: Smile, bg: "bg-ufo-pink/10", color: "text-ufo-pink", accent: "border-ufo-pink" },
];

const upcomingCamps = [
  {
    emoji: "🎬",
    date: "3–7 серпня",
    title: "Літня школа «Анімація»",
    desc: "Створення власних мультфільмів, персонажів і творчих історій.",
    color: "border-l-ufo-pink",
  },
  {
    emoji: "🖨",
    date: "11–14 серпня",
    title: "Літня школа «3D-моделювання»",
    desc: "Знайомство зі світом 3D-друку та створення власних моделей.",
    color: "border-l-ufo-green",
  },
  {
    emoji: "🤖",
    date: "17–21 серпня",
    title: "Літня школа «Робототехніка»",
    desc: "Конструювання, програмування та STEAM-виклики для юних винахідників.",
    color: "border-l-ufo-blue",
  },
  {
    emoji: "🧠",
    date: "25–27 серпня",
    title: "«Математичний інтенсив»",
    desc: "Цікава математика, логіка та практичні завдання.",
    color: "border-l-ufo-yellow",
  },
];

const seasons = [
  {
    key: "winter",
    name: "Зимовий",
    desc: "присвячуємо магії свят і пошуку світла в собі",
    icon: Snowflake,
    bg: "bg-ufo-blue",
    text: "text-white",
    accent: "bg-white/20",
    features: [
      "Новорічні майстерні та творчі проєкти",
      "Пошук світла та тепла у собі",
      "Історії, ігри та затишні активності",
      "Прогулянки та зимові пригоди",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1482330093321-90d1349b3a11?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    key: "autumn",
    name: "Осінній",
    desc: "енергія міста, табір для підлітків щоб полюбити себе і знайти себе у цьому місті",
    icon: Leaf,
    bg: "bg-ufo-pink",
    text: "text-white",
    accent: "bg-white/20",
    features: [
      "Формат для підлітків",
      "Дослідження міста та себе у ньому",
      "Творчі проєкти та самопізнання",
      "Спілкування з однолітками",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1444492696363-332accbd8bd3?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1476611317561-60117649dd94?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    key: "summer",
    name: "Літній",
    desc: "у ритмі з природою а також тематичні табори",
    icon: Sun,
    bg: "bg-ufo-yellow",
    text: "text-primary",
    accent: "bg-primary/15",
    features: [
      "Тематичні тижні протягом літа",
      "У ритмі з природою",
      "STEAM-експерименти на свіжому повітрі",
      "Прогулянки, ігри та відкриття щодня",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    key: "spring",
    name: "Весняний",
    desc: "детективні пригоди",
    icon: Flower2,
    bg: "bg-ufo-green",
    text: "text-white",
    accent: "bg-white/20",
    features: [
      "Детективні квести та розслідування",
      "Логіка, спостережливість, команда",
      "Пригоди у місті та на природі",
      "Творчі та наукові виклики",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1490718720478-364a07a997cd?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1471189060473-3e64c6c02b04?auto=format&fit=crop&w=700&q=80",
    ],
  },
];

const summerSchoolFeatures = [
  { title: "Короткі інтенсивні формати", icon: Rocket, bg: "bg-ufo-blue/10", color: "text-primary" },
  { title: "Практичні заняття щодня", icon: Sparkles, bg: "bg-ufo-yellow/30", color: "text-primary" },
  { title: "Власний результат наприкінці програми", icon: Star, bg: "bg-ufo-pink/10", color: "text-ufo-pink" },
  { title: "Творчість + технології", icon: Lightbulb, bg: "bg-ufo-green/10", color: "text-ufo-green" },
  { title: "Дружня атмосфера", icon: Smile, bg: "bg-ufo-pink/10", color: "text-ufo-pink" },
  { title: "Підходить для дітей, які хочуть спробувати новий напрям", icon: Compass, bg: "bg-ufo-blue/10", color: "text-primary" },
];

const teenCampFeatures = [
  { title: "Проєктна робота", icon: Target, bg: "bg-ufo-blue/10", color: "text-primary" },
  { title: "Командні челенджі", icon: Users2, bg: "bg-ufo-green/10", color: "text-ufo-green" },
  { title: "Технології та творчість", icon: Lightbulb, bg: "bg-ufo-yellow/30", color: "text-primary" },
  { title: "Самостійність і відповідальність", icon: Compass, bg: "bg-ufo-pink/10", color: "text-ufo-pink" },
  { title: "Спілкування з однолітками", icon: Handshake, bg: "bg-ufo-blue/10", color: "text-primary" },
  { title: "Практичний результат", icon: Star, bg: "bg-ufo-green/10", color: "text-ufo-green" },
];

const reviews = [
  { name: "Олена М.", text: "Дитина просто в захваті! Кожен день розповідала про нові відкриття. Дякуємо команді за турботу та креативність!" },
  { name: "Ігор К.", text: "Чудова організація, безпечна атмосфера. Син хоче повернутися знову!" },
  { name: "Марина С.", text: "Вперше бачила, щоб дитина сама просилася на заняття. Рекомендую всім батькам!" },
];

function CampsPage() {
  const [activeSeason, setActiveSeason] = useState<string>(seasons[0].key);

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-ufo-cream text-center relative overflow-hidden">
        <Star4 className="absolute top-10 left-10" color="#f7df5d" size={50} />
        <Dot className="absolute top-20 right-20" color="#f04770" size={20} />
        <Squiggle className="absolute bottom-10 right-10 opacity-70" color="#17c590" size={130} />
        <BlobShape className="absolute -bottom-12 -left-12 opacity-25" color="#3056dd" size={200} />
        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground">
            Наші <span className="text-ufo-pink">табори</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Канікули з користю — STEAM-табори UFO STEAM HUB, де діти відкривають нове, знаходять друзів та отримують незабутні враження.
          </p>
        </AnimatedSection>
      </section>

      {/* Правила нашого табору */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Правила <span className="text-primary">нашого табору</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Кілька простих орієнтирів, які роблять кожен день у таборі теплим і цікавим.</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {campRules.map((r, i) => (
              <AnimatedSection key={r.title} delay={i * 0.05}>
                <div className={`rounded-3xl bg-card border-2 ${r.accent} p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full`}>
                  <div className={`${r.bg} rounded-2xl w-14 h-14 mx-auto flex items-center justify-center mb-3`}>
                    <r.icon className={`h-7 w-7 ${r.color}`} strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{r.title}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Майбутні табори */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Майбутні <span className="text-primary">табори</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Найближчі літні школи та інтенсиви UFO STEAM HUB.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingCamps.map((camp, i) => (
              <AnimatedSection key={camp.title} delay={i * 0.08}>
                <div className={`rounded-3xl bg-card border-l-4 ${camp.color} border border-border p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col`}>
                  <div className="text-4xl mb-3" aria-hidden>{camp.emoji}</div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                    <CalendarDays className="h-4 w-4" /> {camp.date}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{camp.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{camp.desc}</p>
                  <button
                    type="button"
                    onClick={() => openRegistration(camp.title)}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ufo-yellow px-5 py-2.5 text-sm font-semibold text-primary shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                  >
                    Записатись <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Табори за сезонами — interactive */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Табори <span className="text-ufo-green">за сезонами</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Оберіть сезон, щоб побачити особливості та галерею.</p>
          </AnimatedSection>

          <Tabs value={activeSeason} onValueChange={setActiveSeason} className="w-full">
            <TabsList className="flex flex-wrap h-auto justify-center gap-2 bg-transparent p-0 mb-8">
              {seasons.map((s) => (
                <TabsTrigger
                  key={s.key}
                  value={s.key}
                  className="rounded-full border-2 border-border bg-card px-5 py-2 text-sm font-semibold text-foreground data-[state=active]:bg-ufo-yellow data-[state=active]:text-primary data-[state=active]:border-ufo-yellow data-[state=active]:shadow-md"
                >
                  <s.icon className="h-4 w-4 mr-2" /> {s.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {seasons.map((s) => (
              <TabsContent key={s.key} value={s.key} className="mt-0">
                <div className={`${s.bg} ${s.text} rounded-3xl p-6 md:p-8 shadow-lg`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${s.accent} rounded-2xl w-14 h-14 flex items-center justify-center shrink-0`}>
                      <s.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{s.name} табір</h3>
                      <p className="text-base opacity-95">{s.desc}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Особливості */}
                    <div className={`${s.accent} rounded-2xl p-5`}>
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Star className="h-5 w-5" /> Особливості
                      </h4>
                      <ul className="space-y-2">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm opacity-95">
                            <span className="shrink-0 mt-0.5">✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Галерея */}
                    <div className={`${s.accent} rounded-2xl p-5`}>
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5" /> Галерея
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {s.gallery.map((src, n) => (
                          <div key={n} className="aspect-square rounded-2xl overflow-hidden bg-white/10">
                            <img src={src} alt={`${s.name} — фото ${n + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Літні школи */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Літні <span className="text-ufo-pink">школи</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Літні школи UFO STEAM HUB — це короткі тематичні програми, де діти створюють власні проєкти, пробують нові технології, працюють у команді та навчаються через практику.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {summerSchoolFeatures.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.05}>
                <div className="rounded-3xl bg-card border-2 border-border p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full">
                  <div className={`${f.bg} rounded-2xl w-14 h-14 flex items-center justify-center mb-4`}>
                    <f.icon className={`h-7 w-7 ${f.color}`} strokeWidth={1.75} />
                  </div>
                  <p className="text-base font-semibold text-foreground">{f.title}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Підліткові табори */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Підліткові <span className="text-primary">табори</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Підліткові табори UFO STEAM HUB — це програми для старших дітей і підлітків, де більше самостійності, командної роботи, проєктного мислення, відповідальності та реальних викликів.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teenCampFeatures.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.05}>
                <div className="rounded-3xl bg-card border-2 border-border p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full">
                  <div className={`${f.bg} rounded-2xl w-14 h-14 flex items-center justify-center mb-4`}>
                    <f.icon className={`h-7 w-7 ${f.color}`} strokeWidth={1.75} />
                  </div>
                  <p className="text-base font-semibold text-foreground">{f.title}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <button
              type="button"
              onClick={() => openRegistration()}
              className="inline-flex items-center gap-2 rounded-full bg-ufo-yellow px-8 py-3.5 text-base font-semibold text-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Записатись у табір <ArrowRight className="h-4 w-4" />
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
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
