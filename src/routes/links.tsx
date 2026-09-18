import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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
  Clock3,
  Share2,
} from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Star4, Dot } from "@/components/Blobs";
import { openRegistration } from "@/components/RegistrationModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import animationImage from "@/assets/courses/animation1.jpg";
import steamImage from "@/assets/courses/steam1.jpg";
import modelingImage from "@/assets/courses/modeling1.jpg";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "UFO STEAM HUB — швидкі посилання" },
      {
        name: "description",
        content:
          "Швидка сторінка UFO STEAM HUB для Instagram: табори, курси, розклад, контакти та запис на заняття для дітей у Кременчуці.",
      },
      {
        property: "og:title",
        content: "UFO STEAM HUB — курси, табори та STEAM-заняття для дітей",
      },
      {
        property: "og:description",
        content:
          "Обирайте табір, курс або пробне заняття в UFO STEAM HUB.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://ufo.in.ua/links" },
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

const upcomingClasses = [
  {
    id: "lego-animation",
    title: "Лего-анімація",
    program: "Лего-анімація",
    sessions: [{ date: "19.09", time: "12:00" }],
    image: animationImage,
    imageAlt: "Дитяче заняття з анімації",
    registrationTitle: "Запис на пробне заняття: Лего-анімація",
    additionalInfo: "Наступне заняття з Лего-анімації",
    color: "pink",
  },
  {
    id: "steam-materials",
    title: "«З чого зроблений цей світ?»",
    program: "STEAM-гурток",
    sessions: [{ date: "20.09", time: "10:00" }],
    image: steamImage,
    imageAlt: "Дитяче заняття у STEAM-гуртку",
    registrationTitle: "Запис на пробне заняття: STEAM-гурток",
    color: "green",
  },
  {
    id: "3d-pumpkin",
    title: "Осінній декор: гарбуз із підсвіткою",
    program: "3D-моделювання",
    sessions: [
      { date: "20.09", time: "11:30" },
      { date: "23.09", time: "17:30" },
      { date: "25.09", time: "17:00" },
    ],
    image: modelingImage,
    imageAlt: "Дитяче заняття з 3D-моделювання",
    registrationTitle: "Запис на пробне заняття: Створюємо осінній декор",
    additionalInfo: "Тема заняття: гарбуз із підсвіткою",
    color: "yellow",
  },
];

const colorStyles = {
  pink: {
    bg: "bg-ufo-pink",
    soft: "bg-ufo-pink/10",
    text: "text-ufo-pink",
  },
  green: {
    bg: "bg-ufo-green",
    soft: "bg-ufo-green/10",
    text: "text-ufo-green",
  },
  yellow: {
    bg: "bg-ufo-yellow",
    soft: "bg-ufo-yellow/20",
    text: "text-foreground",
  },
} as const;

function LinksPage() {
  const [selectedSessions, setSelectedSessions] = useState<
    Record<string, number>
  >({
    "3d-pumpkin": 0,
  });

  useEffect(() => {
    const scrollToClass = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));

      if (!id) return;

      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    };

    const frame = window.requestAnimationFrame(scrollToClass);

    window.addEventListener("hashchange", scrollToClass);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToClass);
    };
  }, []);

  async function copyClassLink(id: string) {
    const directUrl = `${window.location.origin}${window.location.pathname}#${id}`;

    try {
      await navigator.clipboard.writeText(directUrl);
      toast.success("Посилання скопійовано");
    } catch {
      toast.error("Не вдалося скопіювати посилання");
    }
  }

  function registerForClass(
    classItem: (typeof upcomingClasses)[number],
  ) {
    const selectedIndex = selectedSessions[classItem.id] ?? 0;
    const session =
      classItem.sessions[selectedIndex] ?? classItem.sessions[0];

    if (!session) return;

    openRegistration({
      registrationType: "course",
      sourcePage: "Links — наступні заняття",
      title: classItem.registrationTitle,
      program: classItem.program,
      date: session.date,
      time: session.time,
      additionalInfo: classItem.additionalInfo,
    });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-ufo-cream">
      <div className="mx-auto w-full max-w-[720px] px-4 pb-8 pt-5 sm:px-6 md:pt-10">
        {/* HERO */}
        <AnimatedSection className="relative text-center">
          <Star4
            className="pointer-events-none absolute -left-1 top-1 opacity-70"
            color="#f7df5d"
            size={28}
          />

          <Dot
            className="pointer-events-none absolute right-1 top-2 opacity-70"
            color="#f04770"
            size={12}
          />

          <div className="inline-flex items-center rounded-2xl bg-white px-4 py-2 shadow-sm">
            <span className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
              UFO STEAM HUB
            </span>
          </div>

          <h1 className="mx-auto mt-4 max-w-lg text-[25px] font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            STEAM-простір для дітей у Кременчуці
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Курси, табори, робототехніка, 3D-моделювання, математика та
            творчі технології.
          </p>
        </AnimatedSection>

        {/* UPCOMING CLASSES */}
        <AnimatedSection className="mt-8">
          <div className="flex items-end justify-between gap-3 px-1">
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-ufo-pink" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                  Можна приєднатися
                </span>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Найближчі заняття
              </h2>
            </div>

            <div className="hidden rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm sm:block">
              Вересень
            </div>
          </div>

          <p className="mt-2 max-w-lg px-1 text-sm leading-relaxed text-muted-foreground">
            Оберіть заняття, яке хочеться спробувати.
          </p>

          {/* CARDS */}
<div className="relative mt-5 -mx-4">
  <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-9 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-1">
    {upcomingClasses.map((classItem) => {
      const colors = colorStyles[classItem.color];
      const selectedIndex = selectedSessions[classItem.id] ?? 0;

      const cardColor =
        classItem.color === "pink"
          ? "bg-ufo-pink"
          : classItem.color === "green"
            ? "bg-ufo-green"
            : "bg-ufo-yellow";

      const cardTextColor =
        classItem.color === "green"
          ? "text-white"
          : "text-foreground";

      return (
        <article
          key={classItem.id}
          id={classItem.id}
          className={`w-[76%] min-w-0 shrink-0 snap-start overflow-hidden rounded-[22px] shadow-[0_6px_22px_rgba(0,0,0,0.10)] sm:w-[64%] md:w-auto ${cardColor}`}
        >
          {/* IMAGE */}
          <div className="relative aspect-[1.35/1] overflow-hidden">
            <img
              src={classItem.image}
              alt={classItem.imageAlt}
              className="h-full w-full object-cover"
            />

            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => copyClassLink(classItem.id)}
              aria-label={`Скопіювати посилання на заняття «${classItem.title}»`}
              className="absolute right-2.5 top-2.5 h-9 w-9 rounded-full bg-white/95 shadow-md hover:bg-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* CONTENT */}
          <div className={`flex min-h-[245px] flex-col p-4 ${cardTextColor}`}>
            <span
              className={`w-fit rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${colors.text}`}
            >
              {classItem.program}
            </span>

            <h3 className="mt-2.5 text-[17px] font-semibold leading-[1.2]">
              {classItem.title}
            </h3>

            {classItem.sessions.length === 1 && (
              <div className="mt-4 flex gap-2">
                <div className="flex items-center gap-1.5 rounded-xl bg-white/75 px-2.5 py-2 text-xs font-semibold text-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {classItem.sessions[0]?.date}
                </div>

                <div className="flex items-center gap-1.5 rounded-xl bg-white/75 px-2.5 py-2 text-xs font-semibold text-foreground">
                  <Clock3 className="h-3.5 w-3.5 text-primary" />
                  {classItem.sessions[0]?.time}
                </div>
              </div>
            )}

            {classItem.sessions.length > 1 && (
              <fieldset className="mt-4">
                <legend className="text-[11px] font-semibold">
                  Оберіть дату:
                </legend>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {classItem.sessions.map((session, index) => {
                    const selected = selectedIndex === index;

                    return (
                      <Button
                        key={`${session.date}-${session.time}`}
                        type="button"
                        variant={selected ? "default" : "outline"}
                        size="sm"
                        aria-pressed={selected}
                        onClick={() =>
                          setSelectedSessions((current) => ({
                            ...current,
                            [classItem.id]: index,
                          }))
                        }
                        className={
                          selected
                            ? "h-8 rounded-lg bg-white px-2.5 text-[11px] text-foreground hover:bg-white/90"
                            : "h-8 rounded-lg border-white/70 bg-white/20 px-2.5 text-[11px] text-foreground hover:bg-white/40"
                        }
                      >
                        {session.date} · {session.time}
                      </Button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <Button
              type="button"
              onClick={() => registerForClass(classItem)}
              className="mt-auto min-h-11 w-full rounded-xl bg-white text-sm font-semibold text-foreground shadow-sm hover:bg-white/90"
            >
              Хочу спробувати
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </article>
      );
    })}
  </div>

  {/* FADE */}
  <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-3 bg-gradient-to-r from-ufo-cream to-transparent md:hidden" />
  <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-3 bg-gradient-to-l from-ufo-cream to-transparent md:hidden" />
</div>
        {/* NAVIGATION */}
        <AnimatedSection className="mt-9">
          <div className="space-y-2.5">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group flex min-h-[58px] w-full items-center justify-between rounded-2xl border border-black/5 bg-white px-4 py-3.5 text-base font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-ufo-yellow hover:shadow-md active:translate-y-0"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-[18px] w-[18px] text-primary" />
                  </span>

                  <span>{label}</span>
                </span>

                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </AnimatedSection>

        {/* COURSES */}
        <AnimatedSection className="mt-9">
          <div className="px-1">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Гуртки та курси
            </h2>

            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Напрями для дітей, які хочуть створювати, досліджувати й
              пробувати нове.
            </p>
          </div>

          <div className="mt-4 space-y-2.5">
            {courses.map((course) => (
              <div
                key={course.title}
                className="flex gap-3 rounded-2xl border border-black/5 bg-white p-3.5 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ufo-cream text-2xl">
                  {course.emoji}
                </div>

                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-foreground">
                    {course.title}
                  </h3>

                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {course.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/courses"
            className="mt-3 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Переглянути всі курси
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>

        {/* CONTACT CTA */}
        <AnimatedSection className="mt-9">
          <section className="relative overflow-hidden rounded-[24px] bg-primary p-6 text-primary-foreground shadow-md">
            <Star4
              className="pointer-events-none absolute -right-1 top-2 opacity-30"
              color="#f7df5d"
              size={36}
            />

            <div className="relative">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary-foreground/65">
                Не знаєте, що обрати?
              </span>

              <h2 className="mt-1.5 text-xl font-semibold">
                Допоможемо підібрати заняття
              </h2>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/80">
                Напишіть нам — розповімо про курси, вік дітей та найближчі
                групи.
              </p>

              <div className="mt-5 space-y-2.5">
                <Link
                  to="/contacts"
                  className="flex min-h-[54px] w-full items-center justify-center rounded-2xl bg-ufo-yellow px-4 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-ufo-yellow/90"
                >
                  Зв'язатися з нами
                </Link>

                <Link
                  to="/schedule"
                  className="flex min-h-[54px] w-full items-center justify-center rounded-2xl border border-white/70 px-4 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-primary"
                >
                  Переглянути розклад
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FOOTER */}
        <footer className="pb-[env(safe-area-inset-bottom)] pt-9 text-center">
          <div className="text-base font-semibold text-primary">
            UFO STEAM HUB
          </div>

          <div className="mt-1 text-xs text-muted-foreground">
            Кременчук · STEAM-освіта для дітей
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/ufo.steam.hub/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-black/5 bg-white p-3 shadow-sm transition-colors hover:bg-ufo-yellow/30"
            >
              <Instagram className="h-5 w-5 text-primary" />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61560801226427"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-black/5 bg-white p-3 shadow-sm transition-colors hover:bg-ufo-yellow/30"
            >
              <Facebook className="h-5 w-5 text-primary" />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
