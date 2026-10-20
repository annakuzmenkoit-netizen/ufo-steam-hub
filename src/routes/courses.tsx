import { CourseGallery } from "@/components/CourseGallery";
import { courses } from "@/lib/courses";
import { slots } from "@/lib/schedule";
import { formatCourseTimes } from "@/lib/course-times";
import { SectionDecor } from "@/components/SectionDecor";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, ArrowUp, Check, Clock } from "lucide-react";

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


const shortCourseNames: Record<string, string> = { animation: "Анімація", "3d-modeling": "3D-моделювання" };
function courseSchedule(id: string, title: string) {
  return formatCourseTimes(slots.filter(slot => slot.course === (shortCourseNames[id] ?? title)));
}

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
      const details = document.getElementById(id);
      if (!details) return;
      const top = details.getBoundingClientRect().top;
      // Keep the page still when the new course is already comfortably visible.
      if (top >= 96 && top <= window.innerHeight * 0.55) return;
      details.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start",
      });
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
        <Dot className="absolute top-24 right-20" color="var(--ufo-pink)" size={20} />
        <Squiggle className="absolute bottom-10 right-10 opacity-70" color="#17c590" size={130} />
        <BlobShape className="absolute -bottom-12 -left-12 opacity-25" color="#3056dd" size={200} />

        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="home-hero__title">
            Наші <span className="home-hero__highlight">курси</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Ми створили програми, які розвивають дітей через дослідження, творчість і технології.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="course-page-choices relative mx-auto max-w-3xl px-4">
          <nav id="course-choices" className="course-selector-menu" aria-label="Оберіть курс">
            {courses.map((c) => (
              <Link
                key={c.id}
                to="/courses"
                hash={c.id}
                activeOptions={{ includeHash: true }}
                hashScrollIntoView={false}
                resetScroll={false}
                data-selected={selectedCourse === c.id}
                aria-current={selectedCourse === c.id ? "true" : undefined}
                aria-label={c.title}
                className={`course-selector course-selector--${c.id}`}
              >
                <span>{shortCourseNames[c.id] ?? c.title}</span>
                {selectedCourse === c.id && <Check className="course-selector__check" aria-hidden="true" />}
              </Link>
            ))}
          </nav>
        </AnimatedSection>
      </section>

      <div className="section-art parent-section course-page-content">
        <SectionDecor tone="mint" />
        <div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6 md:space-y-8">
          {courses.filter((course) => course.id === selectedCourse).map((course) => (
            <section key={course.id} id={course.id} className={`course-overview scroll-mt-24 rounded-3xl border border-l-4 ${course.color} bg-card`}>
              <div className="course-overview__heading">
                <button type="button" className="course-overview__back" onClick={() => document.getElementById("course-choices")?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>
                  <ArrowUp aria-hidden="true" />Обрати інший курс
                </button>
                <div className="course-overview__title">
                  <div className={`${course.iconBg} rounded-xl p-2 text-primary`}><course.icon className="h-5 w-5" aria-hidden="true" /></div>
                  <h2>{course.title}</h2>
                </div>
                <dl className="course-overview__facts">
                  <div><dt>Для кого</dt><dd>{course.age}</dd></div>
                  <div><dt>Вартість</dt><dd>{course.price.replace("Вартість: ", "").replace("/місяць", "")}<small> / місяць</small></dd></div>
                </dl>
              </div>
              <div className="course-overview__body">
                <div className="course-overview__intro">
                  <p>{course.desc}</p>
                  <Link to="/schedule" className="course-overview__schedule">
                    <Clock aria-hidden="true" />
                    <span><small>Коли заняття</small>{courseSchedule(course.id, course.title)}</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                  <button type="button" onClick={() => openRegistration({ registrationType: "course", sourcePage: "Сторінка курсів", title: `Запис на пробний урок — ${course.title}`, program: course.title, age: course.age })} className="parent-button course-overview__cta bg-ufo-yellow text-primary">Записатися <ArrowRight className="h-4 w-4" /></button>
                </div>
                <CourseGallery title={course.title} images={course.gallery} onOpen={(index) => openLightbox(course.title, course.gallery, index)} />
                <details className="parent-details course-overview__program">
                  <summary>Програма та особливості</summary>
                  <p>{course.details}</p>
                  <h3 className="mt-3 text-sm">Що робимо</h3><ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">{course.plan.map((step) => <li key={step}>{step}</li>)}</ul>
                  <h3 className="mt-3 text-sm">Особливості</h3><ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">{course.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                </details>
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
