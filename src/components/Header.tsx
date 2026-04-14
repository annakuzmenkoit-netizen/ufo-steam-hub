import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <header className="sticky top-0 z-50 bg-ufo-cream/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {/* Logo placeholder — replace src with actual logo */}
            <div className="w-[150px] h-[40px] rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
              <span className="text-sm font-bold text-primary">UFO STEAM HUB</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: "text-sm font-medium text-primary font-semibold" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contacts"
              className="rounded-full bg-ufo-pink px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md hover:shadow-lg hover:scale-105 transition-all"
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
            className="md:hidden overflow-hidden bg-ufo-cream border-b border-border"
          >
            <nav className="flex flex-col px-4 py-4 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-base font-medium text-foreground/80 hover:text-primary py-2"
                  activeProps={{ className: "text-base font-medium text-primary font-semibold py-2" }}
                  activeOptions={{ exact: link.to === "/" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contacts"
                className="rounded-full bg-ufo-pink px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-md mt-2"
                onClick={() => setMobileOpen(false)}
              >
                Записатись
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
