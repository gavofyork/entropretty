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

let lastCustomCode = "";

function load() {
    lastCustomCode = window.localStorage.getItem("customCode");
    if (lastCustomCode) {
        document.getElementById('code').value = lastCustomCode;
    } else {
        lastCustomCode = document.getElementById('code').value;
    }
    updateCustom()
    let schemeName = window.localStorage.getItem("schemeName");
    if (schemeName) {
        document.getElementById('schema').value = schemeName;
    } else {
        schemeName = document.getElementById('schema').value;
    }
    try {
        seeds = JSON.parse(window.localStorage.getItem('seeds'));
    }
    finally {
        if (!seeds) resetSeeds();
    }
    try {
        index = JSON.parse(window.localStorage.getItem('index'));
    }
    finally {
        if (!index) index = [0, 0];
    }
    draw();
}

function clicked(e) {
    console.log(e);
    if (e.offsetY >= 400 * 1.12) {
        let x = Math.floor(e.offsetX / (50 * 1.02));
        let y = Math.floor((e.offsetY - 400 * 1.12) / (50 * 1.12));
        index = [Math.min(7, y), Math.min(15, x)];
    } else if (e.offsetX >= 400 * 1.02) {
        let x = Math.floor((e.offsetX - 400 * 1.02) / (100 * 1.02));
        let y = Math.floor(e.offsetY / (100 * 1.12));
        index = [index[0], Math.min(3, y) * 4 + Math.min(3, x)];
    } else {
        return
    }
    window.localStorage.setItem("index", JSON.stringify(index));
    draw();
}

function updateCustom() {
    let customCode = document.getElementById('code').value.trim();
    let prefix = "function draw(ctx, size, seed) {\n";
    let suffix = "\n}\naddSchema('[Custom]', draw);";
    if (!customCode.startsWith(prefix) || !customCode.endsWith(suffix)) {
        document.getElementById('code').value = lastCustomCode;
        return;
    }
    lastCustomCode = customCode;
    try {
        schemas['[Custom]'].draw = eval(customCode.slice(0, -suffix.length) + "} draw");
        window.localStorage.setItem("customCode", customCode);
    } catch (e) {}
}

function customChanged() {
    updateCustom();
    document.getElementById('customschema').selected = true;
    draw();
}

function drawItem(ctx, scheme, seed, s, x, y) {
    ctx.save();
    ctx.translate(x * s * 1.02, y * s * 1.12 + s * 0.12);
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
//    console.log(x, y, seed.map((x) => x.toString(16)).reduce((x, y) => x + y));
    ctx.restore();
}

let seeds = null;
let index = [0, 0];

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

function resetSeeds() {
    let schema = currentSchema();
    seeds = [];
    for(var i = 0; i < 8; ++i) {
        let run = [randSeed(schema.nibbles)];
        for(var j = 0; j < 15; ++j) {
            run.push(run.slice(-1)[0].slice());
            schema.mutate(run.slice(-1)[0]);
        }
        seeds.push(run);
    }
    window.localStorage.setItem('seeds', JSON.stringify(seeds));
}

function currentSchema() {
    let schemeName = document.getElementById('schema').value;
    window.localStorage.setItem("schemeName", schemeName);
    return schemas[schemeName];
}

function draw() {
    let schema = currentSchema();
    if (!seeds || !seeds[0] || !seeds[0][0] || schema.nibbles != seeds[0][0].length) {
        resetSeeds();
    }
    var ctx = document.getElementById('canvas').getContext('2d');

    let highlight = (x, y, s) => {
        ctx.fillStyle = '#f002';
        ctx.fillRect(x * s * 1.02, y * s * 1.12, s * 1.02, s * 1.12);
        ctx.strokeStyle = '#f00f';
        ctx.lineWidth = 1;
        ctx.strokeRect(x * s * 1.02, y * s * 1.12, s * 1.02, s * 1.12);
    };

    ctx.fillStyle = 'rgb(64, 64, 64, 1)';
    ctx.fillRect(0, 0, 800 * 1.02, 800 * 1.12);

    drawItem(ctx, schema, seeds[index[0]][index[1]], 400, 0, 0);
    ctx.save();
    ctx.translate(400 * 1.02, 0);
    for(var i = 0; i < 16; ++i) {
        let x = i % 4;
        let y = Math.floor(i / 4);
        drawItem(ctx, schema, seeds[index[0]][i], 100, x, y);
    }
    highlight(index[1] % 4, Math.floor(index[1] / 4), 100);
    ctx.restore();

    ctx.save();
    ctx.translate(0, 400 * 1.12);
    for(var y = 0; y < 8; y++) {
        for(var x = 0; x < 16; x++) {
            drawItem(ctx, schema, seeds[y][x], 50, x, y);
        }
    }
    highlight(index[1], index[0], 50);
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
