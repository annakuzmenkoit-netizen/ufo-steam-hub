import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Beaker, Bot, Film, Calculator, Cuboid, PenTool, Sparkles, ArrowRight, FlaskConical, Cpu, Wrench, Palette, Sigma, BookOpen, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BlobShape, Squiggle, Star4, Dot, Swirl } from "@/components/Blobs";

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

const HERO_PHOTO = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80";

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

const features = [
  { title: "Міні-групи", desc: "Для дітей 6–14 років, по 4–6 — увага кожному.", photo: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=500&q=80" },
  { title: "Безпечне навчання", desc: "Комфортний простір та турботлива команда.", photo: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=500&q=80" },
  { title: "STEAM підхід", desc: "Наука, технології, мистецтво й проєкти — з сенсом.", photo: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=500&q=80" },
  { title: "Навички майбутнього", desc: "Критичне мислення, креативність та командна робота.", photo: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=500&q=80" },
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
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ufo-cream py-16 md:py-24">
        {/* Flat SVG decorations — no blur */}
        <Star4 className="absolute top-10 left-6 opacity-90" color="#f7df5d" size={56} />
        <Dot className="absolute top-32 left-1/3 opacity-80" color="#f04770" size={18} />
        <BlobShape className="absolute -bottom-10 -left-12 opacity-30" color="#17c590" size={220} />
        <Squiggle className="absolute top-20 right-16 opacity-80" color="#3056dd" size={140} />
        <Star4 className="absolute bottom-16 right-1/4 opacity-80" color="#f04770" size={36} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-ufo-yellow px-4 py-1.5 text-sm font-bold text-primary mb-6 shadow-md">
                <Sparkles className="h-4 w-4 text-ufo-pink" /> Освітній центр у Кременчуці
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[1.05]">
                Освіта на <span className="text-primary">дотик</span>,<br />
                де <span className="text-ufo-pink">наука</span> стає<br />
                <span className="text-ufo-green">пригодою</span>
              </h1>
              <p className="mt-6 max-w-lg text-base md:text-lg text-muted-foreground">
                Місце, де діти 6–14 років відкривають науку, технології та мистецтво через гру, дослід та творчість.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contacts"
                  className="rounded-full bg-ufo-yellow px-8 py-3.5 text-base font-bold text-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
                >
                  Записатись на пробний урок <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/courses"
                  className="rounded-full border-2 border-primary px-8 py-3.5 text-base font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all text-center"
                >
                  Наші курси
                </Link>
              </div>
            </motion.div>

            {/* Hero blob with real photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto w-full max-w-md aspect-square"
            >
              <div className="absolute inset-0 bg-ufo-yellow" style={{ clipPath: blobA }} />
              <img
                src={HERO_PHOTO}
                alt="Щасливі діти на занятті"
                className="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] object-cover"
                style={{ clipPath: blobA }}
              />
              {/* Floating flat accents */}
              <Star4 className="absolute -top-4 -right-4" color="#f7df5d" size={64} />
              <Dot className="absolute -bottom-2 -left-2" color="#17c590" size={48} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="relative py-20 bg-background overflow-hidden">
        <Squiggle className="absolute top-10 left-8 opacity-60" color="#17c590" size={120} />
        <Star4 className="absolute top-20 right-10 opacity-80" color="#f7df5d" size={48} />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-foreground">
              Наші <span className="text-primary">програми</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Натисніть на курс, щоб дізнатися більше про програму.
            </p>
          </AnimatedSection>

          <Accordion type="single" collapsible className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {courses.map((course, i) => (
              <AnimatedSection key={course.title} delay={i * 0.05}>
                <AccordionItem value={course.title} className="border-none">
                  <div className={`rounded-3xl bg-card border-2 ${course.accent} shadow-md hover:shadow-xl transition-all overflow-hidden`}>
                    <AccordionTrigger className="px-5 py-5 hover:no-underline group">
                      <div className="flex items-center gap-4 w-full text-left pr-2">
                        <img
                          src={course.photo}
                          alt={course.title}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0 shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base md:text-lg font-bold text-foreground leading-tight">{course.title}</h3>
                          <span className="inline-block mt-1 text-[11px] font-bold text-primary bg-ufo-yellow/40 rounded-full px-2.5 py-0.5">
                            {course.age}
                          </span>
                          <p className="mt-2 text-xs md:text-sm text-muted-foreground line-clamp-2">{course.desc}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5">
                      <div className="border-t border-border pt-4 space-y-4">
                        <p className="text-sm text-muted-foreground">{course.details}</p>
                        <div className="rounded-2xl bg-ufo-yellow/15 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <h4 className="font-bold text-sm text-foreground">План навчання</h4>
                          </div>
                          <ol className="space-y-1.5">
                            {course.plan.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <span className="shrink-0 w-4 h-4 rounded-full bg-ufo-yellow text-primary text-[10px] flex items-center justify-center font-bold mt-0.5">{idx + 1}</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="rounded-2xl bg-ufo-green/10 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 text-ufo-green" />
                            <h4 className="font-bold text-sm text-foreground">Особливості</h4>
                          </div>
                          <ul className="space-y-1.5">
                            {course.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <span className="shrink-0 text-ufo-green mt-0.5">✓</span>
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Link
                          to="/contacts"
                          className="inline-flex items-center gap-2 rounded-full bg-ufo-yellow px-5 py-2.5 text-sm font-bold text-primary shadow-md hover:shadow-lg hover:scale-105 transition-all"
                        >
                          Записатись <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </AnimatedSection>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Why Us — real photos in blob frames */}
      <section className="relative py-20 bg-ufo-cream overflow-hidden">
        <Swirl className="absolute top-12 right-10 opacity-70" color="#f04770" size={90} />
        <Star4 className="absolute bottom-10 left-8 opacity-80" color="#f7df5d" size={50} />
        <Dot className="absolute top-1/3 left-12 opacity-70" color="#17c590" size={20} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-foreground">
              Що робить нас <span className="text-ufo-pink">особливими</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Місце, де діти навчаються цікаво, безпечно та з увагою до кожного.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="relative mx-auto w-40 h-40 mb-5">
                    <div className="absolute inset-0 bg-ufo-yellow shadow-md" style={{ clipPath: blobA }} />
                    <img
                      src={f.photo}
                      alt={f.title}
                      className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] object-cover"
                      style={{ clipPath: blobA }}
                    />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What is STEAM */}
      <section className="relative py-20 bg-background overflow-hidden">
        <Squiggle className="absolute top-10 left-1/4 opacity-60" color="#f7df5d" size={140} />
        <Star4 className="absolute bottom-20 right-12 opacity-80" color="#f04770" size={44} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-foreground">
              Що таке <span className="text-primary">STEAM</span>?
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Це підхід до навчання, що поєднує науку, технології, інженерію, мистецтво та математику в єдиний захоплюючий процес.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {steamBlocks.map((block, i) => (
              <AnimatedSection key={block.letter} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8, rotate: -1 }}
                  className={`${block.bg} ${block.text} rounded-3xl p-6 h-full shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center text-center`}
                >
                  <div className="text-6xl font-black opacity-90 leading-none">{block.letter}</div>
                  <div className="mt-3 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20">
                    <block.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 font-bold text-lg">{block.word}</p>
                  <p className="mt-2 text-sm opacity-90">{block.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Contact */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-foreground">
              Де нас <span className="text-ufo-green">знайти</span>
            </h2>
            <p className="mt-4 text-muted-foreground">м. Кременчук, ТЦ "Лідер", каб. 208</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="rounded-3xl overflow-hidden border-4 border-ufo-yellow shadow-xl h-80 lg:h-full min-h-[400px]">
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
                <h3 className="text-2xl font-bold text-foreground">Залишились питання?</h3>
                <p className="mt-2 text-muted-foreground">Напишіть нам — ми з радістю відповімо!</p>
                <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-sm font-semibold text-foreground">Ім'я</label>
                    <Input placeholder="Ваше ім'я" className="mt-1 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground">Телефон</label>
                    <Input placeholder="+380..." className="mt-1 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground">Повідомлення</label>
                    <Textarea placeholder="Ваше повідомлення" className="mt-1 rounded-xl" rows={4} />
                  </div>
                  <Button className="rounded-full bg-ufo-yellow hover:bg-ufo-yellow/90 text-primary px-8 py-6 font-bold shadow-md hover:shadow-lg w-full sm:w-auto">
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
