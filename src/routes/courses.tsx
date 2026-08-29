import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Beaker, Bot, Film, Calculator, PenTool, Cuboid, ArrowRight, BookOpen, Star } from "lucide-react";
import { motion } from "framer-motion";
import { openRegistration } from "@/components/RegistrationModal";
import { Star4, Dot, Squiggle, BlobShape } from "@/components/Blobs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Курси — UFO STEAM HUB" },
      { name: "description", content: "STEAM-гуртки, робототехніка, анімація, 3D моделювання та математика для дітей 6-14 років." },
      { property: "og:title", content: "Курси — UFO STEAM HUB" },
      { property: "og:description", content: "Наші освітні програми для дітей." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursesPage,
});

import steam1 from "@/assets/courses/steam1.jpg";
import steam2 from "@/assets/courses/steam2.jpg";
import steam3 from "@/assets/courses/steam3.jpg";

import robotics1 from "@/assets/courses/robotics1.jpg";
import robotics2 from "@/assets/courses/robotics2.jpg";
import robotics3 from "@/assets/courses/robotics3.jpg";

import animation1 from "@/assets/courses/animation1.jpg";
import animation2 from "@/assets/courses/animation2.jpg";
import animation3 from "@/assets/courses/animation3.jpg";

import mathmind1 from "@/assets/courses/mathmind1.jpg";
import mathmind2 from "@/assets/courses/mathmind2.jpg";
import mathmind3 from "@/assets/courses/mathmind3.jpg";

import math1 from "@/assets/courses/math1.jpg";
import math2 from "@/assets/courses/math2.jpg";
import math3 from "@/assets/courses/math3.jpg";

import modeling1 from "@/assets/courses/modeling1.jpg";
import modeling2 from "@/assets/courses/modeling2.jpg";
import modeling3 from "@/assets/courses/modeling3.jpg";

const courses = [
  {
    id: "steam",
    title: "STEAM-гурток", age: "7-12 років", price: "Вартість: 1500 грн/місяць",
    desc: "Щомісяця — нова тема: світло, магніти, вода, повітря, ґрунт. Діти досліджують явища через дослід, гру та власні проєкти.",
    details: "Заняття проходять у форматі досліджень та експериментів. Діти працюють у міні-групах, створюють проєкти та презентують свої відкриття.",
    plan: ["Вступ до теми місяця", "Експерименти та досліди", "Створення власного проєкту", "Презентація результатів"],
    features: ["Міні-групи до 6 дітей", "Усі матеріали включено", "Сертифікат після завершення"],
    gallery: [steam1, steam2, steam3],
    icon: Beaker, color: "border-l-ufo-blue", iconBg: "bg-ufo-blue/10", iconColor: "text-primary",
  },
  {
    id: "robotics",
    title: "Робототехніка", age: "6-12 років", price: "Вартість: 1800 грн/місяць",
    desc: "Конструювання, програмування та створення власних роботів.",
    details: "Від простих механізмів до програмованих роботів. Діти вивчають основи інженерії та алгоритмічного мислення.",
    plan: ["Основи конструювання", "Знайомство з датчиками", "Програмування рухів", "Змагання роботів"],
    features: ["Роботи LEGO та Arduino", "Індивідуальний підхід", "Участь у змаганнях"],
    gallery: [robotics1, robotics2, robotics3],
    icon: Bot, color: "border-l-ufo-green", iconBg: "bg-ufo-green/10", iconColor: "text-ufo-green",
  },
  {
    id: "animation",
    title: "Анімація і мультиплікація", age: "7-12 років", price: "Вартість: 1500 грн/місяць",
    desc: "Оживляємо своїх героїв — створюємо мультики від ідеї до анімації та озвучки.",
    details: "Діти придумують персонажів, малюють, анімують та озвучують — повний цикл створення мультфільму.",
    plan: ["Створення персонажів", "Розкадровка та сценарій", "Анімація кадрів", "Озвучка та монтаж"],
    features: ["Власний мультфільм", "Розвиток творчості", "Робота з планшетами"],
    gallery: [animation1, animation2, animation3],
    icon: Film, color: "border-l-ufo-pink", iconBg: "bg-ufo-pink/10", iconColor: "text-ufo-pink",
  },
  {
    id: "math-mind",
    title: "Math&mind", age: "2-6 клас", price: "Вартість: 1000 грн/місяць",
    desc: "Цікава математика, нестандартні задачі.",
    details: "Олімпіадна математика, логічні задачі, головоломки — розвиваємо математичне мислення через захоплення.",
    plan: ["Логічні задачі", "Олімпіадні завдання", "Математичні ігри", "Командні змагання"],
    features: ["Підготовка до олімпіад", "Розвиток логіки", "Ігровий формат"],
    gallery: [mathmind1, mathmind2, mathmind3],
    icon: Calculator, color: "border-l-ufo-yellow", iconBg: "bg-ufo-yellow/10", iconColor: "text-ufo-yellow",
  },
  {
    id: "math",
    title: "Математика", age: "1-11 клас", price: "Вартість: 1600 грн/місяць",
    desc: "Шкільна математика зрозуміло та ефективно.",
    details: "Допомагаємо розібратися зі шкільною програмою, заповнити пробіли та підготуватися до контрольних.",
    plan: ["Діагностика рівня", "Робота з пробілами", "Практика та закріплення", "Підготовка до контрольних"],
    features: ["Індивідуальна програма", "Зрозумілі пояснення", "Домашні завдання"],
    gallery: [math1, math2, math3],
    icon: PenTool, color: "border-l-ufo-blue", iconBg: "bg-ufo-blue/10", iconColor: "text-primary",
  },
  {
    id: "3d-modeling",
    title: "3D моделювання", age: "9-14 років", price: "Вартість: 1800 грн/місяць",
    desc: "Основи 3D друку, моделювання і ШІ.",
    details: "Діти створюють 3D-моделі, вивчають основи дизайну та друкують свої вироби на 3D-принтері.",
    plan: ["Знайомство з 3D-середовищем", "Створення простих моделей", "Складні об'єкти та текстури", "3D-друк власного виробу"],
    features: ["Друк на 3D-принтері", "Основи ШІ у дизайні", "Власний виріб додому"],
    gallery: [modeling1, modeling2, modeling3],
    icon: Cuboid, color: "border-l-ufo-green", iconBg: "bg-ufo-green/10", iconColor: "text-ufo-green",
  },
];

function CoursesPage() {
  const [lightbox, setLightbox] = useState<{
    title: string;
    images: string[];
    index: number;
  } | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const scroll = () => {
      const el = document.getElementById(hash);
      if (!el) return false;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      return true;
    };
    if (!scroll()) {
      const t = setTimeout(scroll, 300);
      return () => clearTimeout(t);
    }
  }, []);

  const openLightbox = (title: string, images: string[], index: number) => {
    setLightbox({ title, images, index });
  };

  const showPrevPhoto = () => {
    setLightbox((current) =>
      current
        ? { ...current, index: current.index === 0 ? current.images.length - 1 : current.index - 1 }
        : current
    );
  };

  const showNextPhoto = () => {
    setLightbox((current) =>
      current
        ? { ...current, index: current.index === current.images.length - 1 ? 0 : current.index + 1 }
        : current
    );
  };

  return (
    <>
      <section className="py-20 md:py-28 bg-ufo-cream text-center relative overflow-hidden">
        <Star4 className="absolute top-10 left-10" color="#f7df5d" size={50} />
        <Dot className="absolute top-24 right-20" color="#f04770" size={20} />
        <Squiggle className="absolute bottom-10 right-10 opacity-70" color="#17c590" size={130} />
        <BlobShape className="absolute -bottom-12 -left-12 opacity-25" color="#3056dd" size={200} />

        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground">
            Наші <span className="text-primary">курси</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Ми створили програми, які розвивають дітей через дослідження, творчість і технології.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="relative mx-auto max-w-3xl px-4 mt-8">
          <div className="flex flex-wrap justify-center gap-2">
            {courses.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full bg-card border border-border px-4 py-1.5 text-sm font-semibold text-foreground hover:bg-ufo-yellow hover:text-primary transition-colors"
              >
                {c.title}
              </a>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <div className="bg-background overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20 space-y-10 md:space-y-16">
          {courses.map((course, i) => {
            const gallery = course.gallery ?? [];
            const [main, ...rest] = gallery;

            return (
              <AnimatedSection key={course.id} delay={0.04}>
                <section
                  id={course.id}
                  className={`scroll-mt-24 rounded-3xl bg-card border border-border border-l-4 ${course.color} shadow-sm shadow-ufo-yellow/10 hover:shadow-xl transition-shadow overflow-hidden`}
                >
                  <div
                    className={`grid gap-6 p-5 sm:p-7 md:p-8 md:grid-cols-2 md:gap-10 items-start ${
                      i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Gallery */}
                    <div className="order-2 md:order-none">
                      {gallery.length ? (
                        <>
                          {/* mobile: swipe row */}
                          <div className="md:hidden -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
                            {gallery.map((src, n) => (
                              <button
                                key={`m-${course.id}-${n}`}
                                type="button"
                                onClick={() => openLightbox(course.title, gallery, n)}
                                className="h-44 w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-muted"
                                aria-label={`Відкрити фото ${n + 1} курсу ${course.title}`}
                              >
                                <img
                                  src={src}
                                  alt={`${course.title} фото ${n + 1}`}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </button>
                            ))}
                          </div>

                          {/* desktop: one big + small column */}
                          <div className="hidden md:grid grid-cols-3 gap-3">
                            <button
                              type="button"
                              onClick={() => openLightbox(course.title, gallery, 0)}
                              className="group col-span-2 h-64 overflow-hidden rounded-2xl border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                              aria-label={`Відкрити фото 1 курсу ${course.title}`}
                            >
                              <img
                                src={main}
                                alt={`${course.title} фото 1`}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                decoding="async"
                              />
                            </button>

                            <div className="flex h-64 flex-col gap-3">
                              {rest.slice(0, 2).map((src, n) => (
                                <button
                                  key={`d-${course.id}-${n}`}
                                  type="button"
                                  onClick={() => openLightbox(course.title, gallery, n + 1)}
                                  className="group min-h-0 flex-1 overflow-hidden rounded-2xl border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                                  aria-label={`Відкрити фото ${n + 2} курсу ${course.title}`}
                                >
                                  <img
                                    src={src}
                                    alt={`${course.title} фото ${n + 2}`}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Фото для цього курсу скоро з’являться.
                        </p>
                      )}
                    </div>

                    {/* Content */}
                    <div className="order-1 md:order-none min-w-0">
                      <div className="flex items-start gap-3">
                        <div className={`${course.iconBg} rounded-xl p-2.5 shrink-0`}>
                          <course.icon className={`h-6 w-6 md:h-7 md:w-7 ${course.iconColor}`} />
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                            {course.title}
                          </h2>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-0.5">
                              {course.age}
                            </span>
                            <span className="text-xs font-semibold text-ufo-green bg-ufo-green/10 rounded-full px-3 py-0.5">
                              {course.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 text-sm md:text-base text-muted-foreground">
                        {course.desc}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {course.details}
                      </p>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl bg-ufo-yellow/10 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-4 w-4 text-primary shrink-0" />
                            <h3 className="text-sm font-bold text-foreground">Що робимо</h3>
                          </div>
                          <ul className="space-y-1.5">
                            {course.plan.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-ufo-yellow text-primary text-[10px] flex items-center justify-center font-bold">
                                  {idx + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-2xl bg-ufo-green/10 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 text-ufo-green shrink-0" />
                            <h3 className="text-sm font-bold text-foreground">Особливості</h3>
                          </div>
                          <ul className="space-y-1.5">
                            {course.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="shrink-0 text-ufo-green mt-0.5">✓</span>
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() =>
                          openRegistration({
                            registrationType: "course",
                            sourcePage: "Сторінка курсів",
                            title: `Запис на пробний урок — ${course.title}`,
                            programName: course.title,
                            ageGroup: course.age,
                          })
                        }
                        className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ufo-yellow px-6 py-3 font-semibold text-primary shadow-lg hover:shadow-xl transition-all"
                      >
                        Записатись на пробний урок <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </section>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="text-center pb-20 px-4">
          <button
            type="button"
            onClick={() =>
              openRegistration({
                registrationType: "general",
                sourcePage: "Сторінка курсів",
                title: "Загальна заявка на пробний урок",
              })
            }
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ufo-yellow px-8 py-3.5 font-semibold text-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Записатись на пробний урок <ArrowRight className="h-4 w-4" />
          </button>
        </AnimatedSection>
      </div>

      <Dialog open={!!lightbox} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="max-w-5xl rounded-3xl p-3 sm:p-5 max-h-[90vh] overflow-y-auto">
          {lightbox && (
            <div className="space-y-4">
              <DialogTitle className="text-center text-base sm:text-lg font-semibold text-foreground">
                {lightbox.title} — фото {lightbox.index + 1} з {lightbox.images.length}
              </DialogTitle>

              <div className="relative overflow-hidden rounded-2xl bg-black/5">
                <img
                  src={lightbox.images[lightbox.index]}
                  alt={`${lightbox.title} фото ${lightbox.index + 1}`}
                  className="max-h-[70vh] w-full object-contain"
                  loading="eager"
                />

                {lightbox.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-xl font-bold text-primary shadow-md hover:bg-white"
                      aria-label="Попереднє фото"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={showNextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-xl font-bold text-primary shadow-md hover:bg-white"
                      aria-label="Наступне фото"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {lightbox.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {lightbox.images.map((src, n) => (
                    <button
                      key={`${src}-${n}`}
                      type="button"
                      onClick={() =>
                        setLightbox((current) => (current ? { ...current, index: n } : current))
                      }
                      className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 ${
                        lightbox.index === n ? "border-primary" : "border-transparent"
                      }`}
                      aria-label={`Показати фото ${n + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${lightbox.title} мініатюра ${n + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
