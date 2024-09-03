import { bit, bits } from "../utils.js";
// Index 0 is treated as MSB:
// [0]: Sun / Black Hole
// [1, 5]: Orbit Dash Outer - 0: No Dash, 1: Dash
// [6, 20]: Planet Rot Outer - [0, 1, 2]: 0, 45, 90, 135, 180, 225, 270, 315
// [21, 25]: Planet Clr Outer - 0: White, 1: Black
// [26, 30]: Planet Size Outer - n: n * x + y
function draw(ctx, seed) {
  ctx.scale(100, 100);
  const range = (len) =>
    Array(len)
      .fill(0)
      .map((x, y) => x + y);
  const s = 1 / 14; // spacing between orbits
  const r = 1 / 28; // planet radius
  const sun_r = 2.5 * r;
  const n = 5; // num of planets

  var sun_or_black_hole = bit(seed, 0);
  var orbit_dashes_outer_to_inner = range(n).map((i) => bit(seed, 1 + i));
  var planet_rot_outer_to_inner = range(n).map((i) =>
    bits(seed, n + i * 3, n + i * 3 + 3)
  );
  var planet_clr_outer_to_inner = range(n).map((i) => bit(seed, 21 + i));
  var planet_size_outer_to_inner = range(n).map((i) =>
    bits(seed, 26 + i * 1, 26 + i + 1)
  );

  // Draw the sun / black hole
  ctx.lineWidth = 0.01;
  ctx.beginPath();
  ctx.fillStyle = sun_or_black_hole ? "black" : "white";
  ctx.arc(1 / 2, 1 / 2, sun_r, 0, 2 * Math.PI);
  if (sun_or_black_hole) ctx.fill();
  else ctx.stroke();

  // For all planets
  for (let i = 0; i < n; ++i) {
    ctx.fillStyle = "black";
    // Set the dashed lined so that it fits the circle and has 16 segments
    ctx.beginPath();
    // Draw the circle
    ctx.arc(1 / 2, 1 / 2, (i + 1) * s + sun_r, 0, 2 * Math.PI);
    if (orbit_dashes_outer_to_inner[i])
      ctx.setLineDash([
        (2 * Math.PI * (i + 1) * r) / 32,
        (2 * Math.PI * (i + 1) * r) / 32,
      ]);
    ctx.stroke();

    // Draw the planet on its orbit on a random position
    ctx.setLineDash([]);
    ctx.beginPath();
    const pX =
      1 / 2 +
      ((i + 1) * s + sun_r) *
        Math.cos((planet_rot_outer_to_inner[i] * Math.PI) / 4);
    const pY =
      1 / 2 +
      ((i + 1) * s + sun_r) *
        Math.sin((planet_rot_outer_to_inner[i] * Math.PI) / 4);

    let radius = r / 2 + (r / 2) * planet_size_outer_to_inner[i];
    ctx.arc(pX, pY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "white"; // remove the orbit within the planet
    ctx.fill();
    ctx.fillStyle = "black";
    planet_clr_outer_to_inner[i] ? ctx.fill() : ctx.stroke();
  }
}

export const schema = { draw, name: "Planets", artist: "ggwpez.gh" };
