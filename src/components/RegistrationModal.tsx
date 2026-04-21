import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const COURSE_OPTIONS = [
  "STEAM-гурток",
  "Робототехніка",
  "Анімація і мультиплікація",
  "Math&mind",
  "Математика",
  "3D моделювання",
];

const EVENT_NAME = "ufo:open-registration";

export function openRegistration(course?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { course } }));
}

export function RegistrationModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState<string>("");

  useEffect(() => {
    function handler(e: Event) {
      const detail = (e as CustomEvent).detail as { course?: string } | undefined;
      if (detail?.course) setCourse(detail.course);
      setOpen(true);
    }
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !course) {
      toast.error("Будь ласка, заповніть усі поля.");
      return;
    }
    toast.success("Дякуємо! Ми зв'яжемось з вами найближчим часом.");
    setOpen(false);
    setName("");
    setPhone("");
    setCourse("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">Записатись на заняття</DialogTitle>
          <DialogDescription>
            Залиште свої контакти — ми зв'яжемось з вами та підберемо зручний час.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <div>
            <label className="text-sm font-medium text-foreground">Ім'я</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше ім'я"
              className="mt-1 rounded-xl"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Телефон</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380..."
              type="tel"
              className="mt-1 rounded-xl"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Курс</label>
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
          <Button
            type="submit"
            className="w-full rounded-full bg-ufo-yellow hover:bg-ufo-yellow/90 text-primary py-3 font-semibold text-base shadow-md"
          >
            Відправити заявку
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
