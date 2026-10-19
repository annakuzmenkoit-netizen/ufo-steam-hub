/** Browsers may retain an older page that points at files removed by a deploy. */
export function isAssetLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading (?:CSS )?chunk .+ failed|ChunkLoadError/i.test(message);
}

export function shouldReloadAssets(lastReload: string | null, now: number): boolean {
  const previous = lastReload ? Number(lastReload) : NaN;
  return !Number.isFinite(previous) || now - previous > 60_000;
}

/** A new document URL bypasses a cached HTML response after a deployment. */
export function assetRecoveryUrl(href: string, now: number): string {
  const url = new URL(href);
  url.searchParams.set("_ufo_refresh", String(now));
  return url.href;
}

// Run before the app imports: a missing entry module cannot mount React's boundary.
export const assetRecoveryScript = `(() => {
  const recover = () => {
    const now = Date.now();
    const url = new URL(location.href);
    const previous = Number(url.searchParams.get('_ufo_refresh'));
    if (previous && now - previous < 60000) return;
    try {
      const last = Number(sessionStorage.getItem('ufo:asset-reload'));
      if (last && now - last < 60000) return;
      sessionStorage.setItem('ufo:asset-reload', String(now));
    } catch {}
    url.searchParams.set('_ufo_refresh', String(now));
    location.replace(url.href);
  };
  window.addEventListener('vite:preloadError', recover);
  window.addEventListener('error', (event) => {
    const target = event.target;
    if (target instanceof HTMLScriptElement && target.type === 'module' && target.src) recover();
  }, true);
})();`;
