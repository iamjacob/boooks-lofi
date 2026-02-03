// core/image/generateLod.ts
export async function generateLodVariants(blob: Blob) {
  const worker = new Worker(
    new URL("../workers/imageLod.worker.ts", import.meta.url),
    { type: "module" }
  );

  const sizes = [
    { key: "xs", max: 128 },
    { key: "small", max: 256 },
    { key: "medium", max: 512 },
    { key: "large", max: 1024 },
  ];

  return new Promise<Record<string, Blob>>((resolve) => {
    worker.onmessage = (e) => {
      resolve(e.data);
      worker.terminate();
    };

    worker.postMessage({ blob, sizes });
  });
}
