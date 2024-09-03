import { black } from "../utils.js";

let cs, cs2;
let rand;
let context;

function draw(ctx, seed) {
    rand = getRNG(seed);
    ctx.scale(100, 100);
    context = ctx;

    cs = 1
    cs2 = 0.5
    context.lineWidth = 0.03 * cs;
    context.strokeStyle = black;
    context.fillStyle = black;

        let marginX = 0.3;
        let marginY = 0.25;
        let wX = 1 - 2 * marginX;
        let wY = 1 - 2 * marginY;
        let b = new Box(marginX * cs, 2 * marginY * cs, cs * wX, cs * wY);
        let grid = b.gridify(4, 1);
        grid.forEach((r) =>
            r.forEach((bo) => {
                bo.circle(0.15)
            })
        );

    let polygon = getPolygon();
    drawIterations(polygon);
}

function drawPolygon(polygon) {
    context.beginPath();
    polygon.forEach((p) => context.lineTo(p.x, p.y));
    context.closePath();
    context.stroke()
}

function averageVectors(vectors) {
    let l = vectors.length;
    let v = vectors.reduce(
        (acc, cur) => vectorAdd(cur, acc),
        createVector(0, 0)
    );
    v = vectorDivScalar(v, l);
    return v;
}

function averagePolygonVertices(polygon) {
    let gap = 200;
    let numVertices = 65;
    let newPolygon = [];
    for (let i = 0; i < polygon.length; i++) {
        let vectors = [];
        for (let j = 0; j < numVertices; j++) {
            vectors.push(polygon[(i + j * gap) % polygon.length]);
        }
        const v = averageVectors(vectors);
        newPolygon.push(v);
    }
    return newPolygon;
}

function getPolygon() {
    let polygon = [];
    let numPoints = 1201;
    for (let i = 0; i < numPoints; i++) {
        let r = Math.min(cs, cs) * rand() * 2 + 0.2;
        let a = Math.PI * 2 * rand();
        polygon.push(createVector(cs2 + r * Math.cos(a), cs2 + r * Math.sin(a)));
    }
    //polygon.sort((a, b) => a.x * a.y - b.y * b.x);
    polygon.sort((a, b) => a.x - b.y)
    return polygon;
}

function drawIterations(polygon) {
    let numIterations = 50;

    for (let i = 0; i < numIterations; i++) {
        if (i > numIterations - 2) drawPolygon(polygon);
        //drawPolygon(polygon);
        polygon = averagePolygonVertices(polygon);
    }
}

function getRNG(seed) {
    return sfc32(...cyrb128(seed.toString()));
}
function cyrb128(str) {
    let h1 = 1779033703,
        h2 = 3144134277,
        h3 = 1013904242,
        h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [
        (h1 ^ h2 ^ h3 ^ h4) >>> 0,
        (h2 ^ h1) >>> 0,
        (h3 ^ h1) >>> 0,
        (h4 ^ h1) >>> 0,
    ];
}
function sfc32(a, b, c, d) {
    return function () {
        a >>>= 0;
        b >>>= 0;
        c >>>= 0;
        d >>>= 0;
        var t = (a + b) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        d = (d + 1) | 0;
        t = (t + d) | 0;
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
    };
}

const Vector = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};

function createVector(x, y) {
    return new Vector(x, y);
}

function vectorAdd(a, b) {
    return new Vector(a.x + b.x, a.y + b.y);
}

function vectorDivScalar(a, s) {
    return new Vector(a.x / s, a.y / s);
}
const Box = class {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = createVector(x + w * 0.5, y + h * 0.5);
        this.tl = createVector(x, y);
        this.tr = createVector(x + w, y);
        this.br = createVector(x + w, y + h);
        this.bl = createVector(x, y + h);
        this.tc = createVector(x + w * 0.5, y);
        this.rc = createVector(x + w, y + h * 0.5);
        this.bc = createVector(x + w * 0.5, y + h);
        this.lc = createVector(x, y + h * 0.5);
    }
    gridify(gridWidth, gridHeight) {
        let grid = [];
        let boxWidth = this.w / gridWidth;
        let boxHeight = this.h / gridHeight;

        for (let i = 0; i < gridWidth; i++) {
            grid.push([]);
            for (let j = 0; j < gridHeight; j++) {
                grid[i].push(
                    new Box(
                        this.x + boxWidth * i,
                        this.y + boxHeight * j,
                        boxWidth,
                        boxHeight
                    )
                );
            }
        }
        return grid;
    }
    randomPoint() {
        return createVector(
            this.x + random() * this.w,
            this.y + random() * this.h
        );
    }

    coords(xRatio, yRatio) {
        return [this.xc(xRatio), this.yc(yRatio)];
    }

    xc(ratio) {
        return this.x + this.w * ratio;
    }

    yc(ratio) {
        return this.y + this.h * ratio;
    }

    mirrorH() {
        let img = pg.get(this.x, this.y, this.w, this.h);
        pg.push();
        pg.scale(-1, 1);
        pg.translate(-(2 * this.x + this.w), 0);
        pg.image(img, this.x, this.y, this.w, this.h);
        pg.pop();
    }

    mirrorV() {
        let img = pg.get(this.x, this.y, this.w, this.h);
        pg.push();
        pg.scale(1, -1);
        pg.translate(0, -(2 * this.y + this.h));
        pg.image(img, this.x, this.y, this.w, this.h);
        pg.pop();
    }

    rotate(rotation) {
        context.translate(this.c.x, this.c.y);
        context.rotate(rotation * Math.PI * 2);
        context.translate(-this.c.x, -this.c.y);
    }

    rect() {
        context.beginPath();
        context.rect(this.x, this.y, this.w, this.h);
        context.closePath();
        context.fill();
    }

    area() {
        return this.w * this.h;
    }

    triangle2(oriantation) {
        switch (oriantation) {
            case "tl":
                vecTriangle(this.tl, this.tr, this.bl);
                break;
            case "tr":
                vecTriangle(this.tl, this.tr, this.br);
                break;
            case "br":
                vecTriangle(this.br, this.tr, this.bl);
                break;
            case "bl":
                vecTriangle(this.bl, this.tl, this.br);
                break;
        }
    }

    triangle4(oriantation) {
        switch (oriantation) {
            case "l":
                vecTriangle(this.tl, this.bl, this.c);
                break;
            case "t":
                vecTriangle(this.tl, this.tr, this.c);
                break;
            case "r":
                vecTriangle(this.tr, this.br, this.c);
                break;
            case "b":
                vecTriangle(this.bl, this.br, this.c);
                break;
        }
    }

    circle(r) {
        context.beginPath();
        context.arc(
            this.c.x,
            this.c.y,
            r * Math.min(this.w, this.h),
            0,
            2 * Math.PI,
            true
        );
        context.closePath();
        context.fill();
    }

    subBox(ratio) {
        const ratio2 = (1 - ratio) * 0.5;
        return new Box(
            this.x + ratio2 * this.w,
            this.y + ratio2 * this.h,
            ratio * this.w,
            ratio * this.h
        );
    }

    subBox(ratioX, ratioY) {
        const ratio2X = (1 - ratioX) * 0.5;
        const ratio2Y = (1 - ratioY) * 0.5;
        return new Box(
            this.x + ratio2X * this.w,
            this.y + ratio2Y * this.h,
            ratioX * this.w,
            ratioY * this.h
        );
    }

    subBoxRect() {
        if (this.w > this.h) {
            const diff = this.w - this.h;
            return new Box(this.x + diff * 0.5, this.y, this.w - diff, this.h);
        } else {
            const diff = this.h - this.w;
            return new Box(this.x, this.y + diff * 0.5, this.w, this.h - diff);
        }
    }
};

export const schema = { draw, name: "Poly", artist: "pifragile.gh" };
