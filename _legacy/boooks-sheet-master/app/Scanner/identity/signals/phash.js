// /identity/signals/phash.js
export function aHashFromCanvas(canvas, size = 8) {
  const w = size;
  const h = size;

  const tmp = document.createElement("canvas");
  tmp.width = w;
  tmp.height = h;
  const ctx = tmp.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(canvas, 0, 0, w, h);

  const { data } = ctx.getImageData(0, 0, w, h);

  const gray = new Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    gray[i] = (r + g + b) / 3;
  }

  const mean = gray.reduce((a, v) => a + v, 0) / gray.length;

  // build bitstring
  let bits = "";
  for (let i = 0; i < gray.length; i++) bits += gray[i] >= mean ? "1" : "0";

  // pack to hex
  return bitsToHex(bits);
}

export function hammingDistanceHex(a, b) {
  if (!a || !b || a.length !== b.length) return Infinity;
  let dist = 0;
  for (let i = 0; i < a.length; i++) {
    const x = parseInt(a[i], 16) ^ parseInt(b[i], 16);
    dist += POPCOUNT[x];
  }
  return dist;
}

const POPCOUNT = [0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4];

function bitsToHex(bits) {
  let hex = "";
  for (let i = 0; i < bits.length; i += 4) {
    const chunk = bits.slice(i, i + 4);
    hex += parseInt(chunk, 2).toString(16);
  }
  return hex;
}
