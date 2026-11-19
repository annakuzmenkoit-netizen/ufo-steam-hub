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
    imageAlt: "Свічки з вощини у формі чобітка, сніговика та ялинки",
    title: "Свічка бажань та лист Святому Миколаю",
    description: "Створимо святкову свічку власноруч та напишемо лист Святому Миколаю з найзаповітнішими бажаннями.",
  },
  {
    days: ["05", "23"],
    image: stainedGlass,
    imageAlt: "Вітражні підвіски з будиночком, ліхтарем і зіркою",
    title: "Вітражний розпис",
    description: "Оживимо прозорі прикраси яскравими кольорами та створимо власні малюнки в техніці вітражного розпису.",
  },
  {
    days: ["09"],
    image: macrame,
    imageAlt: "Плетений вінок із червоним бантом і дзвіночками",
    title: "Ялинкова прикраса з макраме",
    description: "Опануємо основи макраме та сплетемо особливу прикрасу для святкової ялинки.",
  },
  {
    days: ["12", "16"],
    image: metalBird,
    imageAlt: "Карбовані золотисті прикраси у формі сонця, зірки й птаха",
    title: "Карбування по металу",
    description: "Познайомимося з традиційною технікою карбування та створимо прикраси для ялинки й оселі з українськими мотивами.",
  },
  {
    days: ["19"],
    image: strawSpider,
    imageAlt: "Підвісна геометрична прикраса зі сплетеної соломи",
    title: "Різдвяний павук із соломи",
    description: "Відродимо давню українську традицію та створимо солом’яного павука — символ добробуту й гармонії в оселі.",
    price: 600,
    family: true,
  },
  {
    days: ["20"],
    image: strawSnowflakes,
    imageAlt: "Три плетені сніжинки з натуральної та кольорової соломи",
    title: "Сніжинки із соломи",
    description: "Опануємо основи соломоплетіння та створимо витончені сніжинки з натуральної соломи.",
  },
];

export function WinterWorkshops() {
  return (
    <section id="winter-workshops" className="parent-section winter-workshops scroll-mt-24" aria-labelledby="winter-workshops-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="parent-section-heading">
          <h2 id="winter-workshops-title">Розклад зимових майстерок</h2>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.map(({ days, image, imageAlt, title, description, family, price = 500 }) => (
            <li key={title} className="winter-workshops__card flex flex-col gap-3 rounded-xl border p-4">
              <div className="winter-workshops__photo h-44 rounded-lg p-3">
                <img src={image} alt={imageAlt} loading="lazy" decoding="async" className="block h-full w-full object-contain" />
              </div>
              <div className="flex flex-wrap gap-2">
                {days.map((day) => (
                  <time key={day} dateTime={`12-${day}`} className="winter-workshops__date rounded-full px-3 py-1 text-sm font-bold tabular-nums">
                    {day}.12
                  </time>
                ))}
              </div>
              <h3 className="text-lg font-bold leading-tight">{title}</h3>
              {family && <p className="text-sm font-semibold text-primary">Сімейна майстерка</p>}
              <p className="text-sm leading-relaxed">{description}</p>
              <p className="mt-auto pt-1 font-bold">{price} грн</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
