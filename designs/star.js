import { bits, symmetrical } from "../utils.js";

function draw(ctx, seed) {
  ctx.lineWidth = 0.04;
  symmetrical(11, i => {
    ctx.beginPath();
    ctx.moveTo(0, 0.1);
    let b = bits(seed, i * 3, i * 3 + 3) + 1;
    let c = b & 1;
    let d = b <= 1 ? 0 : b == 2 ? 1 : b - (2 - c);
    ctx.lineTo(0, d / 12 + 0.20);
    ctx.moveTo(0, d / 12 + 0.25);
    ctx.lineTo(0, b / 12 + 0.25);
    ctx.stroke();
  })
}

export const schema = { draw, name: "Star", artist: "gavofyork.dot" };
