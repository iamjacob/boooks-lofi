// /capture/captureFrame.js

/**
 * Capture a high-res still frame from a <video>.
 * Produces:
 * - imageBitmap (fast processing)
 * - blobUrl (preview)
 */
export async function captureFrame({
  videoEl,
  canvasEl,
  maxW = 2000,
  quality = 0.92,
  mime = "image/jpeg",
} = {}) {
  if (!videoEl) throw new Error("captureFrame requires videoEl");

  const vw = videoEl.videoWidth;
  const vh = videoEl.videoHeight;
  if (!vw || !vh) throw new Error("Video not ready (no dimensions)");

  const scale = Math.min(1, maxW / vw);
  const w = Math.round(vw * scale);
  const h = Math.round(vh * scale);

  const canvas = canvasEl || document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d", { willReadFrequently: false });
  ctx.drawImage(videoEl, 0, 0, w, h);

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, mime, quality)
  );
  if (!blob) throw new Error("Failed to create blob from canvas");

  const blobUrl = URL.createObjectURL(blob);
  const imageBitmap = await createImageBitmap(blob);

  return {
    blob,
    blobUrl,
    imageBitmap,
    width: w,
    height: h,
  };
}
