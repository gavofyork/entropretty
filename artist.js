let schemas = { '[Custom]': { draw: null } };

function addSchema(name, draw) {
    postMessage({ op: 'addSchema', name });
    schemas[name] = { draw };
}

importScripts(
    "lines.js",
    "dial.js",
    "datetime.js",
    "roman.js",
    "maze.js",
    "sprite.js",
    "bloom.js"
);

onmessage = function(e) {
    if (e.data.op == 'render') {
        let { schemeName, seed, size } = e.data;
        let scheme = schemas[schemeName];
        let canvas = new OffscreenCanvas(size, size);
        drawItem(canvas.getContext('2d'), scheme, seed, size);
        let image = canvas.transferToImageBitmap();
        postMessage({ op: 'rendered', image, seed });
    } else if (e.data.op == 'updateCustom') {
        try {
            schemas['[Custom]'].draw = eval(e.data.code);
        }
        catch (e) {
            console.warn('Invalid draw code')
        }
    }
};

postMessage({ op: 'initialized' });

function drawItem(ctx, scheme, seed, s, x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, s, s);
    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    try {
        scheme.draw(ctx, s, seed);
    }
    catch (e) {
        console.warn('Render error', e);
        ctx.lineWidth = 2;
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(s, s);
        ctx.moveTo(0, s);
        ctx.lineTo(s, 0);
        ctx.stroke();
    }
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
