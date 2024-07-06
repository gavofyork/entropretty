let schemas = { '[Custom]': { draw: null } };
let standardSeed = [14, 2, 16, 9, 2, 4, 9, 6];
let context;

function thumb(draw) {
    let canvas = new OffscreenCanvas(100, 100);
    doDraw(canvas.getContext('2d'), {draw}, standardSeed, 100, 100);
    return canvas.transferToImageBitmap();
}

onmessage = function(e) {
    if (e.data.op == 'render') {
        let { schemaName, note, seed, width, height } = e.data;
        let schema = schemas[schemaName];
        let canvas = new OffscreenCanvas(width, height);
        doDraw(canvas.getContext('2d'), schema, seed, width, height);
        let image = canvas.transferToImageBitmap();
        postMessage({ op: 'rendered', note, image, seed, width, height });
    } else if (e.data.op == 'updateCustom') {
        try {
            let d = eval(e.data.code);
            schemas['[Custom]'].draw = d;
            if (e.data.thumb) {
                postMessage({ op: 'customThumb', thumb: thumb(d) });
            }
            console.log("Artist: Updated custom.");
        }
        catch (e) {
            console.warn('Invalid draw code', e);
        }
    }
};

importScripts("drawing.js");

function addSchema(name, draw) {
    name.replace(/\W/g, '');
    postMessage({ op: 'addSchema', name, thumb: thumb(draw) });
    schemas[name] = { draw };
}

importScripts("schemas.js");
schemaNames.forEach(name => importScripts(name));

postMessage({ op: 'initialized' });
