import { useEffect, useState } from "react";
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
    program: "Лего-анімація",
    sessions: [{ date: "19.09", time: "12:00" }],
    image: animationImage,
    imageAlt: "Дитяче заняття з анімації",
    registrationTitle: "Запис на пробне заняття: Лего-анімація",
    additionalInfo: "Наступне заняття з Лего-анімації",
    accent: "bg-ufo-pink",
  },
  {
    id: "steam-materials",
    title: "«З чого зроблений цей світ?»",
    program: "STEAM-гурток: «З чого зроблений цей світ?»",
    sessions: [{ date: "20.09", time: "10:00" }],
    image: steamImage,
    imageAlt: "Дитяче заняття у STEAM-гуртку",
    registrationTitle: "Запис на пробне заняття: STEAM-гурток",
    accent: "bg-ufo-green",
  },
  {
    id: "3d-pumpkin",
    title: "Створюємо осінній декор: гарбуз із підсвіткою",
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
    accent: "bg-ufo-yellow",
  },
];

function LinksPage() {
  const [selectedSessions, setSelectedSessions] = useState<Record<string, number>>({
    "3d-pumpkin": 0,
  });

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

  function registerForClass(classItem: (typeof upcomingClasses)[number]) {
    const selectedIndex = selectedSessions[classItem.id] ?? 0;
    const session = classItem.sessions[selectedIndex] ?? classItem.sessions[0];
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

        {/* Upcoming trial classes */}
        <section aria-labelledby="upcoming-classes-title" className="relative -mx-1 overflow-hidden rounded-2xl bg-primary px-4 py-5 shadow-md md:-mx-20 md:px-6">
          <div className="pointer-events-none absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-ufo-pink" />
          <div className="pointer-events-none absolute right-9 top-8 h-3 w-3 rotate-45 bg-ufo-yellow" />
          <h2 id="upcoming-classes-title" className="relative text-xl font-semibold text-primary-foreground">
            Наступні заняття
          </h2>
          <p className="relative mt-1 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
            Спробуйте новий напрямок на окремому занятті та подивіться, що найбільше зацікавить дитину.
          </p>

          <div className="relative mt-4 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {upcomingClasses.map((classItem) => (
              <article
                key={classItem.id}
                id={classItem.id}
                className="scroll-mt-24 flex w-[84%] min-w-0 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-primary-foreground/30 bg-background/95 shadow-md sm:w-[72%] md:w-auto"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={classItem.image}
                    alt={classItem.imageAlt}
                    className="h-full w-full object-cover"
                  />
                  <span className={`absolute inset-x-0 bottom-0 h-1.5 ${classItem.accent}`} />
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
                  <p className="mb-1 text-xs font-semibold uppercase text-primary">
                    {classItem.program}
                  </p>
                  <h3 className="text-base font-semibold leading-snug text-foreground">
                    {classItem.title}
                  </h3>
                  {classItem.sessions.length === 1 ? (
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-primary">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" aria-hidden="true" /> {classItem.sessions[0]?.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-4 w-4" aria-hidden="true" /> {classItem.sessions[0]?.time}
                      </span>
                    </div>
                  ) : (
                    <fieldset className="mt-3">
                      <legend className="text-xs font-semibold text-muted-foreground">Оберіть дату:</legend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {classItem.sessions.map((session, index) => {
                          const selected = (selectedSessions[classItem.id] ?? 0) === index;
                          return (
                            <Button
                              key={`${session.date}-${session.time}`}
                              type="button"
                              variant={selected ? "default" : "outline"}
                              size="sm"
                              aria-pressed={selected}
                              onClick={() => setSelectedSessions((current) => ({ ...current, [classItem.id]: index }))}
                              className={selected ? "h-9 rounded-full bg-primary px-3 text-xs" : "h-9 rounded-full px-3 text-xs"}
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
                    className="mt-auto min-h-11 w-full rounded-xl bg-ufo-yellow pt-3 text-foreground shadow-sm hover:bg-ufo-yellow/90"
                  >
                    Хочу спробувати
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <p className="relative mt-3 text-center text-xs font-medium text-primary-foreground/70 md:hidden">
            Гортайте, щоб побачити більше →
          </p>
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
