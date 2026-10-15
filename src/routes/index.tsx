import { SectionDecor } from "@/components/SectionDecor";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Beaker, Bot, Film, Calculator, Cuboid, PenTool, Sparkles, ArrowRight, FlaskConical, Cpu, Wrench, Palette, Sigma, BookOpen, Star, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BlobShape, Squiggle, Star4, Dot } from "@/components/Blobs";
import { openRegistration } from "@/components/RegistrationModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UFO STEAM HUB — Освіта на дотик" },
      { name: "description", content: "Освітній центр STEAM-освіти у Кременчуці. Робототехніка, анімація, 3D моделювання та математика для дітей 6-14 років." },
      { property: "og:title", content: "UFO STEAM HUB — Освіта на дотик" },
      { property: "og:description", content: "Освітній центр STEAM-освіти у Кременчуці" },
    ],
  }),
  component: HomePage,
});

import heroPhoto from "@/assets/main.webp";
const HERO_PHOTO = heroPhoto;

const courses = [
  {
    title: "STEAM-гурток", age: "7-12 років",
    desc: "Щомісяця — нова тема: світло, магніти, вода, повітря, ґрунт.",
    details: "Діти досліджують явища через дослід, гру та власні проєкти. Заняття у міні-групах з акцентом на практику.",
    plan: ["Вступ до теми місяця", "Експерименти та досліди", "Створення власного проєкту", "Презентація результатів"],
    features: ["Міні-групи до 6 дітей", "Усі матеріали включено", "Сертифікат після завершення"],
    icon: Beaker, accent: "border-ufo-blue", iconBg: "bg-ufo-blue/10", iconColor: "text-primary",
    photo: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Робототехніка", age: "6-12 років",
    desc: "Конструювання, програмування та створення власних роботів.",
    details: "Від простих механізмів до програмованих роботів. Вивчаємо основи інженерії та алгоритмічного мислення.",
    plan: ["Основи конструювання", "Знайомство з датчиками", "Програмування рухів", "Змагання роботів"],
    features: ["Роботи LEGO та Arduino", "Індивідуальний підхід", "Участь у змаганнях"],
    icon: Bot, accent: "border-ufo-green", iconBg: "bg-ufo-green/10", iconColor: "text-ufo-green",
    photo: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Анімація і мультиплікація", age: "7-12 років",
    desc: "Оживляємо своїх героїв — створюємо мультики від ідеї до озвучки.",
    details: "Діти придумують персонажів, малюють, анімують та озвучують — повний цикл створення мультфільму.",
    plan: ["Створення персонажів", "Розкадровка та сценарій", "Анімація кадрів", "Озвучка та монтаж"],
    features: ["Власний мультфільм", "Розвиток творчості", "Робота з планшетами"],
    icon: Film, accent: "border-ufo-pink", iconBg: "bg-ufo-pink/10", iconColor: "text-ufo-pink",
    photo: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Math&mind", age: "2-6 клас",
    desc: "Цікава математика, нестандартні задачі.",
    details: "Олімпіадна математика, логічні задачі, головоломки — розвиваємо математичне мислення через захоплення.",
    plan: ["Логічні задачі", "Олімпіадні завдання", "Математичні ігри", "Командні змагання"],
    features: ["Підготовка до олімпіад", "Розвиток логіки", "Ігровий формат"],
    icon: Calculator, accent: "border-ufo-yellow", iconBg: "bg-ufo-yellow/30", iconColor: "text-primary",
    photo: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Математика", age: "1-11 клас",
    desc: "Шкільна математика зрозуміло та ефективно.",
    details: "Допомагаємо розібратися зі шкільною програмою, заповнити пробіли та підготуватися до контрольних.",
    plan: ["Діагностика рівня", "Робота з пробілами", "Практика та закріплення", "Підготовка до контрольних"],
    features: ["Індивідуальна програма", "Зрозумілі пояснення", "Домашні завдання"],
    icon: PenTool, accent: "border-ufo-blue", iconBg: "bg-ufo-blue/10", iconColor: "text-primary",
    photo: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "3D моделювання", age: "7-14 років",
    desc: "Основи 3D друку, моделювання і ШІ.",
    details: "Діти створюють 3D-моделі, вивчають основи дизайну та друкують свої вироби на 3D-принтері.",
    plan: ["Знайомство з 3D-середовищем", "Створення простих моделей", "Складні об'єкти та текстури", "3D-друк власного виробу"],
    features: ["Друк на 3D-принтері", "Основи ШІ у дизайні", "Власний виріб додому"],
    icon: Cuboid, accent: "border-ufo-green", iconBg: "bg-ufo-green/10", iconColor: "text-ufo-green",
    photo: "https://images.unsplash.com/photo-1631544114551-d4cfd9577c41?auto=format&fit=crop&w=600&q=80",
  },
];

import groups from "@/assets/groups.webp";
import steam from "@/assets/steam.webp";
import future from "@/assets/future.webp";
import space from "@/assets/space.webp";

const features = [
  { title: "Міні-групи", desc: "Для дітей 6–14 років, по 4–6 — увага кожному.", photo: groups },
  { title: "Безпечне навчання", desc: "Комфортний простір та турботлива команда.", photo: space },
  { title: "STEAM підхід", desc: "Наука, технології, мистецтво й проєкти — з сенсом.", photo: steam },
  { title: "Навички майбутнього", desc: "Критичне мислення, креативність та командна робота.", photo: future },
];

const steamBlocks = [
  { letter: "S", word: "Science", desc: "Дослідження та експерименти", icon: FlaskConical, bg: "bg-ufo-blue", text: "text-white" },
  { letter: "T", word: "Technology", desc: "Сучасні технології та цифрові навички", icon: Cpu, bg: "bg-ufo-green", text: "text-white" },
  { letter: "E", word: "Engineering", desc: "Конструювання та інженерне мислення", icon: Wrench, bg: "bg-ufo-pink", text: "text-white" },
  { letter: "A", word: "Art", desc: "Творчість, дизайн і мистецтво", icon: Palette, bg: "bg-ufo-yellow", text: "text-primary" },
  { letter: "M", word: "Mathematics", desc: "Логіка, числа та закономірності", icon: Sigma, bg: "bg-primary", text: "text-white" },
];

const blobA = "polygon(35% 5%, 65% 8%, 90% 25%, 95% 55%, 80% 85%, 50% 95%, 20% 88%, 5% 60%, 8% 30%)";

function HomePage() {
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});

  const scrollToPrograms = () => {
    const el = document.getElementById("programs");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Hero */}
      <section className="home-hero relative overflow-hidden pt-10 pb-10 md:py-20">
        <Star4 className="absolute top-6 left-4 md:top-10 md:left-6 opacity-90" color="#f7df5d" size={40} />
        <Dot className="absolute top-24 left-1/3 opacity-80 hidden md:block" color="#f04770" size={18} />
        <BlobShape className="absolute -bottom-10 -left-12 opacity-30" color="#17c590" size={220} />
        <Squiggle className="absolute top-16 right-6 md:top-20 md:right-16 opacity-80" color="#f7df5d" size={90} />
        <Star4 className="absolute bottom-16 right-1/4 opacity-80 hidden md:block" color="#f04770" size={36} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-ufo-yellow px-3 py-1 text-[11px] md:text-sm font-semibold text-primary mb-4 md:mb-6 shadow-md">
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-ufo-pink" />
                <span className="md:hidden">UFO STEAM HUB · Кременчук</span>
                <span className="hidden md:inline">UFO STEAM HUB — освітній центр у Кременчуці</span>
              </div>
              <h1 className="home-hero__title font-extrabold tracking-tight">
                Освіта<br />на <span className="home-hero__highlight">дотик</span>
              </h1>
              <p className="mt-3 md:mt-6 max-w-lg mx-auto lg:mx-0 home-hero__description text-base leading-relaxed md:text-lg">
                Діти 6–14 років відкривають науку, технології та мистецтво через гру та творчість.
              </p>
              <div className="mt-5 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 sm:justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => openRegistration()}
                  className="brand-button min-h-12 rounded-full bg-ufo-yellow px-6 py-3 md:px-8 md:py-3.5 text-base font-bold text-primary inline-flex items-center justify-center gap-2"
                >
                  Хочу спробувати <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/courses"
                  className="home-hero__secondary min-h-12 rounded-full border-2 px-6 py-3 md:px-8 md:py-3.5 text-base font-bold transition-colors text-center"
                >
                  Наші курси
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium text-white/90 lg:justify-start">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ufo-green" />6–14 років</span>
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ufo-yellow" />Міні-групи 4–6 дітей</span>
              </div>
            </div>

            <div className="home-hero__photo relative mx-auto w-full max-w-[320px] sm:max-w-sm md:max-w-md aspect-[4/3] lg:aspect-square">
              <div className="absolute inset-0 bg-ufo-yellow" style={{ clipPath: blobA }} />
              <ResponsiveImage
                src={HERO_PHOTO}
                alt="Логотип UFO, створений із конструктора"
                className="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] object-cover"
                style={{ clipPath: blobA }}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 448px, (min-width: 640px) 384px, 320px"
                decoding="async"
              />
              <Star4 className="absolute -top-3 -right-3 md:-top-4 md:-right-4" color="#f7df5d" size={40} />
              <Dot className="absolute -bottom-2 -left-2" color="#17c590" size={32} />
            </div>
          </div>

          {/* Mobile scroll-down cue */}
          <div className="md:hidden flex justify-center mt-6">
            <button
              type="button"
              onClick={scrollToPrograms}
              aria-label="Прокрутити вниз"
              className="h-11 w-11 rounded-full border border-white/40 text-white flex items-center justify-center"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="brand-ribbon" aria-label="STEAM: наука, технології, інженерія, мистецтво, математика">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-4 text-xs font-bold sm:text-sm">
          {["Наука", "Технології", "Інженерія", "Мистецтво", "Математика"].map((label) => (
            <span key={label} className="inline-flex items-center gap-3"><Star className="h-3 w-3 shrink-0" fill="currentColor" />{label}</span>
          ))}
        </div>
      </div>

      {/* Mini-courses announcement — self-contained, no Lovable component dependency */}
      <section aria-labelledby="mini-courses-heading" className="section-art relative overflow-hidden bg-ufo-cream py-12 md:py-20">
        <SectionDecor tone="mint" side="right" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
            <span className="inline-flex rounded-full bg-ufo-yellow px-4 py-2 text-xs font-bold text-primary shadow-sm md:text-sm">
              Новий набір · Листопад 2026
            </span>
            <h2 id="mini-courses-heading" className="mt-4 text-3xl font-semibold text-foreground md:text-5xl">
              Старт нових <span className="text-primary">мінікурсів!</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-lg">
              Чотири заняття, щоб спробувати новий напрям, створити власний проєкт і отримати яскраві враження.
            </p>
            <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-ufo-pink/30 bg-white px-4 py-3 shadow-sm">
              <span className="text-xl font-extrabold text-ufo-pink md:text-2xl">−20%</span>
              <span className="text-sm font-semibold text-foreground md:text-base">за запис до 31 жовтня 2026 року</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
            <article className="feature-card flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ufo-pink/40 bg-white p-6 shadow-md md:p-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-ufo-pink/15 px-3 py-1 text-xs font-semibold text-foreground">Анімація</span>
                <span className="text-4xl" aria-hidden="true">🎭</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground md:text-3xl">Театр тіней</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                Діти вигадають власну історію, створять персонажів і декорації та оживлять їх за допомогою світла й тіней.
              </p>
              <div className="mt-5 space-y-2 rounded-2xl bg-ufo-pink/10 p-4 text-sm font-semibold text-foreground">
                <p>📅 Старт: 12 листопада 2026, четвер</p>
                <p>🕞 Час: 15:30</p>
                <p>✨ Тривалість: 4 заняття</p>
              </div>
              <button
                type="button"
                onClick={() => openRegistration({
                  registrationType: "course",
                  sourcePage: "Головна — мінікурси",
                  title: "Запис на мінікурс «Театр тіней»",
                  program: "Театр тіней — анімація",
                  date: "12.11.2026",
                  time: "15:30",
                  additionalInfo: "4 заняття. Знижка 20% за запис до 31.10.2026",
                })}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ufo-pink px-5 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
              >
                Записатися на мінікурс <ArrowRight className="h-4 w-4" />
              </button>
            </article>

            <article className="feature-card flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ufo-green/40 bg-white p-6 shadow-md md:p-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-ufo-green/15 px-3 py-1 text-xs font-semibold text-foreground">Робототехніка</span>
                <span className="text-4xl" aria-hidden="true">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground md:text-3xl">Космічна експедиція</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                Діти створюватимуть космічні конструкції, досліджуватимуть роботу механізмів і виконуватимуть цікаві інженерні завдання.
              </p>
              <div className="mt-5 space-y-2 rounded-2xl bg-ufo-green/10 p-4 text-sm font-semibold text-foreground">
                <p>📅 Старт: 13 листопада 2026, п’ятниця</p>
                <p>🕞 Час: 15:30</p>
                <p>✨ Тривалість: 4 заняття</p>
              </div>
              <button
                type="button"
                onClick={() => openRegistration({
                  registrationType: "course",
                  sourcePage: "Головна — мінікурси",
                  title: "Запис на мінікурс «Космічна експедиція»",
                  program: "Космічна експедиція — робототехніка",
                  date: "13.11.2026",
                  time: "15:30",
                  additionalInfo: "4 заняття. Знижка 20% за запис до 31.10.2026",
                })}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ufo-green px-5 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
              >
                Записатися на мінікурс <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="programs" className="section-art relative py-12 md:py-20 bg-background overflow-hidden">
        <SectionDecor tone="sun" side="left" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-5xl font-semibold text-foreground">
              Наші <span className="text-primary">програми</span>
            </h2>
            <p className="mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground">
              Оберіть напрям, який зацікавить вашу дитину
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {courses.map((course, index) => {
              const expanded = !!expandedCourses[course.title];
              return (
                <article key={course.title} className={`program-card self-start rounded-3xl bg-card border-2 ${course.accent} p-5 md:p-6 shadow-sm`}>
                  <div className="flex items-start gap-3">
                    <div className={`${course.iconBg} rounded-2xl w-12 h-12 shrink-0 flex items-center justify-center`}>
                      <course.icon className={`h-6 w-6 ${course.iconColor}`} strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-primary">{course.age}</span>
                      <h3 className="mt-1 text-lg font-semibold leading-tight">{course.title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{course.desc}</p>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`program-details-${index}`}
                    onClick={() => setExpandedCourses((state) => ({ ...state, [course.title]: !expanded }))}
                    className="mt-2 flex min-h-11 w-full items-center justify-between gap-2 text-sm font-semibold text-primary"
                  >
                    {expanded ? "Згорнути опис" : "Детальніше про курс"}
                    <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                  </button>
                  <div id={`program-details-${index}`} hidden={!expanded}>
                    <p className="border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">{course.details}</p>
                    <p className="mt-3 rounded-xl bg-ufo-green/10 px-3 py-2 text-sm">
                      <Star className="mr-1 inline h-4 w-4 text-ufo-green" />{course.features[0]}
                    </p>
                    <button type="button" onClick={() => openRegistration(course.title)} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ufo-yellow px-4 py-3 text-sm font-semibold text-primary">
                      Хочу спробувати <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>


      {/* Why Us — real photos in blob frames */}
      <section className="section-art relative py-12 md:py-20 bg-ufo-cream overflow-hidden">
        <SectionDecor tone="rose" side="right" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8 md:mb-14">
            <h2 className="text-2xl md:text-5xl font-semibold text-foreground">
              Що робить нас <span className="text-ufo-pink">особливими</span>
            </h2>
            <p className="mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground">
              Місце, де діти навчаються цікаво, безпечно та з увагою до кожного.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="relative mx-auto w-24 h-24 md:w-40 md:h-40 mb-3 md:mb-5">
                    <div className="absolute inset-0 bg-ufo-yellow shadow-md" style={{ clipPath: blobA }} />
                    <ResponsiveImage
                      src={f.photo}
                      sizes="(min-width: 768px) 160px, 96px"
                      alt={f.title}
                      className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] object-cover"
                      style={{ clipPath: blobA }}
                    />
                  </div>
                  <h3 className="font-semibold text-sm md:text-lg text-foreground">{f.title}</h3>
                  <p className="mt-1 md:mt-2 text-xs md:text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What is STEAM */}
      <section className="section-art relative py-12 md:py-20 bg-ufo-yellow overflow-hidden">
        <SectionDecor tone="blue" side="left" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-6 md:mb-14 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-5xl font-semibold text-foreground">
              Що таке <span className="text-primary">STEAM</span>?
            </h2>
            <p className="mt-2 md:mt-6 text-sm md:text-base text-muted-foreground leading-relaxed">
              Підхід, що поєднує науку, технології, інженерію, мистецтво та математику.
            </p>
          </AnimatedSection>

          {/* Mobile: compact list; Desktop: full cards */}
          <div className="md:hidden grid grid-cols-1 gap-2">
            {steamBlocks.map((block) => (
              <div
                key={block.letter}
                className={`${block.bg} ${block.text} rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm`}
              >
                <span className="text-2xl font-semibold leading-none w-7 text-center shrink-0">{block.letter}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-tight">{block.word}</p>
                  <p className="text-xs opacity-90 leading-tight mt-0.5">{block.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {steamBlocks.map((block, i) => (
              <AnimatedSection key={block.letter} delay={i * 0.08}>
                <div
                  className={`${block.bg} ${block.text} rounded-3xl p-6 h-full shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center text-center`}
                >
                  <div className="text-6xl font-semibold opacity-90 leading-none">{block.letter}</div>
                  <div className="mt-3 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20">
                    <block.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 font-semibold text-lg">{block.word}</p>
                  <p className="mt-2 text-sm opacity-90">{block.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* Map + Contact */}
      <section className="section-art py-12 md:py-20 bg-ufo-cream">
        <SectionDecor tone="mint" side="right" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-5xl font-semibold text-foreground">
              Де нас <span className="text-ufo-green">знайти</span>
            </h2>
            <p className="mt-2 md:mt-4 text-sm md:text-base text-muted-foreground">м. Кременчук, ТЦ "Лідер", каб. 208</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <AnimatedSection>
              <div className="rounded-3xl overflow-hidden border-4 border-ufo-yellow shadow-xl h-64 md:h-80 lg:h-full lg:min-h-[400px]">
                <iframe
                  title="UFO STEAM HUB на карті"
                  src="https://www.google.com/maps?q=%D0%A2%D0%A6+%D0%9B%D1%96%D0%B4%D0%B5%D1%80+%D0%9A%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%87%D1%83%D0%BA&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="rounded-3xl bg-card border-2 border-border p-7 shadow-md">
                <h3 className="text-2xl font-semibold text-foreground">Залишились питання?</h3>
                <p className="mt-2 text-muted-foreground">Напишіть нам — ми з радістю відповімо!</p>
                <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); openRegistration(); }}>
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
                  <Button className="rounded-full bg-ufo-yellow hover:bg-ufo-yellow/90 text-primary px-8 py-6 font-semibold shadow-md hover:shadow-lg w-full sm:w-auto">
                    Відправити
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
