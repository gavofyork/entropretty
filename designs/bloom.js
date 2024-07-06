import { black } from "../utils.js";

function drawPetals(ctx, count, bias, sway, width, shade) {
  ctx.save();
  let turns = count;
  ctx.fillStyle = shade;
  for (let i = 0; i < turns; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-width + sway, bias, 0, 1);
    ctx.quadraticCurveTo(width + sway, bias, 0, 0);
    ctx.lineTo(0, 1);
    ctx.lineWidth = 0.02;
    ctx.strokeStyle = black;
    ctx.fill();
    ctx.rotate((Math.PI * 2) / turns);
  }
  ctx.restore();
}

export function draw(ctx, seed) {
  ctx.translate(0.5, 0.5);
  ctx.scale(0.5, 0.5);

  for (let s = 0; s < 4; s++) {
    ctx.scale(0.7, -0.7);
    drawPetals(
      ctx,
      Math.floor(seed[s] / 4) + 6,
      (Math.floor(seed[s + 4] % 4) + 1) / 5,
      ((seed[s] % 4) - 1) / 8,
      (Math.floor(seed[s + 4] / 4) + 1) / 9,
      //seed[s] % 2 == 1 ? dark : light
      `rgba(${s * 64}, ${s * 64}, ${s * 64}, 1.0)`
    );
  }
}
