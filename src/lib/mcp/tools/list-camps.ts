import { defineTool } from "@lovable.dev/mcp-js";

const CAMPS = [
  {
    season: "Зимовий",
    theme: "Різдвяні пригоди та зимова магія",
    description: "Тематичні майстер-класи, творчі проєкти та зимові активності для дітей.",
  },
  {
    season: "Осінній",
    theme: "Пізнай себе і місто",
    description: "Табір про самопізнання, командну роботу та дослідження рідного міста.",
  },
  {
    season: "Літній",
    theme: "У ритмі з природою + тематичні табори",
    description: "Активний відпочинок на природі та тематичні STEAM-табори.",
  },
  {
    season: "Весняний",
    theme: "Детективні пригоди",
    description: "Розгадування загадок, квести та розвиток критичного мислення.",
  },
];

export default defineTool({
  name: "list_camps",
  title: "List seasonal camps",
  description: "List UFO STEAM HUB seasonal camps (winter, spring, summer, autumn) with themes.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CAMPS, null, 2) }],
    structuredContent: { camps: CAMPS },
  }),
});
