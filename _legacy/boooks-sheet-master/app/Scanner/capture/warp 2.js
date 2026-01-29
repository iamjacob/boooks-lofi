// /capture/warp.js

/**
 * Warp a quadrilateral to a rectangle.
 * v1: fast-path for near-rectangles + fallback to "bbox crop"
 *
 * points: [ {x,y}, {x,y}, {x,y}, {x,y} ] in source image coords
 * output: { w, h }
 */
export async function warpQuadToRect({ imageBitmap, points, output }) {
  if (!imageBitmap) throw new Error("warpQuadToRect requires imageBitmap");
  if (!points || points.length < 4) throw new Error("warpQuadToRect requires 4 points");

  // v1 fallback: compute bbox and scale into output
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.max(0, Math.floor(Math.min(...xs)));
  const maxX = Math.min(imageBitmap.width, Math.ceil(Math.max(...xs)));
  const minY = Math.max(0, Math.floor(Math.min(...ys)));
  const maxY = Math.min(imageBitmap.height, Math.ceil(Math.max(...ys)));

  const sw = Math.max(1, maxX - minX);
  const sh = Math.max(1, maxY - minY);

  const canvas = document.createElement("canvas");
  canvas.width = output.w;
  canvas.height = output.h;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    imageBitmap,
    minX,
    minY,
    sw,
    sh,
    0,
    0,
    output.w,
    output.h
  );

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
  const blobUrl = URL.createObjectURL(blob);
  const warpedBitmap = await createImageBitmap(blob);

  return { blob, blobUrl, imageBitmap: warpedBitmap, width: output.w, height: output.h, used: "bbox-fallback" };
}
