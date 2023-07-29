function drawDial(ctx, seed) {
    let size = 1;
    for (var i = 0; i < 4; i++) {
        ctx.lineWidth = size / 20;
        ctx.strokeStyle = dark;
        ctx.beginPath();
        let s = Math.PI * 2 * seed[i] / 16;
        let l = Math.PI * 2 * (seed[i + 4] + 1) / 17;
        ctx.arc(size / 2, size / 2, size / 2 / 6 * (i + 3) - ctx.lineWidth, s, s + l);
        ctx.stroke();
    }
}

addSchema("Ugly Dial", drawDial, 8);
