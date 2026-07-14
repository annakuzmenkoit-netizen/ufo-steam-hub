import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
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
    subtitle: "Бурчати можна — ми всі іноді втомлюємося чи не в настрої. Але робимо це без образ, з повагою до інших і з готовністю повернутися до пригод.",
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
import autumn4 from "@/assets/camps/autumn4.jpg";
import summer1 from "@/assets/camps/summer1.jpg";
import summer2 from "@/assets/camps/summer2.jpg";
import summer3 from "@/assets/camps/summer3.jpg";
import summer4 from "@/assets/camps/summer4.jpg";
import spring1 from "@/assets/camps/spring1.jpg";
import spring2 from "@/assets/camps/spring2.jpg";
import spring3 from "@/assets/camps/spring3.jpg";
import spring4 from "@/assets/camps/spring4.jpg";

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
      summer1,
      summer2,
      summer3,
      summer4,
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
      spring1,
      spring2,
      spring3,
      spring4,
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
  { name: "Олена Б.", text: "Дівчатка, дякую вам за організацію як сьогоднішнього дня, так і взагалі можливості дітям бути в вашому таборі!!! Моя дитина дуже задоволена😍" },
  { name: "Олена Ш.", text: "Щиро дякую за щасливу і задоволену дитину👍враження від табору дуже позитивні😁Чекаємо нових цікавих ідей 👍👍👍!" },
  { name: "Владислава К.", text: "Доєднуюсь! ! Безмежно вдячна вам! Я кожен день бачила свого сина дуже задоволеного і щасливого - це так цінно! ❤️❤️❤️❤️" },
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

  const [seasonLightbox, setSeasonLightbox] = useState<{
    title: string;
    images: string[];
    index: number;
  } | null>(null);

  function openCamp(camp: UpcomingCamp) {
    setSelectedCamp(camp);
    setDetailsOpen(true);
  }

  function openSeasonLightbox(title: string, images: string[], index: number) {
    setSeasonLightbox({ title, images, index });
  }

  function showPrevSeasonPhoto() {
    setSeasonLightbox((current) => {
      if (!current) return current;

      return {
        ...current,
        index: current.index === 0 ? current.images.length - 1 : current.index - 1,
      };
    });
  }

  function showNextSeasonPhoto() {
    setSeasonLightbox((current) => {
      if (!current) return current;

      return {
        ...current,
        index: current.index === current.images.length - 1 ? 0 : current.index + 1,
      };
    });
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

      {/* Майбутні табори */}
      <section className="py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Майбутні <span className="text-primary">табори</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Найближчі літні школи та інтенсиви UFO STEAM HUB.
            </p>
          </AnimatedSection>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4 -mx-4 md:mx-0 px-4 md:px-0 pb-4 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {upcomingCamps.map((camp, i) => (
              <AnimatedSection key={camp.title} delay={i * 0.08} className="snap-center shrink-0 w-[82%] xs:w-[70%] sm:w-[60%] md:w-auto">
                <button
                  type="button"
                  onClick={() => openCamp(camp)}
                  className={`w-full text-left rounded-3xl bg-card border-l-4 ${camp.color} border border-border p-5 md:p-6 shadow-md hover:shadow-xl md:hover:-translate-y-1 transition-all h-full flex flex-col`}
                >
                  <div className="text-4xl mb-3" aria-hidden>
                    {camp.emoji}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                    <CalendarDays className="h-4 w-4" /> {camp.date}
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">
                    {camp.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground flex-1">
                    {camp.desc}
                  </p>

                  <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ufo-yellow px-5 py-2.5 text-sm font-semibold text-primary shadow-md">
                    Детальніше <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </AnimatedSection>
            ))}
          </div>
          <p className="md:hidden mt-3 text-center text-xs text-muted-foreground">Гортайте вбік →</p>
        </div>
      </section>

      <CampDetailsDialog camp={selectedCamp} open={detailsOpen} onOpenChange={setDetailsOpen} />

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

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {summerSchoolFeatures.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.05}>
                <div className="rounded-2xl md:rounded-3xl bg-card border-2 border-border p-3 md:p-6 shadow-sm hover:shadow-md md:hover:-translate-y-1 transition-all h-full">
                  <div className={`${f.bg} rounded-xl md:rounded-2xl w-10 h-10 md:w-14 md:h-14 flex items-center justify-center mb-2 md:mb-4`}>
                    <f.icon className={`h-5 w-5 md:h-7 md:w-7 ${f.color}`} strokeWidth={1.75} />
                  </div>
                  <p className="text-sm md:text-base font-semibold text-foreground leading-snug">
                    {f.title}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Правила нашого табору */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Правила <span className="text-primary">нашого табору</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Кілька простих орієнтирів, які роблять кожен день у таборі теплим і цікавим.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {campRules.map((r, i) => (
              <AnimatedSection key={r.title} delay={i * 0.05}>
                <div className={`rounded-2xl md:rounded-3xl bg-card border-2 ${r.accent} p-3 md:p-5 text-center shadow-sm hover:shadow-md md:hover:-translate-y-1 transition-all h-full`}>
                  <div className={`${r.bg} rounded-xl md:rounded-2xl w-10 h-10 md:w-14 md:h-14 mx-auto flex items-center justify-center mb-2 md:mb-3`}>
                    <r.icon className={`h-5 w-5 md:h-7 md:w-7 ${r.color}`} strokeWidth={1.75} />
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-foreground">
                    {r.title}
                  </p>
                  <p className="mt-1.5 md:mt-2 text-[11px] md:text-xs text-muted-foreground leading-relaxed">
                    {r.subtitle}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Табори за сезонами — interactive */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Атмосфера наших <span className="text-ufo-green">таборів і літніх шкіл</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Оберіть сезон, щоб побачити особливості та галерею.
            </p>
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
                      <h3 className="text-2xl font-semibold">
                        {s.name} табір
                      </h3>
                      <p className="text-base opacity-95">
                        {s.desc}
                      </p>
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
                          <button
                            key={`${s.key}-${n}`}
                            type="button"
                            onClick={() => openSeasonLightbox(`${s.name} табір`, s.gallery, n)}
                            className="group aspect-square rounded-2xl overflow-hidden bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/80"
                            aria-label={`Відкрити фото ${n + 1}: ${s.name} табір`}
                          >
                            <img
                              src={src}
                              alt={`${s.name} — фото ${n + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                              decoding="async"
                            />
                          </button>
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

      {/* Reviews */}
      <section className="py-14 md:py-20 bg-ufo-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Відгуки <span className="text-ufo-pink">батьків</span>
            </h2>
          </AnimatedSection>

          {/* Mobile: horizontal swipe carousel with CTA at end */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {reviews.map((r) => (
              <div key={r.name} className="snap-center shrink-0 w-[85%]">
                <div className="rounded-3xl bg-card border-2 border-border p-5 shadow-md h-full">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-ufo-yellow text-ufo-yellow" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{r.text}"</p>
                  <p className="mt-4 text-sm font-semibold text-foreground">— {r.name}</p>
                </div>
              </div>
            ))}
            {/* Final CTA card */}
            <div className="snap-center shrink-0 w-[85%]">
              {/* TODO: swap Link `to` to a dedicated review-submission page if one is added */}
              <div className="rounded-3xl bg-ufo-yellow border-2 border-ufo-yellow p-5 shadow-md h-full flex flex-col">
                <div className="text-3xl mb-2" aria-hidden>❤️</div>
                <h3 className="text-lg font-semibold text-primary">Додайте свій відгук ❤️</h3>
                <p className="mt-2 text-sm text-primary/80 flex-1">
                  Ми будемо дуже вдячні, якщо ви поділитеся своїми враженнями про UFO STEAM HUB.
                </p>
                <Link
                  to="/contacts"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                  aria-label="Залишити відгук — перейти до контактів"
                >
                  Залишити відгук <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <p className="md:hidden -mt-2 text-center text-xs text-muted-foreground">Гортайте вбік →</p>

          {/* Desktop grid unchanged */}
          <div className="hidden md:grid grid-cols-3 gap-6">
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

      <Dialog open={!!seasonLightbox} onOpenChange={(open) => !open && setSeasonLightbox(null)}>
        <DialogContent className="max-w-5xl rounded-3xl p-3 sm:p-5 max-h-[90vh] overflow-y-auto">
          {seasonLightbox && (
            <div className="space-y-4">
              <DialogTitle className="text-center text-lg font-semibold text-foreground">
                {seasonLightbox.title} — фото {seasonLightbox.index + 1} з {seasonLightbox.images.length}
              </DialogTitle>

              <div className="relative overflow-hidden rounded-2xl bg-black/5">
                <img
                  src={seasonLightbox.images[seasonLightbox.index]}
                  alt={`${seasonLightbox.title} фото ${seasonLightbox.index + 1}`}
                  className="max-h-[70vh] w-full object-contain"
                  loading="eager"
                />

                {seasonLightbox.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevSeasonPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-xl font-bold text-primary shadow-md hover:bg-white"
                      aria-label="Попереднє фото"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={showNextSeasonPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-xl font-bold text-primary shadow-md hover:bg-white"
                      aria-label="Наступне фото"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {seasonLightbox.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {seasonLightbox.images.map((src, n) => (
                    <button
                      key={`${src}-${n}`}
                      type="button"
                      onClick={() =>
                        setSeasonLightbox((current) =>
                          current ? { ...current, index: n } : current
                        )
                      }
                      className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 ${
                        seasonLightbox.index === n ? "border-primary" : "border-transparent"
                      }`}
                      aria-label={`Показати фото ${n + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${seasonLightbox.title} мініатюра ${n + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
