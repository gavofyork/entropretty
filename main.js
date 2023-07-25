function randSeed(nibbles = 8) {
    let s = [];
    for (var i = 0; i < nibbles; ++i) {
        let n = Math.floor(Math.random() * 16);
        s.push(n);
    }
    return s
}

let schemas = { '[Custom]': { draw: null, nibbles: 8, mutate: mutateBits(3) } };

function addSchema(name, draw, nibbles = 8, mutate = mutateBits(3)) {
    let schema = document.getElementById('schema');
    schema.innerHTML += `<option>${name}</option>`;
    schemas[name] = { draw, nibbles, mutate };
    schema.value = name;
}

function mutateBits(count) {
    return (seed) => {
        for(var b = 0; b < count; ++b) {
            let bit = 2 ** Math.floor(Math.random() * 4);
            let item = Math.floor(Math.random() * 8);
            seed[item] ^= bit;
        }
    }
}

function customChanged() {
    let customCode = document.getElementById('code').value;
    try {
        schemas['[Custom]'].draw = eval(`function f(ctx, size, seed) {
            ctx.strokeStyle = '';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = (size / 4) + 'px serif';
            ${customCode}
        }
        f`);
        document.getElementById('customschema').selected = true;
        draw();
    } catch (e) {}
}

function drawItem(ctx, scheme, seed, s, x, y) {
    ctx.save();
    ctx.translate(x * s * 1.02 + 2, y * s * 1.12 + s * 0.12);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, s, s);
    scheme.draw(ctx, s, seed);
    ctx.restore();

    ctx.save();
    ctx.translate(x * s * 1.02, y * s * 1.12);
    // split into 8 nibbles
    ctx.strokeStyle = 'none';
    for(let i = 0; i < seed.length; ++i) {
        let d = s / 8;
        let r = d / 2;
        let a = bits(seed, i * 4, i * 4 + 2);
        let b = bits(seed, i * 4 + 2, i * 4 + 4);
        ctx.beginPath();
        ctx.arc(r + i * d, r, r * 0.85, 0, Math.PI * 2);
        ctx.fillStyle = shade(a);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(r + i * d, r, r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = shade(b);
        ctx.fill();
    }
    console.log(x, y, seed.map((x) => x.toString(16)).reduce((x, y) => x + y));
    ctx.restore();
}

function draw() {
    let scheme = schemas[document.getElementById('schema').value];
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.fillStyle = 'rgb(64, 64, 64, 1)';
    ctx.fillRect(0, 0, 800, 900);

    let seed = randSeed(scheme.nibbles);
    drawItem(ctx, scheme, seed, 400, 0, 0);
    ctx.save();
    ctx.translate(400 * 1.02, 0);
    for(var i = 0; i < 4; ++i) {
        scheme.mutate(seed);
        let x = i % 2;
        let y = Math.floor(i  / 2);
        drawItem(ctx, scheme, seed, 200, x, y);
    }
    ctx.restore();

    ctx.save();
    ctx.translate(0, 400 * 1.12);
    for(var j = 0; j < 128; j+=16) {
        let seed = randSeed(scheme.nibbles);
        for(var i = j; i < j + 16; i++) {
            // flip some bits.
            scheme.mutate(seed);
            let x = i % 16;
            let y = Math.floor(i / 16);
            drawItem(ctx, scheme, seed, 50, x, y);
        }
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


function bits(seed, from, to = 32) {
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
