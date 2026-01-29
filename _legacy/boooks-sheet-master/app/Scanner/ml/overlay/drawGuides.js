// /ml/overlay/drawGuides.js
export function drawGuides(ctx, { mode, stability, presence }) {
  const w = ctx.canvas.clientWidth;
  const h = ctx.canvas.clientHeight;

  ctx.save();
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = 2;

  // Center reticle / framing box
  ctx.strokeRect(w * 0.12, h * 0.18, w * 0.76, h * 0.64);

  // tiny status text
  ctx.font = "14px sans-serif";
  ctx.fillText(`mode: ${mode}`, 16, 24);
  ctx.fillText(`stability: ${stability.toFixed(2)}`, 16, 44);
  if (presence != null) ctx.fillText(`presence: ${presence.toFixed(2)}`, 16, 64);

  ctx.restore();
}
