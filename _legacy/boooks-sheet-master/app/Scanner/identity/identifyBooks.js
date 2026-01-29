// /identity/identifyBook.js
import { aHashFromCanvas, hammingDistanceHex } from "./signals/phash";
import { fuseSignals } from "./index/scoreFusion";

// inputs: { spineCanvas, frontCanvas, backCanvas, isbnText?, ocrText? }
// localIndex: provides listBooks(), getByIsbn()
export async function identifyBook(inputs, localIndex) {
  const { spineCanvas, frontCanvas, isbnText } = inputs;

  const isbnSignal = isbnText
    ? matchByISBN(isbnText, localIndex)
    : null;

  const coverSignal = frontCanvas
    ? matchByHash(frontCanvas, localIndex, "cover")
    : null;

  const spineSignal = spineCanvas
    ? matchByHash(spineCanvas, localIndex, "spine")
    : null;

  const fused = fuseSignals({
    isbn: isbnSignal,
    cover: coverSignal,
    spine: spineSignal,
    ocr: null,
  });

  return {
    ...fused,
    signals: { isbn: isbnSignal, cover: coverSignal, spine: spineSignal },
  };
}

function matchByISBN(isbnText, localIndex) {
  const isbn = normalizeISBN(isbnText);
  const book = localIndex.getByIsbn(isbn);
  return book
    ? { type: "isbn", score: 0.99, book }
    : { type: "isbn", score: 0, book: null };
}

function matchByHash(canvas, localIndex, type) {
  const hash = aHashFromCanvas(canvas, 8);
  const books = localIndex.listBooks();

  let best = null;
  let bestDist = Infinity;

  for (const b of books) {
    const ref = type === "cover" ? b.coverHash : b.spineHash;
    if (!ref) continue;
    const d = hammingDistanceHex(hash, ref);
    if (d < bestDist) {
      bestDist = d;
      best = b;
    }
  }

  // Convert distance to score: 0 dist => 1.0, 32 dist => ~0
  const maxBits = 64; // aHash 8x8
  const score = best
    ? Math.max(0, 1 - bestDist / (maxBits * 0.5)) // tune
    : 0;

  return best
    ? { type, score: clamp01(score), book: best, meta: { hash, dist: bestDist } }
    : { type, score: 0, book: null, meta: { hash } };
}

function normalizeISBN(s) {
  return String(s).replace(/[^0-9X]/gi, "").toUpperCase();
}

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}
