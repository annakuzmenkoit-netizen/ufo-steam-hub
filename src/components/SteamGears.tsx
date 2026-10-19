import { useId, type MouseEvent } from "react";

const areas = [
  { letter: "S", english: "Science", title: "Наука", meaning: "досліджуємо світ", color: "blue" },
  { letter: "T", english: "Technology", title: "Технології", meaning: "втілюємо ідеї", color: "green" },
  { letter: "E", english: "Engineering", title: "Інженерія", meaning: "конструюємо", color: "pink" },
  { letter: "A", english: "Art", title: "Мистецтво", meaning: "творимо", color: "yellow" },
  { letter: "M", english: "Mathematics", title: "Математика", meaning: "шукаємо рішення", color: "blue" },
];

const gearOutline = Array.from({ length: 48 }, (_, index) => {
  const radius = index % 4 < 2 ? 55 : 62;
  const angle = index * Math.PI / 24 - Math.PI / 2;
  return `${index ? "L" : "M"}${(64 + Math.cos(angle) * radius).toFixed(2)},${(64 + Math.sin(angle) * radius).toFixed(2)}`;
}).join(" ") + " Z";

export function SteamGears() {
  const id = useId().replace(/:/g, "");

  function spin(event: MouseEvent<HTMLButtonElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wheel = event.currentTarget.querySelector<SVGGElement>(".steam-gear__kick");
    if (!wheel?.animate) return;
    wheel.getAnimations().forEach(animation => animation.cancel());
    wheel.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }], { duration: 1800, easing: "cubic-bezier(.15,.65,.25,1)" });
  }

  return (
    <section className="steam-gears" aria-labelledby={`${id}-title`}>
      <div className="parent-section-heading"><h2 id={`${id}-title`}>Що таке STEAM?</h2><p>П’ять напрямів, які працюють разом.</p></div>
      <div className="steam-gears__row">
        {areas.map((area, index) => {
          const pathId = `${id}-ring-${area.letter}`;
          const caption = `${area.title} · ${area.meaning} · `;
          return (
            <div key={area.letter} className={`steam-gear steam-gear--${area.color}`}>
              <button type="button" onClick={spin} className="steam-gear__button" aria-label={`${area.letter} — ${area.english}. ${area.title}: ${area.meaning}. Прокрутити шестерню.`}>
                <svg viewBox="0 0 128 128" aria-hidden="true" focusable="false">
                  <defs><path id={pathId} d="M64 21a43 43 0 1 1 0 86a43 43 0 1 1 0-86" /></defs>
                  <g className="steam-gear__kick"><g className={`steam-gear__wheel ${index % 2 ? "steam-gear__wheel--reverse" : ""}`}>
                    <path d={gearOutline} fill="var(--gear-color)" />
                    <circle cx="64" cy="64" r="29" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
                    <text fill="currentColor" fontSize="8.5" fontWeight="500" textLength="264" lengthAdjust="spacing"><textPath href={`#${pathId}`}>{caption}{caption}</textPath></text>
                  </g></g>
                  <text x="64" y="66" textAnchor="middle" dominantBaseline="middle" fill="currentColor" fontSize="36" fontWeight="600">{area.letter}</text>
                </svg>
              </button>
              <p>{area.title}</p>
              <span>{area.meaning}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
