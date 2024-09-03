import { black } from "../utils.js";

let arm,
    arm2,
    arm3,
    angle = 0;
let cs;
let rand;
let context;

let margin = 0

let length, length2, length3;


function setLengths() {
    let maxlength = (cs - 2 * margin) * 0.5;
    length = maxlength * (0.15 + 0.15 * rand())
    length2 = maxlength * (0.15 + 0.15 * rand())
    length3 = maxlength * (0.15 + 0.15 * rand());
}
function render() {
    arm.angle = Math.sin(angle) * ap;
    arm2.angle = Math.cos(angle * bp + cp) * dp;
    arm3.angle = Math.sin(angle * ep - fp) * gp;
    arm.setEnds();
    arm2.setEnds();
    arm3.setEnds();
    arm2.x = arm.endX;
    arm2.y = arm.endY;
    arm3.x = arm2.endX;
    arm3.y = arm2.endY;
    angle += 0.05;
    //arm.render();
    arm2.render();
    arm3.render();
}

let ap, bp, cp, dp, ep, fp, gp;
ap = 2.476
bp = .502
cp = 2
dp = 2.92
ep = 1.498
fp = 0.5
gp = 2.34


let NUM_ITERS = 100;

function draw(ctx, seed) {
    ctx.scale(100, 100);
    rand = getRNG(seed);
    context = ctx;

    ctx.translate(0.5, 0.5)
    ctx.rotate(rand() * Math.PI * 2)
    ctx.translate(-0.5, -0.5)
    
    cs = 1;
    setLengths();

    arm = Arm.create(cs / 2, cs / 2, length, 0);
    angle = 0;
    arm.setEnds();
    arm2 = Arm.create(arm.endX, arm.endY, length2, 1.3);
    arm2.setEnds();
    arm3 = Arm.create(arm2.endX, arm2.endY, length3, 1.3);

    arm2.parent = arm;
    arm3.parent = arm2;

    for (let i = 0; i < NUM_ITERS; i++) {
        render();
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
var Arm = Arm || {
    x: 0,
    y: 0,
    length: 100,
    angle: 0,
    parent: null,


    create: function (x, y, length, angle) {
        var obj = Object.create(this);
        obj.init(x, y, length, angle);
        return obj;
    },

    init: function (x, y, length, angle) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.angle = angle;
    },

    setEndX: function () {
        var angle = this.angle,
            parent = this.parent;
        while (parent) {
            angle += parent.angle;
            parent = parent.parent;
        }
        this.endX = this.x + Math.cos(angle) * this.length;
    },

    setEndY: function () {
        var angle = this.angle,
            parent = this.parent;
        while (parent) {
            angle += parent.angle;
            parent = parent.parent;
        }
        this.endY = this.y + Math.sin(angle) * this.length;
    },

    setEnds: function () {
        this.oldEndX = this.endX;
        this.oldENdY = this.endY;
        this.setEndX();
        this.setEndY();
    },

    render: function () {
        context.strokeStyle = black;
        context.beginPath();
        context.arc(this.endX, this.endY, 0.008, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();

        // context.lineWidth = 0.005;;
        // context.beginPath();
        // context.moveTo(this.oldEndX, this.oldENdY);
        // context.lineTo(this.endX, this.endY);
        // context.stroke();
        // context.closePath();
    
    },
};

export const schema = { draw, name: "Kins", artist: "pifragile.gh" };
