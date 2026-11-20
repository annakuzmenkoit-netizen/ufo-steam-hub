import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { buildRegistrationEmailFields, buildRegistrationSubject, type RegistrationContext } from "./registration-context";

const workshopRegistration = z.object({
  program: z.string().trim().min(1).max(120).regex(/^[^\r\n]+$/),
  date: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\.12$/),
  age: z.string().trim().max(240).optional(),
  childName: z.string().trim().min(1).max(120),
  childAge: z.string().regex(/^([2-9]|1[0-8])$/),
  parentName: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(1).max(30),
  comment: z.string().trim().max(2000),
});

export const sendWorkshopRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: z.input<typeof workshopRegistration>) => workshopRegistration.parse(data))
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const key = process.env.RESEND_API_KEY?.trim();
    const from = process.env.RESEND_FROM_EMAIL?.trim();
    if (!key || !from) {
      console.error("Workshop email sender is missing its Resend configuration.");
      return { ok: false };
    }

    const { program, date, age, ...values } = data;
    const context: RegistrationContext = {
      registrationType: "workshop",
      sourcePage: "Головна — зимові майстерки",
      program,
      date,
      age,
    };
    const fields = buildRegistrationEmailFields(context, values);

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        signal: AbortSignal.timeout(15_000),
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: ["ufosteamhub@gmail.com"],
          subject: buildRegistrationSubject(context),
          text: Object.entries(fields).map(([name, value]) => `${name}: ${value}`).join("\n"),
        }),
      });
      if (!response.ok) {
        console.error("Resend rejected the workshop registration email.", response.status);
        return { ok: false };
      }
      const result: { id?: string } = await response.json();
      return { ok: Boolean(result?.id) };
    } catch {
      console.error("Workshop registration email request failed.");
      return { ok: false };
    }
  });
