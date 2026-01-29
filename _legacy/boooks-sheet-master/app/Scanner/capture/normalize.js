// /capture/normalize.js

async function resizeTo(bitmap, w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, w, h);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
  const blobUrl = URL.createObjectURL(blob);
  const imageBitmap = await createImageBitmap(blob);
  return { blob, blobUrl, imageBitmap, width: w, height: h };
}

export async function normalizeCrops(crops) {
  const out = structuredClone(crops);

  // normalize front/back to 1024x1024 if present
  if (out.front?.imageBitmap) out.front = await resizeTo(out.front.imageBitmap, 1024, 1024);
  if (out.back?.imageBitmap) out.back = await resizeTo(out.back.imageBitmap, 1024, 1024);

  // spine to 512x1024 if present
  if (out.spine?.imageBitmap) out.spine = await resizeTo(out.spine.imageBitmap, 512, 1024);

  return out;
}
