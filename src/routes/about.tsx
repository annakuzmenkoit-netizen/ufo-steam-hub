import { createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Heart, Target, Eye, Users } from "lucide-react";
import { Star4, Dot, Squiggle, BlobShape } from "@/components/Blobs";
import ufoLogo from "@/assets/ufo-logo.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Про нас — UFO STEAM HUB" },
      { name: "description", content: "Дізнайтеся більше про UFO STEAM HUB — наші цінності, місію та команду." },
      { property: "og:title", content: "Про нас — UFO STEAM HUB" },
      { property: "og:description", content: "Наша місія, цінності та команда." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Heart, title: "Любов до дітей", desc: "Кожна дитина — унікальна. Ми допомагаємо їй знайти свій шлях." },
  { icon: Target, title: "Якість освіти", desc: "Сучасні методики та постійний розвиток програм." },
  { icon: Eye, title: "Відкритість", desc: "Прозорий процес навчання, зворотний зв'язок для батьків." },
  { icon: Users, title: "Командна робота", desc: "Діти вчаться працювати разом і підтримувати одне одного." },
];

const team = [
  { name: "Катерина", role: "Викладачка та керівниця освітніх програм", bio: "Вірить, що освіта — це про зростання особистості, свободу мислення й відкриття світу. Проводить заняття так, щоб діти не просто “вчилися”, а пробували, досліджували, ставили запитання й відчували власну гідність", photo: "/public/kateryna.jpg" },
  { name: "Анна", role: "Викладачка STEAM", bio: "Біолог за освітою, дослідниця за покликанням. Перетворює науку на захоплюючу пригоду.", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { name: "Станіслав", role: "Викладач робототехніки", bio: "Інженер та ентузіаст технологій. Вчить дітей створювати роботів та програмувати.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { name: "Олександра", role: "Викладачка анімації", bio: "Художниця та аніматорка. Допомагає дітям оживлювати персонажів та створювати мультфільми.", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
  { name: "Валерія", role: "Викладачка математики", bio: "Математик та педагог. Робить цифри зрозумілими та цікавими для кожної дитини.", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" },
];

function AboutPage() {
  return (
    <>
      {/* Hero with logo placeholder */}
      <section className="relative py-20 md:py-28 bg-ufo-cream text-center overflow-hidden">
        <Star4 className="absolute top-10 left-10" color="#f7df5d" size={50} />
        <Dot className="absolute top-20 right-20" color="#f04770" size={20} />
        <Squiggle className="absolute bottom-10 right-10 opacity-70" color="#17c590" size={130} />
        <BlobShape className="absolute -bottom-12 -left-12 opacity-25" color="#3056dd" size={200} />

        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          {/* Logo placeholder */}
          <div className="inline-block bg-white rounded-3xl p-5 shadow-lg ring-4 ring-ufo-yellow/40 mb-8">
            <img src={ufoLogo} alt="UFO STEAM HUB Logo" className="h-20 md:h-24 w-auto object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground">
            Про <span className="text-primary">нас</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            UFO STEAM HUB — це простір для дітей, де наука стає пригодою, а навчання — захоплюючою грою. Ми віримо, що кожна дитина має потенціал стати дослідником, винахідником та творцем.
          </p>
        </AnimatedSection>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">Наші <span className="text-ufo-pink">цінності</span></h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="rounded-2xl bg-card border border-border p-6 text-center h-full shadow-sm hover:shadow-lg transition-shadow">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-ufo-yellow/30 flex items-center justify-center mb-4">
                    <v.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-20 bg-ufo-cream overflow-hidden">
        <Star4 className="absolute top-10 right-10" color="#f04770" size={40} />
        <Dot className="absolute bottom-20 left-12" color="#17c590" size={24} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">Наша <span className="text-ufo-green">команда</span></h2>
            <p className="mt-4 text-muted-foreground">Люди, які надихають дітей щодня</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="rounded-3xl bg-card border-2 border-border p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-ufo-yellow shadow-lg">
                    <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">{t.name}</h3>
                  <p className="mt-1 text-xs font-bold text-ufo-pink uppercase tracking-wide">{t.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
