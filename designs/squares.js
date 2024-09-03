// Inspired by "Quadrate - Herbert Franke".

import { cheapRandomGenerator } from "../utils.js";

function doDraw(ctx, seed, monochrome) {
	let rng = cheapRandomGenerator(seed);
	const pallete = ['#D00000', '#FFBA08', '#3F88C5', '#032B43', '#136F63'];
	ctx.scale(100, 100);
	ctx.lineWidth = 1 / 200;

	for (const n of [6, 3, 2]) {
		const s = 1 / (n * 2 - 1); // size
		const d = s / 2; // distance
		const o = (1 - (s * n)) / 2.5; // offset

		for (var x = 0; x < n; x++)
			for (var y = 0; y < n; y++) {
				ctx.save();
				ctx.translate(
					(s + d) * x + o,
					(s + d) * y + o
				);
				ctx.beginPath();
				ctx.rect(-s / 2, -s / 2, s, s);

				if (!monochrome)
					ctx.strokeStyle = pallete[((x * n) + y) % 5];

				ctx.fillStyle = ctx.strokeStyle;
				ctx.lineWidth = 1 / 50;

				if (rng() > 0.5) {
					if (n == 6)
						ctx.fill();
					else
						ctx.stroke();
				}

				ctx.restore();
			}
	}
}

export const schema = [
	{ draw: (c, s) => doDraw(c, s, true), name: "Squares (Mono)", artist: "ggwpez.gh" },
	{ draw: (c, s) => doDraw(c, s, false), name: "Squares (Chroma)", artist: "ggwpez.gh" },
];
