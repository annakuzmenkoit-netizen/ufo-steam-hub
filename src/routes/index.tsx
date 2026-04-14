import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Users, ShieldCheck, Lightbulb, Brain, Beaker, Bot, Film, Calculator, Cuboid, PenTool, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UFO STEAM HUB — Освіта на дотик" },
      { name: "description", content: "Дитячий освітній центр STEAM-освіти у Києві. Робототехніка, анімація, 3D моделювання та математика для дітей 6-14 років." },
      { property: "og:title", content: "UFO STEAM HUB — Освіта на дотик" },
      { property: "og:description", content: "Дитячий освітній центр STEAM-освіти у Києві." },
    ],
  }),
  component: HomePage,
});

const courses = [
  { title: "STEAM-гурток", age: "7-12 років", desc: "Щомісяця — нова тема: світло, магніти, вода, повітря, ґрунт. Діти досліджують явища через дослід, гру та власні проєкти.", icon: Beaker, color: "bg-ufo-blue" },
  { title: "Робототехніка", age: "6-12 років", desc: "Конструювання, програмування та створення власних роботів.", icon: Bot, color: "bg-ufo-green" },
  { title: "Анімація і мультиплікація", age: "7-12 років", desc: "Оживляємо своїх героїв — створюємо мультики від ідеї до анімації та озвучки.", icon: Film, color: "bg-ufo-pink" },
  { title: "Math&mind", age: "2-6 клас", desc: "Цікава математика, нестандартні задачі.", icon: Calculator, color: "bg-ufo-yellow" },
  { title: "Математика", age: "1-11 клас", desc: "Шкільна математика зрозуміло та ефективно.", icon: PenTool, color: "bg-ufo-blue" },
  { title: "3D моделювання", age: "7-14 років", desc: "Основи 3D друку, моделювання і ШІ.", icon: Cuboid, color: "bg-ufo-green" },
];

const features = [
  { title: "Групи дітей", desc: "Для дітей 6–14 років, у мінігрупах по 4–6 — увага кожному.", icon: Users },
  { title: "Безпечне навчання", desc: "Комфортний простір, турботлива команда — у нас завжди безпечно й світло.", icon: ShieldCheck },
  { title: "STEAM", desc: "Навчання через науку, технології, мистецтво й проєкти — цікаво і з сенсом.", icon: Lightbulb },
  { title: "Навички майбутнього", desc: "Критичне мислення, креативність та командна робота.", icon: Brain },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ufo-cream py-20 md:py-32">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-ufo-yellow/40 blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-ufo-blue/20 blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-ufo-pink/20 blur-xl" />
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-ufo-green/20 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-ufo-yellow/30 px-4 py-1.5 text-sm font-semibold text-foreground mb-6">
              <Sparkles className="h-4 w-4 text-ufo-pink" /> Дитячий освітній центр
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tight">
              UFO STEAM HUB
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-muted-foreground font-medium">
              Освіта на дотик
            </p>
            <p className="mt-4 max-w-xl mx-auto text-base text-muted-foreground">
              Місце, де діти відкривають науку, технології та мистецтво через гру, дослід та творчість.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contacts"
                className="rounded-full bg-ufo-pink px-8 py-3.5 text-base font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                Записатись на пробний урок <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/courses"
                className="rounded-full border-2 border-primary px-8 py-3.5 text-base font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Наші курси
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Наші програми</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Ми створили програми, які розвивають дітей через дослідження, творчість і технології. Обери напрям, що надихає твою дитину!
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <AnimatedSection key={course.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-xl transition-all h-full"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${course.color} text-white mb-4`}>
                    <course.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{course.title}</h3>
                  <span className="inline-block mt-1 text-xs font-semibold text-ufo-blue bg-ufo-blue/10 rounded-full px-3 py-0.5">
                    {course.age}
                  </span>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{course.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Що робить нас особливими</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Ми створили місце, де діти навчаються цікаво, безпечно та з увагою до кожного:
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="rounded-2xl bg-card border border-border p-6 text-center shadow-sm hover:shadow-lg transition-shadow h-full">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What is STEAM */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Що таке STEAM?</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                STEAM — це підхід до навчання, що поєднує науку (Science), технології (Technology), інженерію (Engineering), мистецтво (Art) та математику (Mathematics).
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Замість сухої теорії діти вчаться через реальні експерименти, проєкти та творчість. Це розвиває критичне мислення, креативність та здатність вирішувати задачі — навички, які знадобляться у будь-якій професії майбутнього.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Science", "Technology", "Engineering", "Art", "Mathematics"].map((item, i) => {
                  const colors = ["bg-ufo-blue", "bg-ufo-green", "bg-ufo-pink", "bg-ufo-yellow", "bg-primary"];
                  return (
                    <span key={item} className={`${colors[i]} text-white text-sm font-bold rounded-full px-4 py-2`}>
                      {item}
                    </span>
                  );
                })}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-ufo-blue/20 via-ufo-green/20 to-ufo-pink/20 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8">
                    <div className="w-24 h-24 rounded-2xl bg-ufo-blue/30 flex items-center justify-center"><Beaker className="h-10 w-10 text-primary" /></div>
                    <div className="w-24 h-24 rounded-2xl bg-ufo-green/30 flex items-center justify-center"><Bot className="h-10 w-10 text-ufo-green" /></div>
                    <div className="w-24 h-24 rounded-2xl bg-ufo-pink/30 flex items-center justify-center"><Film className="h-10 w-10 text-ufo-pink" /></div>
                    <div className="w-24 h-24 rounded-2xl bg-ufo-yellow/30 flex items-center justify-center"><Calculator className="h-10 w-10 text-ufo-yellow" /></div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-ufo-yellow" />
                <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-ufo-pink" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="rounded-2xl bg-muted/50 border border-border h-80 lg:h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MapPinPlaceholder />
                  <p className="mt-2 text-sm">Карта буде тут</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl font-bold text-foreground">Залишились питання?</h2>
              <p className="mt-2 text-muted-foreground">Напишіть нам — ми з радістю відповімо!</p>
              <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm font-medium text-foreground">Ім'я</label>
                  <Input placeholder="Ваше ім'я" className="mt-1 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Телефон</label>
                  <Input placeholder="+380..." className="mt-1 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Повідомлення</label>
                  <Textarea placeholder="Ваше повідомлення" className="mt-1 rounded-xl" rows={4} />
                </div>
                <Button className="rounded-full bg-ufo-pink hover:bg-ufo-pink/90 text-white px-8 py-3 font-semibold">
                  Відправити
                </Button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

function MapPinPlaceholder() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
