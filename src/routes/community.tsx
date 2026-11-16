import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Heart, MapPin, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import hero from "@/assets/hero-children.webp";
import robotics1 from "@/assets/courses/robotics1.webp";
import robotics2 from "@/assets/courses/robotics2.webp";
import modeling1 from "@/assets/courses/modeling1.webp";
import modeling2 from "@/assets/courses/modeling2.webp";
import steam1 from "@/assets/courses/steam1.webp";
import teens from "@/assets/groups.webp";
import balance from "@/assets/steam.webp";
import trips from "@/assets/space.webp";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Громадська діяльність — UFO STEAM HUB" }, { name: "description", content: "Освіта — наша мова змін. Освітні проєкти для дітей і підтримка родин новомістян. Підсумки громадської діяльності UFO STEAM HUB." }] }),
  component: CommunityPage,
});
const stories = [
  { title: "Підлітки", tag: "Зростаємо разом", text: "Простір для спілкування, власних ідей та відкриття своїх сильних сторін.", images: [teens], color: "#f2caef" },
  { title: "Розробка сайтів", tag: "Діджитал скілс", text: "Від першої ідеї до власного сайту. Створюємо сторінки та втілюємо свої задуми в цифровому світі.", images: [hero], color: "#ffe57a" },
  { title: "3D-моделювання", tag: "Діджитал скілс", text: "Перетворюємо ідеї на об’ємні моделі та розвиваємо просторове мислення.", images: [modeling1, modeling2], color: "#d9cafa" },
  { title: "Робототехніка", tag: "Діджитал скілс", text: "Конструюємо, програмуємо й досліджуємо, як оживають власноруч створені механізми.", images: [robotics1, robotics2], color: "#bcd9ff" },
  { title: "Баланс тайм", tag: "Час для себе", text: "Спільний час, творчість і підтримка. Вчимося знаходити баланс у щоденному житті.", images: [balance, steam1], color: "#bce7d2" },
  { title: "Виїзні екскурсії", tag: "Відкриваємо нове", text: "Подорожі для сімей новомістян: знайомимося, досліджуємо та створюємо спільні спогади.", images: [trips], color: "#ffd7b4" },
];

function InitiativeCard({ story }: { story: typeof stories[number] }) {
  const [photo, setPhoto] = useState(0);
  const touchStart = useRef<number | null>(null);
  function changePhoto(step: number) {
    setPhoto(current => (current + step + story.images.length) % story.images.length);
  }
  return <article className="community-story" style={{ backgroundColor: story.color }}>
    <div className="community-story-photo"
      onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={event => {
        if (touchStart.current !== null && story.images.length > 1) {
          const distance = touchStart.current - event.changedTouches[0].clientX;
          if (Math.abs(distance) > 40) changePhoto(distance > 0 ? 1 : -1);
        }
        touchStart.current = null;
      }}>
      <ResponsiveImage src={story.images[photo]} alt={`${story.title} — фото ${photo + 1}`} sizes="300px" className="h-full w-full object-cover" />
      {story.images.length > 1 && <>
        <div className="community-story-progress" aria-label="Обрати фото">{story.images.map((image, index) => <button type="button" key={image} onClick={() => setPhoto(index)} aria-label={`${story.title}: фото ${index + 1}`} aria-pressed={index === photo} className={index === photo ? "active" : ""} />)}</div>
        <button type="button" className="community-photo-arrow previous" aria-label={`${story.title}: попереднє фото`} onClick={() => changePhoto(-1)}><ChevronLeft /></button>
        <button type="button" className="community-photo-arrow next" aria-label={`${story.title}: наступне фото`} onClick={() => changePhoto(1)}><ChevronRight /></button>
      </>}
      <span className="community-story-tag">{story.tag}</span>
    </div>
    <div className="p-5"><h3 className="text-xl font-bold">{story.title}</h3><p className="mt-3 text-sm leading-relaxed">{story.text}</p></div>
  </article>;
}

function Initiatives() {
  const track = useRef<HTMLDivElement>(null);
  function scroll(direction: number) {
    if (!track.current) return;
    const card = track.current.querySelector("article");
    track.current.scrollBy({ left: direction * ((card?.getBoundingClientRect().width ?? 280) + 18), behavior: "smooth" });
  }
  return <>
    <div className="community-carousel-toolbar"><p className="text-sm text-muted-foreground">Гортайте ініціативи та фото</p><div className="flex gap-2"><button type="button" onClick={() => scroll(-1)} aria-label="Попередні ініціативи" aria-controls="initiative-cards"><ChevronLeft /></button><button type="button" onClick={() => scroll(1)} aria-label="Наступні ініціативи" aria-controls="initiative-cards"><ChevronRight /></button></div></div>
    <div ref={track} id="initiative-cards" className="community-stories" role="region" tabIndex={0} aria-label="Напрями громадської діяльності" onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); scroll(event.key === "ArrowRight" ? 1 : -1); }
    }}>{stories.map(story => <InitiativeCard key={story.title} story={story} />)}</div>
  </>;
}

function SupportLink() {
  return <a href="https://send.monobank.ua/jar/5CJdUY1QAW" target="_blank" rel="noopener noreferrer" className="parent-button bg-ufo-yellow text-primary"><Heart className="h-4 w-4 shrink-0" />Підтримати освітні проєкти<ArrowUpRight className="h-4 w-4 shrink-0" /></a>;
}
function CommunityPage() {
  return <div className="community-page">
    <section className="community-hero"><div className="community-container grid items-center gap-10 md:grid-cols-2"><div><p className="community-eyebrow">UFO STEAM HUB · ГО</p><h1>Освіта — наша<br /><span>мова змін.</span></h1><p className="mt-6 text-lg font-semibold">Сучасні освітні курси для дітей.</p><p className="mt-3 max-w-lg leading-relaxed text-white/85">Підтримка родин, що адаптуються у новій громаді.</p><div className="mt-8 flex flex-wrap gap-3"><SupportLink /><a href="#our-stories" className="parent-button border border-white/40 text-white">Наші історії ↓</a></div></div><div className="community-hero-photo"><ResponsiveImage src={hero} alt="Діти створюють спільний проєкт на занятті UFO STEAM HUB" sizes="(min-width: 768px) 560px, 100vw" loading="eager" className="h-full w-full object-cover" /><span className="community-photo-note">Більше, ніж заняття.<br /><strong>Місце, де ми разом.</strong></span></div></div></section>
    <section id="our-stories" className="community-container community-section scroll-mt-24"><p className="community-eyebrow text-primary">Наші історії</p><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><h2>Маленькі кроки.<br /><span className="text-primary">Великі зміни.</span></h2><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Навчаємося, підтримуємо одне одного й відкриваємо світ разом.</p></div><Initiatives /></section>
    <section className="bg-white"><div className="community-container community-section"><div className="community-founded"><span className="community-eyebrow text-primary">Початок нашої історії</span><p>Громадську організацію зареєстровано <strong>28 липня 2025 року.</strong></p></div><div className="mt-14 grid gap-8 md:grid-cols-[1fr_2fr]"><div><p className="community-eyebrow text-primary">Від ідей — до дії</p><h2>Підсумки<br />2025 року</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Освітні заняття в межах проєкту «Шелтер Полтава».</p></div><div className="grid gap-4 sm:grid-cols-3">{[{ n: "60", title: "Діджитал скілс", text: "занять для дітей новомістян 6–12 років" }, { n: "36", title: "3D-моделювання", text: "занять для дітей" }, { n: "27", title: "Англійська мова", text: "занять" }].map(item => <article className="community-stat" key={item.title}><span>{item.n}</span><h3 className="mt-5 font-bold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></article>)}</div></div><article className="community-engineering mt-8"><span className="text-4xl" aria-hidden="true">✳</span><div><p className="community-eyebrow">Ініціатива</p><h3 className="text-2xl font-bold">Інженерний тиждень</h3><p className="mt-2">У межах проєкту «Бути почутими».</p></div></article><div className="mt-12"><h3 className="text-2xl font-bold">Нові місця — спільні спогади</h3><p className="mt-3 text-muted-foreground">Екскурсії для сімей новомістян.</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{[{ name: "Ковалівка", count: "46" }, { name: "Чигирин", count: "48" }].map(trip => <article className="community-trip" key={trip.name}><MapPin className="h-6 w-6 text-primary" /><h4 className="text-xl font-bold">{trip.name}</h4><p className="ml-auto text-right"><strong className="block text-3xl text-primary">{trip.count}</strong><span className="text-xs text-muted-foreground">учасників</span></p></article>)}</div></div></div></section>
    <section className="community-container community-section"><div className="community-network"><div className="community-network-mark" aria-hidden="true">КРІП <ArrowUpRight className="inline h-10 w-10" /></div><div><p className="community-eyebrow text-primary">Сильніші разом</p><h2>Ми — частина КРІП</h2><p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">Об’єднуємо зусилля заради освітніх можливостей і підтримки родин у громаді.</p></div></div></section>
    <section id="documents" className="bg-white"><div className="community-container community-section"><p className="community-eyebrow text-primary">Відкритість і довіра</p><h2>Документи та політики</h2><p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Статут, документи про статус організації та політики можна запитати у нашої команди.</p><div className="mt-8 grid gap-4 sm:grid-cols-3">{["Статут організації", "Реєстрація та статус", "Політики організації"].map(title => <a key={title} className="community-document" href={`mailto:ufosteamhub@gmail.com?subject=${encodeURIComponent(`Запит: ${title}`)}`}><FileText className="h-7 w-7 text-primary" /><h3 className="mt-5 font-bold">{title}</h3><span className="mt-4 inline-flex items-center gap-2 text-sm text-primary">Запитати документ<ArrowUpRight className="h-4 w-4" /></span></a>)}</div></div></section>
    <section className="community-container community-section"><div className="community-support"><Heart className="mx-auto mb-5 h-10 w-10" /><p className="community-eyebrow">Долучайтеся до змін</p><h2>Більше можливостей<br />для дітей — разом із вами.</h2><p className="mx-auto mb-7 mt-5 max-w-lg leading-relaxed text-white/85">Підтримайте освітні проєкти UFO STEAM HUB для дітей і родин, що адаптуються у новій громаді.</p><SupportLink /></div></section>
  </div>;
}
