import { split } from "../utils.js";

function draw(ctx, seed) {
  ctx.scale(0.5, 0.5);
  ctx.translate(100, 100);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 98, 0, 10);
  ctx.stroke();
  ctx.lineWidth = 10;
  let last = 0;
  split(seed, 8).strokeEach((i, index) => {
    let current = ((index * 16 + i) / 128) * Math.PI * 2;
    if (index % 2) {
      ctx.arc(0, 0, 92, last, current);
    }
    last = current;
  });
}

export const schema = { draw, name: "Circle Bar B", artist: "gavofyork.dot" };
