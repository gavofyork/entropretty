const draw(context,seed)=>{
  const a = [
    "bgHl",
    "padding",
    "306860tRKCKq",
    "length",
    "827hDDFpO",
    "atan2",
    "395NGXjRB",
    "vRad",
    "hash",
    "fHl",
    "fill",
    "slice",
    "EPSILON",
    "radius",
    "gridD",
    "useSubtleBg",
    "shrinkConcavePegs",
    "oGrSt",
    "sampleRate",
    "238178ybuAjl",
    "start",
    "max",
    "drawAllPoints",
    "oGr",
    "86044danzRE",
    "map",
    "points",
    "7382BnPcfc",
    "end",
    "13rXxsQO",
    "push",
    "strokeWeight",
    "#4381c1",
    "innerWidth",
    "#3b9764",
    "sqrt",
    "sCol",
    "min",
    "156675tJbZva",
    "573caxaaB",
    "useSecBg",
    "forEach",
    "draw",
    "connects",
    "sin",
    "fCCol",
    "getTangents",
    "hlCol",
    "pAlg",
    "98HRQUmz",
    "isConcave",
    "abs",
    "#f2c945",
    "arcs",
    "floor",
    "concentric",
    "bgcol",
    "1OOKojP",
    "secCol",
    "sweep",
    "sort",
    "#c3423f",
  ],
  b = function (t, e) {
    return a[(t -= 128)];
  },
  N = b;
!(function (t, e) {
  const s = b;
  for (;;)
    try {
      if (
        176466 ===
        -parseInt(s(182)) * parseInt(s(144)) +
          parseInt(s(131)) * parseInt(s(129)) -
          parseInt(s(189)) +
          -parseInt(s(164)) * -parseInt(s(174)) +
          parseInt(s(163)) +
          -parseInt(s(152)) * -parseInt(s(154)) +
          parseInt(s(149))
      )
        break;
      t.push(t.shift());
    } catch (e) {
      t.push(t.shift());
    }
})(a);
let rp = setupPs(tokenData),
  seed = genSeed(tokenData);
const G_ALG = 0,
  R_G_ALG = 1,
  C_RAD = 0,
  BIGGER_NEAR_RAD = 1,
  BIGGER_FAR_RAD = 2;
let wC = "#f5f5f5",
  bC = "#2b2b2b";
const ps = {
  gridD: parseInt(mapP(rp[0], 3, 6)),
  radius: mapP(rp[1], 0.5, 0.8),
  sampleRate: mapP(rp[2], 0.5, 0.8),
  wrapped: rp[3] < 127,
  drawAllPoints: rp[4] < 127,
  forceCentroid: rp[5] > 200,
  fill: rp[6] < 127,
  pAlg: rp[7] < 220 ? G_ALG : R_G_ALG,
  vRad: rp[8] > 200 ? (rp[8] > 227 ? BIGGER_NEAR_RAD : 2) : C_RAD,
  bgHl: rp[9] > 220,
  fHl: rp[10] > 220,
  useSec: rp[11] < 75,
  useSecBg: rp[12] > 170,
  concentric:
    rp[13] <= 13 ||
    (rp[13] > 108 && rp[13] <= 110) ||
    69 == rp[13] ||
    33 == rp[13] ||
    43 == rp[13],
  fCCol: rp[14] > 200 && (rp[6] >= 127 || rp[10] > 220),
  bgcol: rp[22] < 250 ? wC : bC,
  subtleBgcol: "#f7f7e6",
  sCol: rp[22] < 250 ? bC : wC,
  hlCol: rp[22] < 250 ? N(177) : bC,
  secCol:
    rp[15] >= 19 && rp[15] <= 230
      ? N(186)
      : rp[15] > 230 && rp[15] <= 234
      ? N(159)
      : N(157),
  useSecForFill: rp[16] <= 85,
  strokeWeight: 8,
  padding: rp[17] > 14 ? 1 : 2.66,
  shrinkConcavePegs: rp[18] >= 245,
  useSubtleBg: rp[19] >= 245,
  oGr: rp[7] < 220 && rp[20] > 205,
  oGrSt: rp[21] > 127,
};
function setup() {
  const t = N;
  let e = Math[t(162)](window[t(158)], window.innerHeight);
  createCanvas(e, e), noLoop();
}
function draw() {
  const t = N;
  let e = (ps[t(156)] * width) / 800,
    s = ps[t(165)] ? ps[t(183)] : ps[t(172)],
    r = ps[t(187)] ? s : ps[t(140)] ? ps.subtleBgcol : ps.bgcol;
  background(r);
  let n = width * ps[t(188)] * 0.08,
    p = width - 2 * n,
    l = height - 2 * n,
    c = p / ps[t(139)],
    a = [],
    i = ps[t(143)],
    o = !!ps.forceCentroid && [rng(0, 2 * c), rng(height / 2, height)];
  if (
    (ps.pAlg === G_ALG
      ? pOnGrid(a, n, c)
      : ps[t(173)] === R_G_ALG && pOnRGrid(a, n, n, p, l),
    ps.vRad !== C_RAD)
  ) {
    let e = ps[t(132)] === BIGGER_NEAR_RAD;
    a[t(166)]((t, s) => {
      let r = distance(width / 2, height / 2, t.cx, t.cy),
        n = 1 / (1 + r / (width / 5)),
        p = (1 + r + c) / distance(width / 2, height / 2, 0, 0),
        l = rng(0.8, 1) * (e ? n : p);
      t.r *= l;
    });
  }
  let h,
    { samples: f, leftOver: d } = sampleSize(a, parseInt(i * a[t(128)])),
    u = new Ring(f);
  if ((u.generate(ps.wrapped, o), noStroke(), ps[t(135)])) {
    let e = ps.useSecForFill ? ps[t(183)] : ps.hlCol;
    h = ps[t(134)] ? e : ps[t(161)];
  } else h = ps[t(181)];
  fill(h), u[t(167)](), stroke(ps[t(161)]), strokeWeight(e), noFill(), u.draw();
  let g = rngFloor(0, f[t(128)]);
  if (
    (f[t(166)]((s, r) => {
      const n = t;
      let p;
      p = ps[n(170)]
        ? s[n(175)]
          ? ps[n(181)]
          : ps.sCol
        : s[n(175)]
        ? ps[n(161)]
        : ps[n(181)];
      let l = r === g,
        c = l ? ps.hlCol : p;
      stroke(ps[n(161)]), fill(c);
      let a = 2 * s.r;
      if (
        (ps[n(141)] && s[n(175)] && s.r >= 2 * e && (a *= 0.4),
        circle(s.cx, s.cy, a),
        ps[n(180)])
      ) {
        noStroke();
        let t,
          c = 0,
          i = p == ps[n(161)] && !l;
        for (
          t =
            ps[n(173)] === G_ALG ? (r % 2 == 0 ? 4 : 2) : s.id % 2 != 0 ? 4 : 2;
          a > e && a - t * e > e;

        ) {
          a -= t * e;
          let r,
            n = l ? ps.hlCol : ps.bgcol;
          (r = c % 2 == 0 ? (i ? n : ps.sCol) : i ? ps.sCol : n),
            fill(r),
            circle(s.cx, s.cy, a),
            c++;
        }
      }
    }),
    ps[t(147)])
  ) {
    g = rngFloor(0, d.length);
    let e = ps.fCCol ? ps[t(161)] : ps[t(181)];
    d[t(166)]((s, n) => {
      const p = t;
      let l = n === g && ps.useSec,
        c = l && ps[p(183)] != r && ps[p(183)] != h;
      stroke(c ? ps[p(183)] : ps[p(161)]),
        fill(l ? ps[p(183)] : e),
        circle(s.cx, s.cy, 2 * s.r);
    });
  }
}
function pOnGrid(t, e, s) {
  const r = N;
  for (let n = 0; n < ps[r(139)]; n++) {
    let p = ps[r(142)] ? n % 2 != 0 : n % 2 == 0,
      l = ps[r(148)] && p ? 1 : 0;
    for (let p = 0; p < ps[r(139)] - l; p++) {
      let c = e + (n + 0.5) * s,
        a = e + (p + 0.5 + l / 2) * s,
        i = (s / 2) * ps.radius;
      t[r(155)]({ cx: c, cy: a, r: i, i: n, j: p, id: t.length });
    }
  }
}
function pOnRGrid(t, e, s, r, n, p = 1) {
  const l = N;
  let c = parseInt(rng(2, 4)),
    a = r / c,
    i = n / c;
  for (let c = e; c < e + r - 1; c += a)
    for (let e = s; e < s + n - 1; e += i)
      if (rnd() < 0.5 && p < 2) pOnRGrid(t, c, e, a, i, p + 1);
      else {
        let s = (ps[l(138)] * Math[l(162)](a, i)) / 2;
        t[l(155)]({ r: s, cx: c + a / 2, cy: e + i / 2, id: t[l(128)] });
      }
}
function setupPs(t) {
  const e = N;
  let s = [];
  for (let t = 0; t < 32; t++)
    s[e(155)](tokenData[e(133)].slice(2 + 2 * t, 4 + 2 * t));
  return s.map((t) => parseInt(t, 16));
}
function genSeed(t) {
  const e = N;
  return parseInt(tokenData.hash[e(136)](0, 16), 16);
}
function rnd() {
  return (
    (seed ^= seed << 13),
    (seed ^= seed >> 17),
    (((seed ^= seed << 5) < 0 ? 1 + ~seed : seed) % 1e3) / 1e3
  );
}
function rng(t, e) {
  return rnd() * (e - t) + t;
}
function rngFloor(t, e) {
  return Math[N(179)](rng(t, e));
}
function shuffleA(t) {
  const e = N;
  for (var s, r, n = t[e(128)], p = t[e(136)](); n; )
    (s = Math.floor(rnd() * n--)), (r = p[n]), (p[n] = p[s]), (p[s] = r);
  return p;
}
function distance(t, e, s, r) {
  return Math[N(160)]((s - t) * (s - t) + (r - e) * (r - e));
}
function sampleSize(t, e) {
  const s = N;
  let r = shuffleA(t);
  return { samples: r[s(136)](0, e), leftOver: r[s(136)](e) };
}
function mapd(t, e, s, r, n) {
  return ((t - e) / (s - e)) * (n - r) + r;
}
function mapP(t, e, s) {
  return mapd(t, 0, 255, e, s);
}
class Ring {
  constructor(t) {
    const e = N;
    (this[e(151)] = t), (this.arcs = null), (this[e(168)] = null);
  }
  [N(167)]() {
    const t = N;
    let e = this.arcs,
      s = this.connects,
      r = 2 * Math.PI;
    beginShape(), vertex(e[0].start[0], e[0][t(145)][1]);
    for (let n = 0; n < e.length; n++) {
      let p = e[n],
        l = s[n],
        c = Math[t(130)](p[t(145)][1] - p.cy, p[t(145)][0] - p.cx),
        a = Math[t(130)](p.end[1] - p.cy, p[t(153)][0] - p.cx) - c;
      const i = Math[t(176)](a) < Number[t(137)];
      for (; a < 0; ) a += r;
      for (; a > r; ) a -= r;
      if (
        (a < Number.EPSILON && (a = i ? 0 : r),
        !p[t(184)] && !i && (a === r ? (a = -r) : (a -= r)),
        !i)
      ) {
        let e = (100 * width) / 800;
        for (let s = 0; s < e; s += 1) {
          let r = c + (a * s) / e,
            n = p.cx + p.r * Math.cos(r),
            l = p.cy + p.r * Math[t(169)](r);
          vertex(n, l);
        }
      }
      vertex(l[2], l[3]);
    }
    endShape();
  }
  generate(t, e) {
    const s = N;
    let r,
      n = [],
      p = [];
    e
      ? (r = [e[0], e[1]])
      : ((r = [0, 0]),
        this[s(151)][s(166)]((t) => {
          (r[0] += t.cx), (r[1] += t.cy);
        }),
        (r = [r[0] / this[s(151)].length, r[1] / this.points[s(128)]])),
      this[s(151)][s(185)]((t, e) => {
        const n = s;
        let p =
            (Math.atan2(t.cy - r[1], t.cx - r[0]) -
              Math[n(130)](e.cy - r[1], e.cx - r[0])) %
            (2 * Math.PI),
          l = -(
            distance(t.cx, t.cy, r[0], r[1]) - distance(e.cx, e.cy, r[0], r[1])
          ),
          c = Math[n(176)](p) < 1e-4,
          a = Math.abs(l) < 1e-4,
          i = c ? l : p;
        return c && a ? t.id - e.id : i;
      });
    for (
      let t = 0;
      t < this[s(151)].length && this[s(151)][s(128)] > 1;
      t += 1
    ) {
      let e = this[s(151)][t - 1 < 0 ? this[s(151)][s(128)] - 1 : t - 1],
        r = this[s(151)][t];
      r.sortedOrder = t;
      let n = this[s(151)][(t + 1) % this.points[s(128)]],
        p = e.cx - r.cx,
        c = e.cy - r.cy,
        a = n.cx - r.cx,
        i = n.cy - r.cy;
      var l = Math[s(130)](p * i - c * a, p * a + c * i);
      r[s(175)] =
        (l < 0 && Math[s(176)](l) <= Math.PI) ||
        Math.abs(Math.abs(l) - Math.PI) < 1e-4;
    }
    for (let e = 0; e < this.points.length && this.points.length > 1; e += 1) {
      let r = this[s(151)][e],
        n = this[s(151)][(e + 1) % this[s(151)][s(128)]],
        l = this[s(171)](r.cx, r.cy, r.r, n.cx, n.cy, n.r);
      t
        ? r.isConcave && n.isConcave
          ? p.push(l[1])
          : r.isConcave && !n[s(175)]
          ? p.push(l[3])
          : !r[s(175)] && n[s(175)]
          ? p.push(l[2])
          : p[s(155)](l[0])
        : p[s(155)](l[1]);
    }
    for (
      let e = 0;
      e < this[s(151)].length && this[s(151)][s(128)] > 1;
      e += 1
    ) {
      let r = e - 1 < 0 ? this[s(151)][s(128)] - 1 : e - 1,
        l = (this.points.length, this[s(151)][r], this[s(151)][e]),
        c = p[e],
        a = p[r],
        i = [a[2], a[3]],
        o = [c[0], c[1]];
      if (t) {
        let t,
          e = [a[0], a[1]],
          r = [c[2], c[3]],
          p = i[0] - e[0],
          h = i[1] - e[1],
          f = o[0] - r[0],
          d = o[1] - r[1],
          u = Math.atan2(p * d - h * f, p * f + h * d);
        (t =
          Math[s(176)](u) < Math.PI / 2 &&
          ((u < 0 && !l[s(175)]) || (u > 0 && l[s(175)]))
            ? 1
            : 0),
          n[s(155)]({
            start: i,
            cx: l.cx,
            cy: l.cy,
            r: l.r,
            largeArc: t,
            sweep: l.isConcave ? 1 : 0,
            end: o,
            display: Math[s(176)](u) < Math.PI / 1.2,
          });
      } else
        n[s(155)]({
          start: i,
          cx: l.cx,
          cy: l.cy,
          r: l.r,
          largeArc: l[s(175)] ? 0 : 1,
          sweep: 1,
          end: o,
          display: !0,
        });
    }
    (this[s(178)] = n), (this[s(168)] = p);
  }
  [N(171)](t, e, s, r, n, p) {
    const l = N;
    let c = (t - r) * (t - r) + (e - n) * (e - n);
    if (c <= (s - p) * (s - p)) return [];
    let a = Math[l(160)](c),
      i = (r - t) / a,
      o = (n - e) / a,
      h = Array(4)
        [l(135)](0)
        [l(150)]((t) => Array(4)[l(135)](0)),
      f = 0;
    for (let c = 1; c >= -1; c -= 2) {
      let d = (s - c * p) / a;
      if (d * d > 1) continue;
      let u = Math[l(160)](Math[l(146)](0, 1 - d * d));
      for (let l = 1; l >= -1; l -= 2) {
        let a = i * d - l * u * o,
          g = o * d + l * u * i,
          C = h[f++];
        (C[0] = t + s * a),
          (C[1] = e + s * g),
          (C[2] = r + c * p * a),
          (C[3] = n + c * p * g);
      }
    }
    return h[l(136)](0, f);
  }
}

}
