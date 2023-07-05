function drawLines(ctx, size, seed) {
    var width = size;
    var height = size;

    ctx.lineWidth = 4;
    ctx.strokeStyle = light;
    ctx.beginPath();
    for (var x = 0; x <= width; x += width / 8) {
        ctx.lineTo(x, ((seed[0] + seed[1] * 2**4 + seed[2] * 2**8 + x) ** 2.1) % height);
    }
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.strokeStyle = dark;
    ctx.beginPath();
    for (var x = 0; x <= width; x += width / 8) {
        ctx.lineTo(x, ((seed[3] + seed[4] * 2**4 + seed[5] * 2**8 + x) ** 3.1) % height);
    }
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.strokeStyle = black;
    ctx.beginPath();
    for (var x = 0; x <= width; x += width / 8) {
        ctx.lineTo(x, ((seed[5] + seed[6] * 2**4 + seed[7] * 2**8 + x) ** 4.1) % height);
    }
    ctx.stroke();
}

addSchema("Ugly Lines", drawLines, 8);
