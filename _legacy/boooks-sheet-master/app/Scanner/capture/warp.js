// /capture/warp.js
// Warp a quad (4 points) in the source canvas into a rectangle output canvas.
// Points are normalized [0..1] in image space: {x,y} where x,y are 0..1
// Quad order must be: TL, TR, BR, BL (clockwise).
export function warpQuadToRect(srcCanvas, quad, outW, outH) {
  const srcCtx = srcCanvas.getContext("2d", { willReadFrequently: true });
  const srcW = srcCanvas.width;
  const srcH = srcCanvas.height;

  const srcData = srcCtx.getImageData(0, 0, srcW, srcH);
  const src = srcData.data;

  const dstCanvas = document.createElement("canvas");
  dstCanvas.width = outW;
  dstCanvas.height = outH;

  const dstCtx = dstCanvas.getContext("2d", { willReadFrequently: true });
  const dstData = dstCtx.createImageData(outW, outH);
  const dst = dstData.data;

  // Convert normalized quad points to pixel coords
  const p = quad.map(({ x, y }) => ({ x: x * srcW, y: y * srcH }));

  // Homography mapping from destination rect -> source quad
  // We solve for H that maps rect corners to quad corners, then invert usage per-pixel.
  const H = computeHomography(
    [
      { x: 0, y: 0 },
      { x: outW, y: 0 },
      { x: outW, y: outH },
      { x: 0, y: outH },
    ],
    p
  );

  // For each pixel in destination, map to source and sample (bilinear)
  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      const { sx, sy } = applyHomography(H, x, y);

      const rgba = bilinearSample(src, srcW, srcH, sx, sy);

      const idx = (y * outW + x) * 4;
      dst[idx] = rgba[0];
      dst[idx + 1] = rgba[1];
      dst[idx + 2] = rgba[2];
      dst[idx + 3] = rgba[3];
    }
  }

  dstCtx.putImageData(dstData, 0, 0);
  return dstCanvas;
}

function bilinearSample(data, w, h, x, y) {
  // clamp
  if (x < 0 || y < 0 || x >= w - 1 || y >= h - 1) return [0, 0, 0, 255];

  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;

  const dx = x - x0;
  const dy = y - y0;

  const c00 = getPixel(data, w, x0, y0);
  const c10 = getPixel(data, w, x1, y0);
  const c01 = getPixel(data, w, x0, y1);
  const c11 = getPixel(data, w, x1, y1);

  const out = [0, 0, 0, 255];
  for (let i = 0; i < 3; i++) {
    const v0 = c00[i] * (1 - dx) + c10[i] * dx;
    const v1 = c01[i] * (1 - dx) + c11[i] * dx;
    out[i] = Math.round(v0 * (1 - dy) + v1 * dy);
  }
  return out;
}

function getPixel(data, w, x, y) {
  const idx = (y * w + x) * 4;
  return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
}

function applyHomography(H, x, y) {
  const denom = H[6] * x + H[7] * y + H[8];
  const sx = (H[0] * x + H[1] * y + H[2]) / denom;
  const sy = (H[3] * x + H[4] * y + H[5]) / denom;
  return { sx, sy };
}

// Compute homography from 4 source points -> 4 destination points
// Returns H as 3x3 flattened length-9 array.
function computeHomography(srcPts, dstPts) {
  // Solve A * h = b (8x8)
  const A = [];
  const b = [];

  for (let i = 0; i < 4; i++) {
    const { x, y } = srcPts[i];
    const { x: u, y: v } = dstPts[i];

    A.push([x, y, 1, 0, 0, 0, -x * u, -y * u]);
    b.push(u);

    A.push([0, 0, 0, x, y, 1, -x * v, -y * v]);
    b.push(v);
  }

  const h = solve8x8(A, b); // length 8
  return [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];
}

// Simple Gauss-Jordan for 8x8
function solve8x8(A, b) {
  const n = 8;
  const M = A.map((row, i) => [...row, b[i]]);

  for (let col = 0; col < n; col++) {
    // pivot
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    }
    [M[col], M[pivot]] = [M[pivot], M[col]];

    const div = M[col][col] || 1e-12;
    for (let c = col; c <= n; c++) M[col][c] /= div;

    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = M[r][col];
      for (let c = col; c <= n; c++) M[r][c] -= factor * M[col][c];
    }
  }

  return M.map((row) => row[n]);
}
