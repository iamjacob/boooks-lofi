// /identity/identifyBook.js
import { isbnSignal } from "./signals/isbn.js";
import { phashSignal } from "./signals/phash.js";
import { ocrSignal } from "./signals/ocr.js";
import { fuseSignals } from "./index/scoreFusion.js";

export async function identifyBook({ crops, context }) {
  const signals = await Promise.all([
    isbnSignal({ crops, context }),
    phashSignal({ crops, context }),
    ocrSignal({ crops, context }),
  ]);

  const fused = fuseSignals(signals);

  return {
    best: fused.best,              // { id, title, ... }
    confidence: fused.confidence,  // 0..1
    signals,
  };
}
