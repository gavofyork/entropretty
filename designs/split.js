import { black } from "../utils.js";

let cs, cs2;
let rand;
let context;
let GR = 0.61803398875;

function draw(ctx, seed) {
    rand = getRNG(seed);
    ctx.scale(100, 100);
    context = ctx;

    cs = 1
    cs2 = 0.5
    context.lineWidth = 0.03 * cs;
    context.strokeStyle = black;
    context.fillStyle = black;

        // BOX Template
        let marginX = 0.2;
        let marginY = marginX;
        let wX = 1 - 2 * marginX;
        let wY = 1 - 2 * marginY;
        let b = new Box(marginX * cs, marginY * cs, cs * wX, cs * wY);
        splitBox(b, 4)
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

    // subBox(ratioX, ratioY) {
    //     const ratio2X = (1 - ratioX) * 0.5;
    //     const ratio2Y = (1 - ratioY) * 0.5;
    //     return new Box(
    //         this.x + ratio2X * this.w,
    //         this.y + ratio2Y * this.h,
    //         ratioX * this.w,
    //         ratioY * this.h
    //     );
    // }

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

function splitBox(b, depth, colors) {
    if (depth == 0) {
        b.subBox(GR).rect();
    } else {
        var d = depth - 1;

        let gr = rand() < 0.5 ? GR : 1 - GR

        if (rand() < 0.5) {
            // vertical split
            var s = gr * b.w;
            splitBox(new Box(b.x + s, b.y, b.w - s, b.h), d, colors);
            splitBox(new Box(b.x, b.y, s, b.h), d, colors);
        } else {
            // horizontal split
            var s = gr * b.h;
            splitBox(new Box(b.x, b.y + s, b.w, b.h - s), d, colors);
            splitBox(new Box(b.x, b.y, b.w, s), d, colors);
        }
    }
}

export const schema = { draw, name: "Split", artist: "pifragile.gh" };
