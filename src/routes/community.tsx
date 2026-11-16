import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Heart, MapPin, FileText, ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import hero from "@/assets/hero-children.webp";
import robotics1 from "@/assets/courses/robotics1.webp";
import modeling1 from "@/assets/courses/modeling1.webp";
import teens from "@/assets/groups.webp";
import balance from "@/assets/steam.webp";
import trips from "@/assets/space.webp";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Громадська діяльність — UFO STEAM HUB" }, { name: "description", content: "Освіта — наша мова змін. Освітні проєкти для дітей і підтримка родин новомістян. Підсумки громадської діяльності UFO STEAM HUB." }] }),
  component: CommunityPage,
});
const stories = [
  { title: "Підлітки", tag: "Зростаємо разом", text: "Простір для спілкування, власних ідей та відкриття своїх сильних сторін.", images: [teens], color: "var(--ufo-yellow)" },
  { title: "Розробка сайтів", tag: "Діджитал скілс", text: "Від першої ідеї до власного сайту. Створюємо сторінки та втілюємо свої задуми в цифровому світі.", images: [hero], color: "var(--secondary)" },
  { title: "3D-моделювання", tag: "Діджитал скілс", text: "Перетворюємо ідеї на об’ємні моделі та розвиваємо просторове мислення.", images: [modeling1], color: "var(--ufo-yellow)" },
  { title: "Робототехніка", tag: "Діджитал скілс", text: "Конструюємо, програмуємо й досліджуємо, як оживають власноруч створені механізми.", images: [robotics1], color: "var(--secondary)" },
  { title: "Баланс тайм", tag: "Час для себе", text: "Спільний час, творчість і підтримка. Вчимося знаходити баланс у щоденному житті.", images: [balance], color: "var(--ufo-yellow)" },
  { title: "Виїзні екскурсії", tag: "Відкриваємо нове", text: "Подорожі для сімей новомістян: знайомимося, досліджуємо та створюємо спільні спогади.", images: [trips], color: "var(--secondary)" },
];

const projectDetails: Record<string, string[]> = {
  "Підлітки": ["Знайомство та спілкування з однолітками.", "Простір, щоб ділитися ідеями, пробувати нове й знаходити свої сильні сторони."],
  "Розробка сайтів": ["Продумуємо ідею та структуру власної сторінки.", "Поєднуємо тексти, зображення й оформлення у власному вебпроєкті."],
  "3D-моделювання": ["Досліджуємо форми й створюємо об’ємні цифрові моделі.", "У підсумках 2025 року — 36 занять для дітей у межах проєкту «Шелтер Полтава»."],
  "Робототехніка": ["Поєднуємо конструювання та програмування.", "Досліджуємо роботу механізмів і перевіряємо свої ідеї на практиці."],
  "Баланс тайм": ["Знаходимо час для творчості, спілкування та відпочинку.", "Створюємо простір підтримки й спільного часу."],
  "Виїзні екскурсії": ["Спільні подорожі для сімей новомістян у межах проєкту «Шелтер Полтава».", "У 2025 році: Ковалівка — 46 учасників, Чигирин — 48 учасників."],
};

function InitiativeCard({ story, flipped, onFlip }: { story: typeof stories[number]; flipped: boolean; onFlip: () => void }) {
  return <article className="community-story" style={{ backgroundColor: story.color }}>
    <button type="button" className={`community-flip-card ${flipped ? "is-flipped" : ""}`} onClick={onFlip} aria-expanded={flipped} aria-label={`${story.title}: ${flipped ? "повернути до фото" : "детальніше про проєкт"}`}>
      <span className="community-flip-inner">
        <span className="community-flip-front" aria-hidden={flipped}>
          <span className="community-story-photo"><ResponsiveImage src={story.images[0]} alt="" sizes="300px" className="h-full w-full object-cover" /><span className="community-story-tag">{story.tag}</span></span>
          <span className="block p-5"><span role="heading" aria-level={3} className="block text-xl font-bold">{story.title}</span><span className="mt-3 block text-sm leading-relaxed">{story.text}</span><span className="community-flip-hint">Детальніше про проєкт <ArrowUpRight className="h-4 w-4" /></span></span>
        </span>
        <span className="community-flip-back" aria-hidden={!flipped}>
          <span className="community-eyebrow text-primary">{story.tag}</span><span role="heading" aria-level={3} className="block text-2xl font-bold">{story.title}</span>
          {projectDetails[story.title].map(text => <span key={text} className="mt-5 block text-sm leading-relaxed">{text}</span>)}
          <span className="community-flip-hint"><RotateCcw className="h-4 w-4" />Повернути до фото</span>
        </span>
      </span>
    </button>
  </article>;
}

function Initiatives() {
  const track = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const [touching, setTouching] = useState(false);
  const [flipped, setFlipped] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  function scroll(step: number) {
    if (!track.current) return;
    const card = track.current.querySelector("article");
    track.current.scrollBy({ left: step * ((card?.getBoundingClientRect().width ?? 280) + 18), behavior: reducedMotion ? "instant" : "smooth" });
  }
  useEffect(() => {
    if (paused || focused || flipped || touching) return;
    const timer = window.setInterval(() => {
      const element = track.current;
      if (!element || document.hidden) return;
      const max = element.scrollWidth - element.clientWidth;
      if (max < 1) return;
      if (element.scrollLeft >= max - 2) direction.current = -1;
      else if (element.scrollLeft <= 2) direction.current = 1;
      const width = element.querySelector("article")?.getBoundingClientRect().width ?? 280;
      element.scrollBy({ left: direction.current * (width + 18), behavior: reducedMotion ? "instant" : "smooth" });
    }, 2800);
    return () => window.clearInterval(timer);
  }, [paused, focused, flipped, touching, reducedMotion]);
  return <div onPointerDown={() => setFocused(false)} onFocusCapture={event => setFocused(window.matchMedia("(hover: hover)").matches && event.target.matches(":focus-visible"))} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="community-carousel-toolbar"><p className="text-sm text-muted-foreground">Натисніть на картку, щоб дізнатися більше</p><div className="flex gap-2">
      {<button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Увімкнути автогортання" : "Призупинити автогортання"} aria-pressed={paused}>{paused ? <Play /> : <Pause />}</button>}
      <button type="button" onClick={() => scroll(-1)} aria-label="Попередні ініціативи" aria-controls="initiative-cards"><ChevronLeft /></button><button type="button" onClick={() => scroll(1)} aria-label="Наступні ініціативи" aria-controls="initiative-cards"><ChevronRight /></button>
    </div></div>
    <div ref={track} id="initiative-cards" className="community-stories"
      onTouchStart={event => { const touch = event.touches[0]; gesture.current = { x: touch.clientX, y: touch.clientY }; swiped.current = false; setTouching(true); }}
      onTouchMove={event => { if (gesture.current && Math.abs(event.touches[0].clientX - gesture.current.x) > 12) swiped.current = true; }}
      onTouchEnd={event => {
        const start = gesture.current;
        const end = event.changedTouches[0];
        if (start && end) {
          const dx = start.x - end.clientX;
          const dy = start.y - end.clientY;
          if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) { swiped.current = true; setFlipped(null); scroll(dx > 0 ? 1 : -1); }
        }
        gesture.current = null; setTouching(false);
      }}
      onTouchCancel={() => { gesture.current = null; setTouching(false); }}
      onClickCapture={event => { if (swiped.current) { event.preventDefault(); event.stopPropagation(); swiped.current = false; } }}
      role="region" tabIndex={0} aria-label="Напрями громадської діяльності" onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); scroll(event.key === "ArrowRight" ? 1 : -1); }
    }}>{stories.map(story => <InitiativeCard key={story.title} story={story} flipped={flipped === story.title} onFlip={() => setFlipped(current => current === story.title ? null : story.title)} />)}</div>
  </div>;
}

function SupportLink() {
  return <a href="https://send.monobank.ua/jar/5CJdUY1QAW" target="_blank" rel="noopener noreferrer" className="parent-button bg-ufo-yellow text-primary"><Heart className="h-4 w-4 shrink-0" />Підтримати освітні проєкти<ArrowUpRight className="h-4 w-4 shrink-0" /></a>;
}
function CommunityPage() {
  return <div className="community-page">
    <section className="community-hero"><div className="community-container grid items-center gap-10 md:grid-cols-2"><div><p className="community-eyebrow">UFO STEAM HUB · ГО</p><h1>Освіта — наша<br /><span>мова змін.</span></h1><p className="mt-6 text-lg font-semibold">Сучасні освітні курси для дітей.</p><p className="mt-3 max-w-lg leading-relaxed text-white/85">Підтримка родин, що адаптуються у новій громаді.</p><div className="mt-8 flex flex-wrap gap-3"><SupportLink /><a href="#our-stories" className="parent-button border border-white/40 text-white">Наші історії ↓</a></div></div><div className="community-hero-photo"><ResponsiveImage src={hero} alt="Діти створюють спільний проєкт на занятті UFO STEAM HUB" sizes="(min-width: 768px) 560px, 100vw" loading="eager" className="h-full w-full object-cover" /><span className="community-photo-note">Більше, ніж заняття.<br /><strong>Місце, де ми разом.</strong></span></div></div></section>
    <section id="our-stories" className="community-container community-section scroll-mt-24"><p className="community-eyebrow text-primary">Наші історії</p><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><h2>Маленькі кроки.<br /><span className="text-primary">Великі зміни.</span></h2><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Навчаємося, підтримуємо одне одного й відкриваємо світ разом.</p></div><Initiatives /></section>
    <section className="bg-white"><div className="community-container community-section"><div className="community-founded"><span className="community-eyebrow text-primary">Початок нашої історії</span><p>Громадську організацію зареєстровано <strong>28 липня 2025 року.</strong></p></div><div className="community-results mt-14 grid gap-8 md:grid-cols-[1fr_2fr]"><div><p className="community-eyebrow text-primary">Від ідей — до дії</p><h2>Підсумки <br className="hidden md:block" />2025 року</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Освітні заняття в межах проєкту <a href="https://www.allianceofdevelopment.org/shelter-poltava/" target="_blank" rel="noopener noreferrer" className="community-project-link">«Шелтер Полтава»<ArrowUpRight className="inline h-3.5 w-3.5" /></a>.</p></div><div className="community-results-stats grid gap-4 sm:grid-cols-3">{[{ n: "60", title: "Діджитал скілс", text: "занять для дітей новомістян 6–12 років" }, { n: "36", title: "3D-моделювання", text: "занять для дітей" }, { n: "27", title: "Англійська мова", text: "занять" }].map(item => <article className="community-stat" key={item.title}><span>{item.n}</span><h3 className="mt-5 font-bold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></article>)}</div></div><article className="community-engineering mt-8"><span className="text-4xl" aria-hidden="true">✳</span><div><p className="community-eyebrow">Ініціатива</p><h3 className="text-2xl font-bold">Інженерний тиждень</h3><p className="mt-2">У межах проєкту «Бути почутими».</p></div></article><div className="mt-12"><h3 className="text-2xl font-bold">Нові місця — спільні спогади</h3><p className="mt-3 leading-relaxed text-muted-foreground">Екскурсії для сімей новомістян у межах проєкту <a href="https://www.allianceofdevelopment.org/shelter-poltava/" target="_blank" rel="noopener noreferrer" className="community-project-link">«Шелтер Полтава»<ArrowUpRight className="inline h-3.5 w-3.5" /></a>.</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{[{ name: "Ковалівка", count: "46" }, { name: "Чигирин", count: "48" }].map(trip => <article className="community-trip" key={trip.name}><MapPin className="h-6 w-6 text-primary" /><h4 className="text-xl font-bold">{trip.name}</h4><p className="ml-auto text-right"><strong className="block text-3xl text-primary">{trip.count}</strong><span className="text-xs text-muted-foreground">учасників</span></p></article>)}</div></div></div></section>
    <section className="community-container community-section"><div className="community-network"><div className="community-network-mark" aria-hidden="true">КРІП <ArrowUpRight className="inline h-10 w-10" /></div><div><p className="community-eyebrow text-primary">Сильніші разом</p><h2>Ми — частина КРІП</h2><p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">Об’єднуємо зусилля заради освітніх можливостей і підтримки родин у громаді.</p></div></div></section>
    <section id="documents" className="bg-white"><div className="community-container community-section"><p className="community-eyebrow text-primary">Відкритість і довіра</p><h2>Документи та політики</h2><p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Статут і політики організації можна запитати у нашої команди.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Статут організації", "Політики організації"].map(title => <a key={title} className="community-document" href={`mailto:ufosteamhub@gmail.com?subject=${encodeURIComponent(`Запит: ${title}`)}`}><FileText className="h-7 w-7 text-primary" /><h3 className="mt-5 font-bold">{title}</h3><span className="mt-4 inline-flex items-center gap-2 text-sm text-primary">Запитати документ<ArrowUpRight className="h-4 w-4" /></span></a>)}</div></div></section>
    <section className="community-container community-section"><div className="community-support"><Heart className="mx-auto mb-5 h-10 w-10" /><p className="community-eyebrow">Долучайтеся до змін</p><h2>Більше можливостей<br />для дітей — разом із вами.</h2><p className="mx-auto mb-7 mt-5 max-w-lg leading-relaxed text-white/85">Підтримайте освітні проєкти UFO STEAM HUB для дітей і родин, що адаптуються у новій громаді.</p><SupportLink /></div></section>
  </div>;
}
