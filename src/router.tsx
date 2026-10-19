import { useEffect } from "react";
import { assetRecoveryUrl, isAssetLoadError, shouldReloadAssets } from "@/lib/asset-load-error";
import { createRouter, useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function DefaultErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const assetError = isAssetLoadError(error);

  useEffect(() => {
    if (!assetError) return;
    // One retry for a stale deployment; never reload in a loop.
    try {
      const key = "ufo:asset-reload";
      const now = Date.now();
      if (shouldReloadAssets(sessionStorage.getItem(key), now)) {
        sessionStorage.setItem(key, String(now));
        window.location.replace(assetRecoveryUrl(window.location.href, Date.now()));
      }
    } catch {
      // Private browsers can deny storage. Keep the manual retry available.
    }
  }, [assetError]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Не вдалося відкрити сторінку
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Спробуйте оновити сторінку. Якщо помилка повторюється, зателефонуйте нам.
        </p>
        {import.meta.env.DEV && error instanceof Error && error.message && (
          <pre className="mt-4 max-h-40 overflow-auto rounded-md bg-muted p-3 text-left font-mono text-xs text-destructive">
            {error.message}
          </pre>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              if (assetError) {
                window.location.replace(assetRecoveryUrl(window.location.href, Date.now()));
              } else {
                void router.invalidate();
                reset();
              }
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Спробувати ще раз
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            На головну
          </a>
        </div>
        <a href="tel:+380960662604" className="mt-4 inline-flex min-h-11 items-center text-sm text-primary underline">+380 (96) 066-26-04</a>
      </div>
    </div>
  );
}

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent,
  });

  return router;
};
