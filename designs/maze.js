import { bits, light } from "../utils.js";

let patterns = [
  [
    [27, 4, 25, 28, 1, 9, 29, 14, 28, 17, 8, 8, 0, 8, 21, 27],
    [20, 9, 0, 22, 15, 4, 17, 0, 8, 22, 5, 12, 3, 25, 9, 13],
    [16, 20, 16, 4, 18, 7, 28, 6, 19, 13, 17, 28, 0, 17, 24, 2],
    [13, 0, 10, 16, 6, 15, 14, 25, 23, 24, 16, 24, 14, 16, 3, 2],
    [0, 29, 7, 8, 23, 25, 9, 25, 16, 10, 22, 4, 29, 25, 7, 2],
    [26, 4, 25, 25, 10, 23, 6, 23, 12, 20, 22, 24, 22, 21, 23, 4],
    [23, 7, 28, 17, 25, 22, 15, 22, 20, 11, 2, 13, 18, 24, 11, 13],
    [26, 27, 27, 24, 7, 11, 24, 9, 7, 28, 1, 3, 19, 10, 5, 20],
    [18, 7, 1, 23, 15, 0, 2, 24, 21, 1, 11, 24, 25, 9, 6, 24],
    [9, 8, 12, 17, 15, 21, 20, 22, 4, 25, 16, 3, 11, 28, 12, 29],
    [20, 19, 25, 17, 22, 16, 13, 21, 23, 3, 26, 22, 23, 16, 26, 28],
    [25, 23, 1, 0, 13, 6, 3, 23, 28, 7, 25, 9, 21, 10, 15, 2],
    [15, 24, 22, 5, 14, 10, 4, 13, 17, 24, 17, 4, 19, 4, 6, 28],
    [23, 23, 4, 1, 4, 9, 15, 13, 4, 25, 13, 1, 26, 28, 9, 20],
    [1, 16, 5, 18, 28, 13, 24, 3, 0, 3, 21, 22, 8, 0, 15, 24],
    [7, 7, 22, 6, 15, 26, 29, 2, 1, 17, 1, 11, 10, 21, 22, 25],
  ],
  [
    [5, 7, 10, 19, 2, 24, 26, 1, 5, 1, 17, 2, 1, 22, 7, 22],
    [18, 20, 19, 28, 6, 18, 8, 20, 20, 27, 25, 29, 29, 3, 3, 26],
    [0, 17, 23, 17, 16, 26, 9, 14, 21, 26, 15, 16, 25, 15, 17, 6],
    [13, 17, 27, 14, 2, 7, 19, 25, 16, 9, 25, 10, 29, 5, 0, 5],
    [20, 12, 4, 25, 16, 17, 8, 14, 4, 1, 11, 5, 0, 2, 2, 2],
    [9, 20, 25, 18, 1, 27, 9, 14, 13, 14, 25, 20, 3, 13, 29, 2],
    [18, 10, 2, 14, 19, 16, 10, 3, 7, 26, 17, 15, 27, 15, 20, 9],
    [24, 12, 13, 16, 0, 17, 29, 19, 17, 19, 26, 22, 28, 22, 18, 29],
    [6, 11, 4, 24, 21, 28, 22, 23, 12, 24, 5, 26, 1, 11, 4, 4],
    [14, 17, 17, 29, 13, 2, 29, 3, 21, 15, 20, 28, 5, 26, 25, 29],
    [21, 17, 18, 23, 27, 8, 5, 19, 10, 26, 16, 23, 9, 19, 14, 15],
    [20, 5, 1, 9, 20, 2, 11, 12, 3, 29, 16, 25, 1, 11, 17, 14],
    [18, 28, 0, 10, 26, 16, 20, 16, 7, 28, 25, 28, 26, 13, 9, 21],
    [20, 12, 4, 28, 22, 18, 27, 15, 8, 21, 29, 2, 23, 18, 16, 2],
    [5, 12, 20, 2, 29, 29, 0, 19, 20, 15, 11, 20, 29, 29, 12, 1],
    [17, 29, 11, 15, 20, 15, 27, 6, 26, 3, 6, 16, 2, 25, 5, 17],
  ],
  [
    [27, 20, 28, 25, 13, 14, 27, 18, 22, 15, 5, 2, 0, 9, 29, 0],
    [10, 5, 1, 29, 2, 0, 20, 20, 0, 24, 13, 5, 4, 28, 3, 11],
    [9, 5, 20, 29, 14, 10, 21, 16, 22, 27, 5, 13, 24, 27, 4, 13],
    [7, 27, 1, 28, 6, 14, 4, 20, 15, 13, 2, 17, 12, 27, 7, 11],
    [10, 22, 3, 23, 20, 4, 25, 20, 11, 24, 11, 29, 3, 29, 15, 25],
    [19, 1, 26, 24, 29, 27, 7, 23, 18, 21, 7, 0, 10, 29, 21, 18],
    [18, 20, 8, 22, 2, 4, 29, 18, 26, 22, 5, 17, 2, 26, 14, 16],
    [27, 4, 27, 15, 25, 13, 27, 28, 10, 5, 22, 2, 4, 4, 22, 2],
    [26, 15, 16, 10, 27, 11, 27, 1, 23, 26, 12, 0, 22, 22, 7, 9],
    [9, 27, 22, 28, 25, 3, 15, 3, 6, 6, 11, 12, 13, 24, 2, 5],
    [4, 5, 0, 14, 26, 1, 13, 4, 6, 17, 13, 4, 2, 13, 12, 14],
    [0, 1, 0, 21, 2, 7, 7, 7, 6, 11, 5, 10, 20, 26, 27, 12],
    [24, 22, 4, 28, 1, 20, 25, 19, 28, 12, 8, 7, 18, 16, 9, 24],
    [7, 28, 0, 27, 13, 27, 12, 17, 27, 7, 25, 21, 10, 2, 16, 2],
    [1, 10, 29, 3, 9, 6, 20, 25, 5, 26, 6, 22, 14, 6, 23, 8],
    [23, 29, 16, 6, 2, 17, 12, 4, 26, 23, 5, 26, 24, 22, 9, 13],
  ],
  [
    [3, 11, 15, 6, 18, 22, 11, 5, 5, 15, 4, 29, 28, 7, 11, 27],
    [19, 15, 28, 22, 22, 26, 11, 4, 1, 22, 28, 29, 28, 25, 25, 13],
    [4, 10, 8, 23, 21, 7, 10, 23, 29, 26, 25, 13, 14, 28, 1, 1],
    [9, 29, 21, 14, 18, 29, 19, 4, 23, 1, 14, 23, 11, 3, 13, 9],
    [17, 23, 15, 8, 21, 28, 10, 28, 6, 0, 20, 4, 10, 22, 16, 12],
    [10, 9, 22, 18, 23, 3, 27, 2, 21, 7, 2, 19, 0, 19, 14, 1],
    [12, 13, 25, 19, 17, 22, 21, 7, 21, 16, 21, 13, 6, 26, 22, 6],
    [7, 13, 4, 9, 26, 19, 15, 10, 4, 8, 11, 26, 27, 3, 15, 18],
    [1, 18, 21, 0, 20, 14, 8, 11, 19, 1, 3, 15, 12, 20, 24, 5],
    [22, 28, 21, 1, 8, 23, 21, 7, 22, 13, 14, 26, 17, 17, 23, 13],
    [6, 26, 4, 4, 16, 23, 8, 21, 8, 6, 3, 23, 20, 8, 13, 3],
    [18, 28, 16, 5, 4, 14, 29, 11, 25, 16, 15, 11, 25, 20, 1, 10],
    [11, 21, 12, 24, 24, 17, 7, 5, 9, 6, 13, 5, 7, 9, 5, 0],
    [23, 2, 29, 19, 25, 19, 15, 14, 3, 11, 13, 5, 14, 27, 25, 10],
    [4, 1, 24, 29, 3, 19, 7, 14, 25, 23, 8, 28, 1, 26, 0, 9],
    [23, 22, 16, 6, 26, 0, 25, 22, 0, 7, 13, 7, 3, 14, 4, 12],
  ],
];

class Cell {
  constructor(i, j, seed) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.inMaze = false;
    this.walk = false;
    let segment = Math.floor(i / 4) + Math.floor(j / 4) * 4;
    let item = (i % 4) + (j % 4) * 4;
    let mode = bits(seed, segment * 2, segment * 2 + 2);
    this.pref = pref(patterns[mode][segment][item]);
  }
  neighbors(cells) {
    let nbrs = [null, null, null, null];
    if (this.j > 0) nbrs[0] = cells[this.i][this.j - 1];
    if (this.i < cells.length - 1) nbrs[1] = cells[this.i + 1][this.j];
    if (this.j < cells.length - 1) nbrs[2] = cells[this.i][this.j + 1];
    if (this.i > 0) nbrs[3] = cells[this.i - 1][this.j];
    return nbrs;
  }
  neighbor(cells) {
    //Returns a random neighbor
    let nbrs = this.neighbors(cells);
    let p = this.pref.find((i) => nbrs[i]);
    this.bump();
    return nbrs[p];
  }
  bump() {
    this.pref.push(this.pref.shift());
  }
  paths(cells) {
    return this.neighbors(cells).filter((x, i) => x && !this.walls[i]);
  }
  faces(ctx, inc) {
    //Representing algorithm
    if (this.inMaze) ctx.fillStyle = "rgb(255, 255, 255)";
//    ctx.fillRect(this.i * inc, this.j * inc, inc, inc);
  }
  blob(ctx, inc) {
    ctx.beginPath();
    ctx.arc(
      this.i * inc + inc / 2,
      this.j * inc + inc / 2,
      inc / 3,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = light;
    ctx.fill();
  }
  edges(ctx, inc) {
    //Drawing walls
    ctx.beginPath();
    if (this.walls[0]) {
      ctx.moveTo(this.i * inc, this.j * inc);
      ctx.lineTo(this.i * inc + inc, this.j * inc);
    }
    if (this.walls[1]) {
      ctx.moveTo(this.i * inc + inc, this.j * inc);
      ctx.lineTo(this.i * inc + inc, this.j * inc + inc);
    }
    if (this.walls[2]) {
      ctx.moveTo(this.i * inc + inc, this.j * inc + inc);
      ctx.lineTo(this.i * inc, this.j * inc + inc);
    }
    if (this.walls[3]) {
      ctx.moveTo(this.i * inc, this.j * inc + inc);
      ctx.lineTo(this.i * inc, this.j * inc);
    }
    ctx.stroke();
  }
}

function pref(x) {
  let q = [0, 1, 2, 3];
  let r = [];
  let g = 24;
  for (let n = 4; n > 0; n--) {
    g /= n;
    let i = Math.floor(x / g);
    x -= i * g;
    r.push(q[i]);
    q.splice(i, 1);
  }
  return r;
}

function deadend(cell, cells, last) {
  let ns = cell.paths(cells);
  let m = cells.length - 1;
  if (ns.length == 1) {
    return cell;
  } else if (ns.length == 2) {
    let next = ns.find((x) => x != last);
    if (next.i == 0 || next.i == m || next.j == 0 || next.j == m) {
      return deadend(next, cells, cell);
    }
  }
  return null;
}

function draw(ctx, seed) {
  let size = 100;
  let cols = 16;
  let rows = cols;
  let inc = size / cols;
  let cells = [];
  for (let i = 0; i < cols; i++) {
    cells[i] = [];
    for (let j = 0; j < rows; j++) cells[i][j] = new Cell(i, j, seed);
  }
  let walk = [];
  cells[bits(seed, 0, 4)][bits(seed, 4, 8)].inMaze = true;
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.lineWidth = inc / 4;
  ctx.lineCap = "square";
  for (let step = 0; step < 100000; ++step) {
    //Choosing starting point
    if (walk.length == 0) {
      let start = null;
      for (let i = 0; i < cols && !start; i++)
        for (let j = 0; j < rows && !start; j++)
          if (!cells[i][j].inMaze && !cells[i][j].walk) start = [i, j];

      if (start) {
        walk.push(cells[start[0]][start[1]]);
        cells[start[0]][start[1]].walk = true;
      } else {
        //Algorithm is done when there are no more cells to start at
        break;
      }
    } else {
      //Randomly walking
      let w = walk.length - 1;
      let n = walk[w].neighbor(cells);
      //If walk has intersected itself
      if (n.walk == true) {
        //Remove cells from walk until at where it was intersected
        for (let i = walk.length - 1; i >= 0; i--) {
          if (walk[i].i == n.i && walk[i].j == n.j) {
            break;
          } else {
            walk[i].walk = false;
            walk[i].walls = [true, true, true, true];
            walk.splice(i, 1);
          }
        }
      } else {
        n.walk = true;
        walk.push(n);
        //Generate walls of walk
        for (let i = 0; i < walk.length; i++) {
          if (i < walk.length - 1) walk[i].walls = [true, true, true, true];
          if (i > 0) {
            let current = walk[i];
            let previous = walk[i - 1];
            //Difference among indices
            let ii = current.i - previous.i;
            let jj = current.j - previous.j;
            //Which walls to remove based on relation of cells
            if (ii == 0) {
              //If cell is above or below
              if (jj == 1) {
                current.walls[0] = false;
                previous.walls[2] = false;
              } else if (jj == -1) {
                current.walls[2] = false;
                previous.walls[0] = false;
              }
            } else if (jj == 0) {
              //If cell is to the right or left
              if (ii == 1) {
                current.walls[3] = false;
                previous.walls[1] = false;
              } else if (ii == -1) {
                current.walls[1] = false;
                previous.walls[3] = false;
              }
            }
          }
        }
        //If walk intersects maze
        if (n.inMaze == true) {
          for (let i = 0; i < walk.length; i++) {
            //Add walk to the maze
            walk[i].walk = false;
            walk[i].inMaze = true;
          }
          walk = [];
        }
      }
    }
  }

  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) cells[i][j].faces(ctx, inc);
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) cells[i][j].edges(ctx, inc);

  let start = cells[0][0];
  let ns = start.paths(cells);
  if (ns.length > 1) {
    let a = deadend(ns[0], cells, start);
    let b = deadend(ns[1], cells, start);
    if (a) start = a;
    if (b) start = b;
  }
  let end = cells[15][15];
  ns = end.paths(cells);
  if (ns.length > 1) {
    let a = deadend(ns[0], cells, end);
    let b = deadend(ns[1], cells, end);
    if (a) end = a;
    if (b) end = b;
  }

  start.blob(ctx, inc);
  end.blob(ctx, inc);
}

export const schema = { draw, name: "Wilson's Maze", artist: "gavofyork.dot" };
