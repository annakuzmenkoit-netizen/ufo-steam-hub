import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  buildRegistrationEmailFields,
  buildRegistrationSubject,
  currentPageMeta,
  normalizeRegistrationContext,
  summaryRows,
  type RegistrationContext,
} from "@/lib/registration-context";

const COURSE_OPTIONS = [
  "STEAM-гурток",
  "Робототехніка",
  "Анімація і мультиплікація",
  "Math&mind",
  "Математика",
  "3D моделювання",
];

const EVENT_NAME = "ufo:open-registration";
// FormSubmit forwards submissions directly to this email — no signup, no API key required.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/ufosteamhub@gmail.com";

export function openRegistration(context?: RegistrationContext | string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { context } }));
}

export function RegistrationModal() {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState<RegistrationContext>(() => normalizeRegistrationContext());
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [comment, setComment] = useState("");
  const [course, setCourse] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    function handler(e: Event) {
      const detail = (e as CustomEvent).detail as
        | { context?: RegistrationContext | string }
        | undefined;
      const ctx = normalizeRegistrationContext(detail?.context);
      setContext(ctx);
      setCourse(ctx.program ?? "");
      setSuccess(false);
      setOpen(true);
    }
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  function reset() {
    setParentName("");
    setPhone("");
    setChildName("");
    setChildAge("");
    setComment("");
    setCourse("");
    setSuccess(false);
  }

  const needsCourseSelect = !context.program && !context.eventName;
  const rows = summaryRows({ ...context, program: context.program ?? (course || undefined) });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!childName.trim() || !childAge.trim() || !parentName.trim() || !phone.trim()) {
      toast.error("Будь ласка, заповніть усі обов’язкові поля.");
      return;
    }
    if (needsCourseSelect && !course) {
      toast.error("Будь ласка, оберіть курс.");
      return;
    }

    const finalContext: RegistrationContext = {
      ...context,
      program: context.program ?? (course || undefined),
    };

    setSubmitting(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: buildRegistrationSubject(finalContext),
          _template: "table",
          ...buildRegistrationEmailFields(
            finalContext,
            { childName, childAge, parentName, phone, comment },
            currentPageMeta(),
          ),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSuccess(true);
      toast.success("Заявку надіслано!");
    } catch (err) {
      console.error("Registration submit failed", err);
      toast.error("Не вдалося надіслати заявку. Перевірте з’єднання та спробуйте ще раз.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setTimeout(reset, 200);
      }}
    >
      <DialogContent className="rounded-3xl sm:max-w-md max-h-[90vh] overflow-y-auto">
        {success ? (
          <div className="py-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-ufo-green/15 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-9 w-9 text-ufo-green" />
            </div>
            <DialogTitle className="text-2xl font-semibold text-primary">Дякуємо!</DialogTitle>
            <p className="mt-3 text-sm text-muted-foreground">
              Заявку отримано. Ми зв’яжемося з вами для уточнення деталей.
            </p>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-full bg-ufo-yellow hover:bg-ufo-yellow/90 text-primary font-semibold"
            >
              Закрити
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-primary">
                {context.title ?? "Записатись на заняття"}
              </DialogTitle>
              <DialogDescription>
                Залиште свої контакти — ми зв'яжемось з вами та підберемо зручний час.
              </DialogDescription>
            </DialogHeader>

            {rows.length > 0 && (
              <div className="rounded-2xl border-2 border-ufo-yellow/60 bg-ufo-yellow/10 p-4">
                <p className="text-sm font-semibold text-primary">Ви записуєтесь на:</p>
                <dl className="mt-2 space-y-1">
                  {rows.map((r) => (
                    <div key={r.label} className="flex gap-2 text-sm">
                      <dt className="text-muted-foreground">{r.label}:</dt>
                      <dd className="font-semibold text-foreground">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Ім’я дитини *</label>
                  <Input
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Ім’я"
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Вік дитини *</label>
                  <Input
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    placeholder="Напр. 8"
                    type="number"
                    min={2}
                    max={18}
                    className="mt-1 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Ім’я одного з батьків *</label>
                <Input
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Ваше ім’я"
                  className="mt-1 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Контактний номер телефону *</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+380 XX XXX XX XX"
                  type="tel"
                  className="mt-1 rounded-xl"
                />
              </div>
              {needsCourseSelect && (
                <div>
                  <label className="text-sm font-medium text-foreground">Курс *</label>
                  <Select value={course} onValueChange={setCourse}>
                    <SelectTrigger className="mt-1 rounded-xl h-10">
                      <SelectValue placeholder="Оберіть курс" />
                    </SelectTrigger>
                    <SelectContent>
                      {COURSE_OPTIONS.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-foreground">Коментар або побажання</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Необов’язково"
                  rows={3}
                  className="mt-1 rounded-xl"
                />
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
                  "Відправити заявку"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
