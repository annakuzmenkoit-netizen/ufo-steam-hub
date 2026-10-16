import { Link } from "@tanstack/react-router";
import { BookOpen, CalendarDays, Phone, MessageCircle } from "lucide-react";
import { openRegistration } from "@/components/RegistrationModal";

export function MobileNav() {
  return (
    <nav className="mobile-action-nav" aria-label="Швидкі дії для батьків">
      <Link to="/courses" activeProps={{ className: "is-active" }}><BookOpen /><span>Курси й ціни</span></Link>
      <Link to="/schedule" activeProps={{ className: "is-active" }}><CalendarDays /><span>Розклад</span></Link>
      <a href="tel:+380960662604"><Phone /><span>Дзвінок</span></a>
      <button type="button" onClick={() => openRegistration({ registrationType: "general", sourcePage: "Нижня мобільна навігація", title: "Запис на заняття" })}><MessageCircle /><span>Записатися</span></button>
    </nav>
  );
}
