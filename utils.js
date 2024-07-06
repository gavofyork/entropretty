export const white = "#fff";
export const light = "#ccc";
export const dark = "#666";
export const black = "#000";
export const pi = Math.PI;

export function deg(x) {
  return (x / 90) * 2 * Math.PI;
}
export function turn(x) {
  return (2 * Math.PI) / x;
}
export function gray(x) {
  return `rgba(${x}, ${x}, ${x}, 1)`;
}

export function shade(x) {
  if (x < 1) {
    return white;
  }
  if (x < 2) {
    return light;
  }
  if (x < 3) {
    return dark;
  }
  return black;
}

export function bit(seed, i) {
  return (seed[Math.floor(i / 4) % 8] >> i % 4) & 1;
}

export function bits(seed, from = 0, to = 32) {
  let r = 0;
  for (let i = from; i < to; ++i) {
    r = (r << 1) | bit(seed, i);
  }
  if (r < 0) {
    r = r * -2;
  }
  return r;
}

export function sfc32(a, b, c, d) {
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    var t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

export function split(seed, parts) {
  let r = [];
  let last = 0;
  for (let i = 0; i < parts; ++i) {
    let next = Math.round(((i + 1) * 32) / parts);
    r.push(bits(seed, last, next));
    last = next;
  }
  return r;
}
