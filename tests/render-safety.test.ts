import test from "node:test";
import assert from "node:assert/strict";
import { containedImageSizes } from "../src/lib/contained-image-sizes.ts";
import { assetRecoveryUrl, isAssetLoadError, shouldReloadAssets } from "../src/lib/asset-load-error.ts";

test("an image without metadata still has usable responsive sizes", () => {
  assert.equal(containedImageSizes(undefined, 155, 320), "(min-width: 768px) 320px, 155px");
  for (const image of [{ width: 0, height: 0 }, { width: Infinity, height: 10 }]) {
    assert.doesNotMatch(containedImageSizes(image, 155, 320), /NaN|Infinity/);
  }
});

test("portrait sizes follow the displayed aspect ratio", () => {
  assert.equal(containedImageSizes({ width: 600, height: 1200 }, 160, 320), "(min-width: 768px) 160px, 80px");
});

test("asset recovery distinguishes stale modules from application errors", () => {
  assert.ok(isAssetLoadError(new Error("Failed to fetch dynamically imported module: /assets/old.js")));
  assert.ok(isAssetLoadError(new Error("Importing a module script failed.")));
  assert.equal(isAssetLoadError(new Error("Cannot read properties of undefined")), false);
});

test("a persistent failure cannot cause repeated automatic reloads", () => {
  assert.ok(shouldReloadAssets(null, 100_000));
  assert.equal(shouldReloadAssets("100000", 100_001), false);
  assert.ok(shouldReloadAssets("100000", 160_001));
});

test("asset recovery bypasses stale HTML while retaining the destination", () => {
  assert.equal(assetRecoveryUrl("https://ufo.in.ua/courses?source=home#robotics", 123),
    "https://ufo.in.ua/courses?source=home&_ufo_refresh=123#robotics");
  assert.equal(assetRecoveryUrl("https://ufo.in.ua/?_ufo_refresh=1", 456),
    "https://ufo.in.ua/?_ufo_refresh=456");
});
