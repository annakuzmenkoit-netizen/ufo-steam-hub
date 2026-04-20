import { createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Heart, Target, Eye, Users } from "lucide-react";

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
  { name: "Катерина", role: "Засновниця та керівниця", bio: "Понад 10 років у сфері дитячої освіти. Натхненниця всіх наших проєктів та ініціатив.", color: "from-ufo-pink/30 to-ufo-yellow/30" },
  { name: "Анна", role: "Бу бУ бу", bio: "Біолог за освітою, дослідниця за покликанням. Перетворює науку на захоплюючу пригоду.", color: "from-ufo-blue/30 to-ufo-green/30" },
  { name: "Станіслав", role: "Викладач робототехніки", bio: "Інженер та ентузіаст технологій. Вчить дітей створювати роботів та програмувати.", color: "from-ufo-green/30 to-ufo-blue/30" },
  { name: "Олександра", role: "Викладачка анімації", bio: "Художниця та аніматорка. Допомагає дітям оживлювати персонажів та створювати мультфільми.", color: "from-ufo-pink/30 to-ufo-blue/30" },
  { name: "Валерія", role: "Викладачка математики", bio: "Математик та педагог. Робить цифри зрозумілими та цікавими для кожної дитини.", color: "from-ufo-yellow/30 to-ufo-green/30" },
];

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-ufo-cream text-center relative overflow-hidden">
        <div className="absolute top-10 right-20 w-24 h-24 rounded-full bg-ufo-yellow/20 blur-xl" />
        <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-ufo-green/10 blur-xl" />
        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Про нас</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            UFO STEAM HUB — це простір для дітей, де наука стає пригодою, а навчання — захоплюючою грою. Ми віримо, що кожна дитина має потенціал стати дослідником, винахідником та творцем.
          </p>
        </AnimatedSection>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">Наші цінності</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="rounded-2xl bg-card border border-border p-6 text-center h-full shadow-sm hover:shadow-lg transition-shadow">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-ufo-yellow/20 flex items-center justify-center mb-4">
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
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">Наша команда</h2>
            <p className="mt-4 text-muted-foreground">Люди, які надихають дітей щодня</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="rounded-3xl bg-card border-2 border-border p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col items-center">
                  {/* Circular photo placeholder */}
                  <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center mb-4 ring-4 ring-ufo-yellow shadow-lg`}>
                    <span className="text-4xl font-black text-primary">{t.name[0]}</span>
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
