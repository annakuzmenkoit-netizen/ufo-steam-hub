import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  DEMO_REGISTRATION_STATUSES,
  demoWorkshops,
  normalizePhone,
  type DemoRegistrationStatus,
} from "./demo-day-workshops";

const EMAIL_ENDPOINT = "https://formsubmit.co/ajax/ufosteamhub@gmail.com";

export type SubmitDemoDayInput = {
  workshopId: string;
  participantName: string;
  childAge?: string | number | null;
  phone: string;
  personalDataConsent: boolean;
  photoVideoConsent: boolean;
  source?: string;
};

export type SubmitDemoDayResult =
  | { ok: true }
  | { ok: false; reason: "duplicate" | "validation" | "error"; message: string };

export const submitDemoDayRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: SubmitDemoDayInput) => data)
  .handler(async ({ data }): Promise<SubmitDemoDayResult> => {
    const workshop = demoWorkshops.find((item) => item.id === data.workshopId);
    const participantName = (data.participantName ?? "").trim();
    const phone = (data.phone ?? "").trim();
    const rawAge = typeof data.childAge === "number" ? String(data.childAge) : (data.childAge ?? "").trim();
    const childAge = rawAge ? Number.parseInt(rawAge, 10) : null;

    if (!workshop) {
      return { ok: false, reason: "validation", message: "Оберіть майстерку зі списку." };
    }
    if (participantName.length < 2 || participantName.length > 120) {
      return { ok: false, reason: "validation", message: "Вкажіть коректне ім’я учасника." };
    }
    if (normalizePhone(phone).length < 9) {
      return { ok: false, reason: "validation", message: "Вкажіть коректний номер телефону." };
    }
    if (!data.personalDataConsent) {
      return {
        ok: false,
        reason: "validation",
        message: "Потрібна згода на обробку персональних даних.",
      };
    }
    if (workshop.ageMode === "required" && (childAge === null || Number.isNaN(childAge))) {
      return { ok: false, reason: "validation", message: "Вкажіть вік дитини." };
    }
    if (childAge !== null && !Number.isNaN(childAge) && (childAge < 2 || childAge > 18)) {
      return { ok: false, reason: "validation", message: "Вкажіть коректний вік дитини." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const normalized = normalizePhone(phone);

    const { data: existing, error: existingError } = await supabaseAdmin
      .from("demo_day_registrations")
      .select("id, phone, participant_name")
      .eq("workshop_id", workshop.id)
      .eq("event_date", workshop.date);

    if (existingError) {
      console.error("[demo-day] duplicate check failed", existingError);
      return {
        ok: false,
        reason: "error",
        message: "Не вдалося зберегти реєстрацію. Перевірте з’єднання та спробуйте ще раз.",
      };
    }

    const isDuplicate = (existing ?? []).some(
      (row) =>
        normalizePhone(row.phone ?? "") === normalized &&
        (row.participant_name ?? "").trim().toLowerCase() === participantName.toLowerCase(),
    );

    if (isDuplicate) {
      return {
        ok: false,
        reason: "duplicate",
        message: "Схоже, цього учасника вже зареєстровано на обрану майстерку.",
      };
    }

    const { error: insertError } = await supabaseAdmin.from("demo_day_registrations").insert({
      event_name: "UFO DEMO DAY",
      event_date: workshop.date,
      event_time: workshop.time,
      workshop_id: workshop.id,
      workshop_title: workshop.title,
      workshop_audience: workshop.audience,
      participant_name: participantName,
      child_age: childAge !== null && !Number.isNaN(childAge) ? childAge : null,
      phone,
      personal_data_consent: true,
      photo_video_consent: Boolean(data.photoVideoConsent),
      source: (data.source ?? "Головна сторінка").trim() || "Головна сторінка",
      status: "new",
    });

    if (insertError) {
      console.error("[demo-day] insert failed", insertError);
      return {
        ok: false,
        reason: "error",
        message: "Не вдалося зберегти реєстрацію. Перевірте з’єднання та спробуйте ще раз.",
      };
    }

    // Secondary notification — a failure here must never lose the stored registration.
    try {
      const response = await fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `[UFO] UFO DEMO DAY — ${workshop.title} — ${workshop.date} ${workshop.time}`,
          _template: "table",
          "Тип заявки": "UFO DEMO DAY",
          "Подія": "UFO DEMO DAY",
          "Дата": workshop.date,
          "День": workshop.dayLabel,
          "Час": workshop.time,
          "Майстерка": workshop.title,
          "Вікова категорія або аудиторія": workshop.audience,
          "Ім’я учасника/учасниці": participantName,
          "Вік": childAge !== null && !Number.isNaN(childAge) ? String(childAge) : "Не вказано",
          "Контактний номер телефону": phone,
          "Згода на обробку персональних даних": "Так",
          "Згода на фото-/відеозйомку": data.photoVideoConsent ? "Так" : "Ні",
          "Джерело": data.source ?? "Головна сторінка",
        }),
      });
      if (!response.ok) {
        console.error("[demo-day] email notification failed", response.status);
      }
    } catch (error) {
      console.error("[demo-day] email notification error", error);
    }

    return { ok: true };
  });

export type DemoRegistrationRow = {
  id: string;
  created_at: string;
  event_date: string;
  event_time: string;
  workshop_id: string;
  workshop_title: string;
  workshop_audience: string;
  participant_name: string;
  child_age: number | null;
  phone: string;
  personal_data_consent: boolean;
  photo_video_consent: boolean;
  source: string;
  status: string;
  notes: string | null;
};

export const listDemoDayRegistrations = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ isAdmin: boolean; rows: DemoRegistrationRow[] }> => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });

    if (!isAdmin) return { isAdmin: false, rows: [] };

    const { data, error } = await context.supabase
      .from("demo_day_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return { isAdmin: true, rows: (data ?? []) as DemoRegistrationRow[] };
  });

export const updateDemoDayRegistration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status?: string; notes?: string }) => data)
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const patch: { status?: DemoRegistrationStatus; notes?: string | null } = {};
    if (data.status) {
      if (!DEMO_REGISTRATION_STATUSES.includes(data.status as DemoRegistrationStatus)) {
        throw new Error("Invalid status");
      }
      patch.status = data.status as DemoRegistrationStatus;
    }
    if (data.notes !== undefined) patch.notes = data.notes.trim() || null;

    const { error } = await context.supabase
      .from("demo_day_registrations")
      .update(patch)
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });
