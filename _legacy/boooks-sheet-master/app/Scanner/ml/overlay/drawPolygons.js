// /ml/overlay/drawPolygons.js
export function drawPolygons(ctx, polygons) {
  const w = ctx.canvas.clientWidth;
  const h = ctx.canvas.clientHeight;

  ctx.save();
  ctx.lineWidth = 3;

  for (const poly of polygons) {
    const pts = poly.points;
    if (!pts?.length) continue;

    ctx.beginPath();
    ctx.moveTo(pts[0][0] * w, pts[0][1] * h);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0] * w, pts[i][1] * h);
    ctx.closePath();
    ctx.stroke();
  }

  ctx.restore();
}
