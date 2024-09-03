import { dark, split } from "../utils.js";
function draw(ctx, seed) {
  let nibbles = split(seed, 8);
  let size = 100;
  for (var i = 0; i < 4; i++) {
    ctx.lineWidth = size / 20;
    ctx.strokeStyle = dark;
    ctx.beginPath();
    let s = (Math.PI * 2 * nibbles[i]) / 16;
    let l = (Math.PI * 2 * (nibbles[i + 4] + 1)) / 17;
    ctx.arc(
      size / 2,
      size / 2,
      (size / 2 / 6) * (i + 3) - ctx.lineWidth,
      s,
      s + l
    );
    ctx.stroke();
  }
}

export const schema = { draw, name: "Dial", artist: "gavofyork.dot" };
