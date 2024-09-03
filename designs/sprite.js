import { bits } from "../utils.js";

// I didn't come up with this magic myself - it's shamelessly lifted from the internet (it's all
// over the place, but I reverse-engineered it from dwitter).

function drawComponent(ctx, px, py, shadow, scale) {
  if (shadow) {
    //        ctx.beginPath();
    //        ctx.roundRect((px - 1 + 0.25) * scale, (py - 1 + 0.25) * scale, 2.5 * scale, 2.5 * scale, scale);
    //        let rx = (px + size / 2) * scale;
    //        let ry = (py + size / 2) * scale;
    //        const gradient = ctx.createRadialGradient(rx, ry, 0, rx, ry, scale * 2);
    //        gradient.addColorStop(0.5, "black");
    //        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    // Set the fill style and draw a rectangle
    //        ctx.fillStyle = gradient;
    //        ctx.fill();
    ctx.fillRect((px - 1) * scale, (py - 1) * scale, 3 * scale, 3 * scale);
  } else {
    ctx.fillRect(px * scale, py * scale, scale, scale);
  }
}
function draw(ctx, seed) {
  let size = 100;
  let item = bits(seed); // 5000060;
  //    console.log(item);
  //    item = 38000060;
  let h = 16;
  let w = h / 2;
  let scale = size / h;
  let ox = w - 0.5;
  let oy = 0 - 0.5;
  let r = w - 2;
  [1, 0].forEach((shadow) => {
    for (let y = 0; y < h; ++y)
      for (let x = 0; x < w; ++x) {
        let s = x + y * w * (item / 1000000 + 1);
        if (Math.tan(s) < 2) {
          if ((s * s) % r > Math.hypot(x, y - h / 2)) {
            drawComponent(ctx, ox + x, oy + y, shadow, scale);
            drawComponent(ctx, ox - x, oy + y, shadow, scale);
          } else {
            let v = shadow || 220 - ((255 - (s % 255)) / 3) * 2;
            ctx.fillStyle = `rgba(${v}, ${v}, ${v}, 1.0)`;
          }
        }
        /*            if (16 > Math.hypot(x, y - 16)) {
                let v = 0;
                ctx.fillStyle = `rgba(${v}, ${v}, ${v}, 1.0)`;
                drawComponent(ctx, x, y, false, scale);
                drawComponent(ctx, -x, y, false, scale);
            }*/
        /*if (Math.tan(s) < 2) {
                let t = Math.tan(s);
                let v = t * 128;
                ctx.fillStyle = `rgba(${v}, ${v}, ${v}, 1.0)`;
                drawComponent(ctx, x, y, false, scale);
                drawComponent(ctx, -x, y, false, scale);
            }*/
      }
  });
}

function mutate(seed) {
  seed[7] = Math.floor(Math.random() * 16);
  seed[6] += Math.floor(Math.random() * 15) + 1;
  if (seed[6] >= 16) {
    seed[6] -= 16;
    seed[5] = (seed[5] + 1) % 16;
  }
  seed;
}

/*
if (!t) {
  c.width /= 8;
}
t *= 60;
function drawComponent(a, b, t, j) {
  let px = t % 16 * 20 + 6 + a - j;
  let py = Math.floor(t / 16) * 20 + b - j;
  let z = j ? 3 : 1;
  x.fillRect(px, py, z, z)
}
//if (t >= 5 && t <= 6)
{
  console.log(t)
  for(let k = c.width; k > 0; k--) {
  let j = Math.floor(k / 128)
  let s = c.width + k % 128 * (t + 1);
  if (Math.tan(s) < 2) {
    let a = k % 8;
    let b = Math.floor(k % 128 / 8);
    if (s * s % 6 > Math.hypot(a, b - 8)) {
      drawComponent(a, b, t, j);
      drawComponent(-a, b, t, j);
    } else {
      let v = j || s % c.width;
      x.fillStyle = `rgba(${v}, ${v}, ${v}, 1.0)`
    }
  }
}
}
*/

export const schema = { draw, name: "Sprite", artist: "gavofyork.dot" };
