import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const COURSES = [
  {
    id: "steam",
    name: "STEAM-гурток",
    ageRange: "6-10 років",
    price: "800 грн/місяць",
    description:
      "Комплексний гурток, що поєднує науку, технології, інженерію, мистецтво і математику через практичні експерименти та проєкти.",
  },
  {
    id: "robotics",
    name: "Робототехніка",
    ageRange: "7-14 років",
    price: "900 грн/місяць",
    description:
      "Конструювання та програмування роботів на базі LEGO WeDo та Mindstorms. Діти вчаться логіці, механіці та основам програмування.",
  },
  {
    id: "animation",
    name: "Анімація і мультиплікація",
    ageRange: "8-14 років",
    price: "850 грн/місяць",
    description:
      "Створення власних мультфільмів: сторітелінг, персонажі, покадрова та цифрова анімація.",
  },
  {
    id: "math-mind",
    name: "Math&mind",
    ageRange: "6-10 років",
    price: "750 грн/місяць",
    description:
      "Ментальна арифметика та розвиток мислення — швидкий рахунок, логіка, концентрація.",
  },
  {
    id: "math",
    name: "Математика",
    ageRange: "7-14 років",
    price: "800 грн/місяць",
    description:
      "Поглиблена шкільна математика: підготовка, олімпіадні задачі, впевненість у предметі.",
  },
  {
    id: "3d",
    name: "3D моделювання",
    ageRange: "9-14 років",
    price: "900 грн/місяць",
    description:
      "Створення 3D-моделей у Tinkercad та Blender, підготовка до 3D-друку і геймдеву.",
  },
];

export default defineTool({
  name: "list_courses",
  title: "List courses",
  description:
    "List all courses offered at UFO STEAM HUB, including age range, monthly price, and description.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(COURSES, null, 2) }],
    structuredContent: { courses: COURSES },
  }),
});

export { COURSES };
