// /capture/cropParts.js
import { warpQuadToRect } from "./warp.js";

function quadFromPolygon(poly) {
  // v1 expectation: poly already 4 points
  // if it’s more points, you’ll want an OBB reducer later
  if (!poly || poly.length < 4) return null;
  return poly.slice(0, 4);
}

export async function cropParts({ source, parts, output }) {
  const img = source.imageBitmap;

  const res = {
    front: null,
    back: null,
    spine: null,
    meta: {
      sourceW: source.width,
      sourceH: source.height,
      used: {},
    },
  };

  // covers
  const coverOut = output?.cover || { w: 1024, h: 1024 };
  const spineOut = output?.spine || { w: 512, h: 1024 };

  if (parts.front?.polygon) {
    const quad = quadFromPolygon(parts.front.polygon);
    res.front = await warpQuadToRect({ imageBitmap: img, points: quad, output: coverOut });
    res.meta.used.front = res.front.used;
  }
  if (parts.back?.polygon) {
    const quad = quadFromPolygon(parts.back.polygon);
    res.back = await warpQuadToRect({ imageBitmap: img, points: quad, output: coverOut });
    res.meta.used.back = res.back.used;
  }
  if (parts.spine?.polygon) {
    const quad = quadFromPolygon(parts.spine.polygon);
    res.spine = await warpQuadToRect({ imageBitmap: img, points: quad, output: spineOut });
    res.meta.used.spine = res.spine.used;
  }

  return res;
}
