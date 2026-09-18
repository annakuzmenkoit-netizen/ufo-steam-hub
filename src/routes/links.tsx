import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Star4, Dot, Squiggle } from "@/components/Blobs";
import { openRegistration } from "@/components/RegistrationModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Home, BookOpen, Tent, Calendar, Phone, Instagram, Facebook, ArrowRight, ChevronRight, Clock3, Share2 } from "lucide-react";
import animationImage from "@/assets/courses/animation1.jpg";
import steamImage from "@/assets/courses/steam1.jpg";
import modelingImage from "@/assets/courses/modeling1.jpg";

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

const courses = [
  { emoji: "🤖", title: "Робототехніка", desc: "Конструювання, програмування, MakerZoid і перші інженерні виклики." },
  { emoji: "🧊", title: "3D-друк та моделювання", desc: "Від ідеї до власної 3D-моделі та готового об'єкта." },
  { emoji: "🧠", title: "MATH&mind", desc: "Логіка, нестандартні задачі, головоломки й математичне мислення." },
  { emoji: "📐", title: "Математика", desc: "Підтягування шкільної програми, пояснення складного простими словами." },
  { emoji: "🎬", title: "Анімація і мультиплікація", desc: "Персонажі, історії, розкадрування та власні мультфільми." },
];

const upcomingClasses = [
  {
    id: "lego-animation",
    title: "Лего-анімація",
    date: "19.09",
    time: "12:00",
    image: animationImage,
    imageAlt: "Дитяче заняття з анімації",
    registration: {
      registrationType: "course" as const,
      sourcePage: "Links — наступні заняття",
      title: "Запис на пробне заняття: Лего-анімація",
      program: "Лего-анімація",
      date: "19.09",
      time: "12:00",
      additionalInfo: "Наступне заняття з Лего-анімації",
    },
  },
  {
    id: "steam-materials",
    title: "STEAM-гурток: «З чого зроблений цей світ?»",
    date: "20.09",
    time: "10:00",
    image: steamImage,
    imageAlt: "Дитяче заняття у STEAM-гуртку",
    registration: {
      registrationType: "course" as const,
      sourcePage: "Links — наступні заняття",
      title: "Запис на пробне заняття: STEAM-гурток",
      program: "STEAM-гурток: «З чого зроблений цей світ?»",
      date: "20.09",
      time: "10:00",
    },
  },
  ...[
    { id: "3d-pumpkin-20-09-1130", date: "20.09", time: "11:30" },
    { id: "3d-pumpkin-23-09-1730", date: "23.09", time: "17:30" },
    { id: "3d-pumpkin-25-09-1700", date: "25.09", time: "17:00" },
  ].map(({ id, date, time }) => ({
    id,
    title: "Створюємо осінній декор: гарбуз із підсвіткою",
    date,
    time,
    image: modelingImage,
    imageAlt: "Дитяче заняття з 3D-моделювання",
    registration: {
      registrationType: "course" as const,
      sourcePage: "Links — наступні заняття",
      title: "Запис на пробне заняття: Створюємо осінній декор",
      program: "3D-моделювання",
      date,
      time,
      additionalInfo: "Тема заняття: гарбуз із підсвіткою",
    },
  })),
];

function LinksPage() {
  useEffect(() => {
    const scrollToClass = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      document.getElementById(id)?.scrollIntoView({ block: "start" });
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

        {/* Upcoming trial classes */}
        <section aria-labelledby="upcoming-classes-title">
          <h2 id="upcoming-classes-title" className="text-lg font-semibold text-foreground">
            Наступні заняття
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Спробуйте новий напрямок на окремому занятті та подивіться, що найбільше зацікавить дитину.
          </p>

          <div className="mt-3 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0">
            {upcomingClasses.map((classItem) => (
              <article
                key={classItem.id}
                id={classItem.id}
                className="scroll-mt-24 flex w-[82%] min-w-0 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm sm:w-[68%] md:w-auto"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
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
                    title="Скопіювати посилання"
                    className="absolute right-2 top-2 h-9 w-9 rounded-full bg-background/95 shadow-sm hover:bg-background"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-base font-semibold leading-snug text-foreground">
                    {classItem.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-primary">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" aria-hidden="true" /> {classItem.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4" aria-hidden="true" /> {classItem.time}
                    </span>
                  </div>
                  <Button
                    type="button"
                    onClick={() => openRegistration(classItem.registration)}
                    className="mt-4 min-h-11 w-full rounded-xl bg-ufo-yellow text-foreground hover:bg-ufo-yellow/90"
                  >
                    Хочу спробувати
                  </Button>
                </div>
              </article>
            ))}
          </div>
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
