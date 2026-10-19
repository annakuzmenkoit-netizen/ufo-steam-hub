import test from "node:test";
import assert from "node:assert/strict";
import { initialPuzzle, isPuzzleSolved, shufflePuzzle, swapPuzzle } from "../src/lib/alien-puzzle.ts";
import { formatCourseTimes } from "../src/lib/course-times.ts";
import { slots } from "../src/lib/schedule.ts";

test("the reward requires all six fragments in their correct positions", () => {
  assert.equal(isPuzzleSolved(initialPuzzle), false);
  assert.equal(isPuzzleSolved([]), false);
  assert.equal(isPuzzleSolved([0, 1, 2, 3, 4]), false);
  assert.equal(isPuzzleSolved([0, 1, 2, 3, 4, 4]), false);
  let order = [...initialPuzzle];
  for (let index = 0; index < 6; index++) {
    order = swapPuzzle(order, index, order.indexOf(index));
    assert.equal(isPuzzleSolved(order), order.every((piece, position) => piece === position));
  }
  assert.equal(isPuzzleSolved(order), true);
  assert.deepEqual(initialPuzzle, [3, 0, 5, 1, 4, 2]);
});

test("cancelled, invalid and same-place drops cannot lose fragments", () => {
  for (const [from, to] of [[0, -1], [NaN, 2], [6, 0], [1.5, 2], [2, 2]]) {
    assert.deepEqual(swapPuzzle(initialPuzzle, from, to), initialPuzzle);
  }
  assert.deepEqual([...swapPuzzle(initialPuzzle, 0, 5)].sort(), [0, 1, 2, 3, 4, 5]);
});

test("restarting always produces an unsolved permutation", () => {
  for (let index = 0; index < 20; index++) {
    const order = shufflePuzzle();
    assert.equal(isPuzzleSolved(order), false);
    assert.deepEqual([...order].sort(), [0, 1, 2, 3, 4, 5]);
  }
});

test("STEAM has Wednesday or Saturday and no Tuesday class", () => {
  const steam = slots.filter(slot => slot.course === "STEAM-гурток");
  assert.equal(steam.some(slot => slot.day === "Вівторок"), false);
  assert.equal(formatCourseTimes(steam), "Ср 16:00 або Сб 14:30");
});

test("schedule alternatives use inline або, retaining every available time", () => {
  assert.equal(formatCourseTimes(slots.filter(slot => slot.course === "Робототехніка")), "Пт 15:30 або Нд 14:00");
  assert.equal(formatCourseTimes(slots.filter(slot => slot.course === "Math&mind")), "Сб 10:00 або 11:00 або 13:30");
  assert.equal(formatCourseTimes(slots.filter(slot => slot.course === "Математика")), "Вт, Ср, Чт 15:00 або 17:30");
});
