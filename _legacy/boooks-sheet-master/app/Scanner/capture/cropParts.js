// /capture/cropParts.js
import { warpQuadToRect } from "./warp";

export function cropBookParts(frameCanvas, parts, opts = {}) {
  const {
    spineSize = { w: 512, h: 1024 },
    coverSize = { w: 1024, h: 1024 },
  } = opts;

  const out = {};

  if (parts.spine?.quad) {
    out.spine = warpQuadToRect(
      frameCanvas,
      parts.spine.quad,
      spineSize.w,
      spineSize.h
    );
  }

  if (parts.front?.quad) {
    out.front = warpQuadToRect(
      frameCanvas,
      parts.front.quad,
      coverSize.w,
      coverSize.h
    );
  }

  if (parts.back?.quad) {
    out.back = warpQuadToRect(
      frameCanvas,
      parts.back.quad,
      coverSize.w,
      coverSize.h
    );
  }

  return out; // canvases
}
