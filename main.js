function randSeed(nibbles = 8) {
    let s = [];
    for (var i = 0; i < nibbles; ++i) {
        let n = Math.floor(Math.random() * 16);
        s.push(n);
    }
    return s
}

let schemas = {};

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

function draw() {
    let scheme = schemas[document.getElementById('schema').value];
    var ctx = document.getElementById('canvas').getContext('2d');
    for(var j = 0; j < 16; j+=4) {
        let seed = randSeed(scheme.nibbles);
        for(var i = j; i < j + 4; i++) {
            // flip some bits.
            scheme.mutate(seed);

            let x = i % 4;
            let y = Math.floor(i / 4);
            ctx.save();
            ctx.translate(x * 204 + 2, y * 224 + 24);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 200, 200);
            scheme.draw(ctx, 200, seed);
            ctx.restore();

            ctx.save();
            ctx.translate(x * 204, y * 224);
            // split into 8 nibbles
            ctx.strokeStyle = 'none';
            for(let i = 0; i < seed.length; ++i) {
                let a = bits(seed, i * 4, i * 4 + 2);
                let b = bits(seed, i * 4 + 2, i * 4 + 4);
                ctx.beginPath();
                ctx.arc(12.5 + i * 25, 12.5, 11, 0, Math.PI * 2);
                ctx.fillStyle = shade(a);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(12.5 + i * 25, 12.5, 7, 0, Math.PI * 2);
                ctx.fillStyle = shade(b);
                ctx.fill();
            }
            console.log(x, y, seed.map((x) => x.toString(16)).reduce((x, y) => x + y));
            ctx.restore();
        }
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


function bits(seed, from, to = 32) {
    let r = 0;
    for (let i = from; i < to; ++i) {
        r = r << 1 | bit(seed, i);
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
