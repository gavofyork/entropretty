import { randomGenerator, bytesToNibbles } from "../utils.js";

function draw(ctx, seed) {
  seed = bytesToNibbles(seed);
  let rand = randomGenerator(seed);
  let points = [];
  let disc = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 10);
    ctx.fill();
  };
  let line = (x, y, tx, ty) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(tx, ty);
    ctx.stroke();
  };
  for (let i = 0; i < 10; ++i) {
    let phi = rand() * Math.PI * 2;
    let r = Math.sqrt(rand()) * 0.92;
    points.push({ x: Math.cos(phi) * r, y: Math.sin(phi) * r, phi });
  }
  ctx.strokeStyle = "gray";
  points.forEach(({ x, y, phi }) => {
    let cx = Math.cos(phi) * 0.96;
    let cy = Math.sin(phi) * 0.96;
    line(x / 2 + 0.5, y / 2 + 0.5, cx / 2 + 0.5, cy / 2 + 0.5);
    ctx.beginPath();
    ctx.arc(0.5, 0.5, 0.48, phi - Math.PI / 72, phi + Math.PI / 72);
    ctx.stroke();
  });
  ctx.fillStyle = "black";
  points.forEach(({ x, y }) => {
    disc(x / 2 + 0.5, y / 2 + 0.5, 0.03);
  });
}

export const schema = { draw, name: "Circles", artist: "gavofyork.dot" };
