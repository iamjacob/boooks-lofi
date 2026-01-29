// /pipeline/scanPipeline.js
import { captureFrame } from "../capture/captureFrame.js";
import { cropParts } from "../capture/cropParts.js";
import { normalizeCrops } from "../capture/normalize.js";
import { identifyBook } from "../identity/identifyBook.js";
import { upsertDraft } from "./drafts.js";
import { maybeVerifyDraft } from "./verify.js";

/**
 * scanPipeline v1
 * - auto: needs polygons from ML coordinator
 * - manual: polygons from user (4-point / polygon editor)
 *
 * @param {Object} args
 * @param {HTMLVideoElement} [args.videoEl]
 * @param {HTMLCanvasElement} [args.canvasEl] - optional scratch canvas
 * @param {Object} args.mode - "auto" | "manual"
 * @param {Object} [args.ml] - ML coordinator instance (optional)
 * @param {Object} [args.manual] - manual selection result (optional)
 * @param {Object} args.context - user/app metadata
 *
 * @returns {Promise<Object>} result
 */
export async function scanPipeline({
  videoEl,
  canvasEl,
  mode,
  ml,
  manual,
  context,
}) {
  // 1) Capture high-res frame
  const frame = await captureFrame({ videoEl, canvasEl, maxW: 2000, quality: 0.92 });

  // 2) Get polygons
  let parts = null;

  if (mode === "auto") {
    if (!ml) throw new Error("scanPipeline(auto) requires ml coordinator");
    // expected shape:
    // { spine: { polygon }, front: { polygon }, back: { polygon }, pages?: { polygon }, meta }
    parts = await ml.detectParts({ imageBitmap: frame.imageBitmap });
  } else {
    // manual expected shape:
    // { parts: { front|spine|back: { polygon } }, meta }
    if (!manual?.parts) throw new Error("scanPipeline(manual) requires manual.parts");
    parts = manual.parts;
  }

  // 3) Crop (and warp) parts
  const crops = await cropParts({
    source: frame,
    parts,
    output: {
      spine: { w: 512, h: 1024 },
      cover: { w: 1024, h: 1024 },
    },
  });

  // 4) Normalize crops (rotate/resize/denoise-lite)
  const normalized = await normalizeCrops(crops);

  // 5) Identify
  const identity = await identifyBook({
    crops: normalized,
    context,
  });

  // 6) Draft
  const draft = await upsertDraft({
    context,
    frame,
    parts,
    crops: normalized,
    identity,
    mode,
  });

  // 7) Verify (optional)
  const verified = await maybeVerifyDraft({ draft, context });

  return {
    ok: true,
    mode,
    frame: {
      w: frame.width,
      h: frame.height,
      // blobUrl is super useful for preview UI
      blobUrl: frame.blobUrl,
    },
    parts,
    crops: normalized,
    identity,
    draft,
    verified,
  };
}
