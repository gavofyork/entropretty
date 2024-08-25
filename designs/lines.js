import { dark, black, light, bytesToNibbles } from "../utils.js";

function draw(ctx, seed) {
  seed = bytesToNibbles(seed);
  ctx.lineWidth = 0.04;
  ctx.strokeStyle = light;
  ctx.beginPath();
  for (var x = 0; x <= 1; x += 0.125) {
    ctx.lineTo(
      x,
      (seed[0] + seed[1] * 2 ** 4 + seed[2] * 2 ** 8 + x) ** 2.1 % 1
    );
  }
  ctx.stroke();

  ctx.lineWidth = 0.02;
  ctx.strokeStyle = dark;
  ctx.beginPath();
  for (var x = 0; x <= 1; x += 0.125) {
    ctx.lineTo(
      x,
      (seed[3] + seed[4] * 2 ** 4 + seed[5] * 2 ** 8 + x) ** 3.1 % 1
    );
  }
  ctx.stroke();

  ctx.lineWidth = 0.01;
  ctx.strokeStyle = black;
  ctx.beginPath();
  for (var x = 0; x <= 1; x += 0.125) {
    ctx.lineTo(
      x,
      (seed[5] + seed[6] * 2 ** 4 + seed[7] * 2 ** 8 + x) ** 4.1 % 1
    );
  }
  ctx.stroke();
}

export const schema = { draw, name: "Ugly Lines", artist: "gavofyork.dot" };
