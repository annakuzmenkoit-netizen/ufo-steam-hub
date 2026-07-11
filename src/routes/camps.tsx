import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  CalendarDays, Star, Snowflake, Leaf, Sun, Flower2,
  Heart, Sparkles, Trees, Smartphone, Smile, ArrowRight,
  Rocket, Users2, Lightbulb, Compass, Handshake, Target, Loader2, CheckCircle2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Star4, Dot, Squiggle, BlobShape } from "@/components/Blobs";

export const Route = createFileRoute("/camps")({
  head: () => ({
    meta: [
      { title: "Табори — UFO STEAM HUB" },
      { name: "description", content: "STEAM-табори для дітей — літні школи, підліткові табори та сезонні програми." },
      { property: "og:title", content: "Табори — UFO STEAM HUB" },
      { property: "og:description", content: "Літні школи, підліткові табори та тематичні програми UFO STEAM HUB." },
    ],
  }),
  component: CampsPage,
});

type UpcomingCamp = {
  emoji: string;
  date: string;
  title: string;
  desc: string;
  color: string;
  program: { day: string; text: string }[];
};

const upcomingCamps: UpcomingCamp[] = [
  {
    emoji: "🎬",
    date: "3–7 серпня",
    title: "Літня школа «Анімація»",
    desc: "Створення власних мультфільмів, персонажів і творчих історій.",
    color: "border-l-ufo-pink",
    program: [
      { day: "День 1", text: "Ідея та персонажі — знайомимося з анімацією, вигадуємо історію, створюємо головних героїв." },
      { day: "День 2", text: "Сценарій і розкадрування — перетворюємо ідею на план мультфільму й продумуємо ключові сцени." },
      { day: "День 3", text: "Оживляємо історію — працюємо з рухом, кадрами, емоціями персонажів і першими анімаційними сценами." },
      { day: "День 4", text: "Звук і монтаж — додаємо голоси, музику, титри та збираємо мультфільм у готову історію." },
      { day: "День 5", text: "Прем’єра — завершуємо мультфільми, презентуємо роботи й обговорюємо творчий результат." },
    ],
  },
  {
    emoji: "🧩",
    date: "11–14 серпня",
    title: "Літня школа «3D-моделювання»",
    desc: "Знайомство зі світом 3D-друку та створення власних моделей.",
    color: "border-l-ufo-green",
    program: [
      { day: "День 1", text: "Знайомство з 3D — розбираємо, як працює 3D-моделювання, створюємо перші прості об’єкти." },
      { day: "День 2", text: "Власна модель — вчимося працювати з формами, деталями, масштабом і створюємо власний дизайн." },
      { day: "День 3", text: "Підготовка до 3D-друку — перевіряємо модель, виправляємо помилки й готуємо її до друку." },
      { day: "День 4", text: "Презентація проєктів — завершуємо моделі, обговорюємо ідеї та показуємо результат роботи." },
    ],
  },
  {
    emoji: "🤖",
    date: "17–21 серпня",
    title: "Літня школа «Робототехніка»",
    desc: "Конструювання, програмування та STEAM-виклики для юних винахідників.",
    color: "border-l-ufo-blue",
    program: [
      { day: "День 1", text: "Конструювання — знайомимося з наборами, механізмами й базовими принципами роботи роботів." },
      { day: "День 2", text: "Алгоритми та програмування — вчимо робота виконувати команди й реагувати на умови." },
      { day: "День 3", text: "Сенсори та виклики — додаємо датчики, тестуємо моделі й розв’язуємо перші STEAM-завдання." },
      { day: "День 4", text: "Командний проєкт — створюємо робота для конкретної місії, покращуємо конструкцію та програму." },
      { day: "День 5", text: "Фінальний челендж — презентуємо роботів, проходимо командні випробування й підбиваємо підсумки." },
    ],
  },
  {
    emoji: "🧠",
    date: "25–27 серпня",
    title: "«Математичний інтенсив»",
    desc: "Цікава математика, логіка та практичні завдання.",
    color: "border-l-ufo-yellow",
    program: [
      { day: "День 1", text: "Логіка та стратегії — розв’язуємо нестандартні задачі, головоломки й тренуємо математичне мислення." },
      { day: "День 2", text: "Практична математика — працюємо з життєвими ситуаціями, обчисленнями, закономірностями й командними задачами." },
      { day: "День 3", text: "Математичний квест — закріплюємо навички через гру, челенджі, командну роботу й фінальну рефлексію." },
    ],
  },
];

const campRules = [
  {
    title: "Повага",
    subtitle: "Слухаємо одне одного, підтримуємо команду й дбайливо ставимося до кожної дитини.",
    icon: Heart, bg: "bg-ufo-pink/10", color: "text-ufo-pink", accent: "border-ufo-pink",
  },
  {
    title: "Самозарадність",
    subtitle: "Вчимося пробувати, питати, приймати рішення й поступово ставати впевненішими.",
    icon: Sparkles, bg: "bg-ufo-blue/10", color: "text-primary", accent: "border-ufo-blue",
  },
  {
    title: "Гуляємо щодня",
    subtitle: "Щодня маємо час для руху, свіжого повітря, ігор і перезавантаження.",
    icon: Trees, bg: "bg-ufo-green/10", color: "text-ufo-green", accent: "border-ufo-green",
  },
  {
    title: "Без гаджетів",
    subtitle: "Замість екранів — живе спілкування, творчість, дослідження, командна робота й активності.",
    icon: Smartphone, bg: "bg-ufo-yellow/30", color: "text-primary", accent: "border-ufo-yellow",
  },
  {
    title: "Бу-бу-бу",
    subtitle: "Наше веселе правило про настрій: менше бурчання — більше пригод, спроб і відкриттів.",
    icon: Smile, bg: "bg-ufo-pink/10", color: "text-ufo-pink", accent: "border-ufo-pink",
  },
];

import winter1 from "@/assets/camps/winter1.jpg";
import winter2 from "@/assets/camps/winter2.jpg";
import winter3 from "@/assets/camps/winter3.jpg";
import winter4 from "@/assets/camps/winter4.jpg";
import autumn1 from "@/assets/camps/autumn1.jpg";
import autumn2 from "@/assets/camps/autumn2.jpg";
import autumn3 from "@/assets/camps/autumn3.jpg";
import autumnr4 from "@/assets/camps/autumn4.jpg";

const seasons = [
  {
    key: "winter",
    name: "Зимовий",
    desc: "присвячуємо магії свят і пошуку світла в собі",
    icon: Snowflake,
    bg: "bg-ufo-blue",
    text: "text-white",
    accent: "bg-white/20",
    features: [
      "Новорічні майстерні та творчі проєкти",
      "Пошук світла та тепла у собі",
      "Історії, ігри та затишні активності",
      "Прогулянки та зимові пригоди",
    ],
    gallery: [
      winter1,
      winter2,
      winter3,
      winter4,
    ],
  },
  {
    key: "autumn",
    name: "Осінній",
    desc: "енергія міста, табір для підлітків щоб полюбити себе і знайти себе у цьому місті",
    icon: Leaf,
    bg: "bg-ufo-pink",
    text: "text-white",
    accent: "bg-white/20",
    features: [
      "Формат для підлітків",
      "Дослідження міста та себе у ньому",
      "Творчі проєкти та самопізнання",
      "Спілкування з однолітками",
    ],
    gallery: [
      autumn1,
      autumn2,
      autumn3,
      autumn4,
    ],
  },
  {
    key: "summer",
    name: "Літній",
    desc: "у ритмі з природою а також тематичні табори",
    icon: Sun,
    bg: "bg-ufo-yellow",
    text: "text-primary",
    accent: "bg-primary/15",
    features: [
      "Тематичні тижні протягом літа",
      "У ритмі з природою",
      "STEAM-експерименти на свіжому повітрі",
      "Прогулянки, ігри та відкриття щодня",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    key: "spring",
    name: "Весняний",
    desc: "детективні пригоди",
    icon: Flower2,
    bg: "bg-ufo-green",
    text: "text-white",
    accent: "bg-white/20",
    features: [
      "Детективні квести та розслідування",
      "Логіка, спостережливість, команда",
      "Пригоди у місті та на природі",
      "Творчі та наукові виклики",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1490718720478-364a07a997cd?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1471189060473-3e64c6c02b04?auto=format&fit=crop&w=700&q=80",
    ],
  },
];

const summerSchoolFeatures = [
  { title: "Короткі інтенсивні формати", icon: Rocket, bg: "bg-ufo-blue/10", color: "text-primary" },
  { title: "Практичні заняття щодня", icon: Sparkles, bg: "bg-ufo-yellow/30", color: "text-primary" },
  { title: "Власний результат наприкінці програми", icon: Star, bg: "bg-ufo-pink/10", color: "text-ufo-pink" },
  { title: "Творчість + технології", icon: Lightbulb, bg: "bg-ufo-green/10", color: "text-ufo-green" },
  { title: "Дружня атмосфера", icon: Smile, bg: "bg-ufo-pink/10", color: "text-ufo-pink" },
  { title: "Підходить для дітей, які хочуть спробувати новий напрям", icon: Compass, bg: "bg-ufo-blue/10", color: "text-primary" },
];

const teenCampFeatures = [
  { title: "Проєктна робота", icon: Target, bg: "bg-ufo-blue/10", color: "text-primary" },
  { title: "Командні челенджі", icon: Users2, bg: "bg-ufo-green/10", color: "text-ufo-green" },
  { title: "Технології та творчість", icon: Lightbulb, bg: "bg-ufo-yellow/30", color: "text-primary" },
  { title: "Самостійність і відповідальність", icon: Compass, bg: "bg-ufo-pink/10", color: "text-ufo-pink" },
  { title: "Спілкування з однолітками", icon: Handshake, bg: "bg-ufo-blue/10", color: "text-primary" },
  { title: "Практичний результат", icon: Star, bg: "bg-ufo-green/10", color: "text-ufo-green" },
];

const reviews = [
  { name: "Олена М.", text: "Дитина просто в захваті! Кожен день розповідала про нові відкриття. Дякуємо команді за турботу та креативність!" },
  { name: "Ігор К.", text: "Чудова організація, безпечна атмосфера. Син хоче повернутися знову!" },
  { name: "Марина С.", text: "Вперше бачила, щоб дитина сама просилася на заняття. Рекомендую всім батькам!" },
];

const FORM_ENDPOINT = "https://formsubmit.co/ajax/ufosteamhub@gmail.com";

function CampDetailsDialog({ camp, open, onOpenChange }: {
  camp: UpcomingCamp | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOther, setCategoryOther] = useState("");
  const [health, setHealth] = useState("");
  const [allergies, setAllergies] = useState("");
  const [consentData, setConsentData] = useState(false);
  const [consentPhoto, setConsentPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function reset() {
    setChildName(""); setChildAge(""); setParentName(""); setPhone("");
    setCategory(""); setCategoryOther(""); setHealth(""); setAllergies("");
    setConsentData(false); setConsentPhoto(false); setSuccess(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!camp) return;
    if (!childName.trim() || !childAge.trim() || !parentName.trim() || !phone.trim() || !category) {
      toast.error("Будь ласка, заповніть усі обов'язкові поля.");
      return;
    }
    if (category === "Інше" && !categoryOther.trim()) {
      toast.error("Будь ласка, вкажіть категорію.");
      return;
    }
    if (!consentData || !consentPhoto) {
      toast.error("Підтвердьте згоду на обробку персональних даних та фото-/відеозйомку.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Заявка на табір — ${camp.title} (${camp.date})`,
          _template: "table",
          "Табір": camp.title,
          "Дати": camp.date,
          "Ім'я учасника/учасниці": childName,
          "Повних років": childAge,
          "Ім'я та прізвище одного з батьків або опікунів": parentName,
          "Контактний номер телефону": phone,
          "Категорія": category === "Інше" ? `Інше: ${categoryOther}` : category,
          "Особливості здоров'я": health || "—",
          "Алергічні реакції": allergies || "—",
          "Згода на обробку персональних даних": "Так",
          "Згода на фото-/відеозйомку": "Так",
          "Джерело": "UFO STEAM HUB — сторінка Табори",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSuccess(true);
      toast.success("Заявку надіслано!");
    } catch (err) {
      console.error("Camp registration failed", err);
      toast.error("Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setTimeout(reset, 200);
      }}
    >
      <DialogContent className="rounded-3xl sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {!camp ? null : success ? (
          <div className="py-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-ufo-green/15 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-9 w-9 text-ufo-green" />
            </div>
            <DialogTitle className="text-2xl font-semibold text-primary">Дякуємо!</DialogTitle>
            <p className="mt-3 text-sm text-muted-foreground">
              Ми отримали вашу заявку та зв'яжемося з вами найближчим часом.
            </p>
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-6 w-full rounded-full bg-ufo-yellow hover:bg-ufo-yellow/90 text-primary font-semibold"
            >
              Закрити
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="text-3xl" aria-hidden>{camp.emoji}</div>
              <DialogTitle className="text-2xl font-semibold text-primary">{camp.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-sm">
                <CalendarDays className="h-4 w-4 text-ufo-pink" />
                <span className="font-semibold text-foreground">{camp.date}</span>
              </DialogDescription>
              <p className="text-sm text-muted-foreground pt-1">{camp.desc}</p>
            </DialogHeader>

            {/* Програма */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">Програма по днях</h3>
              <ol className="space-y-3">
                {camp.program.map((p) => (
                  <li key={p.day} className="rounded-2xl border-2 border-border bg-card p-4">
                    <p className="text-sm font-semibold text-primary">{p.day}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Форма */}
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Записатися на табір</h3>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Ім'я учасника/учасниці табору <span className="text-ufo-pink">*</span></Label>
                  <Input value={childName} onChange={(e) => setChildName(e.target.value)} required className="mt-1 rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Повних років <span className="text-ufo-pink">*</span></Label>
                  <Input type="number" min={3} max={18} value={childAge} onChange={(e) => setChildAge(e.target.value)} required className="mt-1 rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Ім'я та прізвище одного з батьків або опікунів <span className="text-ufo-pink">*</span></Label>
                  <Input value={parentName} onChange={(e) => setParentName(e.target.value)} required className="mt-1 rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Контактний номер телефону <span className="text-ufo-pink">*</span></Label>
                  <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+380..." required className="mt-1 rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Чи належите до наступних категорій? <span className="text-ufo-pink">*</span></Label>
                  <RadioGroup value={category} onValueChange={setCategory} className="mt-2 space-y-2">
                    {["Новомістяни", "Родини військових", "Ні", "Інше"].map((opt) => (
                      <div key={opt} className="flex items-center gap-2">
                        <RadioGroupItem value={opt} id={`cat-${opt}`} />
                        <Label htmlFor={`cat-${opt}`} className="text-sm font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {category === "Інше" && (
                    <Input
                      value={categoryOther}
                      onChange={(e) => setCategoryOther(e.target.value)}
                      placeholder="Вкажіть категорію"
                      className="mt-2 rounded-xl"
                    />
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Чи має ваша дитина особливості здоровʼя, на які необхідно звернути увагу?</Label>
                  <Textarea
                    value={health}
                    onChange={(e) => setHealth(e.target.value)}
                    placeholder="Наприклад: режим, обмеження активності, особливі потреби, важлива інформація для команди."
                    className="mt-1 rounded-xl"
                    rows={3}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Чи має ваша дитина алергічні реакції?</Label>
                  <Textarea
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="Наприклад: продукти, напої, медикаменти або інші алергени."
                    className="mt-1 rounded-xl"
                    rows={3}
                  />
                </div>

                {/* Consents */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={consentData}
                      onCheckedChange={(v) => setConsentData(v === true)}
                      className="mt-0.5"
                    />
                    <span className="text-sm text-foreground">
                      Я даю згоду на обробку персональних даних відповідно до чинного законодавства України.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={consentPhoto}
                      onCheckedChange={(v) => setConsentPhoto(v === true)}
                      className="mt-0.5"
                    />
                    <span className="text-sm text-foreground">
                      Я даю згоду на фото- та відеозйомку дитини під час табірної зміни.
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-ufo-yellow hover:bg-ufo-yellow/90 text-primary py-3 font-semibold text-base shadow-md"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Надсилаємо...
                    </span>
                  ) : (
                    "Надіслати заявку"
                  )}
                </Button>
              </form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CampsPage() {
  const [activeSeason, setActiveSeason] = useState<string>(seasons[0].key);
  const [selectedCamp, setSelectedCamp] = useState<UpcomingCamp | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  function openCamp(camp: UpcomingCamp) {
    setSelectedCamp(camp);
    setDetailsOpen(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-ufo-cream text-center relative overflow-hidden">
        <Star4 className="absolute top-10 left-10" color="#f7df5d" size={50} />
        <Dot className="absolute top-20 right-20" color="#f04770" size={20} />
        <Squiggle className="absolute bottom-10 right-10 opacity-70" color="#17c590" size={130} />
        <BlobShape className="absolute -bottom-12 -left-12 opacity-25" color="#3056dd" size={200} />
        <AnimatedSection className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground">
            Наші <span className="text-ufo-pink">табори</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Канікули з користю — STEAM-табори UFO STEAM HUB, де діти відкривають нове, знаходять друзів та отримують незабутні враження.
          </p>
        </AnimatedSection>
      </section>

      {/* Правила нашого табору */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Правила <span className="text-primary">нашого табору</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Кілька простих орієнтирів, які роблять кожен день у таборі теплим і цікавим.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {campRules.map((r, i) => (
              <AnimatedSection key={r.title} delay={i * 0.05}>
                <div className={`rounded-3xl bg-card border-2 ${r.accent} p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full`}>
                  <div className={`${r.bg} rounded-2xl w-14 h-14 mx-auto flex items-center justify-center mb-3`}>
                    <r.icon className={`h-7 w-7 ${r.color}`} strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{r.title}</p>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{r.subtitle}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Майбутні табори */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Майбутні <span className="text-primary">табори</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Найближчі літні школи та інтенсиви UFO STEAM HUB.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingCamps.map((camp, i) => (
              <AnimatedSection key={camp.title} delay={i * 0.08}>
                <button
                  type="button"
                  onClick={() => openCamp(camp)}
                  className={`w-full text-left rounded-3xl bg-card border-l-4 ${camp.color} border border-border p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col`}
                >
                  <div className="text-4xl mb-3" aria-hidden>{camp.emoji}</div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                    <CalendarDays className="h-4 w-4" /> {camp.date}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{camp.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{camp.desc}</p>
                  <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ufo-yellow px-5 py-2.5 text-sm font-semibold text-primary shadow-md">
                    Детальніше <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CampDetailsDialog camp={selectedCamp} open={detailsOpen} onOpenChange={setDetailsOpen} />

      {/* Табори за сезонами — interactive */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Табори <span className="text-ufo-green">за сезонами</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Оберіть сезон, щоб побачити особливості та галерею.</p>
          </AnimatedSection>

          <Tabs value={activeSeason} onValueChange={setActiveSeason} className="w-full">
            <TabsList className="flex flex-wrap h-auto justify-center gap-2 bg-transparent p-0 mb-8">
              {seasons.map((s) => (
                <TabsTrigger
                  key={s.key}
                  value={s.key}
                  className="rounded-full border-2 border-border bg-card px-5 py-2 text-sm font-semibold text-foreground data-[state=active]:bg-ufo-yellow data-[state=active]:text-primary data-[state=active]:border-ufo-yellow data-[state=active]:shadow-md"
                >
                  <s.icon className="h-4 w-4 mr-2" /> {s.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {seasons.map((s) => (
              <TabsContent key={s.key} value={s.key} className="mt-0">
                <div className={`${s.bg} ${s.text} rounded-3xl p-6 md:p-8 shadow-lg`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${s.accent} rounded-2xl w-14 h-14 flex items-center justify-center shrink-0`}>
                      <s.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{s.name} табір</h3>
                      <p className="text-base opacity-95">{s.desc}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Особливості */}
                    <div className={`${s.accent} rounded-2xl p-5`}>
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Star className="h-5 w-5" /> Особливості
                      </h4>
                      <ul className="space-y-2">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm opacity-95">
                            <span className="shrink-0 mt-0.5">✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Галерея */}
                    <div className={`${s.accent} rounded-2xl p-5`}>
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5" /> Галерея
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {s.gallery.map((src, n) => (
                          <div key={n} className="aspect-square rounded-2xl overflow-hidden bg-white/10">
                            <img src={src} alt={`${s.name} — фото ${n + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Літні школи */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Літні <span className="text-ufo-pink">школи</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Літні школи UFO STEAM HUB — це короткі тематичні програми, де діти створюють власні проєкти, пробують нові технології, працюють у команді та навчаються через практику.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {summerSchoolFeatures.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.05}>
                <div className="rounded-3xl bg-card border-2 border-border p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full">
                  <div className={`${f.bg} rounded-2xl w-14 h-14 flex items-center justify-center mb-4`}>
                    <f.icon className={`h-7 w-7 ${f.color}`} strokeWidth={1.75} />
                  </div>
                  <p className="text-base font-semibold text-foreground">{f.title}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Підліткові табори */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Підліткові <span className="text-ufo-green">табори</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Формат для підлітків, де вони працюють над проєктами, беруть участь у командних челенджах, поєднують технології з творчістю та розвивають самостійність.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teenCampFeatures.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.05}>
                <div className="rounded-3xl bg-card border-2 border-border p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full">
                  <div className={`${f.bg} rounded-2xl w-14 h-14 flex items-center justify-center mb-4`}>
                    <f.icon className={`h-7 w-7 ${f.color}`} strokeWidth={1.75} />
                  </div>
                  <p className="text-base font-semibold text-foreground">{f.title}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Відгуки <span className="text-ufo-pink">батьків</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <AnimatedSection key={r.name} delay={i * 0.1}>
                <div className="rounded-3xl bg-card border-2 border-border p-6 shadow-md hover:shadow-lg transition-shadow h-full">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-ufo-yellow text-ufo-yellow" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{r.text}"</p>
                  <p className="mt-4 text-sm font-semibold text-foreground">— {r.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
