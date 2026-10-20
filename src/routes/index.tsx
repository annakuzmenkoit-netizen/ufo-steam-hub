import { SteamGears } from "@/components/SteamGears";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, MapPin, Phone, Users, ShieldCheck, Lightbulb, Brain } from "lucide-react";
import { HomePrograms } from "@/components/HomePrograms";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { EnrollmentAnnouncement } from "@/components/EnrollmentAnnouncement";
import { SectionDecor } from "@/components/SectionDecor";
import { openRegistration } from "@/components/RegistrationModal";
import heroPhoto from "@/assets/hero-children.webp";
import heroSmall from "@/assets/hero-children-320.webp";
import heroMedium from "@/assets/hero-children-640.webp";
import heroLarge from "@/assets/hero-children-960.webp";
import { courses } from "@/lib/courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UFO STEAM HUB — Освіта на дотик" },
      { name: "description", content: "Освітній центр STEAM-освіти у Кременчуці. Робототехніка, анімація, 3D моделювання та математика для дітей 7–14 років." },
      { property: "og:title", content: "UFO STEAM HUB — Освіта на дотик" },
      { property: "og:description", content: "Освітній центр STEAM-освіти у Кременчуці" },
    ],
  }),
  component: HomePage,
});

const benefits = [
  { icon: Users, title: "Міні-групи", text: "Для дітей 7–14 років, по 4–6 у групі — увага кожному." },
  { icon: ShieldCheck, title: "Безпечне навчання", text: "Комфортний простір та турботлива команда." },
  { icon: Lightbulb, title: "STEAM-підхід", text: "Наука, технології, інженерія, мистецтво й математика — через досліди та власні проєкти." },
  { icon: Brain, title: "Навички майбутнього", text: "Критичне мислення, креативність та командна робота." },
];
const prices = courses.map((course) => Number(course.price.match(/\d+/)?.[0]));

function HomePage() {
  return (
    <>
      <section className="home-hero parent-hero section-art">
        <SectionDecor tone="sun" />
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 md:grid-cols-2 md:gap-10 sm:px-6">
          <div className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/85">UFO STEAM HUB · Кременчук</p>
            <h1 className="home-hero__title">Освіта<br />на <span className="home-hero__highlight">дотик</span></h1>
            <p className="mt-4 mx-auto max-w-lg text-sm leading-relaxed text-white/90 md:text-lg">Робототехніка, творчість і наукові відкриття. Допоможемо знайти заняття, на які дитина захоче повертатися.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link to="/courses" className="parent-button bg-ufo-yellow text-primary">Обрати курс <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/contacts" className="parent-button border border-white/60 text-white">Порадитись про курс</Link>
            </div>
            <p className="mt-4 text-xs text-white/85">Для дітей 7–14 років · Міні-групи 4–6 дітей</p>
          </div>
          <figure className="hero-moment">
            <ResponsiveImage src={heroPhoto} width={1200} height={800} srcSet={`${heroSmall} 320w, ${heroMedium} 640w, ${heroLarge} 960w, ${heroPhoto} 1200w`} alt="Діти разом створюють проєкт на занятті UFO" loading="eager" fetchPriority="high" sizes="(min-width: 768px) 540px, 320px" className="h-full w-full object-contain" />
          </figure>
        </div>
      </section>
      <div className="home-discovery-intro">
      <nav aria-label="Батькам: швидкий доступ" className="parent-shortcuts mx-auto grid max-w-6xl grid-cols-3 gap-2 px-4 sm:px-6">
        <Link to="/courses"><span>Наші курси</span><ArrowRight className="h-4 w-4" /></Link>
        <Link to="/schedule"><span>Розклад</span><CalendarDays className="h-4 w-4" /></Link>
        <Link to="/contacts"><span>Як нас знайти</span><MapPin className="h-4 w-4" /></Link>
      </nav>
      <section className="parent-section home-minicourses"><EnrollmentAnnouncement compact sourcePage="Головна — мінікурси" /></section>
      </div>
      <section id="programs" className="section-art parent-section">
        <SectionDecor tone="mint" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <HomePrograms />
        </div>
      </section>
      <section className="parent-section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="home-learning" aria-labelledby="home-learning-title">
            <h2 id="home-learning-title">Наші переваги</h2>
            <div className="home-learning__items">
              {benefits.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <h3>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className={title === "Навички майбутнього" ? "home-learning__words" : undefined}>
                      {title === "Навички майбутнього" ? (
                        <><span>Навички</span>{" "}<span>майбутнього</span></>
                      ) : title}
                    </span>
                  </h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
          <SteamGears />
        </div>
      </section>
      <section className="parent-section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="parent-section-heading"><h2>Поширені запитання</h2></div>
          <div className="space-y-3">
            <details className="parent-details"><summary>Як записатися на заняття?</summary><p>Оберіть напрям і залиште заявку. Ми зв’яжемося, допоможемо з вибором та узгодимо деталі першого заняття.</p><button type="button" onClick={() => openRegistration()} className="parent-button mb-3 bg-ufo-yellow text-primary">Підібрати заняття <ArrowRight className="h-4 w-4" /></button></details>
            <details className="parent-details"><summary>Для якого віку цей простір?</summary><p>Простір розрахований на дітей 7–14 років. Вік для кожної програми вказано на сторінці курсів.</p></details>
            <details className="parent-details"><summary>Скільки коштують заняття?</summary><p>Вартість регулярних курсів — від {Math.min(...prices)} до {Math.max(...prices)} грн/місяць залежно від напряму. <Link to="/courses" className="font-semibold text-primary underline">Переглянути ціни</Link>.</p></details>
            <details className="parent-details"><summary>Як дізнатися, чи підходить розклад?</summary><p>Перегляньте <Link to="/schedule" className="font-semibold text-primary underline">орієнтовний розклад</Link>. Час уточнимо під час запису — він залежить від формування груп.</p></details>
          </div>
        </div>
      </section>
      <section className="parent-section">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 sm:px-6 md:flex-row md:items-center">
          <div><p className="parent-eyebrow">Поруч із вами</p><h2 className="text-2xl">Чекаємо у Кременчуці</h2><p className="mt-2 text-sm text-muted-foreground">ТЦ «Лідер», каб. 208</p></div>
          <div className="flex flex-wrap gap-3"><a href="tel:+380960662604" className="parent-button bg-primary text-white"><Phone className="h-4 w-4" />Зателефонувати</a><Link to="/contacts" className="parent-button border border-primary text-primary">Адреса та контакти <MapPin className="h-4 w-4" /></Link></div>
        </div>
      </section>
    </>
  );
}
