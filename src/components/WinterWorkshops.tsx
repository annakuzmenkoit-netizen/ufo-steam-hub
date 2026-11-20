import { openRegistration } from "@/components/RegistrationModal";
import candle from "@/assets/workshops/candle.webp";
import stainedGlass from "@/assets/workshops/stained-glass.webp";
import macrame from "@/assets/workshops/macrame.webp";
import metalBird from "@/assets/workshops/metal-bird.webp";
import strawSpider from "@/assets/workshops/straw-spider.webp";
import strawSnowflakes from "@/assets/workshops/straw-snowflakes.webp";

const workshops = [
  {
    days: ["02"],
    image: candle,
    imageSize: [640, 414],
    imageAlt: "Свічки з вощини у формі чобітка, сніговика та ялинки",
    title: "Свічка бажань та лист Святому Миколаю",
    titleLead: "Свічка бажань",
    quantity: "1–2 вироби",
    fullWidthQuantity: true,
    description: "Створимо святкову свічку власноруч та напишемо лист Святому Миколаю з найзаповітнішими бажаннями.",
  },
  {
    days: ["05", "23"],
    image: stainedGlass,
    imageSize: [368, 500],
    imageAlt: "Вітражні підвіски з будиночком, ліхтарем і зіркою",
    title: "Вітражний розпис",
    quantity: "3 вітражні вироби",
    description: "Оживимо прозорі прикраси яскравими кольорами та створимо власні малюнки в техніці вітражного розпису.",
  },
  {
    days: ["09"],
    image: macrame,
    imageSize: [400, 500],
    imageAlt: "Плетений вінок із червоним бантом і дзвіночками",
    title: "Ялинкова прикраса з макраме",
    quantity: "1–2 вироби",
    price: 450,
    description: "Опануємо основи макраме та сплетемо особливу прикрасу для святкової ялинки.",
  },
  {
    days: ["12", "16"],
    image: metalBird,
    imageSize: [535, 500],
    imageAlt: "Карбовані золотисті прикраси у формі сонця, зірки й птаха",
    title: "Карбування по металу",
    quantity: "До 7 виробів залежно від розміру",
    description: "Познайомимося з традиційною технікою карбування та створимо прикраси для ялинки й оселі з українськими мотивами.",
  },
  {
    days: ["19"],
    image: strawSpider,
    largerImage: true,
    imageSize: [371, 500],
    imageAlt: "Підвісна геометрична прикраса зі сплетеної соломи",
    title: "Різдвяний павук із соломи",
    description: "Відродимо давню українську традицію та створимо солом’яного павука — символ добробуту й гармонії в оселі.",
    price: 600,
    audience: "Сімейний майстерклас для мам і дітей.",
    audienceNote: "Діти від 11 років можуть долучитися самостійно.",
  },
  {
    days: ["20"],
    image: strawSnowflakes,
    imageSize: [375, 500],
    imageAlt: "Три плетені сніжинки з натуральної та кольорової соломи",
    title: "Сніжинки із соломи",
    quantity: "2–3 сніжинки",
    description: "Опануємо основи соломоплетіння та створимо витончені сніжинки з натуральної соломи.",
  },
];

export function WinterWorkshops() {
  return (
    <section id="winter-workshops" className="parent-section winter-workshops scroll-mt-24" aria-labelledby="winter-workshops-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="parent-section-heading winter-workshops__heading">
          <h2 id="winter-workshops-title">Розклад зимових майстерок</h2>
          <span className="winter-workshops__stars" aria-hidden="true">✦ <span>✧</span></span>
        </div>
        <p className="mb-1 text-xs font-semibold text-primary sm:hidden">Гортайте картки вбік</p>
        <ol
          aria-label="Картки зимових майстерок"
          tabIndex={0}
          className="winter-workshops__grid grid gap-x-4 gap-y-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:grid-cols-2 lg:grid-cols-3"
        >
          {workshops.map(({ days, image, imageSize: [width, height], imageAlt, title, titleLead, description, quantity, fullWidthQuantity, largerImage, audience = "Для дітей 7+ років", audienceNote, price = 500 }) => (
            <li key={title} className="winter-workshops__card flex flex-col border">
              <div className="winter-workshops__intro">
                <div className="min-w-0 space-y-1.5 wrap-break-word">
                  <div className="flex flex-wrap gap-1.5">
                    {days.map((day) => (
                      <time key={day} dateTime={`12-${day}`} className="winter-workshops__date rounded-full px-2 py-1 text-xs font-bold tabular-nums">
                        {day}.12
                      </time>
                    ))}
                  </div>
                  <h3 className="text-[clamp(1rem,4vw,1.25rem)] font-bold leading-tight">
                    {titleLead
                      ? <><span className="winter-workshops__title-lead whitespace-nowrap">{titleLead}</span>{title.slice(titleLead.length)}</>
                      : title}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{audience}</p>
                    {audienceNote && <p className="text-xs leading-normal">* {audienceNote}</p>}
                  </div>
                  {quantity && !fullWidthQuantity && (
                    <p className="text-sm"><span className="winter-workshops__quantity-label font-semibold">За майстерку</span> · {quantity}</p>
                  )}
                </div>
                <img src={image} width={width} height={height} alt={imageAlt} loading="lazy" decoding="async" draggable={false} className={largerImage ? "winter-workshops__cutout winter-workshops__cutout--large" : "winter-workshops__cutout"} />
              </div>
              {fullWidthQuantity && (
                <p className="mb-2 text-sm whitespace-nowrap"><span className="winter-workshops__quantity-label font-semibold">За майстерку:</span> {quantity}</p>
              )}
              <p className="winter-workshops__description mb-2 text-sm leading-[1.45]">{description}</p>
              <div className="winter-workshops__price mt-auto">
                <p className="font-bold">{price} грн</p>
                <button
                  type="button"
                  className="parent-button winter-workshops__button"
                  aria-label={`Записатися на майстерку «${title}»`}
                  onClick={() => openRegistration({
                    registrationType: "workshop",
                    sourcePage: "Головна — зимові майстерки",
                    program: title,
                    availableDates: days.map((day) => `${day}.12`),
                    age: audienceNote ? `${audience} ${audienceNote}` : audience,
                  })}
                >
                  Записатися
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
