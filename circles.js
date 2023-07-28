function drawCircles(ctx, size, seed) {
    let rng = sfc32(bits(seed),bits(seed),bits(seed),bits(seed));
    let points = [];
    let disc = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x * size, y * size, r * size, 0, 10);
      ctx.fill();
    };
    let line = (x, y, tx, ty) => {
      ctx.beginPath();
      ctx.moveTo(x * size, y * size);
      ctx.lineTo(tx * size, ty * size);
      ctx.stroke();
    };
    for (let i = 0; i < 10; ++i) {
      let phi = rng() * Math.PI * 2;
      let r = Math.sqrt(rng()) * 0.92;
      points.push({x: Math.cos(phi) * r, y: Math.sin(phi) * r, phi});
    }
    ctx.strokeStyle = 'gray';
    points.forEach(({x, y, phi}) => {
      let cx = Math.cos(phi) * 0.96;
      let cy = Math.sin(phi) * 0.96;
      line(x / 2 + 0.5, y / 2 + 0.5, cx / 2 + 0.5, cy / 2 + 0.5);
      ctx.beginPath();
      ctx.arc(size * 0.5, size * 0.5, size * 0.48, phi - Math.PI / 72, phi + Math.PI / 72);
      ctx.stroke();
    });
    ctx.fillStyle = 'black';
    points.forEach(({x, y}) => {
      disc(x / 2 + 0.5, y / 2 + 0.5, 0.03);
    });
  }
  addSchema('Circles', drawCircles);