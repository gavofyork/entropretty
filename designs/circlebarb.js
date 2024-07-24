import { bytesToNibbles } from "../utils.js";

export function draw(ctx, seed) {
  seed = bytesToNibbles(seed)
  ctx.scale(0.5, 0.5);
  ctx.translate(1, 1);
  ctx.lineWidth = 0.04;
  ctx.beginPath();
  ctx.arc(0, 0, 0.98, 0, 10);
  ctx.stroke();
  ctx.lineWidth = 0.1;
  let last = 0;
  seed.strokeEach((i, index) => {
    let current = ((index * 16 + i) / 128) * Math.PI * 2;
    if (index % 2) {
      ctx.arc(0, 0, 0.92, last, current);
    }
    last = current;
  });
}
