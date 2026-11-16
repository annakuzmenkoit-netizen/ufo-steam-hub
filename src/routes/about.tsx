import { ResponsiveImage } from "@/components/ResponsiveImage";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Target, Eye, Users, ArrowDown, ArrowUpRight, Sparkles, Lightbulb, Puzzle } from "lucide-react";
import { openRegistration } from "@/components/RegistrationModal";
import learningPhoto from "@/assets/hero-children.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Про нас — UFO STEAM HUB" },
      { name: "description", content: "Дізнайтеся більше про UFO STEAM HUB — наші цінності, місію та команду." },
      { property: "og:title", content: "Про нас — UFO STEAM HUB" },
      { property: "og:description", content: "Наша місія, цінності та команда." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Heart, tone: "yellow", title: "Любов до дітей", desc: "Кожна дитина — унікальна. Ми допомагаємо їй знайти свій шлях." },
  { icon: Target, tone: "blue", title: "Якість освіти", desc: "Сучасні методики та постійний розвиток програм." },
  { icon: Eye, tone: "green", title: "Відкритість", desc: "Прозорий процес навчання, зворотний зв'язок для батьків." },
  { icon: Users, tone: "coral", title: "Командна робота", desc: "Діти вчаться працювати разом і підтримувати одне одного." },
];

import katerynaPhoto from "@/assets/kateryna.webp";
import annaPhoto from "@/assets/anna.webp";
import stasPhoto from "@/assets/stas.webp";
import sashaPhoto from "@/assets/sasha.webp";
import valeriPhoto from "@/assets/valeri.webp";

const team = [
  { name: "Катерина", role: "Викладачка та керівниця освітніх програм", bio: "Вірить, що освіта — це про зростання особистості, свободу мислення й відкриття світу", photo: katerynaPhoto },
  { name: "Анна", role: "Викладачка", bio: "Працює з дітьми на перетині технологій, конструювання, математики й творчості", photo: annaPhoto },
  { name: "Станіслав", role: "Спеціаліст з 3D-друку", bio: "Допомагає дітям перетворювати ідеї на реальні об’єкти: від 3D-моделі до готового друкованого виробу", photo: stasPhoto },
  { name: "Олександра", role: "Викладачка англійської та української мов", bio: "Допомагає дітям впевненіше говорити, писати й висловлювати власні думки українською та англійською", photo: sashaPhoto },
  { name: "Валері", role: "Викладачка читацьких програм і тренерка для мам", bio: "Допомагає дітям відкривати радість читання. Проводить тренування для мам і створює простір підтримки, руху та відновлення", photo: valeriPhoto },
];

function AboutPage() {
  return <div className="about-page">
    <section className="about-hero">
      <div className="about-container about-hero-grid">
        <div className="about-hero-copy">
          <p className="about-eyebrow">Знайомтеся, UFO STEAM HUB</p>
          <h1>Місце, де цікавість<br />стає <span>відкриттям.</span></h1>
          <p className="about-hero-lead">Наука стає пригодою, а навчання — захопливою грою.</p>
          <p className="about-hero-text">Ми створюємо простір, де діти можуть досліджувати, винаходити й творити. Віримо в потенціал кожної дитини та допомагаємо їй знайти свій шлях.</p>
          <div className="about-hero-actions"><a href="#about-team" className="parent-button bg-ufo-yellow text-primary">Познайомитися з командою <ArrowDown className="h-4 w-4" /></a><Link to="/courses" className="parent-button border border-white/40 text-white">Наші курси <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
        <div className="about-hero-art">
          <span className="about-art-star" aria-hidden="true"><Sparkles /></span>
          <div className="about-hero-image"><ResponsiveImage src={learningPhoto} alt="Діти разом досліджують та створюють проєкт на занятті UFO STEAM HUB" sizes="(min-width: 768px) 540px, 100vw" loading="eager" className="h-full w-full object-cover" /></div>
          <div className="about-photo-note"><Lightbulb /><span>«А що, якщо…»<strong>З цього починаються відкриття.</strong></span></div>
        </div>
      </div>
      <div className="about-container"><div className="about-hero-tags"><span><Lightbulb />Досліджуємо</span><span><Puzzle />Створюємо</span><span><Users />Зростаємо разом</span></div></div>
    </section>

    <section className="about-container about-section" aria-labelledby="about-values-heading">
      <div className="about-section-heading"><div><p className="about-eyebrow text-primary">Те, що об’єднує нас</p><h2 id="about-values-heading">Маленькі відкриття.<br /><span className="text-primary">Велика увага до дитини.</span></h2></div><p>Наші цінності — у кожному занятті, спільній ідеї та розмові з батьками.</p></div>
      <div className="about-values">{values.map((value, index) => <article key={value.title} className={`about-value about-value--${value.tone}`}><div className="about-value-top"><value.icon aria-hidden="true" /><span aria-hidden="true">0{index + 1}</span></div><h3>{value.title}</h3><p>{value.desc}</p></article>)}</div>
    </section>

    <section id="about-team" className="about-team-section" aria-labelledby="about-team-heading"><div className="about-container about-section">
      <div className="about-section-heading"><div><p className="about-eyebrow text-primary">Люди поруч</p><h2 id="about-team-heading">Знайомтеся:<br />наша <span className="text-primary">команда.</span></h2></div><p>Люди, які підтримують дитячі «чому?», радіють відкриттям і допомагають ідеям ставати реальністю.</p></div>
      <div className="about-team-grid">{team.map((person, index) => <article className="about-person" key={person.name}><div className={`about-person-photo about-person-photo--${index % 4}`}><ResponsiveImage src={person.photo} sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 100px" alt={person.name} className="h-full w-full object-contain" /></div><div className="about-person-copy"><h3>{person.name}</h3><p className="about-person-role">{person.role}</p><p className="about-person-bio">{person.bio}.</p></div></article>)}</div>
    </div></section>

    <section className="about-container about-section"><div className="about-invitation"><div><p className="about-eyebrow">Від знайомства — до першого відкриття</p><h2>Давайте знайдемо те,<br />що захопить вашу дитину.</h2><p>Познайомтеся з нашими курсами або залиште заявку на пробне заняття.</p></div><div className="about-invitation-actions"><button type="button" className="parent-button bg-ufo-yellow text-primary" onClick={() => openRegistration({ registrationType: "general", sourcePage: "Про нас", title: "Знайомство з UFO STEAM HUB" })}>Хочу спробувати <ArrowUpRight className="h-4 w-4" /></button><Link to="/community" className="parent-button border border-white/40 text-white">Наша громадська діяльність <ArrowUpRight className="h-4 w-4" /></Link></div></div></section>
  </div>;
}
