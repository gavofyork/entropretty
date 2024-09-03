import { split } from "../utils.js";
function roman(n) {
  let d = [
    "M",
    1000,
    "CM",
    900,
    "D",
    500,
    "CD",
    400,
    "C",
    100,
    "XC",
    90,
    "L",
    50,
    "XL",
    40,
    "X",
    10,
    "IX",
    9,
    "V",
    5,
    "IV",
    4,
    `I`,
    1,
  ];
  let result = "";
  for (let i = 0; i < d.length; i += 2) {
    let l = d[i];
    let q = d[i + 1];
    while (n >= q) {
      n -= q;
      result += l;
    }
  }
  return result;
}

function draw(ctx, seed) {
  let size = 100;
  let numbers = split(seed, 3);
  ctx.strokeStyle = "";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = size / 3 + "px serif";
  for (let i = 0; i < 3; ++i) {
    ctx.fillText(roman(numbers[i]), size / 2, (size / 3) * (i + 1), size);
  }
}

export const schema = { draw, name: "Roman", artist: "gavofyork.dot" };
