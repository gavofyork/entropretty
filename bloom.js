function drawPetals(ctx, count, bias, sway, width, shade) {
    ctx.save();
    let turns = count;
    ctx.fillStyle = shade;
    for (let i = 0; i < turns; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-width + sway, bias, 0, 1);
        ctx.quadraticCurveTo(width + sway, bias, 0, 0);
        ctx.lineTo(0, 1);
        ctx.lineWidth = 0.02;
        ctx.strokeStyle = black;
        ctx.fill();
        ctx.rotate(Math.PI * 2 / turns);
    }
    ctx.restore();
}

function drawBloom(ctx, size, seed) {
    ctx.translate(size / 2, size / 2);
    ctx.scale(size / 2, size / 2);

    for (let s = 0; s < 4; s++) {
        ctx.scale(0.85, -0.85);
        drawPetals(ctx,
            Math.floor(seed[s] / 4) + 6,
            (Math.floor(seed[s + 4] % 4) + 1) / 5,
            (seed[s] % 4 - 1) / 8,
            (Math.floor(seed[s + 4] / 4) + 1) / 9,
            //seed[s] % 2 == 1 ? dark : light
            `rgba(${s * 64}, ${s * 64}, ${s * 64}, 1.0)`
        );
    }
}

addSchema("Bloom", drawBloom, 8);
