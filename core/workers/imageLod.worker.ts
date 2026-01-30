// core/workers/imageLod.worker.ts
self.onmessage = async (e) => {
  const { blob, sizes } = e.data as {
    blob: Blob;
    sizes: { key: string; max: number }[];
  };

  const bitmap = await createImageBitmap(blob);

  async function resize(max: number): Promise<Blob> {
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);

    const canvas = new OffscreenCanvas(w, h);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, w, h);

    return await canvas.convertToBlob({ type: "image/webp", quality: 0.85 });
  }

  const result: Record<string, Blob> = {};
  for (const s of sizes) {
    result[s.key] = await resize(s.max);
  }

  self.postMessage(result);
};
