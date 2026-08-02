export type RegistrationType =
  | "general"
  | "course"
  | "schedule"
  | "summer_school"
  | "camp"
  | "demo_day"
  | "contact";

export type RegistrationContext = {
  registrationType: RegistrationType;
  sourcePage: string;
  title?: string;
  program?: string;
  day?: string;
  date?: string;
  time?: string;
  age?: string;
  teacher?: string;
  eventName?: string;
  additionalInfo?: string;
};

export const REGISTRATION_TYPE_LABELS: Record<RegistrationType, string> = {
  general: "Загальна заявка на пробний урок",
  course: "Курс",
  schedule: "Заняття з розкладу",
  summer_school: "Літня школа",
  camp: "Табір",
  demo_day: "UFO DEMO DAY",
  contact: "Звернення з форми контактів",
};

/** Short label used in the email subject. */
const SUBJECT_TYPE_LABELS: Record<RegistrationType, string> = {
  general: "Загальна заявка на пробний урок",
  course: "Курс",
  schedule: "Заняття з розкладу",
  summer_school: "Літня школа",
  camp: "Табір",
  demo_day: "UFO DEMO DAY",
  contact: "Звернення",
};

export function normalizeRegistrationContext(
  input?: RegistrationContext | string,
): RegistrationContext {
  if (!input) {
    return {
      registrationType: "general",
      sourcePage: "Головна сторінка",
      title: REGISTRATION_TYPE_LABELS.general,
    };
  }
  if (typeof input === "string") {
    // Backward compatibility with legacy openRegistration("Курс") calls.
    return {
      registrationType: "course",
      sourcePage: "Сайт",
      program: input,
      title: `Запис на курс: ${input}`,
    };
  }
  return input;
}

/** Builds the dynamic email subject, e.g. "[UFO] Заняття з розкладу — Робототехніка — П’ятниця 15:30". */
export function buildRegistrationSubject(ctx: RegistrationContext): string {
  const parts: string[] = [SUBJECT_TYPE_LABELS[ctx.registrationType]];
  const program = ctx.program ?? ctx.eventName;
  if (program) parts.push(program);

  const when = [ctx.day, ctx.date, ctx.time].filter(Boolean).join(" ");
  if (when) parts.push(when);

  return `[UFO] ${parts.join(" — ")}`;
}

export type RegistrationFormValues = {
  childName?: string;
  childAge?: string;
  parentName?: string;
  phone?: string;
  comment?: string;
};

/** Ordered Ukrainian-labelled email fields; empty values are omitted. */
export function buildRegistrationEmailFields(
  ctx: RegistrationContext,
  values: RegistrationFormValues,
  meta: { url?: string; pathname?: string; submittedAt?: string } = {},
): Record<string, string> {
  const entries: [string, string | undefined][] = [
    ["Тип заявки", REGISTRATION_TYPE_LABELS[ctx.registrationType]],
    ["Джерело", "UFO STEAM HUB — сайт"],
    ["Сторінка сайту", ctx.sourcePage],
    ["Назва заявки", ctx.title],
    ["Програма", ctx.program],
    ["Подія", ctx.eventName],
    ["День", ctx.day],
    ["Дата", ctx.date],
    ["Час", ctx.time],
    ["Вікова група", ctx.age],
    ["Викладач", ctx.teacher],
    ["Додаткова інформація", ctx.additionalInfo],
    ["Ім’я дитини", values.childName],
    ["Вік дитини", values.childAge],
    ["Ім’я одного з батьків", values.parentName],
    ["Телефон", values.phone],
    ["Коментар", values.comment],
    ["URL сторінки", meta.url],
    ["Шлях сторінки", meta.pathname],
    ["Дата та час відправлення", meta.submittedAt],
  ];

  const result: Record<string, string> = {};
  for (const [key, value] of entries) {
    const clean = (value ?? "").toString().trim();
    if (clean) result[key] = clean;
  }
  return result;
}

export function currentPageMeta() {
  if (typeof window === "undefined") return {};
  return {
    url: window.location.href,
    pathname: window.location.pathname,
    submittedAt: new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" }),
  };
}

/** Rows for the "Ви записуєтесь на:" summary card. Empty values omitted. */
export function summaryRows(ctx: RegistrationContext): { label: string; value: string }[] {
  const rows: [string, string | undefined][] = [
    ["Тип заявки", REGISTRATION_TYPE_LABELS[ctx.registrationType]],
    ["Програма", ctx.program ?? ctx.eventName],
    ["День", ctx.day],
    ["Дата", ctx.date],
    ["Час", ctx.time],
    ["Вік", ctx.age],
    ["Викладач", ctx.teacher],
  ];
  return rows
    .filter(([, v]) => (v ?? "").trim().length > 0)
    .map(([label, value]) => ({ label, value: value as string }));
}
