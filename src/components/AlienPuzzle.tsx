import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Gift, Grip, RotateCcw, X } from "lucide-react";
import { initialPuzzle, isPuzzleSolved, shufflePuzzle, swapPuzzle } from "@/lib/alien-puzzle";
import alienArt from "@/assets/puzzle-alien.webp";

const ids = ["steam", "robotics", "animation", "math-mind", "math", "3d-modeling"];
const labels = ["STEAM", "Робототехніка", "Анімація", "Math&mind", "Математика", "3D-моделювання"];
const colors = ["var(--primary)", "var(--ufo-green)", "var(--ufo-pink)", "var(--ufo-yellow)", "var(--primary)", "var(--ufo-green)"];

type Drag = { from: number; pointerId: number; startX: number; startY: number; moved: boolean };

export function AlienPuzzle({ onClose }: { onClose: () => void }) {
  const [order, setOrder] = useState(initialPuzzle);
  const [selected, setSelected] = useState<number | null>(null);
  const [dragging, setDragging] = useState<{ from: number; x: number; y: number } | null>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const board = useRef<HTMLDivElement>(null);
  const game = useRef<HTMLElement>(null);
  const suppressClick = useRef(false);
  const drag = useRef<Drag | null>(null);
  const solved = isPuzzleSolved(order);

  useEffect(() => {
    game.current?.focus({ preventScroll: true });
    game.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, []);

  useEffect(() => {
    if (solved) document.getElementById("alien-puzzle-reward")?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [solved]);

  function exchange(from: number, to: number) {
    setOrder(current => swapPuzzle(current, from, to));
    setSelected(null);
    setAnnouncement(from === to ? "Обмін скасовано." : `Фрагменти на місцях ${from + 1} і ${to + 1} помінялися.`);
  }

  function choose(index: number) {
    if (selected === null) {
      setSelected(index);
      setAnnouncement(`Обрано місце ${index + 1}. Тепер натисніть інший пазл, щоб поміняти їх місцями.`);
    } else exchange(selected, index);
  }

  function dropTarget(event: PointerEvent<HTMLButtonElement>, from: number) {
    const pieces = board.current?.querySelectorAll<HTMLElement>("[data-alien-slot]");
    if (!pieces) return null;
    for (let index = 0; index < pieces.length; index++) {
      if (index === from) continue;
      const rect = pieces[index].getBoundingClientRect();
      if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) return index;
    }
    return null;
  }

  function startDrag(event: PointerEvent<HTMLButtonElement>, from: number) {
    if (solved || (event.pointerType === "mouse" && event.button !== 0)) return;
    suppressClick.current = false;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelected(null);
    drag.current = { from, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, moved: false };
  }

  function moveDrag(event: PointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const x = event.clientX - current.startX;
    const y = event.clientY - current.startY;
    if (Math.hypot(x, y) < 6 && !current.moved) return;
    current.moved = true;
    setDragging({ from: current.from, x, y });
    setTarget(dropTarget(event, current.from));
  }

  function finishDrag(event: PointerEvent<HTMLButtonElement>, cancelled = false) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const destination = !cancelled && current.moved ? dropTarget(event, current.from) : null;
    suppressClick.current = current.moved;
    drag.current = null;
    setDragging(null);
    setTarget(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (destination !== null) exchange(current.from, destination);
  }

  function reset() {
    drag.current = null;
    setDragging(null);
    setTarget(null);
    setSelected(null);
    setOrder(shufflePuzzle());
    setAnnouncement("Пазли перемішано. Спробуйте знову!");
  }

  return (
    <section ref={game} tabIndex={-1} className="alien-game" aria-labelledby="alien-game-title" onKeyDown={event => {
      if (event.key === "Escape") {
        drag.current = null; setDragging(null); setTarget(null); setSelected(null);
        setAnnouncement("Вибір скасовано.");
      }
    }}>
      <div className="alien-game__heading">
        <h3 id="alien-game-title">Космічна місія</h3>
        <button type="button" onClick={onClose} className="program-note__close">До курсів <X className="h-4 w-4" /></button>
      </div>
      <p id="alien-puzzle-help">З’єднайте лінії прибульця: тягніть за <Grip className="inline h-4 w-4" aria-hidden="true" /> або натисніть два пазли, щоб поміняти їх місцями.</p>
      <div className="alien-game__board" ref={board} data-solved={solved} style={{ "--alien-art": `url("${alienArt}")` } as CSSProperties}>
        {order.map((piece, index) => (
          <div key={index} className={`alien-piece program-note--${ids[piece]}`} data-alien-slot={index} data-piece={piece} data-selected={selected === index} data-target={target === index} data-dragging={dragging?.from === index} style={{
            "--alien-filter": piece === 3 ? "brightness(0.4) saturate(2)" : "none",
            "--piece-color": colors[piece], "--piece-ink": piece === 3 ? "var(--primary)" : "white",
            "--alien-x": `${piece % 2 * 100}%`, "--alien-y": `${Math.floor(piece / 2) * 50}%`,
            transform: dragging?.from === index ? `translate(${dragging.x}px, ${dragging.y}px)` : undefined,
          } as CSSProperties}>
            <button type="button" className="alien-piece__select" aria-label={`Фрагмент ${piece + 1}, місце ${index + 1}`} aria-describedby="alien-puzzle-help" aria-pressed={selected === index} disabled={solved} onClick={() => choose(index)}>
              <span>{labels[piece]}</span>
            </button>
            {!solved && <button type="button" className="alien-piece__handle" aria-label={`Перетягнути фрагмент ${piece + 1}`} onPointerDown={event => startDrag(event, index)} onPointerMove={moveDrag} onPointerUp={event => finishDrag(event)} onPointerCancel={event => finishDrag(event, true)} onLostPointerCapture={event => finishDrag(event, true)} onClick={event => {
              if (suppressClick.current && event.detail > 0) { suppressClick.current = false; return; }
              suppressClick.current = false; choose(index);
            }}><Grip className="h-5 w-5" aria-hidden="true" /></button>}
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{announcement}</p>
      <div id="alien-puzzle-reward" role="status" className="alien-game__reward" hidden={!solved}>
        {solved && <><Gift className="h-8 w-8" aria-hidden="true" /><h3>Таємницю UFO розкрито!</h3><p>У нас є для вас подарунок! Зробіть скриншот і покажіть його в UFO STEAM HUB.</p></>}
      </div>
      <button type="button" className="alien-game__shuffle" onClick={reset}><RotateCcw className="h-4 w-4" /> Перемішати</button>
    </section>
  );
}
