import { Link } from "@tanstack/react-router";
import { Menu, X, Link2 } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { openRegistration } from "@/components/RegistrationModal";
import logoImg from "@/assets/ufo-logo.png";

const navLinks = [
  { to: "/" as const, label: "Головна" },
  { to: "/about" as const, label: "Про нас" },
  { to: "/courses" as const, label: "Курси" },
  { to: "/camps" as const, label: "Табори" },
  { to: "/schedule" as const, label: "Розклад" },
  { to: "/contacts" as const, label: "Контакти" },
];

const mobileNavLinks = [
  { to: "/" as const, label: "Головна" },
  { to: "/courses" as const, label: "Курси" },
  { to: "/camps" as const, label: "Табори" },
  { to: "/schedule" as const, label: "Розклад" },
  { to: "/contacts" as const, label: "Контакти" },
  { to: "/links" as const, label: "Швидкі посилання", icon: Link2 },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="h-1 bg-ufo-yellow w-full" />
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 md:h-[72px] items-center justify-between">
            <Link to="/" className="shrink-0 flex items-center gap-2 md:gap-3 group min-w-0">
              <img
                src={logoImg}
                alt="UFO STEAM HUB логотип"
                className="h-8 w-8 md:h-11 md:w-11 object-contain rounded-xl shrink-0"
              />
              <span
                className="text-base md:text-2xl font-semibold tracking-tight leading-none whitespace-nowrap truncate"
                style={{ color: "#3056dd" }}
              >
                UFO STEAM HUB
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors border-b-2 border-transparent hover:border-ufo-yellow pb-0.5"
                  activeProps={{ className: "text-sm font-semibold text-primary border-b-2 border-ufo-yellow pb-0.5" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => openRegistration()}
                className="rounded-full bg-ufo-yellow px-5 py-2 text-sm font-semibold text-primary shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                Записатись
              </button>
            </nav>

            <button
              className="md:hidden h-9 w-9 rounded-full border border-border bg-background text-primary flex items-center justify-center active:scale-95 transition-transform shrink-0"
              onClick={() => setMobileOpen(true)}
              aria-label="Відкрити меню"
            >
              <Menu className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="right"
            className="w-[82%] max-w-xs bg-background p-0 flex flex-col [&>button]:hidden"
          >
            <SheetHeader className="border-b border-border px-5 py-4 flex-row items-center justify-between space-y-0">
              <SheetTitle className="flex items-center gap-2 text-base font-semibold" style={{ color: "#3056dd" }}>
                <img src={logoImg} alt="" className="h-7 w-7 object-contain" />
                UFO STEAM HUB
              </SheetTitle>
              <button
                type="button"
                aria-label="Закрити меню"
                onClick={() => setMobileOpen(false)}
                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-foreground/70 active:scale-95 transition-transform"
              >
                <X className="h-4 w-4" />
              </button>
            </SheetHeader>

            <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
              {mobileNavLinks.map((link) => {
                const Icon = "icon" in link ? link.icon : undefined;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-foreground/80 hover:bg-ufo-yellow/20 hover:text-primary transition-colors"
                    activeProps={{ className: "flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold bg-ufo-yellow/40 text-primary" }}
                    activeOptions={{ exact: link.to === "/" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openRegistration();
                }}
                className="w-full rounded-full bg-ufo-yellow px-5 py-3 text-sm font-semibold text-primary shadow-md active:scale-[0.98] transition-transform"
              >
                Записатись на заняття
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
