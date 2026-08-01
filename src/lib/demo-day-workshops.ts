export type DemoWorkshop = {
  id: string;
  date: "8 серпня" | "9 серпня";
  dayLabel: string;
  time: string;
  title: string;
  audience: string;
  description: string;
  ageMode: "required" | "optional" | "hidden";
};

export const demoWorkshops: DemoWorkshop[] = [
  {
    id: "3d-modeling",
    date: "8 серпня",
    dayLabel: "субота",
    time: "10:00",
    title: "3D-моделювання",
    audience: "10–15 років",
    description:
      "Створимо власну 3D-модель та одразу надрукуємо її на принтері у вигляді ексклюзивного брелока.",
    ageMode: "required",
  },
  {
    id: "animation",
    date: "8 серпня",
    dayLabel: "субота",
    time: "11:00",
    title: "Анімація",
    audience: "7–12 років",
    description: "Опануємо техніку stop-motion і знімемо свій перший короткий мультфільм.",
    ageMode: "required",
  },
  {
    id: "steam-lava-lamp",
    date: "8 серпня",
    dayLabel: "субота",
    time: "13:30",
    title: "STEAM-гурток",
    audience: "7–10 років",
    description: "Справжня хімія та фізика в дії: кожен зробить власну магічну лава-лампу.",
    ageMode: "required",
  },
  {
    id: "robotics",
    date: "8 серпня",
    dayLabel: "субота",
    time: "14:30",
    title: "Робототехніка",
    audience: "7–12 років",
    description:
      "Конструюємо та програмуємо «розумний» баскетбольний кошик, який реагує на влучання звуком.",
    ageMode: "required",
  },
  {
    id: "parent-support",
    date: "9 серпня",
    dayLabel: "неділя",
    time: "10:00",
    title: "Бути опорою",
    audience: "для батьків підлітків",
    description:
      "Теплі розмови за кавою: про дорослішання, сепарацію та стосунки з дітьми. Презентація програми для підлітків.",
    ageMode: "hidden",
  },
  {
    id: "steam-stop-motion",
    date: "9 серпня",
    dayLabel: "неділя",
    time: "11:30",
    title: "STEAM-гурток",
    audience: "8–12 років",
    description: "Основи електроніки на практиці: складаємо справжнє електричне коло",
    ageMode: "required",
  },
  {
    id: "open-space",
    date: "9 серпня",
    dayLabel: "неділя",
    time: "14:00",
    title: "Вільний простір",
    audience: "для дітей і батьків",
    description: "Відкриті локації, ігрові зони та неформальне спілкування для дітей і батьків.",
    ageMode: "optional",
  },
];

export const DEMO_REGISTRATION_STATUSES = [
  "new",
  "confirmed",
  "contacted",
  "cancelled",
  "attended",
] as const;

export type DemoRegistrationStatus = (typeof DEMO_REGISTRATION_STATUSES)[number];

export const DEMO_STATUS_LABELS: Record<DemoRegistrationStatus, string> = {
  new: "Нова",
  confirmed: "Підтверджено",
  contacted: "Зв’язались",
  cancelled: "Скасовано",
  attended: "Відвідав(ла)",
};

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").replace(/^380/, "").replace(/^0/, "");
}
