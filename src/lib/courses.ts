import { Beaker, Bot, Film, Calculator, PenTool, Cuboid } from "lucide-react";

import steam1 from "@/assets/courses/steam1.webp";
import steam2 from "@/assets/courses/steam2.webp";
import steam3 from "@/assets/courses/steam3.webp";

import robotics1 from "@/assets/courses/robotics1.webp";
import robotics2 from "@/assets/courses/robotics2.webp";
import robotics3 from "@/assets/courses/robotics3.webp";

import animation1 from "@/assets/courses/animation1.webp";
import animation2 from "@/assets/courses/animation2.webp";
import animation3 from "@/assets/courses/animation3.webp";

import mathmind1 from "@/assets/courses/mathmind1.webp";
import mathmind2 from "@/assets/courses/mathmind2.webp";
import mathmind3 from "@/assets/courses/mathmind3.webp";

import math1 from "@/assets/courses/math1.webp";
import math2 from "@/assets/courses/math2.webp";
import math3 from "@/assets/courses/math3.webp";

import modeling1 from "@/assets/courses/modeling1.webp";
import modeling2 from "@/assets/courses/modeling2.webp";
import modeling3 from "@/assets/courses/modeling3.webp";

export const courses = [
  {
    id: "steam",
    title: "STEAM-гурток", age: "7-12 років", price: "Вартість: 1500 грн/місяць",
    desc: "Щомісяця — нова тема: світло, магніти, вода, повітря, ґрунт. Діти досліджують явища через дослід, гру та власні проєкти.",
    details: "Заняття проходять у форматі досліджень та експериментів. Діти працюють у міні-групах, створюють проєкти та презентують свої відкриття.",
    plan: ["Вступ до теми місяця", "Експерименти та досліди", "Створення власного проєкту", "Презентація результатів"],
    features: ["Міні-групи до 6 дітей", "Усі матеріали включено", "Сертифікат після завершення"],
    gallery: [steam1, steam2, steam3],
    icon: Beaker, color: "border-l-ufo-blue", iconBg: "bg-ufo-blue/10", iconColor: "text-primary",
  },
  {
    id: "robotics",
    title: "Робототехніка", age: "6-12 років", price: "Вартість: 1800 грн/місяць",
    desc: "Конструювання, програмування та створення власних роботів.",
    details: "Від простих механізмів до програмованих роботів. Діти вивчають основи інженерії та алгоритмічного мислення.",
    plan: ["Основи конструювання", "Знайомство з датчиками", "Програмування рухів", "Змагання роботів"],
    features: ["Роботи LEGO та Arduino", "Індивідуальний підхід", "Участь у змаганнях"],
    gallery: [robotics1, robotics2, robotics3],
    icon: Bot, color: "border-l-ufo-green", iconBg: "bg-ufo-green/10", iconColor: "text-ufo-green",
  },
  {
    id: "animation",
    title: "Анімація і мультиплікація", age: "7-12 років", price: "Вартість: 1500 грн/місяць",
    desc: "Оживляємо своїх героїв — створюємо мультики від ідеї до анімації та озвучки.",
    details: "Діти придумують персонажів, малюють, анімують та озвучують — повний цикл створення мультфільму.",
    plan: ["Створення персонажів", "Розкадровка та сценарій", "Анімація кадрів", "Озвучка та монтаж"],
    features: ["Власний мультфільм", "Розвиток творчості", "Робота з планшетами"],
    gallery: [animation1, animation2, animation3],
    icon: Film, color: "border-l-ufo-pink", iconBg: "bg-ufo-pink/10", iconColor: "text-ufo-pink",
  },
  {
    id: "math-mind",
    title: "Math&mind", age: "2-6 клас", price: "Вартість: 1000 грн/місяць",
    desc: "Цікава математика, нестандартні задачі.",
    details: "Олімпіадна математика, логічні задачі, головоломки — розвиваємо математичне мислення через захоплення.",
    plan: ["Логічні задачі", "Олімпіадні завдання", "Математичні ігри", "Командні змагання"],
    features: ["Підготовка до олімпіад", "Розвиток логіки", "Ігровий формат"],
    gallery: [mathmind1, mathmind2, mathmind3],
    icon: Calculator, color: "border-l-ufo-yellow", iconBg: "bg-ufo-yellow/10", iconColor: "text-ufo-yellow",
  },
  {
    id: "math",
    title: "Математика", age: "1-11 клас", price: "Вартість: 1600 грн/місяць",
    desc: "Шкільна математика зрозуміло та ефективно.",
    details: "Допомагаємо розібратися зі шкільною програмою, заповнити пробіли та підготуватися до контрольних.",
    plan: ["Діагностика рівня", "Робота з пробілами", "Практика та закріплення", "Підготовка до контрольних"],
    features: ["Індивідуальна програма", "Зрозумілі пояснення", "Домашні завдання"],
    gallery: [math1, math2, math3],
    icon: PenTool, color: "border-l-ufo-blue", iconBg: "bg-ufo-blue/10", iconColor: "text-primary",
  },
  {
    id: "3d-modeling",
    title: "3D моделювання", age: "9-14 років", price: "Вартість: 1800 грн/місяць",
    desc: "Основи 3D друку, моделювання і ШІ.",
    details: "Діти створюють 3D-моделі, вивчають основи дизайну та друкують свої вироби на 3D-принтері.",
    plan: ["Знайомство з 3D-середовищем", "Створення простих моделей", "Складні об'єкти та текстури", "3D-друк власного виробу"],
    features: ["Друк на 3D-принтері", "Основи ШІ у дизайні", "Власний виріб додому"],
    gallery: [modeling1, modeling2, modeling3],
    icon: Cuboid, color: "border-l-ufo-green", iconBg: "bg-ufo-green/10", iconColor: "text-ufo-green",
  },
];

