import { createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star4, Dot, Squiggle, BlobShape } from "@/components/Blobs";

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

const contactInfo = [
  { icon: Phone, label: "Телефон", value: "+380 (96) 066-26-04" },
  { icon: Mail, label: "Email", value: "ufosteamhub@gmail.com" },
  { icon: MapPin, label: "Адреса", value: "м. Кременчук, ТЦ Лідер, каб. 208" },
  { icon: Clock, label: "Графік", value: "Пн–Пт: 14:00–19:00, Сб: 10:00–16:00" },
];

function ContactsPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-ufo-cream text-center relative overflow-hidden">
        <Star4 className="absolute top-10 left-10" color="#f7df5d" size={50} />
        <Dot className="absolute top-20 right-20" color="#f04770" size={20} />
        <Squiggle className="absolute bottom-10 right-10 opacity-70" color="#17c590" size={130} />
        <BlobShape className="absolute -bottom-12 -left-12 opacity-25" color="#3056dd" size={200} />
        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Контакти</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Зв'яжіться з нами — ми з радістю відповімо на всі ваші питання!
          </p>
        </AnimatedSection>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <h2 className="text-2xl font-bold text-foreground mb-6">Наші контакти</h2>
              <div className="space-y-5">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ufo-yellow/20 flex items-center justify-center shrink-0">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{c.label}</p>
                      <p className="text-sm text-muted-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-3xl overflow-hidden border-4 border-ufo-yellow shadow-xl">
                <iframe
                  title="UFO STEAM HUB на карті"
                  src="https://maps.google.com/maps?q=%D0%A2%D0%A6%20%D0%9B%D1%96%D0%B4%D0%B5%D1%80%20%D0%9A%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%87%D1%83%D0%BA&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: "24px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl font-bold text-foreground mb-6">Напишіть нам</h2>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm font-medium text-foreground">Ім'я</label>
                  <Input placeholder="Ваше ім'я" className="mt-1 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Телефон</label>
                  <Input placeholder="+380..." className="mt-1 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Повідомлення</label>
                  <Textarea placeholder="Ваше повідомлення" className="mt-1 rounded-xl" rows={5} />
                </div>
                <Button className="w-full rounded-full bg-ufo-yellow hover:bg-ufo-yellow/90 text-primary py-3 font-bold text-base shadow-md">
                  Відправити
                </Button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
