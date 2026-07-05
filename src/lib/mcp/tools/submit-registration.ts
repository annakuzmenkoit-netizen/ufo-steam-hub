import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_registration",
  title: "Submit registration request",
  description:
    "Submit a registration/enrollment request for a UFO STEAM HUB course. The request is emailed to the hub team, which will contact the parent to confirm.",
  inputSchema: {
    parentName: z.string().min(1).describe("Parent's full name"),
    phone: z.string().min(3).describe("Parent's phone number (e.g. +380...)"),
    childName: z.string().min(1).describe("Child's name"),
    childAge: z.number().int().min(3).max(18).describe("Child's age in years"),
    course: z
      .string()
      .min(1)
      .describe(
        "Course name — one of: STEAM-гурток, Робототехніка, Анімація і мультиплікація, Math&mind, Математика, 3D моделювання",
      ),
    note: z.string().optional().describe("Optional additional note from the parent"),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: true },
  handler: async ({ parentName, phone, childName, childAge, course, note }) => {
    try {
      const res = await fetch("https://formsubmit.co/ajax/ufosteamhub@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Нова заявка (MCP) — ${course} (${childName})`,
          _template: "table",
          "Ім'я батьків": parentName,
          "Телефон": phone,
          "Ім'я дитини": childName,
          "Вік дитини": String(childAge),
          "Курс": course,
          "Нотатка": note ?? "",
          "Джерело": "UFO STEAM HUB — MCP",
        }),
      });
      if (!res.ok) {
        return {
          content: [{ type: "text", text: `Submission failed: HTTP ${res.status}` }],
          isError: true,
        };
      }
      return {
        content: [
          {
            type: "text",
            text: "Заявку надіслано. Команда UFO STEAM HUB зв'яжеться з батьками для підтвердження.",
          },
        ],
        structuredContent: { ok: true },
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Submission error: ${(err as Error).message}` }],
        isError: true,
      };
    }
  },
});
