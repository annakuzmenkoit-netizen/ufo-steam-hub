import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle2, Loader2, X, ChevronDown, ArrowRight, Phone } from "lucide-react";
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
  const isInquiry = context.intent === "inquiry";
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    const updateViewport = () => {
      panelRef.current?.style.setProperty("--registration-height", `${viewport?.height ?? window.innerHeight}px`);
      panelRef.current?.style.setProperty("--registration-top", `${viewport?.offsetTop ?? 0}px`);
    };
    updateViewport();
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);
    return () => {
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    };
  }, [open]);

  useEffect(() => {
    function handler(e: Event) {
      const detail = (e as CustomEvent).detail as
        | { context?: RegistrationContext | string }
        | undefined;
      const ctx = normalizeRegistrationContext(detail?.context);
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setContext(ctx);
      setSuccess(false);
      setError("");
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
    setError("");
  }

  const needsCourseSelect = !context.program && !context.eventName;
  const rows = summaryRows({ ...context, program: context.program ?? (course || undefined) });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if ((!isInquiry && (!childName.trim() || !childAge.trim())) || !parentName.trim() || !phone.trim()) {
      setError("Заповніть, будь ласка, усі обов’язкові поля.");
      return;
    }
    if (needsCourseSelect && !course) {
      setError("Оберіть, будь ласка, курс.");
      return;
    }

    const finalContext: RegistrationContext = {
      ...context,
      program: context.program ?? (course || undefined),
    };

    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        signal: AbortSignal.timeout(20000),
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
      toast.success(isInquiry ? "Запит надіслано!" : "Заявку надіслано!");
    } catch (err) {
      console.error("Registration submit failed", err);
      setError(`Не вдалося надіслати ${isInquiry ? "запит" : "заявку"}. Ваші дані збережено у формі — перевірте з’єднання та спробуйте ще раз.`);
    } finally {
      setSubmitting(false);
    }
  }

  function changeOpen(next: boolean) {
    if (submitting) return;
    setOpen(next);
    if (!next && success) reset();
  }

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogContent
        ref={(panel) => {
          panelRef.current = panel;
          if (panel) {
            const viewport = window.visualViewport;
            panel.style.setProperty("--registration-height", `${viewport?.height ?? window.innerHeight}px`);
            panel.style.setProperty("--registration-top", `${viewport?.offsetTop ?? 0}px`);
          }
        }}
        className="registration-panel"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (openerRef.current?.isConnected) openerRef.current.focus();
        }}
      >
        <DialogHeader className="registration-header">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-ufo-green" /> UFO STEAM HUB
          </div>
          <DialogTitle className="text-xl font-semibold leading-tight text-primary sm:text-2xl">
            {success ? (isInquiry ? "Запит надіслано!" : "Заявку надіслано!") : (isInquiry ? "Дізнатися про мінікурс" : "Запис на заняття")}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {success ? "Дякуємо за інтерес до наших занять." : (isInquiry ? "Залиште контакти — розкажемо про програму та відповімо на запитання." : "Залиште контакти — ми зателефонуємо й узгодимо деталі.")}
          </DialogDescription>
          <DialogClose disabled={submitting} className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-secondary disabled:opacity-40" aria-label="Закрити форму">
            <X className="h-5 w-5" />
          </DialogClose>
        </DialogHeader>

        <div className="registration-body">
          {success ? (
            <div className="py-8 text-center" role="status">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-ufo-green/15">
                <CheckCircle2 className="h-9 w-9 text-ufo-green" />
              </div>
              <h3 className="text-xl font-semibold">До зустрічі в UFO!</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Ми зв’яжемося з вами для уточнення деталей. Повторно надсилати заявку не потрібно.
              </p>
            </div>
          ) : (
            <form id="registration-form" onSubmit={onSubmit} className="space-y-5" aria-busy={submitting}>
              {rows.length > 0 && (context.program || context.eventName || context.date) && (
                <details className="group rounded-2xl border border-primary/10 bg-primary/5 p-3.5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0 leading-relaxed">{context.program ?? context.eventName ?? context.title}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <dl className="mt-3 space-y-2 border-t border-primary/10 pt-3">
                    {rows.map((row) => (
                      <div key={row.label} className="grid grid-cols-[auto_1fr] gap-3 text-sm">
                        <dt className="text-muted-foreground">{row.label}</dt>
                        <dd className="min-w-0 break-words font-medium">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              )}

              <fieldset disabled={submitting} className="min-w-0 space-y-4 disabled:opacity-70">
                <legend className="mb-3 text-sm font-semibold text-foreground">Контакти для зв’язку</legend>
                <div>
                  <label htmlFor="registration-parent" className="text-sm font-medium">Ім’я одного з батьків <span aria-hidden="true">*</span></label>
                  <Input id="registration-parent" name="parentName" autoComplete="section-parent given-name" required maxLength={120} value={parentName} onChange={(event) => setParentName(event.target.value)} placeholder="Як до вас звертатися?" className="mt-1.5 h-12 rounded-xl" />
                </div>
                <div>
                  <label htmlFor="registration-phone" className="text-sm font-medium">Телефон <span aria-hidden="true">*</span></label>
                  <Input id="registration-phone" name="phone" type="tel" inputMode="tel" autoComplete="section-parent tel" required maxLength={30} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+380 XX XXX XX XX" className="mt-1.5 h-12 rounded-xl" />
                </div>
              </fieldset>

              <fieldset disabled={submitting} className="min-w-0 space-y-4 disabled:opacity-70">
                <legend className="mb-3 text-sm font-semibold text-foreground">{isInquiry ? "Про дитину (необов’язково)" : "Про дитину"}</legend>
                <div className="grid grid-cols-[minmax(0,1fr)_5.5rem] gap-3">
                  <div>
                    <label htmlFor="registration-child" className="text-sm font-medium">Ім’я дитини {!isInquiry && <span aria-hidden="true">*</span>}</label>
                    <Input id="registration-child" name="childName" autoComplete="section-child given-name" required={!isInquiry} maxLength={120} value={childName} onChange={(event) => setChildName(event.target.value)} placeholder="Ім’я" className="mt-1.5 h-12 rounded-xl" />
                  </div>
                  <div>
                    <label htmlFor="registration-age" className="text-sm font-medium">Вік {!isInquiry && <span aria-hidden="true">*</span>}</label>
                    <Input id="registration-age" name="childAge" type="number" inputMode="numeric" required={!isInquiry} min={2} max={18} step={1} value={childAge} onChange={(event) => setChildAge(event.target.value)} placeholder="Років" className="mt-1.5 h-12 rounded-xl" />
                  </div>
                </div>
                {needsCourseSelect && (
                  <div>
                    <label htmlFor="registration-course" className="text-sm font-medium">Оберіть курс <span aria-hidden="true">*</span></label>
                    <select id="registration-course" name="course" required value={course} onChange={(event) => setCourse(event.target.value)} className="mt-1.5 h-12 w-full min-w-0 rounded-xl border border-input bg-background px-3 text-base text-foreground">
                      <option value="" disabled>Оберіть напрям</option>
                      {COURSE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                )}
                <details className="rounded-xl border border-border px-3.5 py-2">
                  <summary className="min-h-7 cursor-pointer text-sm font-medium text-muted-foreground">Додати коментар <span className="font-normal">(необов’язково)</span></summary>
                  <label htmlFor="registration-comment" className="sr-only">Коментар або побажання</label>
                  <Textarea id="registration-comment" name="comment" value={comment} onChange={(event) => setComment(event.target.value)} maxLength={2000} placeholder="Що нам варто знати?" rows={3} className="mt-2 rounded-xl" />
                </details>
              </fieldset>
            </form>
          )}
        </div>

        <div className="registration-footer">
          {error && <p role="alert" className="mb-3 text-sm leading-relaxed text-destructive">{error}</p>}
          {success ? (
            <Button type="button" onClick={() => changeOpen(false)} className="h-12 w-full rounded-lg bg-ufo-yellow text-base font-semibold text-primary hover:bg-ufo-yellow/90">Готово</Button>
          ) : (
            <>
              <Button type="submit" form="registration-form" disabled={submitting} className="h-12 w-full gap-2 rounded-lg bg-ufo-yellow text-base font-semibold text-primary hover:bg-ufo-yellow/90">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Надсилаємо…</> : <>{isInquiry ? "Надіслати запит" : "Надіслати заявку"} <ArrowRight className="h-4 w-4" /></>}
              </Button>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><Phone className="h-3 w-3" /> {isInquiry ? "Зв’яжемося й відповімо на запитання" : "Підтвердимо запис телефоном"}</p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
