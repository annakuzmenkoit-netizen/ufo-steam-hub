/** Browsers may retain an older page that points at files removed by a deploy. */
export function isAssetLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading (?:CSS )?chunk .+ failed|ChunkLoadError/i.test(message);
}

export function shouldReloadAssets(lastReload: string | null, now: number): boolean {
  const previous = lastReload ? Number(lastReload) : NaN;
  return !Number.isFinite(previous) || now - previous > 60_000;
}
