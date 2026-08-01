import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  listDemoDayRegistrations,
  updateDemoDayRegistration,
  type DemoRegistrationRow,
} from "@/lib/demo-day.functions";
import {
  DEMO_REGISTRATION_STATUSES,
  DEMO_STATUS_LABELS,
  demoWorkshops,
  type DemoRegistrationStatus,
} from "@/lib/demo-day-workshops";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, LogOut, Phone, RefreshCw, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/demo-day")({
  head: () => ({
    meta: [
      { title: "Реєстрації UFO DEMO DAY — адмінпанель" },
      {
        name: "description",
        content: "Внутрішній список учасників UFO DEMO DAY зі статусами та нотатками.",
      },
      { property: "og:title", content: "Реєстрації UFO DEMO DAY — адмінпанель" },
      { property: "og:description", content: "Внутрішній список учасників UFO DEMO DAY." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DemoDayAdminPage,
});

const STATUS_STYLES: Record<string, string> = {
  new: "bg-ufo-yellow/50 text-primary",
  confirmed: "bg-ufo-green/15 text-ufo-green",
  contacted: "bg-ufo-blue/10 text-primary",
  cancelled: "bg-ufo-pink/15 text-ufo-pink",
  attended: "bg-ufo-green/25 text-ufo-green",
};

function DemoDayAdminPage() {
  const navigate = useNavigate();
    const fetchRows = useServerFn(listDemoDayRegistrations);
  const updateRow = useServerFn(updateDemoDayRegistration);

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [workshopFilter, setWorkshopFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [data, setData] = useState<{ isAdmin: boolean; rows: DemoRegistrationRow[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const refetch = useCallback(async () => {
    setIsFetching(true);
    try {
      const result = await fetchRows({ data: undefined as never });
      setData(result);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  }, [fetchRows]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const mutate = useCallback(
    async (input: { id: string; status?: string; notes?: string }) => {
      try {
        await updateRow({ data: input });
        await refetch();
      } catch (error) {
        toast.error((error as Error).message);
      }
    },
    [updateRow, refetch],
  );

  const rows: DemoRegistrationRow[] = data?.rows ?? [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (dateFilter !== "all" && row.event_date !== dateFilter) return false;
      if (workshopFilter !== "all" && row.workshop_id !== workshopFilter) return false;
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (!q) return true;
      return (
        row.participant_name.toLowerCase().includes(q) ||
        row.phone.toLowerCase().includes(q) ||
        row.workshop_title.toLowerCase().includes(q)
      );
    });
  }, [rows, search, dateFilter, workshopFilter, statusFilter]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ufo-cream">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </main>
    );
  }

  if (data && !data.isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ufo-cream px-4 text-center">
        <ShieldAlert className="h-10 w-10 text-ufo-pink" />
        <h1 className="text-2xl font-semibold text-primary">Доступ обмежено</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Цей акаунт не має прав адміністратора. Зверніться до команди UFO STEAM HUB, щоб отримати
          доступ до списку реєстрацій.
        </p>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" /> Вийти
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ufo-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-primary md:text-3xl">
              Реєстрації UFO DEMO DAY
            </h1>
            <p className="text-sm text-muted-foreground">
              Усього: {rows.length} · Показано: {filtered.length}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
              Оновити
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Вийти
            </Button>
          </div>
        </header>

        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="Пошук: ім’я, телефон, майстерка"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger><SelectValue placeholder="Дата" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Усі дати</SelectItem>
              <SelectItem value="8 серпня">8 серпня</SelectItem>
              <SelectItem value="9 серпня">9 серпня</SelectItem>
            </SelectContent>
          </Select>
          <Select value={workshopFilter} onValueChange={setWorkshopFilter}>
            <SelectTrigger><SelectValue placeholder="Майстерка" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Усі майстерки</SelectItem>
              {demoWorkshops.map((w) => (
                <SelectItem key={w.id} value={w.id}>
                  {w.title} · {w.time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger><SelectValue placeholder="Статус" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Усі статуси</SelectItem>
              {DEMO_REGISTRATION_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {DEMO_STATUS_LABELS[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile cards */}
        <div className="mt-6 space-y-3 md:hidden">
          {filtered.map((row) => (
            <article
              key={row.id}
              className="rounded-2xl border-2 border-primary/10 bg-background p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-primary">{row.participant_name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {row.workshop_title} · {row.event_date}, {row.event_time}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${STATUS_STYLES[row.status] ?? ""}`}
                >
                  {DEMO_STATUS_LABELS[row.status as DemoRegistrationStatus] ?? row.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <a href={`tel:${row.phone}`} className="inline-flex items-center gap-1 text-primary">
                  <Phone className="h-4 w-4" /> {row.phone}
                </a>
                {row.child_age !== null && (
                  <span className="text-muted-foreground">{row.child_age} р.</span>
                )}
                <span className="text-muted-foreground">
                  Фото: {row.photo_video_consent ? "так" : "ні"}
                </span>
              </div>
              <div className="mt-3">
                <StatusSelect row={row} onChange={(status) => void mutate({ id: row.id, status })} />
              </div>
              <NotesField row={row} onSave={(notes) => void mutate({ id: row.id, notes })} />
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">Реєстрацій не знайдено.</p>
          )}
        </div>

        {/* Desktop table */}
        <div className="mt-6 hidden overflow-x-auto rounded-2xl border-2 border-primary/10 bg-background md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-ufo-yellow/40 text-xs uppercase text-primary">
              <tr>
                <th className="px-4 py-3">Дата подання</th>
                <th className="px-4 py-3">Учасник</th>
                <th className="px-4 py-3">Вік</th>
                <th className="px-4 py-3">Телефон</th>
                <th className="px-4 py-3">Майстерка</th>
                <th className="px-4 py-3">Фото</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3">Нотатки</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-t border-primary/5 align-top">
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(row.created_at).toLocaleString("uk-UA")}
                  </td>
                  <td className="px-4 py-3 font-medium text-primary">{row.participant_name}</td>
                  <td className="px-4 py-3">{row.child_age ?? "—"}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${row.phone}`} className="text-primary hover:underline">
                      {row.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    {row.workshop_title}
                    <span className="block text-xs text-muted-foreground">
                      {row.event_date}, {row.event_time}
                    </span>
                  </td>
                  <td className="px-4 py-3">{row.photo_video_consent ? "так" : "ні"}</td>
                  <td className="px-4 py-3">
                    <StatusSelect
                      row={row}
                      onChange={(status) => void mutate({ id: row.id, status })}
                    />
                  </td>
                  <td className="px-4 py-3 min-w-[200px]">
                    <NotesField row={row} onSave={(notes) => void mutate({ id: row.id, notes })} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                    Реєстрацій не знайдено.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function StatusSelect({
  row,
  onChange,
}: {
  row: DemoRegistrationRow;
  onChange: (status: string) => void;
}) {
  return (
    <Select value={row.status} onValueChange={onChange}>
      <SelectTrigger className="h-9 w-full md:w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {DEMO_REGISTRATION_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {DEMO_STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function NotesField({
  row,
  onSave,
}: {
  row: DemoRegistrationRow;
  onSave: (notes: string) => void;
}) {
  const [value, setValue] = useState(row.notes ?? "");
  return (
    <Input
      className="mt-2 h-9 md:mt-0"
      placeholder="Нотатка"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        if (value !== (row.notes ?? "")) onSave(value);
      }}
    />
  );
}
