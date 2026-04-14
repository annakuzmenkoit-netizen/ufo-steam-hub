import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ufoLogo from "@/assets/ufo-logo.png";

const navLinks = [
  { to: "/" as const, label: "Головна" },
  { to: "/about" as const, label: "Про нас" },
  { to: "/courses" as const, label: "Курси" },
  { to: "/camps" as const, label: "Табори" },
  { to: "/schedule" as const, label: "Розклад" },
  { to: "/contacts" as const, label: "Контакти" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Decorative yellow stripe */}
      <div className="h-1 bg-ufo-yellow w-full" />
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo area */}
            <Link to="/" className="shrink-0">
              <img
                src={ufoLogo}
                alt="UFO STEAM HUB"
                className="h-[56px] w-auto object-contain"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors border-b-2 border-transparent hover:border-ufo-yellow pb-0.5"
                  activeProps={{ className: "text-sm font-semibold text-primary border-b-2 border-ufo-yellow pb-0.5" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contacts"
                className="rounded-full bg-ufo-yellow px-5 py-2 text-sm font-bold text-primary shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                Записатись
              </Link>
            </nav>

            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-background border-b border-border"
            >
              <nav className="flex flex-col px-4 py-4 gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-base font-medium text-foreground/70 hover:text-primary py-2"
                    activeProps={{ className: "text-base font-semibold text-primary py-2 border-l-4 border-ufo-yellow pl-3" }}
                    activeOptions={{ exact: link.to === "/" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contacts"
                  className="rounded-full bg-ufo-yellow px-5 py-2.5 text-center text-sm font-bold text-primary shadow-md mt-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Записатись
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
