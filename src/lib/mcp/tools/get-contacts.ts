import { defineTool } from "@lovable.dev/mcp-js";

const CONTACTS = {
  name: "UFO STEAM HUB",
  address: "м. Кременчук, ТЦ Лідер, каб. 208",
  email: "ufosteamhub@gmail.com",
  instagram: "https://instagram.com/ufosteamhub",
  hours: "Пн-Пт: 09:00 – 20:00, Сб: 10:00 – 16:00",
};

export default defineTool({
  name: "get_contacts",
  title: "Get contact info",
  description: "Get contact information for UFO STEAM HUB: address, email, social, working hours.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CONTACTS, null, 2) }],
    structuredContent: CONTACTS,
  }),
});
