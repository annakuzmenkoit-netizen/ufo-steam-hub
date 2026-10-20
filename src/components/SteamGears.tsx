import { useId, useState } from "react";

const areas = [
  { letter: "S", english: "Science", title: "Наука", meaning: "досліджуємо світ", color: "blue", teeth: 14, x: 62, phase: 0 },
  { letter: "T", english: "Technology", title: "Технології", meaning: "втілюємо ідеї", color: "green", teeth: 10, x: 158, phase: 1 },
  { letter: "E", english: "Engineering", title: "Інженерія", meaning: "конструюємо", color: "pink", teeth: 16, x: 262, phase: 0 },
  { letter: "A", english: "Art", title: "Мистецтво", meaning: "творимо", color: "yellow", teeth: 12, x: 374, phase: 1 },
  { letter: "M", english: "Mathematics", title: "Математика", meaning: "шукаємо рішення", color: "blue", teeth: 13, x: 474, phase: 1 },
];

function outline(teeth: number, center: number, phase: number) {
  return Array.from({ length: teeth * 4 }, (_, index) => {
    const radius = teeth * 4 + (index % 4 < 2 ? -5 : 5);
    const angle = index * Math.PI / (teeth * 2) + phase * Math.PI / teeth;
    return `${index ? "L" : "M"}${(center + Math.cos(angle) * radius).toFixed(2)},${(center + Math.sin(angle) * radius).toFixed(2)}`;
  }).join(" ") + " Z";
}

export function SteamGears() {
  const id = useId().replace(/:/g, "");
  const [active, setActive] = useState(0);
  const selected = areas[active];

  return (
    <section className="steam-gears" aria-labelledby={`${id}-title`}>
      <div className="parent-section-heading"><h2 id={`${id}-title`}>Що таке STEAM?</h2></div>
      <svg className="steam-train" viewBox="0 0 540 148" role="group" aria-label="П’ять взаємопов’язаних напрямів STEAM">
        {areas.map((area, index) => {
          const radius = area.teeth * 4 + 5;
          const ring = radius * 0.55;
          const pathId = `${id}-ring-${area.letter}`;
          return (
            <g key={area.letter} className={`steam-train__gear steam-gear--${area.color}`} role="button" tabIndex={0} aria-label={`${area.letter} — ${area.english}. ${area.title}: ${area.meaning}.`} aria-pressed={active === index} onClick={() => setActive(index)} onFocus={() => setActive(index)} onPointerEnter={() => setActive(index)} onKeyDown={event => {
              if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(index); }
            }}>
              <svg x={area.x - radius} y={74 - radius} width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`} overflow="visible" aria-hidden="true">
                <defs><path id={pathId} d={`M${radius - ring} ${radius}a${ring} ${ring} 0 1 1 ${ring * 2} 0a${ring} ${ring} 0 1 1 ${-ring * 2} 0`} /></defs>
                <g className="steam-train__wheel" style={{ transformOrigin: `${radius}px ${radius}px`, animationDuration: `${area.teeth * 4}s`, animationDirection: index % 2 ? "reverse" : "normal" }}>
                  <path d={outline(area.teeth, radius, area.phase)} fill="var(--gear-color)" />
                  <circle cx={radius} cy={radius} r={radius * 0.45} fill="none" stroke="currentColor" strokeOpacity="0.25" />
                  <text fill="currentColor" fontSize="10" fontWeight="500"><textPath href={`#${pathId}`} startOffset="25%" textAnchor="middle">{area.title}</textPath></text>
                </g>
                <text x={radius} y={radius + 2} textAnchor="middle" dominantBaseline="middle" fill="currentColor" fontSize={radius * 0.64} fontWeight="600">{area.letter}</text>
                <circle className="steam-train__focus" cx={radius} cy={radius} r={radius - 1} fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="3 3" />
              </svg>
            </g>
          );
        })}
      </svg>
      <p className="steam-gears__caption" aria-live="polite"><strong>{selected.title}</strong> — {selected.meaning}.</p>
    </section>
  );
}
