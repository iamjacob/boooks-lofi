// /ml/overlay/draw.js
import { drawGuides } from "./drawGuides";
import { drawPolygons } from "./drawPolygons";

export function drawOverlay(canvas, payload) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGuides(ctx, payload);
  if (payload.polygons?.length) drawPolygons(ctx, payload.polygons);
}
