import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Beaker, Bot, Film, Calculator, PenTool, Cuboid, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Курси — UFO STEAM HUB" },
      { name: "description", content: "STEAM-гуртки, робототехніка, анімація, 3D моделювання та математика для дітей 6-14 років." },
      { property: "og:title", content: "Курси — UFO STEAM HUB" },
      { property: "og:description", content: "Наші освітні програми для дітей." },
    ],
  }),
  component: CoursesPage,
});

const courses = [
  {
    title: "STEAM-гурток",
    age: "7-12 років",
    desc: "Щомісяця — нова тема: світло, магніти, вода, повітря, ґрунт. Діти досліджують явища через дослід, гру та власні проєкти.",
    details: "Заняття проходять у форматі досліджень та експериментів. Діти працюють у міні-групах, створюють проєкти та презентують свої відкриття.",
    icon: Beaker,
    color: "border-ufo-blue",
    bg: "bg-ufo-blue/10",
    iconColor: "text-primary",
  },
  {
    title: "Робототехніка",
    age: "6-12 років",
    desc: "Конструювання, програмування та створення власних роботів.",
    details: "Від простих механізмів до програмованих роботів. Діти вивчають основи інженерії та алгоритмічного мислення.",
    icon: Bot,
    color: "border-ufo-green",
    bg: "bg-ufo-green/10",
    iconColor: "text-ufo-green",
  },
  {
    title: "Анімація і мультиплікація",
    age: "7-12 років",
    desc: "Оживляємо своїх героїв — створюємо мультики від ідеї до анімації та озвучки.",
    details: "Діти придумують персонажів, малюють, анімують та озвучують — повний цикл створення мультфільму.",
    icon: Film,
    color: "border-ufo-pink",
    bg: "bg-ufo-pink/10",
    iconColor: "text-ufo-pink",
  },
  {
    title: "Math&mind",
    age: "2-6 клас",
    desc: "Цікава математика, нестандартні задачі.",
    details: "Олімпіадна математика, логічні задачі, головоломки — розвиваємо математичне мислення через захоплення.",
    icon: Calculator,
    color: "border-ufo-yellow",
    bg: "bg-ufo-yellow/10",
    iconColor: "text-ufo-yellow",
  },
  {
    title: "Математика",
    age: "1-11 клас",
    desc: "Шкільна математика зрозуміло та ефективно.",
    details: "Допомагаємо розібратися зі шкільною програмою, заповнити пробіли та підготуватися до контрольних.",
    icon: PenTool,
    color: "border-ufo-blue",
    bg: "bg-ufo-blue/10",
    iconColor: "text-primary",
  },
  {
    title: "3D моделювання",
    age: "7-14 років",
    desc: "Основи 3D друку, моделювання і ШІ.",
    details: "Діти створюють 3D-моделі, вивчають основи дизайну та друкують свої вироби на 3D-принтері.",
    icon: Cuboid,
    color: "border-ufo-green",
    bg: "bg-ufo-green/10",
    iconColor: "text-ufo-green",
  },
];

function CoursesPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-ufo-cream text-center relative overflow-hidden">
        <div className="absolute top-10 left-20 w-24 h-24 rounded-full bg-ufo-blue/20 blur-xl" />
        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Наші курси</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Ми створили програми, які розвивають дітей через дослідження, творчість і технології.
          </p>
        </AnimatedSection>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          {courses.map((course, i) => (
            <AnimatedSection key={course.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`rounded-2xl bg-card border-l-4 ${course.color} border border-border p-6 md:p-8 shadow-sm hover:shadow-xl transition-all`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className={`${course.bg} rounded-xl p-3 shrink-0`}>
                    <course.icon className={`h-8 w-8 ${course.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-foreground">{course.title}</h2>
                      <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-0.5">{course.age}</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">{course.desc}</p>
                    <p className="mt-2 text-sm text-muted-foreground/80">{course.details}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-14">
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 rounded-full bg-ufo-pink px-8 py-3.5 font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Записатись на пробний урок <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
