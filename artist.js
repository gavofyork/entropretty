// Import all utils, to make them available to the code editor
import { bits, bit, pi,shade, black, white, light, dark, split, gray, turn, deg } from "./utils.js";

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


function addSchema(name, draw) {
    postMessage({ op: 'addSchema', name, thumb: thumb(draw) });
    schemas[name] = { draw };
}


import { draw as drawBloom } from "./designs/bloom.js";
addSchema("Bloom", drawBloom);

import { draw as drawLemonJelly } from "./designs/lemonjelly.js";
addSchema("Lemon Jelly", drawLemonJelly);

import { draw as drawCircleBarA } from "./designs/circlebara.js";
addSchema("Circle Bar A", drawCircleBarA);

import { draw as drawCircleBarB } from "./designs/circlebarb.js";
addSchema("Circle Bar B", drawCircleBarB);

import { draw as drawCircles } from "./designs/circles.js";
addSchema("Circles", drawCircles);

import { draw as drawDateTime } from "./designs/datetime.js";
addSchema("Mondaine", drawDateTime);

import { draw as drawDial } from "./designs/dial.js";
addSchema("Ugly Dial", drawDial);

import { draw as drawLines } from "./designs/lines.js";
addSchema("Ugly Lines", drawLines);

import { draw as drawWilsonMaze } from "./designs/maze.js";
addSchema("Wilson's Maze", drawWilsonMaze);

import { draw as drawPlanets } from "./designs/planets.js";
addSchema("Planets", drawPlanets);

import { draw as drawRoman } from "./designs/roman.js";
addSchema("Roman Numerals", drawRoman);

import { draw as drawSprite } from "./designs/sprite.js";
addSchema("Sprite", drawSprite);

postMessage({ op: 'initialized' });
