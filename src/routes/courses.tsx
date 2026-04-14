import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Beaker, Bot, Film, Calculator, PenTool, Cuboid, ArrowRight, Camera, BookOpen, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    title: "STEAM-гурток", age: "7-12 років", price: "Вартість: 1200 грн/місяць",
    desc: "Щомісяця — нова тема: світло, магніти, вода, повітря, ґрунт. Діти досліджують явища через дослід, гру та власні проєкти.",
    details: "Заняття проходять у форматі досліджень та експериментів. Діти працюють у міні-групах, створюють проєкти та презентують свої відкриття.",
    plan: ["Вступ до теми місяця", "Експерименти та досліди", "Створення власного проєкту", "Презентація результатів"],
    features: ["Міні-групи до 6 дітей", "Усі матеріали включено", "Сертифікат після завершення"],
    icon: Beaker, color: "border-l-ufo-blue", iconBg: "bg-ufo-blue/10", iconColor: "text-primary",
  },
  {
    title: "Робототехніка", age: "6-12 років", price: "Вартість: 1400 грн/місяць",
    desc: "Конструювання, програмування та створення власних роботів.",
    details: "Від простих механізмів до програмованих роботів. Діти вивчають основи інженерії та алгоритмічного мислення.",
    plan: ["Основи конструювання", "Знайомство з датчиками", "Програмування рухів", "Змагання роботів"],
    features: ["Роботи LEGO та Arduino", "Індивідуальний підхід", "Участь у змаганнях"],
    icon: Bot, color: "border-l-ufo-green", iconBg: "bg-ufo-green/10", iconColor: "text-ufo-green",
  },
  {
    title: "Анімація і мультиплікація", age: "7-12 років", price: "Вартість: 1300 грн/місяць",
    desc: "Оживляємо своїх героїв — створюємо мультики від ідеї до анімації та озвучки.",
    details: "Діти придумують персонажів, малюють, анімують та озвучують — повний цикл створення мультфільму.",
    plan: ["Створення персонажів", "Розкадровка та сценарій", "Анімація кадрів", "Озвучка та монтаж"],
    features: ["Власний мультфільм", "Розвиток творчості", "Робота з планшетами"],
    icon: Film, color: "border-l-ufo-pink", iconBg: "bg-ufo-pink/10", iconColor: "text-ufo-pink",
  },
  {
    title: "Math&mind", age: "2-6 клас", price: "Вартість: 1000 грн/місяць",
    desc: "Цікава математика, нестандартні задачі.",
    details: "Олімпіадна математика, логічні задачі, головоломки — розвиваємо математичне мислення через захоплення.",
    plan: ["Логічні задачі", "Олімпіадні завдання", "Математичні ігри", "Командні змагання"],
    features: ["Підготовка до олімпіад", "Розвиток логіки", "Ігровий формат"],
    icon: Calculator, color: "border-l-ufo-yellow", iconBg: "bg-ufo-yellow/10", iconColor: "text-ufo-yellow",
  },
  {
    title: "Математика", age: "1-11 клас", price: "Вартість: 800 грн/місяць",
    desc: "Шкільна математика зрозуміло та ефективно.",
    details: "Допомагаємо розібратися зі шкільною програмою, заповнити пробіли та підготуватися до контрольних.",
    plan: ["Діагностика рівня", "Робота з пробілами", "Практика та закріплення", "Підготовка до контрольних"],
    features: ["Індивідуальна програма", "Зрозумілі пояснення", "Домашні завдання"],
    icon: PenTool, color: "border-l-ufo-blue", iconBg: "bg-ufo-blue/10", iconColor: "text-primary",
  },
  {
    title: "3D моделювання", age: "7-14 років", price: "Вартість: 1500 грн/місяць",
    desc: "Основи 3D друку, моделювання і ШІ.",
    details: "Діти створюють 3D-моделі, вивчають основи дизайну та друкують свої вироби на 3D-принтері.",
    plan: ["Знайомство з 3D-середовищем", "Створення простих моделей", "Складні об'єкти та текстури", "3D-друк власного виробу"],
    features: ["Друк на 3D-принтері", "Основи ШІ у дизайні", "Власний виріб додому"],
    icon: Cuboid, color: "border-l-ufo-green", iconBg: "bg-ufo-green/10", iconColor: "text-ufo-green",
  },
];

function CoursesPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-ufo-cream text-center relative overflow-hidden">
        <div className="absolute top-10 left-20 w-24 h-24 rounded-full bg-ufo-yellow/20 blur-xl" />
        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Наші курси</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Ми створили програми, які розвивають дітей через дослідження, творчість і технології.
          </p>
        </AnimatedSection>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {courses.map((course, i) => (
              <AnimatedSection key={course.title} delay={i * 0.06}>
                <AccordionItem value={course.title} className="border-none">
                  <motion.div
                    whileHover={{ scale: 1.005 }}
                    className={`rounded-2xl bg-card border-l-4 ${course.color} border border-border shadow-sm shadow-ufo-yellow/10 hover:shadow-xl transition-all overflow-hidden`}
                  >
                    <AccordionTrigger className="px-6 md:px-8 py-6 hover:no-underline">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 w-full text-left pr-4">
                        <div className={`${course.iconBg} rounded-xl p-3 shrink-0 self-start`}>
                          <course.icon className={`h-8 w-8 ${course.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-xl font-bold text-foreground">{course.title}</h2>
                            <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-0.5">{course.age}</span>
                          </div>
                          <p className="mt-1 text-muted-foreground text-sm">{course.desc}</p>
                          <p className="mt-2 text-base font-bold text-ufo-pink">{course.price}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 md:px-8 pb-8">
                      <div className="border-t border-border pt-6 space-y-8">
                        <p className="text-muted-foreground">{course.details}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="rounded-xl bg-ufo-yellow/10 p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <BookOpen className="h-5 w-5 text-primary" />
                              <h3 className="font-bold text-foreground">План навчання</h3>
                            </div>
                            <ol className="space-y-2">
                              {course.plan.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="shrink-0 w-5 h-5 rounded-full bg-ufo-yellow text-primary text-xs flex items-center justify-center font-bold mt-0.5">{idx + 1}</span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div className="rounded-xl bg-ufo-green/10 p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <Star className="h-5 w-5 text-ufo-green" />
                              <h3 className="font-bold text-foreground">Особливості курсу</h3>
                            </div>
                            <ul className="space-y-2">
                              {course.features.map((feat, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="shrink-0 text-ufo-green mt-0.5">✓</span>
                                  {feat}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Camera className="h-5 w-5 text-ufo-pink" />
                            <h3 className="font-bold text-foreground">Фотогалерея</h3>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map((n) => (
                              <div key={n} className="aspect-video rounded-xl bg-muted/50 border border-border flex items-center justify-center text-xs text-muted-foreground">
                                Фото {n}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </motion.div>
                </AccordionItem>
              </AnimatedSection>
            ))}
          </Accordion>
        </div>

        <AnimatedSection className="text-center mt-14">
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 rounded-full bg-ufo-yellow px-8 py-3.5 font-bold text-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Записатись на пробний урок <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
