// /identity/index/scoreFusion.js
export function fuseSignals({ isbn, cover, spine, ocr }) {
  // Each signal is { score: 0..1, book?: {...} }
  // Weighted merge
  const W = { isbn: 1.0, cover: 0.85, spine: 0.6, ocr: 0.5 };

  const candidates = [isbn, cover, spine, ocr].filter(Boolean).filter(s => s.book);

  if (!candidates.length) return { book: null, confidence: 0, matchType: null };

  // Prefer ISBN hard
  if (isbn?.book && isbn.score >= 0.95) {
    return { book: isbn.book, confidence: isbn.score, matchType: "isbn" };
  }

  // Otherwise pick best weighted score
  let best = { book: null, confidence: 0, matchType: null };

  for (const s of candidates) {
    const weight = W[s.type] ?? 0.5;
    const conf = s.score * weight;
    if (conf > best.confidence) best = { book: s.book, confidence: conf, matchType: s.type };
  }

  return best;
}
