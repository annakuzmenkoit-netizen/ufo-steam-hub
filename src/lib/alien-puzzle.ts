export const initialPuzzle = [3, 0, 5, 1, 4, 2];

export function swapPuzzle(order: readonly number[], from: number, to: number): number[] {
  const next = [...order];
  if (![from, to].every(index => Number.isInteger(index) && index >= 0 && index < order.length)) return next;
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}

export function isPuzzleSolved(order: readonly number[]): boolean {
  return order.length === 6 && order.every((piece, index) => piece === index);
}

export function shufflePuzzle(): number[] {
  const next = [0, 1, 2, 3, 4, 5];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return isPuzzleSolved(next) ? [...initialPuzzle] : next;
}
