import { bits } from "../utils.js";

function draw(ctx, seed) {
  let size = 100;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = size / 4.5 + "px Andale Mono";
  let secondsSinceEpoch = 3600 * 24 * 365.25 * 53;
  let dt = new Date((secondsSinceEpoch - bits(seed)) * 1000);
  let s = dt.toUTCString();
  ctx.fillText(s.substr(5, 11), size / 2, size, size);
  let hours = dt.getUTCHours();
  let minutes = dt.getUTCMinutes();
  let seconds = dt.getUTCSeconds();

  ctx.translate(size / 2, ((size * 3) / 8) * 1.05);
  ctx.scale((size * 3) / 8 / 1.05, (size * 3) / 8 / 1.05);

  let drawTime = (force) => {
    ctx.strokeStyle = force || "black";
    ctx.lineWidth = 0.08;
    ctx.save();
    ctx.beginPath();
    ctx.rotate(((minutes * 60 + seconds) / 3600) * Math.PI * 2);
    ctx.moveTo(0, 0.2);
    ctx.lineTo(0, -0.86);
    ctx.stroke();
    ctx.restore();

    ctx.lineWidth = 0.1;
    ctx.save();
    ctx.beginPath();
    ctx.rotate(
      (((hours % 12) * 3600 + minutes * 60 + seconds) / (12 * 3600)) *
        Math.PI *
        2
    );
    ctx.moveTo(0, 0.2);
    ctx.lineTo(0, -0.65);
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = force || "#c00";
    ctx.fillStyle = force || "#c00";
    ctx.lineWidth = 0.03;
    ctx.save();
    ctx.beginPath();
    ctx.rotate((seconds / 60) * Math.PI * 2);
    ctx.moveTo(0, 0.25);
    ctx.lineTo(0, -0.65);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -0.65, 0.075, 0, 10);
    ctx.fill();
    ctx.restore();
    ctx.arc(0, 0, 0.03, 0, 10);
    ctx.fill();
  };

  ctx.save();
  ctx.translate(0.03, 0.06);
  drawTime("#ddd");
  ctx.restore();

  ctx.strokeStyle = "#aaa";
  ctx.beginPath();
  ctx.arc(0, 0, 1.05, 0, 10);
  ctx.lineWidth = 0.08;
  ctx.stroke();
  ctx.strokeStyle = "#888";
  ctx.beginPath();
  ctx.arc(0, 0, 1.0, 0, 10);
  ctx.lineWidth = 0.02;
  ctx.stroke();

  ctx.strokeStyle = "black";
  for (let i = 0; i < 60; ++i) {
    ctx.beginPath();
    ctx.moveTo(0, 0.92);
    ctx.lineTo(0, i % 5 ? 0.84 : 0.7);
    ctx.lineWidth = i % 5 ? 0.025 : 0.06;
    ctx.rotate(Math.PI / 30);
    ctx.stroke();
  }

  ctx.strokeStyle = "black";
  ctx.lineCap = "butt";

  drawTime();
}

export const schema = { draw, name: "Mondaine", artist: "gavofyork.dot" };
