import { split, bytesToNibbles} from "../utils.js";

export function draw(ctx, seed) {
  seed = bytesToNibbles(seed)
  ctx.scale(0.5, 0.5);
  ctx.translate(1, 1);
  ctx.lineWidth = 0.04;
  ctx.beginPath();
  ctx.arc(0, 0, 0.98, 0, 10);
  ctx.stroke();
  ctx.lineWidth = 0.1;
  split(seed, 32).strokeEach((b, i) => {
    if (b)
      ctx.arc(0, 0, 0.92, (i / 32) * Math.PI * 2, ((i + 1) / 32) * Math.PI * 2);
  });
}
