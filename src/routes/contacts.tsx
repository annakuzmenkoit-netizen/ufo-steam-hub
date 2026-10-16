import { openRegistration } from "@/components/RegistrationModal";
import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакти — UFO STEAM HUB" },
      { name: "description", content: "Зв'яжіться з UFO STEAM HUB — адреса, телефон, email та форма зворотного зв'язку." },
      { property: "og:title", content: "Контакти — UFO STEAM HUB" },
      { property: "og:description", content: "Зв'яжіться з нами для запису на заняття." },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <>
      <section className="page-intro text-center"><div className="mx-auto max-w-3xl px-4"><p className="parent-eyebrow !text-ufo-yellow">Будемо раді знайомству</p><h1 className="text-3xl md:text-5xl">Ми на <span>зв’язку</span></h1><p className="mt-3 text-sm md:text-lg">Допоможемо обрати заняття й уточнимо зручний час.</p></div></section>
      <section className="parent-section">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl">Як вам зручніше?</h2>
            <a href="tel:+380960662604" className="contact-action mt-4"><span className="contact-action__icon"><Phone /></span><span><strong>Зателефонувати</strong><span>+380 (96) 066-26-04</span></span></a>
            <a href="mailto:ufosteamhub@gmail.com" className="contact-action mt-3"><span className="contact-action__icon"><Mail /></span><span className="min-w-0"><strong>Написати на пошту</strong><span className="break-all">ufosteamhub@gmail.com</span></span></a>
            <div className="mt-5 rounded-2xl bg-ufo-yellow/25 p-4"><h3 className="text-base">Хочете, щоб ми зв’язалися з вами?</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Залиште контакти й інтереси дитини у формі запису.</p><button type="button" onClick={() => openRegistration({ registrationType: "contact", sourcePage: "Контакти", title: "Допомога з вибором заняття" })} className="parent-button mt-3 bg-primary text-white">Залишити заявку <ArrowRight className="h-4 w-4" /></button></div>
          </div>
          <div className="rounded-3xl border-2 border-primary/15 bg-card p-4 sm:p-5">
            <h2 className="text-2xl">Як нас знайти</h2>
            <div className="mt-4 flex items-start gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" /><p className="text-sm leading-relaxed">м. Кременчук, ТЦ «Лідер», каб. 208</p></div>
            <div className="mt-3 flex items-start gap-3"><Clock className="h-5 w-5 shrink-0 text-primary" /><p className="text-sm leading-relaxed">Пн–Пт: 14:00–19:00<br />Сб: 10:00–16:00</p></div>
            <a href="https://www.google.com/maps/search/?api=1&query=%D0%A2%D0%A6+%D0%9B%D1%96%D0%B4%D0%B5%D1%80+%D0%9A%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%87%D1%83%D0%BA" target="_blank" rel="noopener noreferrer" className="parent-button mt-4 w-full bg-ufo-yellow text-primary">Відкрити маршрут у Google Maps <ArrowRight className="h-4 w-4" /></a>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Перед першим візитом узгодьте час телефоном.</p>
          </div>
        </div>
      </section>
    </>
  );
}
