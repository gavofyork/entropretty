let schemas = { '[Custom]': { draw: null } };
let standardSeed = [14, 2, 16, 9, 2, 4, 9, 6];
let context;

Object.defineProperty(Array.prototype, 'strokeEach', {
    value: function(f) {
        this.forEach((e, i) => {
            context.beginPath();
            f(e, i);
            context.stroke();
        });
    }
});
Object.defineProperty(Array.prototype, 'fillEach', {
    value: function(f) {
        this.forEach((e, i) => {
            context.beginPath();
            f(e, i);
            context.fill();
        });
    }
});

function thumb(draw) {
    let canvas = new OffscreenCanvas(100, 100);
    drawItem(canvas.getContext('2d'), {draw}, standardSeed, 100);
    return canvas.transferToImageBitmap();
}

onmessage = function(e) {
    if (e.data.op == 'render') {
        let { schemaName, seed, size } = e.data;
        let schema = schemas[schemaName];
        let canvas = new OffscreenCanvas(size, size);
        drawItem(canvas.getContext('2d'), schema, seed, size);
        let image = canvas.transferToImageBitmap();
        postMessage({ op: 'rendered', image, seed });
    } else if (e.data.op == 'updateCustom') {
        try {
            let d = eval(e.data.code);
            schemas['[Custom]'].draw = d;
            postMessage({ op: 'customThumb', thumb: thumb(d) });
            console.log("Artist: Updated custom.");
        }
        catch (e) {
            console.warn('Invalid draw code', e);
        }
    }
};

function drawItem(ctx, schema, seed, size) {
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.scale(size, size);
    ctx.fillRect(0, 0, 1, 1);
    ctx.lineWidth = 0.01;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    try {
        context = ctx;
        schema.draw(ctx, seed);
        context = null;
    }
    catch (e) {
        console.warn('Render error', e);
        ctx.lineWidth = 0.02;
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(1, 1);
        ctx.moveTo(0, 1);
        ctx.lineTo(1, 0);
        ctx.stroke();
    }
    ctx.restore();
}

let white = '#fff';
let light = '#ccc';
let dark = '#666';
let black = '#000';
let pi = Math.PI;
function deg(x) { return x / 90 * 2 * Math.PI }
function turn(x) { return 2 * Math.PI / x }
function gray(x) {
    return `rgba(${x}, ${x}, ${x}, 1)`;
}

function shade(x) {
    if(x < 1) { return white }
    if(x < 2) { return light }
    if(x < 3) { return dark }
    return black
}

function bit(seed, i) {
    return (seed[Math.floor(i / 4) % 8] >> (i % 4)) & 1
}


function bits(seed, from = 0, to = 32) {
    let r = 0;
    for (let i = from; i < to; ++i) {
        r = r << 1 | bit(seed, i);
    }
    if (r < 0) {
        r = r * -2;
    }
    return r
}

function split(seed, parts) {
    let r = [];
    let last = 0;
    for (let i = 0; i < parts; ++i) {
        let next = Math.round((i + 1) * 32 / parts);
        r.push(bits(seed, last, next));
        last = next;
    }
    return r
}

function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}

function addSchema(name, draw) {
    postMessage({ op: 'addSchema', name, thumb: thumb(draw) });
    schemas[name] = { draw };
}

importScripts(
    "lines.js",
    "dial.js",
    "datetime.js",
    "roman.js",
    "maze.js",
    "sprite.js",
    "bloom.js",
    "circles.js",
    "planets.js",
    "circlebara.js",
    "circlebarb.js",
    "lemonjelly.js",
    "squares.js",
);

postMessage({ op: 'initialized' });
