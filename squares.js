// Inspired by "Quadrate - Herbert Franke".

function drawSquares(monochrome) {
	return (ctx, seed) => doDrawSquares(ctx, seed, monochrome);
}

addSchema("Squares Pentachrome", drawSquares(false));
addSchema("Squares Monochrome", drawSquares(true));

function doDrawSquares(ctx, seed, monochrome) {
	let rng = sfc32(bits(seed),bits(seed),bits(seed),bits(seed));
	const pallete = ['#D00000', '#FFBA08', '#3F88C5', '#032B43', '#136F63'];
	ctx.lineWidth = 1 / 200;

	for (const n of [6, 3, 2]) {
		const smallest_s = 1/(n*2-1); // size
		const smallest_d = smallest_s / 2; // distance
		const smallest_o = (1 - (smallest_s * n)) / 2.5; // offset

		for (var x = 0; x < n; x++)
		for (var y = 0; y < n; y++) {
			ctx.save();
			ctx.translate(
				(smallest_s + smallest_d) * x + smallest_o,
				(smallest_s + smallest_d) * y + smallest_o
			);
			ctx.beginPath();
			ctx.rect(-smallest_s/2, -smallest_s/2, smallest_s, smallest_s);

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
