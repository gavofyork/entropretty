let artist = null;
let lastCustomCode = "";
let seeds = null;
let index = [0, 0];
let ongoing = 0;
let artistTimeout = null;
let renderCache = {};
let schemaName = null;
let customChangeTimeout = null;
let editor = null;
let artistInitialized = false;

function load() {
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
    require(["vs/editor/editor.main"], () => {
        editor = monaco.editor.create(document.getElementById('code'), {
        value: [
            `function draw(ctx, seed) {`,
            `  ctx.font = '0.4px serif';`,
            `  split(seed, 2).forEach((n, i) => ctx.fillText(n, 0.5, i / 2 + 0.25, 1));`,
            `}`,
            `addSchema('[Custom]', draw);`
        ].join('\n'),
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
      });
      editor.onDidChangeModelContent((e) => { customChanged() });
      ensureInitialized();
    });
    resetArtist();
}

function ensureInitialized() {
    if (!editor || !artistInitialized || seeds) return;

    let cc = window.localStorage.getItem("customCode");
    if (cc) {
        editor.setValue(cc);
    }
    updateCustom();
    selectSchema(window.localStorage.getItem("schemaName") || '[Custom]');
    try {
        index = JSON.parse(window.localStorage.getItem('index'));
    }
    finally {
        if (!index) index = [0, 0];
    }
    try {
        seeds = JSON.parse(window.localStorage.getItem('seeds'));
    }
    finally {
        if (seeds) {
            rerender();
        } else {
            resetSeeds();
        }
    }
}

function clicked(e) {
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
    ensureUpdated();
}

function selectSchema(name) {
    if (schemaName == name) return;
    if (schemaName) {
        document.getElementById(`thumb-${schemaName}`).style.backgroundColor = 'transparent';
    }
    schemaName = name;
    let e = document.getElementById(`thumb-${schemaName}`);
    e.style.backgroundColor = '#66f';
    if (e.scrollIntoViewIfNeeded) e.scrollIntoViewIfNeeded();
    window.localStorage.setItem('schemaName', name);
    rerender();
}

function updateCustom() {
    let customCode = editor.getValue().trim();
    let prefix = "function draw(ctx, seed) {\n";
    let suffix = "\n}\naddSchema('[Custom]', draw);";
    if (!customCode.startsWith(prefix) || !customCode.endsWith(suffix)) {
        editor.setValue(lastCustomCode);
        return;
    }
    if (lastCustomCode == customCode) return;
    lastCustomCode = customCode;
    window.localStorage.setItem("customCode", customCode);
    let code = customCode
        .replace('°', ' * Math.PI * 2')
        .slice(0, -suffix.length) + "} draw";
    console.log("Main: Updating custom...");
    artist.postMessage({ op: 'updateCustom', code });
}

function customChanged() {
    updateCustom();
    if (seeds) selectSchema('[Custom]');
    if (customChangeTimeout) window.clearTimeout(customChangeTimeout);
    customChangeTimeout = window.setTimeout(() => { customChangeTimeout = null; rerender(); }, 300);
}

function resetArtist() {
    if (artist) artist.terminate();
    artist = new Worker('artist.js');
    artist.onmessage = onArtistMessage;
    artistTimeout = null;
    ongoing = 0;
}

function finishRender() {
    window.clearTimeout(artistTimeout);
    artistTimeout = null;
    paint();
}

function ensureUpdated() {
    if (ongoing == 0) {
        // Everything rendered
        paint();
    }
    // No need to do anything if still rendering as we will paint once it's complete.
}

function resetSeeds() {
    let mutate = mutateBits(3);
    seeds = [];
    for(var i = 0; i < 8; ++i) {
        let run = [randSeed(8)];
        for(var j = 0; j < 15; ++j) {
            run.push(run.slice(-1)[0].slice());
            mutate(run.slice(-1)[0]);
        }
        seeds.push(run);
    }
    window.localStorage.setItem('seeds', JSON.stringify(seeds));
    rerender();
}

function rerender() {
    // We must bail if there's no seeds yet - we will call rerender at the end of the initialization
    // process anyway.
    if (!seeds) return;
    renderCache = {};
    if (artistTimeout) {
        window.clearTimeout(artistTimeout);
        resetArtist();
    }
    artistTimeout = window.setTimeout(resetArtist, 500000);
    console.log(`Main: Rerendering ${schemaName}`);
    for(var y = 0; y < 8; y++) {
        for(var x = 0; x < 16; x++) {
            ongoing++;
            artist.postMessage({ op: 'render', schemaName, seed: seeds[y][x], size: 400 });
        }
    }
}

function onArtistMessage(e) {
    if (e.data.op == 'rendered') {
        let { image, seed } = e.data;
        renderCache[bits(seed)] = image;
        ongoing = Math.max(0, ongoing - 1);
        if (ongoing == 0) {
            finishRender();
        }
    } else if (e.data.op == 'addSchema') {
        if (artistInitialized) return;
        let canvas = document.createElement('canvas');
        let thumb = e.data.thumb;
        canvas.id = `thumb-${e.data.name}`;
        canvas.width = 100;
        canvas.height = 100;
        canvas.getContext('2d').drawImage(thumb, 0, 0, thumb.width, thumb.height, 0, 0, 100, 100);
        canvas.onclick = () => { selectSchema(e.data.name) };
        document.getElementById('schemas').appendChild(canvas);
    } else if (e.data.op == 'initialized') {
        artistInitialized = true;
        ensureInitialized();
    } else if (e.data.op == 'customThumb') {
        let thumb = e.data.thumb;
        let ctx = document.getElementById('thumb-[Custom]').getContext('2d');
        ctx.drawImage(thumb, 0, 0, thumb.width, thumb.height, 0, 0, 100, 100);
    }
}

function drawItem(ctx, seed, x, y, size) {
    let image = renderCache[bits(seed)];
    if (!image) {
        ctx.lineWidth = size / 8;
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 3, 0, Math.PI * 2);
        ctx.stroke();
    } else {
        ctx.drawImage(image, 0, 0, image.width, image.height, x, y, size, size);
    }
}

function paintItem(ctx, seed, x, y, size) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y + size * 0.12, size, size);
    drawItem(ctx, seed, x, y + size * 0.12, size)

    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = 'none';
    for(let i = 0; i < seed.length; ++i) {
        let d = size / 8;
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
    ctx.restore();
}

// Assumes rendering is complete.
function paint() {
    if (ongoing > 0) {
        console.warn("paint() called while rendering. This won't work.");
        return;
    }
    var ctx = document.getElementById('canvas').getContext('2d');

    ctx.fillStyle = '#444';
    ctx.fillRect(0, 0, 800 * 1.02, 800 * 1.12);

    paintItem(ctx, seeds[index[0]][index[1]], 0, 0, 400);
    for(var i = 0; i < 16; ++i) {
        let x = i % 4;
        let y = Math.floor(i / 4);
        paintItem(ctx, seeds[index[0]][i], x * 100 * 1.02 + 400 * 1.02, y * 100 * 1.12, 100);
    }
    for(var y = 0; y < 8; y++) {
        for(var x = 0; x < 16; x++) {
            paintItem(ctx, seeds[y][x], x * 50 * 1.02, y * 50 * 1.12 + 400 * 1.12, 50);
        }
    }

    let highlight = (x, y, s) => {
        ctx.fillStyle = '#f002';
        ctx.fillRect(x * s * 1.02, y * s * 1.12, s * 1.02, s * 1.12);
        ctx.strokeStyle = '#f00f';
        ctx.lineWidth = 1;
        ctx.strokeRect(x * s * 1.02, y * s * 1.12, s * 1.02, s * 1.12);
    };
    ctx.save();
    ctx.translate(400 * 1.02, 0);
    highlight(index[1] % 4, Math.floor(index[1] / 4), 100);
    ctx.restore();
    ctx.save();
    ctx.translate(0, 400 * 1.12);
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

function randSeed(nibbles = 8) {
    let s = [];
    for (var i = 0; i < nibbles; ++i) {
        let n = Math.floor(Math.random() * 16);
        s.push(n);
    }
    return s
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
