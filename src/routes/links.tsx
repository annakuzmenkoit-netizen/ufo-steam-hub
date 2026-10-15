import { SectionDecor } from "@/components/SectionDecor";

import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Star4, Dot } from "@/components/Blobs";
import { EnrollmentAnnouncement } from "@/components/EnrollmentAnnouncement";
import {
  Home,
  BookOpen,
  Tent,
  Calendar,
  Phone,
  Instagram,
  Facebook,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      {
        title: "UFO STEAM HUB — швидкі посилання",
      },
      {
        name: "description",
        content:
          "Швидка сторінка UFO STEAM HUB для Instagram: табори, курси, розклад, контакти та запис на заняття для дітей у Кременчуці.",
      },
      {
        property: "og:title",
        content:
          "UFO STEAM HUB — курси, табори та STEAM-заняття для дітей",
      },
      {
        property: "og:description",
        content:
          "Обирайте табір, курс або пробне заняття в UFO STEAM HUB.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "og:url",
        content: "https://ufo.in.ua/links",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://ufo.in.ua/links",
      },
    ],
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

const courses = [
  {
    emoji: "🤖",
    title: "Робототехніка",
    desc: "Конструювання, програмування, MakerZoid і перші інженерні виклики.",
  },
  {
    emoji: "🧊",
    title: "3D-друк та моделювання",
    desc: "Від ідеї до власної 3D-моделі та готового об'єкта.",
  },
  {
    emoji: "🧠",
    title: "MATH&mind",
    desc: "Логіка, нестандартні задачі, головоломки й математичне мислення.",
  },
  {
    emoji: "📐",
    title: "Математика",
    desc: "Підтягування шкільної програми, пояснення складного простими словами.",
  },
  {
    emoji: "🎬",
    title: "Анімація і мультиплікація",
    desc: "Персонажі, історії, розкадрування та власні мультфільми.",
  },
];

function LinksPage() {
  return (
    <div className="section-art min-h-screen bg-ufo-cream">
      <SectionDecor tone="blue" side="left" />
      <div className="mx-auto w-full max-w-lg space-y-8 px-4 pt-8 pb-10 sm:px-6 md:py-12">

        {/* Hero */}
        <AnimatedSection className="relative text-center">
          <Star4
            className="pointer-events-none absolute -left-1 -top-2 opacity-70"
            color="#f7df5d"
            size={28}
          />

          <Dot
            className="pointer-events-none absolute right-0 top-0 opacity-70"
            color="#f04770"
            size={12}
          />

          <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-md">
            <span className="text-xl font-bold tracking-tight text-primary md:text-2xl">
              UFO STEAM HUB
            </span>
          </div>

          <h1 className="mt-3 text-[1.75rem] leading-tight font-semibold text-foreground md:text-3xl">
            STEAM-простір для дітей у Кременчуці
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Курси, табори, робототехніка, 3D-друк,
            математика та творчі технології.
          </p>
        </AnimatedSection>

        {/* Navigation */}
        <nav aria-label="Швидкі посилання" className="grid grid-cols-2 gap-3">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex min-h-16 w-full items-center justify-between gap-2 rounded-2xl border border-primary/10 bg-white px-3 py-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-ufo-yellow/20 active:bg-ufo-yellow/30 ${to === "/" ? "col-span-2" : ""}`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-primary" />
                <span>{label}</span>
              </span>

              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </nav>

        {/* Mini-course enrollment */}
        <EnrollmentAnnouncement
          sourcePage="Links — набір у нові групи"
          compact
        />

        {/* Courses */}
        <section className="section-art rounded-3xl">
          <SectionDecor tone="mint" />
          <h2 className="text-lg font-semibold text-foreground">
            Гуртки та курси
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Регулярні заняття для дітей, які хочуть створювати,
            досліджувати й пробувати нові технології.
          </p>

          <div className="mt-3 space-y-3">
            {courses.map((course) => (
              <Link
                to="/courses"
                key={course.title}
                className="flex gap-3 rounded-2xl border border-border/50 bg-white p-4 shadow-sm transition-colors hover:border-primary/30"
              >
                <div className="shrink-0 text-2xl">
                  {course.emoji}
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground">
                    {course.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {course.desc}
                  </p>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 shrink-0 self-center text-primary" />
              </Link>
            ))}
          </div>

          <Link
            to="/courses"
            className="mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:bg-primary/80"
          >
            Переглянути всі курси
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </section>

        {/* Contact CTA */}
        <section className="relative overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground shadow-md">
          <Star4
            className="pointer-events-none absolute right-2 top-2 opacity-30"
            color="#f7df5d"
            size={32}
          />

          <h2 className="relative text-lg font-semibold">
            Хочете підібрати заняття для дитини?
          </h2>

          <p className="relative mt-1.5 text-sm leading-relaxed text-primary-foreground/85">
            Напишіть нам — допоможемо обрати курс,
            табір або пробне заняття.
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

        {/* Footer */}
        <section className="pb-[env(safe-area-inset-bottom)] text-center">
          <div className="text-base font-semibold text-primary">
            UFO STEAM HUB
          </div>

          <div className="mt-1 text-xs text-muted-foreground">
            Кременчук · STEAM-освіта для дітей
          </div>

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
