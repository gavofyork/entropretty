import { randomGenerator } from "../utils.js";

function draw(t, a) {
  t.scale(100, 100);
  let l = randomGenerator(a),
    e = {
      t: 50,
      l: "round",
      h: 9,
      i: 4,
      o: 2,
      M: 2,
      u: 6,
      k: 1,
      v: [
        "black",
        "rgb(254,232,32)",
        "rgb(26, 175, 35)",
        "rgb(198,2,52)",
        "rgb(238,28,11)",
      ],
      m: (t) => t > 3 && l() < 0.99,
      p: (t, a, l) =>
        Math.max(2, Math.min(t - l, Math.round(t / Math.pow(1.00111, a)))),
    };
  !(function (t, a, l) {
    let e = l.t,
      r = t.aspect * e,
      n = e,
      h = 1 / e;
    function f(t, a) {
      return null == t ? a : t;
    }
    let i = f(l.M, 1),
      o = f(l.h, Math.max(i, n >> 3)),
      M = f(l.k, l.v.length),
      u = f(
        l.$,
        (function (t) {
          return t * t;
        })(n / i)
      ),
      c = f(l.A, 10),
      d = f(l.j, !0),
      b = f(l.q, !0),
      s = f(l.C, !1),
      k = f(l.L, !1),
      v = f(l.O, !1),
      g = f(l.S, !1),
      m = !0,
      w = "function" == typeof l.v ? l.v : (t, a) => l.v[a];
    for (var y = new Uint8Array(e * r), p = {}, x = {}, $ = i; $ <= o; ++$)
      (p[$] = {}), (x[$] = 0);
    for (var A = 0; A < r; ++A)
      for (var j = 0; j < e; ++j) {
        let t = z(j, A),
          a = o;
        if ("function" == typeof l.l) {
          let t = l.l(j / e, A / r);
          a =
            null == t
              ? 0
              : Math.min(o, Math.max(i, Math.round(t * (o - i + 1) + i)));
        } else
          "round" == l.l
            ? (a = Math.round(
                Math.min(
                  o,
                  Math.max(
                    0,
                    n / 2 - Math.hypot(j + 0.5 - n / 2, A + 0.5 - n / 2)
                  )
                )
              ))
            : "square" == l.l &&
              (a = Math.min(o, Math.min(j, e - j, A, r - A)));
        a >= i ? ((y[t] = a), (p[a][t] = !0), x[a]++) : (y[t] = 0);
      }
    function q(t, a, l) {
      let e = z(t, a),
        r = y[e];
      l < r &&
        (delete p[r][e],
        x[r]--,
        l >= i ? ((y[e] = l), (p[l][e] = !0), x[l]++) : (y[e] = 0));
    }
    function C(t, a, l) {
      for (var n = t[1] - a - o; n < t[1] + a + o; ++n)
        for (var h = t[0] - a - o; h < t[0] + a + o; ++h) {
          if (!(m || (n >= 0 && h >= 0 && n < r && h < e))) continue;
          let f;
          if ((h <= t[0] ? 0 : 1) + (n <= t[1] ? 0 : 2) === l) {
            let l = Math.abs(h - t[0]),
              e = Math.abs(n - t[1]);
            l < a
              ? (f = Math.max(0, e - a))
              : e < a && (f = Math.max(0, l - a));
          } else
            f = Math.min(
              o,
              Math.round(Math.max(0, Math.hypot(h - t[0], n - t[1]) - a))
            );
          q(h, n, f);
        }
    }
    let L = [],
      O = [],
      S = [];
    function U(t, l = 6.5, e = 1, r = 0.6) {
      let n,
        h = 2 * e,
        f = Math.min(t / r, 2 * l);
      return (
        (n = h < f ? Math.floor((f - h + 1) * Math.pow(a(), 0.5)) + h : h),
        t / (Math.ceil(n) / 2)
      );
    }
    function _(t, e = null) {
      for (var r = [], n = 0; n < t; ++n) {
        let t;
        null === e
          ? (t = Math.floor(a() * M))
          : ((t = Math.floor(a() * (l.v.length - 1))),
            t === e && (t = l.v.length - 1)),
          r.push(t),
          (e = t);
      }
      return r;
    }
    function z(t, a) {
      let l, n;
      return (
        void 0 === a ? ((l = t[0]), (n = t[1])) : ((l = t), (n = a)),
        m ? ((l + e) % e) + ((n + r) % r) * e : l + n * e
      );
    }
    function B(t, a) {
      return t[0] >= 0 && t[1] >= 0 && t[0] < e && t[1] < r && y[z(t)] >= a;
    }
    function D(t, e, r, n, h, f = _(1)[0], i) {
      O.push({ U: t, _: r, B: n, D: h, back: f });
      let M =
          null == i
            ? a() < r / o && a() > 0.3
              ? (r / (5 + 2 * Math.floor(2 * a()))) * 2
              : U(r)
            : i,
        u = r - M,
        c = (r - (1 + Math.floor((a() * r) / 10)) - u) / 2,
        d = (2 * u) / 3,
        b = Math.min(c, d);
      if (u >= l.M && b >= 1 && (null == i || i <= 1.05 * r))
        D(
          t,
          [t[0] + (h ? -1 : 1) * (u + b), t[1] - u - b],
          u,
          b,
          h,
          _(1, f)[0],
          M
        );
      else if (null == i) {
        if (((M = Math.min(M, U(r))), M >= 1))
          L.push({ U: t, rad: r - M, inner: _(Math.ceil(r / M - 1), f), F: M });
        else if (r >= 1) {
          let l = Math.max(1, Math.round((a() * (r - 1) * 2) / 3));
          L.push({ U: t, rad: l, inner: _(1, f) });
        }
      } else u >= 1 && L.push({ U: t, rad: u, inner: _(1, f) });
      let s = Math.max(U(n, r / M));
      s > 1 &&
        L.push({ U: e, rad: n - s, inner: _(Math.ceil(n / s - 1), f), F: s });
    }
    for (let t = 0; t < u; ++t) {
      let r = {},
        n = 0,
        h = null;
      for (let t = o; t >= i; t--)
        (n += x[t]), 0 != n && (null == h && (h = t), (r[t] = n));
      if (h < l.o) break;
      if (l.p(h, t, 0) < i) break;
      let f = null;
      for (let i = 0; ; ++i) {
        let o = Math.min(h, l.p(h, t, i));
        if (o < l.o) break;
        let M,
          d = o;
        if (l.m(t)) M = Math.floor(a() * x[o]);
        else for (M = Math.floor(a() * r[o]); M >= x[d]; ) (M -= x[d]), d++;
        let b = Object.keys(p[d])[M],
          s = [b % e, Math.floor(b / e)];
        f = f || { U: [s[0], s[1]], rad: o };
        let k = Math.min(Math.floor((2 * o) / 3), l.i);
        if (0 == n[k]) break;
        var E = null,
          F = null;
        let v = Math.max(l.M, o / 5);
        for (var G = v; G <= k; ++G) {
          let t = [s[0] - o - G, s[1] - o - G];
          if (!B(t, G)) break;
          (E = G), (F = t);
        }
        for (G = E ? E + Math.floor(2 * a()) : v; G <= k; ++G) {
          let t = [s[0] + o + G, s[1] - o - G];
          if (!B(t, G)) break;
          (E = G), (F = t);
        }
        if (null !== F) {
          let t = F[0] < s[0];
          C(s, o + 2, t ? 0 : 1), C(F, E + 2, t ? 3 : 2), D(s, F, o, E, t);
          break;
        }
        if (i > c) {
          f.rad <= l.u &&
            (t == u - 1 && l.C
              ? S.push(f)
              : (C(f.U, f.rad + 2),
                L.push({ U: f.U, rad: f.rad, inner: _(U(f.rad)) })));
          break;
        }
      }
    }
    if (Array.isArray(g) && 2 == g.length) {
      let a = t.createLinearGradient(0, 0, 0, 1);
      a.addColorStop(0, g[0]),
        a.addColorStop(1, g[1]),
        (t.fillStyle = a),
        t.fillRect(0, 0, 1, t.aspect);
    } else
      "string" == typeof g &&
        ((t.fillStyle = g), t.fillRect(0, 0, 1, t.aspect));
    if (v)
      for (let a = 0; a < r; ++a)
        for (let l = 0; l < e; ++l) {
          let r = y[z(l, a)];
          if (r > 0) {
            let n = (r - i) / (o - i + 1),
              f = 96 + 64 * (1 - (r % 2)),
              M = 96 + (r % 2) * 64;
            (t.fillStyle = `rgba(${((r - i) % 8) * 32}, ${M * (1 - n)}, ${
              f * (1 - n)
            }, 0.75)`),
              t.fillRect(l / e, a / e, h, h);
          }
        }
    function H(a, l, n, h, f, i) {
      void 0 === i &&
        m &&
        (a[0] < 2 * (l + n) &&
          (t.translate(1, 0), H(a, l, n, h, f, !0), t.translate(-1, 0)),
        a[0] > e - 2 * (l + n) &&
          (t.translate(-1, 0), H(a, l, n, h, f, !0), t.translate(1, 0)),
        a[1] > 0 &&
          a[1] < 2 * (l + n) &&
          (t.translate(0, t.aspect),
          H(a, l, n, h, f, !0),
          t.translate(0, -t.aspect)),
        a[1] < r &&
          a[1] > r - 2 * (l + n) &&
          (t.translate(0, -t.aspect),
          H(a, l, n, h, f, !0),
          t.translate(0, t.aspect)));
      let o = (a[0] + 0.5) / e,
        M = (a[1] + 0.5) / e,
        u = l / e,
        c = n / e,
        d = Math.min(u, c);
      (t.fillStyle = w([o, M], f)),
        t.save(),
        t.beginPath(),
        t.translate(o, M),
        h && t.scale(-1, 1),
        t.arc(0, 0, u, 0, (3 * Math.PI) / 2),
        t.arc(u - d, -u - d, d, Math.PI / 2, 2 * Math.PI, !0),
        t.arc(u + c, -u - c, c, Math.PI, Math.PI / 2, !1),
        t.arc(u + d, d - u, d, (3 * Math.PI) / 2, Math.PI, !0),
        t.fill(),
        t.restore();
    }
    function I(a, l, n, h = l / n.length, f) {
      void 0 === f &&
        m &&
        (a[0] < 2 * l &&
          (t.translate(1, 0), I(a, l, n, h, !0), t.translate(-1, 0)),
        a[0] > e - 2 * l &&
          (t.translate(-1, 0), I(a, l, n, h, !0), t.translate(1, 0)),
        a[1] > 0 &&
          a[1] < 2 * l &&
          (t.translate(0, t.aspect),
          I(a, l, n, h, !0),
          t.translate(0, -t.aspect)),
        a[1] < r &&
          a[1] > r - 2 * l &&
          (t.translate(0, -t.aspect),
          I(a, l, n, h, !0),
          t.translate(0, t.aspect)));
      let i = (a[0] + 0.5) / e,
        o = (a[1] + 0.5) / e,
        M = l / e,
        u = h / e;
      n.forEach((a) => {
        (t.fillStyle = w([i, o], a)),
          t.beginPath(),
          t.arc(i, o, M, 0, 2 * Math.PI),
          (M -= u),
          t.fill();
      });
    }
    if (
      (d &&
        O.forEach(({ U: t, _: a, B: l, D: e, back: r }) => H(t, a, l, e, r)),
      b && L.forEach(({ U: t, rad: a, inner: l, F: e }) => I(t, a, l, e)),
      s &&
        S.forEach(({ U: a, rad: l }) =>
          (function (a, l, n) {
            let f = (a[0] + 0.5) / e,
              i = (a[1] + 0.5) / e,
              o = l / e;
            (t.lineWidth = 0.2 / e),
              (t.strokeStyle = style || "black"),
              t.beginPath(),
              t.arc(f, i, o, 0, 10),
              t.stroke(),
              t.strokeRect(col / e, row / r, h, h);
          })(a, l)
        ),
      k)
    ) {
      (t.strokeStyle = "#0005"), (t.lineWidth = 7e-4), t.beginPath();
      for (let a = 0; a < r; ++a)
        t.moveTo(0, (a / r) * t.aspect), t.lineTo(1, (a / r) * t.aspect);
      for (let a = 0; a < e; ++a) t.moveTo(a / e, 0), t.lineTo(a / e, t.aspect);
      t.stroke();
    }
  })(t, l, e);
}

export const schema = { draw, name: "Lemon Jelly", artist: "gavofyork.dot" };
