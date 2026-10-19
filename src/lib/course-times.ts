const shortDays: Record<string, string> = { "Вівторок": "Вт", "Середа": "Ср", "Четвер": "Чт", "П'ятниця": "Пт", "Субота": "Сб", "Неділя": "Нд" };

export function formatCourseTimes(slots: readonly { day: string; time: string }[]): string {
  const byDay = new Map<string, string[]>();
  for (const slot of slots) byDay.set(slot.day, [...(byDay.get(slot.day) ?? []), slot.time]);
  const grouped = new Map<string, string[]>();
  for (const [day, times] of byDay) {
    const time = times.join(" або ");
    grouped.set(time, [...(grouped.get(time) ?? []), shortDays[day] ?? day]);
  }
  return Array.from(grouped, ([time, days]) => `${days.join(", ")} ${time}`).join(" або ");
}
