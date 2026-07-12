import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Star4, Dot, Squiggle, BlobShape } from "@/components/Blobs";
import { Home, BookOpen, Tent, Calendar, Phone, Instagram, Facebook, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "UFO STEAM HUB — швидкі посилання" },
      { name: "description", content: "Швидка сторінка UFO STEAM HUB для Instagram: табори, курси, розклад, контакти та запис на заняття для дітей у Кременчуці." },
      { property: "og:title", content: "UFO STEAM HUB — курси, табори та STEAM-заняття для дітей" },
      { property: "og:description", content: "Обирайте табір, курс або пробне заняття в UFO STEAM HUB." },
      { property: "og:url", content: "https://ufo.in.ua/links" },
    ],
    links: [{ rel: "canonical", href: "https://ufo.in.ua/links" }],
  }),
  component: LinksPage,
});

const navLinks = [
  { to: "/", label: "Головна", icon: Home },
  { to: "/courses", label: "Курси", icon: BookOpen },
  { to: "/camps", label: "Табори", icon: Tent },
  { to: "/schedule", label: "Розклад", icon: Calendar },
  { to: "/contacts", label: "Контакти", icon: Phone },
] as const;

const upcomingCamps = [
  {
    emoji: "🎬",
    title: "Літня школа «Анімація»",
    dates: "3–7 серпня",
    desc: "Створення власних мультфільмів, персонажів і творчих історій.",
    slug: "animation",
    accent: "border-t-ufo-pink",
  },
  {
    emoji: "🧊",
    title: "Літня школа «3D-моделювання»",
    dates: "11–14 серпня",
    desc: "Знайомство зі світом 3D-друку та створення власних моделей.",
    slug: "3d",
    accent: "border-t-ufo-mint",
  },
  {
    emoji: "🤖",
    title: "Літня школа «Робототехніка»",
    dates: "17–21 серпня",
    desc: "Конструювання, програмування та STEAM-виклики для юних винахідників.",
    slug: "robotics",
    accent: "border-t-primary",
  },
  {
    emoji: "🧮",
    title: "Математичний інтенсив",
    dates: "25–27 серпня",
    desc: "Цікава математика, логіка та практичні завдання.",
    slug: "math",
    accent: "border-t-ufo-yellow",
  },
];

const courses = [
  { emoji: "🤖", title: "Робототехніка", desc: "Конструювання, програмування, MakerZoid і перші інженерні виклики." },
  { emoji: "🧊", title: "3D-друк та моделювання", desc: "Від ідеї до власної 3D-моделі та готового об'єкта." },
  { emoji: "🧠", title: "MATH&mind", desc: "Логіка, нестандартні задачі, головоломки й математичне мислення." },
  { emoji: "📐", title: "Математика", desc: "Підтягування шкільної програми, пояснення складного простими словами." },
  { emoji: "🎬", title: "Анімація і мультиплікація", desc: "Персонажі, історії, розкадрування та власні мультфільми." },
];

function LinksPage() {
  return (
    <div className="bg-ufo-cream">
      {/* Top branded header */}
      <section className="relative overflow-hidden pt-10 pb-8 md:pt-14 md:pb-12">
        <Star4 className="absolute top-6 left-4" color="#f7df5d" size={40} />
        <Dot className="absolute top-10 right-6" color="#f04770" size={16} />
        <Squiggle className="absolute bottom-2 right-4 opacity-70" color="#17c590" size={90} />
        <BlobShape className="absolute -bottom-8 -left-10 opacity-20" color="#3056dd" size={160} />

        <AnimatedSection className="relative mx-auto max-w-xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-md">
            <span className="text-2xl font-bold text-primary tracking-tight">UFO STEAM HUB</span>
          </div>
          <p className="mt-4 text-base md:text-lg font-semibold text-foreground">
            STEAM-простір для дітей у Кременчуці
          </p>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Курси, табори, літні школи, робототехніка, 3D-друк, математика та творчі технології для дітей.
          </p>
        </AnimatedSection>
      </section>

      {/* Nav buttons */}
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-xl">
          <div className="grid grid-cols-2 gap-3">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-4 text-base font-semibold text-foreground shadow-sm border border-border/50 hover:bg-ufo-yellow/20 hover:border-ufo-yellow transition-colors"
              >
                <Icon className="h-5 w-5 text-primary" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Camps carousel */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Найближчі табори</h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Обирайте тематичну зміну та залишайте заявку — ми зв'яжемося з вами для уточнення деталей.
          </p>
        </div>

        <div className="mt-5 -mx-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4 px-4 pb-3">
            {upcomingCamps.map((c) => (
              <div
                key={c.slug}
                className={`snap-start shrink-0 w-[78%] sm:w-72 rounded-2xl bg-white shadow-md border-t-4 ${c.accent} p-5 flex flex-col`}
              >
                <div className="text-4xl">{c.emoji}</div>
                <div className="mt-2 text-xs font-semibold text-primary uppercase tracking-wide">{c.dates}</div>
                <h3 className="mt-1 text-lg font-bold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{c.desc}</p>
                <Link
                  to="/camps"
                  search={{ camp: c.slug } as never}
                  className="mt-4 inline-flex items-center justify-center gap-1 rounded-full bg-ufo-pink px-4 py-2.5 text-sm font-semibold text-white hover:bg-ufo-pink/90 transition-colors"
                >
                  Записатися <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Гуртки та курси</h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Регулярні заняття для дітей, які хочуть створювати, досліджувати, мислити й пробувати нові технології.
          </p>

          <div className="mt-5 space-y-3">
            {courses.map((c) => (
              <div key={c.title} className="rounded-2xl bg-white shadow-sm border border-border/50 p-4 flex gap-3">
                <div className="text-3xl shrink-0">{c.emoji}</div>
                <div>
                  <h3 className="font-bold text-foreground">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/courses"
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Переглянути всі курси <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-xl rounded-2xl bg-primary text-primary-foreground p-6 md:p-8 shadow-md relative overflow-hidden">
          <Star4 className="absolute top-3 right-3 opacity-40" color="#f7df5d" size={40} />
          <h2 className="text-xl md:text-2xl font-bold">Хочете підібрати заняття для дитини?</h2>
          <p className="mt-2 text-sm md:text-base text-primary-foreground/85">
            Напишіть нам — допоможемо обрати курс, табір або пробне заняття відповідно до віку й інтересів дитини.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-ufo-yellow text-foreground hover:bg-ufo-yellow/90 rounded-full font-semibold">
              <Link to="/contacts">Зв'язатися з нами</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full font-semibold bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link to="/schedule">Переглянути розклад</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer block */}
      <section className="px-4 pt-6 pb-12">
        <div className="mx-auto max-w-xl text-center">
          <div className="text-lg font-bold text-primary">UFO STEAM HUB</div>
          <div className="mt-1 text-sm text-muted-foreground">Кременчук · STEAM-освіта для дітей</div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/ufo.steam.hub/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-full bg-white shadow-sm border border-border/50 hover:bg-ufo-yellow/30 transition-colors"
            >
              <Instagram className="h-5 w-5 text-primary" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61560801226427"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2.5 rounded-full bg-white shadow-sm border border-border/50 hover:bg-ufo-yellow/30 transition-colors"
            >
              <Facebook className="h-5 w-5 text-primary" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
