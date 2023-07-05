function drawDateTime(ctx, size, seed) {
    let time = Math.floor(bits(seed, 0, 16) / 65536 * 86400);
    let day = bits(seed, 16);
}

//addSchema("Clock and Calendar", drawDateTime, 8);
