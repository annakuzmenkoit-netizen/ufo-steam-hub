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
  { name: "Катерина", role: "Засновниця та керівниця", color: "from-ufo-pink/20 to-ufo-yellow/20" },
  { name: "Анна", role: "Викладачка STEAM", color: "from-ufo-blue/20 to-ufo-green/20" },
  { name: "Станіслав", role: "Викладач робототехніки", color: "from-ufo-green/20 to-ufo-blue/20" },
  { name: "Олександра", role: "Викладачка анімації", color: "from-ufo-pink/20 to-ufo-blue/20" },
  { name: "Валерія", role: "Викладачка математики", color: "from-ufo-yellow/20 to-ufo-green/20" },
];

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-ufo-cream text-center relative overflow-hidden">
        <div className="absolute top-10 right-20 w-24 h-24 rounded-full bg-ufo-yellow/30 blur-xl" />
        <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-ufo-green/20 blur-xl" />
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
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
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
                <div className="rounded-2xl bg-card border border-border p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                  <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center mb-4`}>
                    <span className="text-2xl font-bold text-primary">{t.name[0]}</span>
                  </div>
                  <h3 className="font-bold text-foreground">{t.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{t.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
