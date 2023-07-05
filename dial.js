function drawDial(ctx, size, seed) {
    for (var i = 0; i < 4; i++) {
        ctx.lineWidth = size / 20;
        ctx.strokeStyle = dark;
        ctx.beginPath();
        let s = Math.PI * 2 * seed[i] / 16;
        let l = Math.PI * 2 * (seed[i + 4] + 1) / 17;
        ctx.arc(size / 2, size / 2, size / 2 / 6 * (i + 3) - ctx.lineWidth, s, s + l);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = light;
        ctx.beginPath();
        s = Math.PI * 2 * seed[i] / 16;
        l = Math.PI * 2 * (seed[i + 4] + 1) / 17;
        ctx.arc(size / 2, size / 2, size / 2 / 6 * (i + 3) - ctx.lineWidth, s, s + l);
        ctx.stroke();
    }
}

addSchema("Ugly Dial", drawDial, 8);
