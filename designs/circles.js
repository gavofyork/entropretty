import { randomGenerator } from "../utils.js";

function draw(ctx, seed) {
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
    let r = Math.sqrt(rand()) * 92;
    points.push({ x: Math.cos(phi) * r, y: Math.sin(phi) * r, phi });
  }
  ctx.strokeStyle = "gray";
  points.forEach(({ x, y, phi }) => {
    let cx = Math.cos(phi) * 96;
    let cy = Math.sin(phi) * 96;
    line(x / 2 + 50, y / 2 + 50, cx / 2 + 50, cy / 2 + 50);
    ctx.beginPath();
    ctx.arc(50, 50, 48, phi - Math.PI / 72, phi + Math.PI / 72);
    ctx.stroke();
  });
  ctx.fillStyle = "black";
  points.forEach(({ x, y }) => {
    disc(x / 2 + 50, y / 2 + 50, 3);
  });
}

export const schema = { draw, name: "Circles", artist: "gavofyork.dot" };
