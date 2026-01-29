// /capture/captureFrame.js
export function captureFrame(videoEl, opts = {}) {
  const {
    maxWidth = 2048, // keep mobile safe; raise for desktop
    mimeType = "image/webp",
    quality = 0.92,
  } = opts;

  if (!videoEl?.videoWidth || !videoEl?.videoHeight) {
    throw new Error("Video not ready for captureFrame()");
  }

  const vw = videoEl.videoWidth;
  const vh = videoEl.videoHeight;

  const scale = Math.min(1, maxWidth / vw);
  const w = Math.round(vw * scale);
  const h = Math.round(vh * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(videoEl, 0, 0, w, h);

  return {
    canvas,
    ctx,
    width: w,
    height: h,
    toBlob: () =>
      new Promise((resolve) => canvas.toBlob(resolve, mimeType, quality)),
    toDataURL: () => canvas.toDataURL(mimeType, quality),
  };
}
