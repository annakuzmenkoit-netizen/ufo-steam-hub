type Slot = {
  id: string;
  day: string;
  time: string;
  course: string;
  age: string;
  teacher?: string;
  description: string;
  color: string;
  accent: string;
};

export const slots: Slot[] = [
  {
    id: "tue-1",
    day: "Вівторок",
    time: "15:00",
    course: "Математика",
    age: "5–6 клас",
    teacher: "Анна",
    description:
      "Розбираємо шкільні теми зрозуміло, заповнюємо прогалини та закріплюємо знання через практичні вправи.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-blue",
  },
  {
    id: "tue-2",
    day: "Вівторок",
    time: "16:00",
    course: "STEAM-гурток",
    age: "7–12 років",
    description:
      "Досліджуємо фізику, хімію, технології та інженерію через експерименти, конструювання і власні проєкти.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "tue-3",
    day: "Вівторок",
    time: "17:30",
    course: "Математика",
    age: "7–8 клас",
    description:
      "Систематизуємо шкільні знання, тренуємо розв’язування задач і готуємося до контрольних робіт.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-blue",
  },
  {
    id: "wed-1",
    day: "Середа",
    time: "15:00",
    course: "Математика",
    age: "3-4 клас",
    teacher: "Катерина",
    description:
      "Систематизуємо шкільні знання, тренуємо розв’язування задач і готуємося до контрольних робіт.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-green",
  },
  {
    id: "wed-2",
    day: "Середа",
    time: "16:00",
    course: "STEAM-гурток",
    age: "7–12 років",
    teacher: "Катерина",
    description:
      "Проводимо наукові досліди, перевіряємо гіпотези та створюємо практичні STEAM-проєкти власними руками.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "wed-3",
    day: "Середа",
    time: "17:30",
    course: "Математика",
    age: "3-4 клас",
    teacher: "Катерина",
    description:
      "Систематизуємо шкільні знання, тренуємо розв’язування задач і готуємося до контрольних робіт.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-green",
  },
  {
    id: "thu-1",
    day: "Четвер",
    time: "15:00",
    course: "Математика",
    age: "5–6 клас",
    teacher: "Анна",
    description:
      "Пояснюємо складні теми просто, працюємо з прогалинами та розвиваємо впевненість у розв’язуванні задач.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-blue",
  },
  {
    id: "thu-2",
    day: "Четвер",
    time: "16:00",
    course: "Анімація",
    age: "7–12 років",
    teacher: "Анна",
    description:
      "Створюємо персонажів і сюжети, вивчаємо stop-motion, знімаємо кадри та монтуємо власні мультфільми.",
    color: "bg-ufo-pink/15 text-ufo-pink",
    accent: "border-l-ufo-pink",
  },
  {
    id: "thu-3",
    day: "Четвер",
    time: "17:30",
    course: "Математика",
    age: "7–8 клас",
    teacher: "Анна",
    description:
      "Поглиблюємо знання зі шкільної математики, розвиваємо логіку та відпрацьовуємо алгоритми розв’язування задач.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-blue",
  },
  {
    id: "fri-1",
    day: "П'ятниця",
    time: "15:30",
    course: "Робототехніка",
    age: "7–10 років",
    teacher: "Анна",
    description:
      "Конструюємо роботів і механізми, знайомимося з датчиками та вчимося керувати моделями за допомогою програм.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "fri-2",
    day: "П'ятниця",
    time: "17:00",
    course: "3D-моделювання",
    age: "10–15 років",
    teacher: "Анна",
    description:
      "Створюємо власні 3D-моделі, готуємо їх до друку та перетворюємо цифрові ідеї на реальні вироби.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "sat-1",
    day: "Субота",
    time: "10:00",
    course: "Math&mind",
    age: "7–9 клас",
    teacher: "Анна",
    description:
      "Олімпіадна математика, алгоритми та основи програмування. Вчимося знаходити нестандартні способи розв’язання задач.",
    color: "bg-ufo-yellow/30 text-primary",
    accent: "border-l-ufo-yellow",
  },
  {
    id: "sat-2",
    day: "Субота",
    time: "11:00",
    course: "Math&mind",
    age: "5–6 клас",
    teacher: "Анна",
    description:
      "Розвиваємо логіку, математичне мислення та навички роботи з нестандартними й олімпіадними задачами.",
    color: "bg-ufo-yellow/30 text-primary",
    accent: "border-l-ufo-yellow",
  },
{
    id: "sat-3",
    day: "Субота",
    time: "12:00",
    course: "Анімація",
    age: "7–12 років",
    teacher: "Анна",
    description:
      "Вигадуємо історії, створюємо персонажів і декорації та знімаємо власну анімацію кадр за кадром.",
    color: "bg-ufo-pink/15 text-ufo-pink",
    accent: "border-l-ufo-pink",
  },
  
  {
    id: "sat-4",
    day: "Субота",
    time: "13:30",
    course: "Math&mind",
    age: "3–4 клас",
    teacher: "Катерина",
    description:
      "Розв’язуємо головоломки, логічні задачі та математичні ігри, вчимося міркувати й пояснювати свої рішення.",
    color: "bg-ufo-yellow/30 text-primary",
    accent: "border-l-ufo-yellow",
  },
  
  {
    id: "sat-5",
    day: "Субота",
    time: "14:30",
    course: "STEAM-гурток",
    age: "7–12 років",
    description:
      "Досліджуємо фізику, хімію, технології та інженерію через експерименти, конструювання і власні проєкти.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "sat-6",
    day: "Субота",
    time: "16:00",
    course: "Підлітковий клуб",
    age: "12–16 років",
    teacher: "Катерина",
    description:
      "Безпечний простір для спілкування, командних ігор, творчих активностей, обговорення важливих тем і нових знайомств.",
    color: "bg-ufo-pink/15 text-ufo-pink",
    accent: "border-l-ufo-pink",
  },
  {
    id: "sun-1",
    day: "Неділя",
    time: "10:00",
    course: "3D-моделювання",
    age: "10–15 років",
    teacher: "Анна",
    description:
      "Вивчаємо основи просторового дизайну, створюємо 3D-об’єкти та готуємо власні моделі до друку.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
  {
    id: "sun-2",
    day: "Неділя",
    time: "11:30",
    course: "Maker Lab (3D-моделювання + робототехніка)",
    age: "11-15 років",
    teacher: "Анна",
    description:
      "Поєднуємо науку, інженерію та творчість: створюємо моделі, механізми й практичні проєкти власними руками.",
    color: "bg-ufo-blue/15 text-primary",
    accent: "border-l-ufo-blue",
  },
  {
    id: "sun-3",
    day: "Неділя",
    time: "14:00",
    course: "Робототехніка",
    age: "7–10 років",
    teacher: "Анна",
    description:
      "Будуємо роботів, досліджуємо принципи роботи механізмів і створюємо прості програми для керування моделями.",
    color: "bg-ufo-green/15 text-ufo-green",
    accent: "border-l-ufo-green",
  },
];

