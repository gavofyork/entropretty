import { bytesToNibbles } from "../utils.js";


Object.defineProperty(Array.prototype, 'strokeEach', {
  value: function(f) {
      this.forEach((e, i) => {
          context.beginPath();
          f(e, i);
          context.stroke();
      });
  }
});

function draw(ctx, seed) {
  seed = bytesToNibbles(seed);
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

export const schema = { draw, name: "Circle Bar B", artist: "gavofyork.dot" };
