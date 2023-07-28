function drawDateTime(ctx, size, seed) {
    let time = Math.floor(bits(seed, 0, 16) / 65536 * 86400);
    let day = bits(seed, 16);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = (size / 3) + 'px sans-serif';
    ctx.fillText(day, size / 2, size / 2 * 0 + size / 4, size);
    ctx.fillText(time, size / 2, size / 2 * 1 + size / 4, size);
}

addSchema("Clock and Calendar", drawDateTime, 8);
