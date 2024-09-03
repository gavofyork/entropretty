import { dark, black, light, split } from "../utils.js";

function draw(ctx, seed) {
  let nibbles = split(seed, 8);
  ctx.lineWidth = 4;
  ctx.strokeStyle = light;
  ctx.beginPath();
  for (var x = 0; x <= 100; x += 12.5) {
    ctx.lineTo(
      x,
      ((nibbles[0] + nibbles[1] * 2 ** 4 + nibbles[2] * 2 ** 8 + x / 100) ** 2.1 % 1) * 100
    );
  }
  ctx.stroke();

  ctx.lineWidth = 2;
  ctx.strokeStyle = dark;
  ctx.beginPath();
  for (var x = 0; x <= 100; x += 12.5) {
    ctx.lineTo(
      x,
      ((nibbles[3] + nibbles[4] * 2 ** 4 + nibbles[5] * 2 ** 8 + x / 100) ** 3.1 % 1) * 100
    );
  }
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.strokeStyle = black;
  ctx.beginPath();
  for (var x = 0; x <= 100; x += 12.5) {
    ctx.lineTo(
      x,
      ((nibbles[5] + nibbles[6] * 2 ** 4 + nibbles[7] * 2 ** 8 + x / 100) ** 4.1 % 1) * 100
    );
  }
  ctx.stroke();
}

export const schema = { draw, name: "Ugly Lines", artist: "gavofyork.dot" };
