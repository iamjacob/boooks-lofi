// /pipeline/scanPipeline.js
import { captureFrame } from "../capture/captureFrame";
import { cropBookParts } from "../capture/cropParts";
import { identifyBook } from "../identity/identifyBook";
import { createDraft } from "./drafts";
import { maybeVerify } from "./verify";

// coordinatorOutputParts example:
// {
//   spine: { quad: [ {x,y}, {x,y}, {x,y}, {x,y} ], score: 0.92 },
//   front: { quad: [...] },
//   back:  { quad: [...] }
// }

export async function runScanPipeline({
  videoEl,
  parts,
  localIndex,
  draftsStore,
  verifiedStore,
  opts,
}) {
  // 1) High-res capture
  const frame = captureFrame(videoEl, { maxWidth: 2048 });

  // 2) Warp crops
  const crops = cropBookParts(frame.canvas, parts, opts);

  // 3) Identify (offline-first)
  const identity = await identifyBook(
    {
      spineCanvas: crops.spine,
      frontCanvas: crops.front,
      backCanvas: crops.back,
      isbnText: null, // later: barcode/OCR pipeline fills this
    },
    localIndex
  );

  // 4) Draft or known
  if (identity.book && identity.confidence > 0.75) {
    // Known book: you can just return it and optionally attach capture evidence
    return {
      status: "known",
      match: identity,
      crops,
    };
  }

  // 5) Unknown => create draft
  const draft = await createDraft({
    draftsStore,
    crops,
    identity,
  });

  // 6) Attempt verification promotion (optional rules)
  const verification = await maybeVerify({
    draft,
    identity,
    verifiedStore,
    localIndex,
  });

  return {
    status: verification.promoted ? "verified" : "draft",
    draft,
    verification,
    crops,
    match: identity,
  };
}
