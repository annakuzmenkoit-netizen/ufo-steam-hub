import { courses } from "@/lib/courses";
import { SectionDecor } from "@/components/SectionDecor";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, BookOpen, Star } from "lucide-react";

import { openRegistration } from "@/components/RegistrationModal";
import { Star4, Dot, Squiggle, BlobShape } from "@/components/Blobs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Курси — UFO STEAM HUB" },
      { name: "description", content: "STEAM-гуртки, робототехніка, анімація, 3D моделювання та математика для дітей 7–14 років." },
      { property: "og:title", content: "Курси — UFO STEAM HUB" },
      { property: "og:description", content: "Наші освітні програми для дітей." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursesPage,
});


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
      <section className="page-intro py-12 md:py-28 bg-ufo-cream text-center relative overflow-hidden">
        <Star4 className="absolute top-10 left-10" color="#f7df5d" size={50} />
        <Dot className="absolute top-24 right-20" color="#f04770" size={20} />
        <Squiggle className="absolute bottom-10 right-10 opacity-70" color="#17c590" size={130} />
        <BlobShape className="absolute -bottom-12 -left-12 opacity-25" color="#3056dd" size={200} />

        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-3xl md:text-5xl font-semibold text-foreground">
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

      <div className="section-art bg-background">
        <SectionDecor tone="mint" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20 space-y-10 md:space-y-16">
          {courses.map((course, i) => {
            const gallery = course.gallery ?? [];
            const [main, ...rest] = gallery;

            return (
              <AnimatedSection key={course.id} delay={0.04}>
                <section
                  id={course.id}
                  className={`scroll-mt-2 rounded-3xl bg-card border border-border border-l-4 ${course.color} shadow-sm shadow-ufo-yellow/10 hover:shadow-xl transition-shadow overflow-hidden`}
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
                                <ResponsiveImage
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
                              <ResponsiveImage
                                src={main} sizes="(min-width: 1024px) 360px, 40vw"
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
                                  <ResponsiveImage
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

                      <button
                        type="button"
                        onClick={() =>
                          openRegistration({
                            registrationType: "course",
                            sourcePage: "Сторінка курсів",
                            title: `Запис на пробний урок — ${course.title}`,
                            program: course.title,
                            age: course.age,
                          })
                        }
                        className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ufo-yellow px-6 py-3 font-semibold text-primary shadow-lg hover:shadow-xl transition-all"
                      >
                        Хочу спробувати <ArrowRight className="h-4 w-4" />
                      </button>
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
            Хочу спробувати <ArrowRight className="h-4 w-4" />
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
                <ResponsiveImage
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
                      <ResponsiveImage
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
