import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, MapPin, Phone, Users, ShieldCheck, Lightbulb, HeartHandshake } from "lucide-react";
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
  { icon: Users, title: "4–6 дітей у групі", text: "Увага до кожної дитини." },
  { icon: ShieldCheck, title: "Турботлива команда", text: "Комфортний простір для навчання." },
  { icon: Lightbulb, title: "Навчання через практику", text: "Досліди, творчість і власні проєкти." },
  { icon: HeartHandshake, title: "Допоможемо обрати", text: "Врахуємо вік та інтереси дитини." },
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
              <button type="button" onClick={() => openRegistration()} className="parent-button border border-white/60 text-white">Допоможіть обрати</button>
            </div>
            <p className="mt-4 text-xs text-white/85">Для дітей 7–14 років · Міні-групи 4–6 дітей</p>
          </div>
          <figure className="hero-moment">
            <ResponsiveImage src={heroPhoto} width={1200} height={800} srcSet={`${heroSmall} 320w, ${heroMedium} 640w, ${heroLarge} 960w, ${heroPhoto} 1200w`} alt="Діти разом створюють проєкт на занятті UFO" loading="eager" fetchPriority="high" sizes="(min-width: 768px) 540px, 320px" className="h-full w-full object-contain" />
          </figure>
        </div>
      </section>
      <nav aria-label="Батькам: швидкий доступ" className="parent-shortcuts mx-auto grid max-w-6xl grid-cols-3 gap-2 px-4 sm:px-6">
        <Link to="/courses"><span>Вік і вартість</span><ArrowRight className="h-4 w-4" /></Link>
        <Link to="/schedule"><span>Розклад</span><CalendarDays className="h-4 w-4" /></Link>
        <Link to="/contacts"><span>Як нас знайти</span><MapPin className="h-4 w-4" /></Link>
      </nav>
      <section id="programs" className="section-art parent-section">
        <SectionDecor tone="mint" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="parent-section-heading"><h2>Знайдіть свій курс</h2><p>Вік і вартість — одразу на картці.</p></div>
          <HomePrograms />
        </div>
      </section>
      <section className="parent-section bg-ufo-yellow/20"><EnrollmentAnnouncement compact sourcePage="Головна — мінікурси" /></section>
      <section className="parent-section section-art">
        <SectionDecor tone="rose" side="left" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="parent-section-heading"><p className="parent-eyebrow">Батькам спокійно, дітям цікаво</p><h2>З увагою до дітей</h2></div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{benefits.map(({icon: Icon, title}) => <article key={title} className="benefit-card"><Icon className="mb-3 h-6 w-6 text-primary" /><h3 className="text-sm leading-snug">{title}</h3></article>)}</div>
          <details className="parent-details mt-4"><summary>Що означає STEAM?</summary><p>Наука, технології, інженерія, мистецтво та математика — разом у практичних завданнях. Діти досліджують, конструюють і створюють власні проєкти.</p></details>
        </div>
      </section>
      <section className="parent-section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="parent-section-heading"><h2>Відповіді для батьків</h2></div>
          <div className="space-y-3">
            <details className="parent-details"><summary>Як записатися на заняття?</summary><p>Оберіть напрям і залиште заявку. Ми зв’яжемося, допоможемо з вибором та узгодимо деталі першого заняття.</p><button type="button" onClick={() => openRegistration()} className="parent-button mb-3 bg-ufo-yellow text-primary">Підібрати заняття <ArrowRight className="h-4 w-4" /></button></details>
            <details className="parent-details"><summary>Для якого віку цей простір?</summary><p>Простір розрахований на дітей 7–14 років. Вік для кожної програми вказано на сторінці курсів.</p></details>
            <details className="parent-details"><summary>Скільки коштують заняття?</summary><p>Вартість регулярних курсів — від {Math.min(...prices)} до {Math.max(...prices)} грн/місяць залежно від напряму. <Link to="/courses" className="font-semibold text-primary underline">Переглянути ціни</Link>.</p></details>
            <details className="parent-details"><summary>Як дізнатися, чи підходить розклад?</summary><p>Перегляньте <Link to="/schedule" className="font-semibold text-primary underline">орієнтовний розклад</Link>. Час уточнимо під час запису — він залежить від формування груп.</p></details>
          </div>
        </div>
      </section>
      <section className="parent-section bg-ufo-yellow/20">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 sm:px-6 md:flex-row md:items-center">
          <div><p className="parent-eyebrow">Поруч із вами</p><h2 className="text-2xl">Чекаємо у Кременчуці</h2><p className="mt-2 text-sm text-muted-foreground">ТЦ «Лідер», каб. 208</p></div>
          <div className="flex flex-wrap gap-3"><a href="tel:+380960662604" className="parent-button bg-primary text-white"><Phone className="h-4 w-4" />Зателефонувати</a><Link to="/contacts" className="parent-button border border-primary text-primary">Адреса та контакти <MapPin className="h-4 w-4" /></Link></div>
        </div>
      </section>
    </>
  );
}
