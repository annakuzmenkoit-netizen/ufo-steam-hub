const workshops = [
  {
    day: "02",
    icon: "🕯",
    title: "Свічка бажань та лист Святому Миколаю",
    description: "Створимо святкову свічку власноруч та напишемо лист Святому Миколаю з найзаповітнішими бажаннями.",
  },
  {
    day: "05",
    icon: "🎨",
    title: "Вітражний розпис",
    description: "Оживимо прозорі прикраси яскравими кольорами та створимо власні малюнки в техніці вітражного розпису.",
  },
  {
    day: "09",
    icon: "🧶",
    title: "Ялинкова прикраса з макраме",
    description: "Опануємо основи макраме та сплетемо особливу прикрасу для святкової ялинки.",
  },
  {
    day: "12",
    icon: "✨",
    title: "Карбування по металу",
    description: "Познайомимося з традиційною технікою карбування та створимо прикраси для ялинки й оселі з українськими мотивами.",
  },
  {
    day: "16",
    icon: "✨",
    title: "Карбування по металу",
    description: "Познайомимося з традиційною технікою карбування та створимо прикраси для ялинки й оселі з українськими мотивами.",
  },
  {
    day: "19",
    icon: "🕸",
    title: "Різдвяний павук із соломи",
    description: "Відродимо давню українську традицію та створимо солом’яного павука — символ добробуту й гармонії в оселі.",
    price: 600,
    family: true,
  },
  {
    day: "20",
    icon: "❄️",
    title: "Сніжинки із соломи",
    description: "Опануємо основи соломоплетіння та створимо витончені сніжинки з натуральної соломи.",
  },
  {
    day: "23",
    icon: "🌈",
    title: "Вітражний розпис",
    description: "Оживимо прозорі прикраси яскравими кольорами та створимо власні малюнки в техніці вітражного розпису.",
  },
];

export function WinterWorkshops() {
  return (
    <section id="winter-workshops" className="parent-section winter-workshops scroll-mt-24" aria-labelledby="winter-workshops-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="parent-section-heading">
          <h2 id="winter-workshops-title">Розклад зимових майстерок</h2>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workshops.map(({ day, icon, title, description, family, price = 500 }) => (
            <li key={day} className="winter-workshops__card flex flex-col gap-3 rounded-xl border p-4">
              <div className="flex items-center justify-between gap-3">
                <time dateTime={`12-${day}`} className="winter-workshops__date rounded-full px-3 py-1 text-sm font-bold tabular-nums">{day}.12</time>
                <span aria-hidden="true" className="text-xl">{icon}</span>
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
