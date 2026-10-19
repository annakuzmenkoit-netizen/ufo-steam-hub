import { useRef, useState, type PointerEvent } from "react";
import { initialPuzzle, isPuzzleSolved, shufflePuzzle, swapPuzzle } from "@/lib/alien-puzzle";

type Drag = { from: number; pointerId: number; startX: number; startY: number; moved: boolean };

export function useCoursePuzzle(beforeMove: () => void) {
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5]);
  const [selected, setSelected] = useState<number | null>(null);
  const [dragging, setDragging] = useState<{ from: number; x: number; y: number } | null>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const board = useRef<HTMLDivElement>(null);
  const suppressClick = useRef(false);
  const drag = useRef<Drag | null>(null);
  const solved = isPuzzleSolved(order.map(piece => initialPuzzle[piece]));

  function exchange(from: number, to: number) {
    beforeMove();
    setOrder(current => swapPuzzle(current, from, to));
    setSelected(null);
    setAnnouncement(from === to ? "Обмін скасовано." : `Фрагменти на місцях ${from + 1} і ${to + 1} помінялися.`);
  }

  function choose(index: number) {
    beforeMove();
    if (selected === null) {
      setSelected(index);
      setAnnouncement(`Обрано місце ${index + 1}. Тепер натисніть інший пазл, щоб поміняти їх місцями.`);
    } else exchange(selected, index);
  }

  function dropTarget(event: PointerEvent<HTMLButtonElement>, from: number) {
    const pieces = board.current?.querySelectorAll<HTMLElement>("[data-puzzle-slot]");
    if (!pieces) return null;
    for (let index = 0; index < pieces.length; index++) {
      if (index === from) continue;
      const rect = pieces[index].getBoundingClientRect();
      if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) return index;
    }
    return null;
  }

  function startDrag(event: PointerEvent<HTMLButtonElement>, from: number) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    beforeMove();
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
    beforeMove();
    const shuffled = shufflePuzzle();
    setOrder(isPuzzleSolved(shuffled.map(piece => initialPuzzle[piece])) ? [0, 1, 2, 3, 4, 5] : shuffled);
    setAnnouncement("Пазли перемішано. Спробуйте знову!");
  }

  function cancel() {
    drag.current = null; setDragging(null); setTarget(null); setSelected(null);
    setAnnouncement("Вибір скасовано.");
  }

  function handleClick(detail: number, index: number) {
    if (suppressClick.current && detail > 0) { suppressClick.current = false; return; }
    suppressClick.current = false; choose(index);
  }

  return { order, board, selected, dragging, target, announcement, solved, reset, cancel, startDrag, moveDrag, finishDrag, handleClick };
}
