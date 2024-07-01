import { bits, sfc32 } from "../utils.js";

export function draw(ctx, seed) {
  let rng = sfc32(bits(seed), bits(seed), bits(seed), bits(seed));
  ctx.scale(0.5, 0.5);
  ctx.translate(1, 1);
  ctx.lineWidth = 0.04;
  let disc = (blob, n) => {
    let r = n == 1 ? blob.r1 : blob.r2;
    if (blob.r2) {
      return {
        x: blob.x + (blob.rtl == (n == 1) ? 1 : -1) * r,
        y: blob.y + (n == 1 ? 1 : -1) * r,
        r,
      };
    } else {
      return { x: blob.x, y: blob.y, r };
    }
  };
  let drawBlob = (b) => {
    let { x: xo, y: yo, r1, r2, rtl } = b;
    let rm = Math.min(r1, r2);
    ctx.save();
    ctx.beginPath();
    ctx.translate(xo, yo);
    if (r2 == null) {
      ctx.arc(0, 0, r1, 0, 10);
    } else {
      ctx.save();
      if (rtl) ctx.scale(-1, 1);
      ctx.translate(-r1, r1);
      ctx.arc(0, 0, r1, 0, (3 * Math.PI) / 2);
      ctx.arc(r1 - rm, -r1 - rm, rm, Math.PI / 2, Math.PI * 2, true);
      ctx.arc(r1 + r2, -r1 - r2, r2, Math.PI, Math.PI / 2, false);
      ctx.arc(r1 + rm, rm - r1, rm, (Math.PI * 3) / 2, Math.PI, true);
      ctx.restore();
    }
    ctx.fill();
    ctx.restore();

    if (b.inner1) {
      let n = 0;
      for (let r = r1 - b.inner1; r > b.inner1; r -= b.inner1) {
        let d1 = disc(b, 1);
        let g = ((n + 1) / 3) * 255;
        ctx.fillStyle = `rgb(${g}, ${g}, ${g})`;
        ctx.beginPath();
        ctx.arc(d1.x, d1.y, r, 0, 10);
        ctx.fill();
        n = (n + 1) % 3;
      }
    }
  };

  let blobs = [];
  let distance = (disc1, disc2) => {
    return (
      Math.hypot(Math.abs(disc1.x - disc2.x), Math.abs(disc1.y - disc2.y)) -
      disc1.r -
      disc2.r
    );
  };
  let blob_distance = (b1, b2) => {
    let d = 1e99;
    for (let i = 1; i <= (b1.r2 ? 2 : 1); ++i)
      for (let j = 1; j <= (b2.r2 ? 2 : 1); ++j)
        d = Math.min(d, distance(disc(b1, i), disc(b2, j)));
    return d;
  };
  for (let i = 50; i < 350; i += 1) {
    let b = { x: rng() * 2 - 1, y: rng() * 2 - 1, rtl: i % 7 < 3 };
    b.r1 = ((500 - i) / 500) * ((500 - i) / 500) * 0.2 + 0.05;
    b.r2 = i % 9 ? b.r1 * (0.4 + 0.3 * rng() * rng()) : null;
    if (blobs.some((o) => blob_distance(b, o) < 0.02)) continue;
    if (i % 7) b.inner2 = Math.max((((i % 7) / 7 + 1) * b.r2) / 2, 0.025);
    if (i % 11) b.inner1 = Math.max((((i % 11) / 11) * b.r1) / 2, 0.04);
    blobs.push(b);
  }
  // TODO: centre circular blobs in the 3 NNs.
  // TODO: starting with smaller blobs, attempt to move to maximize distance to neighbours.
  // TODO: distance for the adjoining part.
  blobs.forEach((b) => drawBlob(b));
}
