import { CourseGallery } from "@/components/CourseGallery";
import { courses } from "@/lib/courses";
import { SectionDecor } from "@/components/SectionDecor";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, Check } from "lucide-react";

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
  const hash = useRouterState({ select: (state) => state.location.hash });
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const [lightbox, setLightbox] = useState<{
    title: string;
    images: string[];
    index: number;
  } | null>(null);

  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (!courses.some((course) => course.id === id)) return;
    setSelectedCourse(id);
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

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
      <section className="page-intro course-page-intro text-center relative overflow-hidden">
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
          <nav className="course-lego-menu" aria-label="Оберіть курс">
            {courses.map((c) => (
              <Link
                key={c.id}
                to="/courses"
                hash={c.id}
                activeOptions={{ includeHash: true }}
                data-selected={selectedCourse === c.id}
                aria-current={selectedCourse === c.id ? "true" : undefined}
                className={`course-lego course-lego--${c.id}`}
              >
                <span>{c.title}</span>
                {selectedCourse === c.id && <Check className="course-lego__check" aria-hidden="true" />}
              </Link>
            ))}
          </nav>
        </AnimatedSection>
      </section>

      <div className="section-art parent-section">
        <SectionDecor tone="mint" />
        <div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6 md:space-y-8">
          <p className="text-sm text-muted-foreground">Оберіть напрям угорі — нижче його вік, ціна, фото та програма.</p>
          {courses.filter((course) => course.id === selectedCourse).map((course) => (
            <section key={course.id} id={course.id} className={`course-overview scroll-mt-2 rounded-3xl border-2 border-l-4 ${course.color} bg-card`}>
              <div className="course-overview__heading">
                <div className="flex items-center gap-3"><div className={`${course.iconBg} rounded-xl p-2.5 text-primary`}><course.icon className="h-6 w-6" /></div><h2 className="text-xl md:text-2xl">{course.title}</h2></div>
                <div className="mt-3 flex flex-wrap gap-2"><span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{course.age}</span><span className="rounded-lg bg-ufo-yellow/50 px-3 py-1 text-xs font-bold text-primary">{course.price}</span></div>
              </div>
              <div className="grid gap-4 px-4 pb-4 md:grid-cols-2 md:gap-6 md:px-6 md:pb-6">
                <CourseGallery title={course.title} images={course.gallery} onOpen={(index) => openLightbox(course.title, course.gallery, index)} />
                <div className="min-w-0">
                  <p className="text-sm leading-relaxed text-muted-foreground">{course.desc}</p>
                  <details className="parent-details mt-3">
                    <summary>Програма та особливості</summary>
                    <p>{course.details}</p>
                    <h3 className="mt-3 text-sm">Що робимо</h3><ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">{course.plan.map((step) => <li key={step}>{step}</li>)}</ul>
                    <h3 className="mt-3 text-sm">Особливості</h3><ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">{course.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  </details>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button type="button" onClick={() => openRegistration({ registrationType: "course", sourcePage: "Сторінка курсів", title: `Запис на пробний урок — ${course.title}`, program: course.title, age: course.age })} className="parent-button bg-ufo-yellow text-primary">Записатися <ArrowRight className="h-4 w-4" /></button>
                    <Link to="/schedule" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">Переглянути розклад</Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
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
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg bg-white/90 px-4 py-3 text-xl font-bold text-primary shadow-md hover:bg-white"
                      aria-label="Попереднє фото"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={showNextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white/90 px-4 py-3 text-xl font-bold text-primary shadow-md hover:bg-white"
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
                        className="h-full w-full object-contain"
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
