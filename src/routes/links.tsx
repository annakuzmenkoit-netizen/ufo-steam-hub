import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Star4, Dot, Squiggle } from "@/components/Blobs";
import { openRegistration } from "@/components/RegistrationModal";
import { Home, BookOpen, Tent, Calendar, Phone, Instagram, Facebook, ArrowRight, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "UFO STEAM HUB — швидкі посилання" },
      { name: "description", content: "Швидка сторінка UFO STEAM HUB для Instagram: табори, курси, розклад, контакти та запис на заняття для дітей у Кременчуці." },
      { property: "og:title", content: "UFO STEAM HUB — курси, табори та STEAM-заняття для дітей" },
      { property: "og:description", content: "Обирайте табір, курс або пробне заняття в UFO STEAM HUB." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

const mathIntensive = {
  emoji: "🧮",
  title: "Інтенсив з математики",
  dates: "25–27 серпня",
  age: "7–12 років",
  description: "Цікава математика, логіка та практичні завдання — три насичені дні.",
};

const courses = [
  { emoji: "🤖", title: "Робототехніка", desc: "Конструювання, програмування, MakerZoid і перші інженерні виклики." },
  { emoji: "🧊", title: "3D-друк та моделювання", desc: "Від ідеї до власної 3D-моделі та готового об'єкта." },
  { emoji: "🧠", title: "MATH&mind", desc: "Логіка, нестандартні задачі, головоломки й математичне мислення." },
  { emoji: "📐", title: "Математика", desc: "Підтягування шкільної програми, пояснення складного простими словами." },
  { emoji: "🎬", title: "Анімація і мультиплікація", desc: "Персонажі, історії, розкадрування та власні мультфільми." },
];

function LinksPage() {
  return (
    <div className="bg-ufo-cream overflow-x-hidden">
      <div className="mx-auto w-full max-w-md px-4 py-6 md:max-w-2xl md:py-12 space-y-6">
        {/* Hero */}
        <AnimatedSection className="relative text-center">
          <Star4 className="pointer-events-none absolute -top-2 -left-1 opacity-70" color="#f7df5d" size={28} />
          <Dot className="pointer-events-none absolute top-0 -right-1 opacity-70" color="#f04770" size={12} />
          <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-md">
            <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">UFO STEAM HUB</span>
          </div>
          <h1 className="mt-3 text-2xl md:text-3xl font-semibold text-foreground">
            STEAM-простір для дітей у Кременчуці
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Курси, табори, робототехніка, 3D-друк, математика та творчі технології.
          </p>
        </AnimatedSection>

        {/* Highlighted offer */}
        <section>
          <div className="relative overflow-hidden rounded-2xl border-2 border-ufo-yellow bg-white p-4 shadow-md">
            <Squiggle className="pointer-events-none absolute -bottom-2 -right-2 opacity-20" color="#17c590" size={72} />
            <div className="relative flex items-start gap-3">
              <div className="text-3xl shrink-0">{mathIntensive.emoji}</div>
              <div className="min-w-0">
                <span className="inline-block rounded-full bg-ufo-pink px-2.5 py-0.5 text-xs font-semibold text-white">
                  Актуально
                </span>
                <h2 className="mt-1.5 text-lg font-semibold text-foreground">{mathIntensive.title}</h2>
                <p className="text-xs font-semibold text-primary">
                  {mathIntensive.dates} · {mathIntensive.age}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{mathIntensive.description}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                openRegistration({
                  registrationType: "course",
                  sourcePage: "Links — математичний інтенсив",
                  title: "Запис на математичний інтенсив",
                  program: "Математичний інтенсив",
                  date: mathIntensive.dates,
                  age: mathIntensive.age,
                  additionalInfo: mathIntensive.description,
                })
              }
              className="relative mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-ufo-yellow px-4 py-3.5 text-base font-semibold text-primary shadow-sm transition-colors hover:bg-ufo-yellow/90 active:bg-ufo-yellow/80"
            >
              Записатись на математичний інтенсив
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </section>

        {/* Nav links */}
        <section className="space-y-3">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border border-border/50 bg-white px-4 py-3.5 text-base font-semibold text-foreground shadow-sm transition-colors hover:bg-ufo-yellow/20 hover:border-ufo-yellow active:bg-ufo-yellow/30"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="truncate">{label}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </section>

        {/* Courses */}
        <section>
          <h2 className="text-lg font-semibold text-foreground">Гуртки та курси</h2>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Регулярні заняття для дітей, які хочуть створювати, досліджувати й пробувати нові технології.
          </p>

          <div className="mt-3 space-y-3">
            {courses.map((c) => (
              <div key={c.title} className="flex gap-3 rounded-2xl border border-border/50 bg-white p-4 shadow-sm">
                <div className="text-2xl shrink-0">{c.emoji}</div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/courses"
            className="mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:bg-primary/80"
          >
            Переглянути всі курси <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </section>

        {/* Contact CTA */}
        <section className="relative overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground shadow-md">
          <Star4 className="pointer-events-none absolute top-2 right-2 opacity-30" color="#f7df5d" size={32} />
          <h2 className="relative text-lg font-semibold">Хочете підібрати заняття для дитини?</h2>
          <p className="relative mt-1.5 text-sm text-primary-foreground/85 leading-relaxed">
            Напишіть нам — допоможемо обрати курс, табір або пробне заняття.
          </p>
          <div className="relative mt-4 space-y-3">
            <Link
              to="/contacts"
              className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-ufo-yellow px-4 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-ufo-yellow/90"
            >
              Зв'язатися з нами
            </Link>
            <Link
              to="/schedule"
              className="flex min-h-14 w-full items-center justify-center rounded-2xl border border-white/80 px-4 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-primary"
            >
              Переглянути розклад
            </Link>
          </div>
        </section>

        {/* Footer block */}
        <section className="pb-[env(safe-area-inset-bottom)] text-center">
          <div className="text-base font-semibold text-primary">UFO STEAM HUB</div>
          <div className="mt-1 text-xs text-muted-foreground">Кременчук · STEAM-освіта для дітей</div>
          <div className="mt-3 flex items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/ufo.steam.hub/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-border/50 bg-white p-3 shadow-sm transition-colors hover:bg-ufo-yellow/30"
            >
              <Instagram className="h-5 w-5 text-primary" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61560801226427"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-border/50 bg-white p-3 shadow-sm transition-colors hover:bg-ufo-yellow/30"
            >
              <Facebook className="h-5 w-5 text-primary" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
