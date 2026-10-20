import { MobileNav } from "@/components/MobileNav";
import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RegistrationModal } from "@/components/RegistrationModal";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

import { assetRecoveryScript } from "@/lib/asset-load-error";

import appCss from "../styles.css?inline";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Сторінку не знайдено
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Сторінка, яку ви шукаєте, не існує або була переміщена.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            На головну
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "UFO STEAM HUB — Дитячий освітній центр" },
      { name: "description", content: "UFO STEAM HUB — дитячий освітній центр STEAM-освіти. Курси робототехніки, анімації, 3D моделювання та математики для дітей 7–14 років." },
      { property: "og:title", content: "UFO STEAM HUB — Дитячий освітній центр" },
      { name: "twitter:title", content: "UFO STEAM HUB — Дитячий освітній центр" },
      { property: "og:description", content: "UFO STEAM HUB — дитячий освітній центр STEAM-освіти. Курси робототехніки, анімації, 3D моделювання та математики для дітей 7–14 років." },
      { name: "twitter:description", content: "UFO STEAM HUB — дитячий освітній центр STEAM-освіти. Курси робототехніки, анімації, 3D моделювання та математики для дітей 7–14 років." },
      { name: "twitter:card", content: "summary" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/ufo-icon-48.png" },
      { rel: "icon", type: "image/x-icon", sizes: "16x16 32x32 48x48", href: "/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <script dangerouslySetInnerHTML={{ __html: assetRecoveryScript }} />
        <HeadContent />
        <style id="ufo-app-styles" dangerouslySetInnerHTML={{ __html: appCss }} />
      </head>
      <body style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const isLinksPage = useRouterState({ select: (state) => state.location.pathname === "/links" });
  const showMobileNav = useRouterState({ select: (state) => !["/links", "/auth"].includes(state.location.pathname) && !state.location.pathname.startsWith("/admin") });
  return (
    <div className={`flex min-h-screen flex-col ${showMobileNav ? "with-mobile-nav" : ""}`}>
      {!isLinksPage && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isLinksPage && <Footer />}
      {showMobileNav && <MobileNav />}
      <RegistrationModal />
      <ScrollToTop />
      <Toaster />
    </div>
  );
}
