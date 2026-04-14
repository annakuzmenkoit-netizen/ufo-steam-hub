import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import ufoLogo from "@/assets/ufo-logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="mb-4">
              <img src={ufoLogo} alt="UFO STEAM HUB" className="h-12 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Дитячий освітній центр, де наука, технології та творчість зустрічаються.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Навігація</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/" className="hover:text-ufo-yellow transition-colors">Головна</Link></li>
              <li><Link to="/about" className="hover:text-ufo-yellow transition-colors">Про нас</Link></li>
              <li><Link to="/courses" className="hover:text-ufo-yellow transition-colors">Курси</Link></li>
              <li><Link to="/camps" className="hover:text-ufo-yellow transition-colors">Табори</Link></li>
              <li><Link to="/schedule" className="hover:text-ufo-yellow transition-colors">Розклад</Link></li>
              <li><Link to="/contacts" className="hover:text-ufo-yellow transition-colors">Контакти</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Контакти</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-ufo-yellow" />
                +380 (XX) XXX-XX-XX
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-ufo-yellow" />
                info@ufosteamhub.ua
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-ufo-yellow mt-0.5" />
                м. Київ, вул. Прикладна, 1
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-xs text-primary-foreground/60">
          © 2026 UFO STEAM HUB. Усі права захищено.
        </div>
      </div>
    </footer>
  );
}
