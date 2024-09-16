# Entropretty

A simple Javascript-based entropy-to-graphic harness.

Try it at https://gavofyork.github.io/entropretty/.

<img width="735" alt="image" src="https://github.com/user-attachments/assets/9faef5a2-12ad-4599-b75d-a923e6594f09">

## Usage

```sh
npm install
npm run bundle
npm start
```

## Playing around

1. Create a new `.js` file with a unique name, for example `mydesign.js`.
2. Define a `draw` function in it which places a unique design onto a canvas for any given 4-byte seed, e.g.:

```
function draw(ctx, seed) {
  ctx.font = '25px serif';
  seed.forEach((n, i) => ctx.fillText(n, 50, i * 25 + 25, 100));
}
```

3. Export your new design as `schema` with a line like:

```
export const schema = { draw, name: "My Cool Design", artist: "myartistname" };
```

4. Include your file in the `const DESIGNS` array of `artist.js`.

### The Draw Function

Draw functions take two arguments; the context and the seed. The context is a Javascript canvas 2D drawing context with width and height each 100 px.

It may be assumed to be initialized thus:

```js
ctx.lineWidth = 1;
ctx.lineCap = 'butt';
ctx.lineJoin = 'miter';
ctx.strokeStyle = 'black';
ctx.fillStyle = 'black';
ctx.textAlign = 'center';
ctx.textBaseline = 'bottom';
```

### Seeds

A seed represents the entropy of a figure and is just an array of four bytes (numbers between 0 and 255 inclusive). The reason for four bytes rather than a single 32-bit integer is Javascript's habit of turning such large integers into negative values whenever it feels like it.

There are several functions provided for operating on seeds:

- `bit(seed, n)`: Get the `n`th bit from the `seed`, indexed from `0`. Returns either `0` or `1`.
- `bits(seed, from, to)`: Get a number built from the bits of `seed` of the given span `from` and `to`.
- `bits(seed)`: Get a number built from all bits of the seed, somewhere between 0 and 2**32 - 1 inclusive.
- `split(seed, parts)`: Return an array of numbers, `parts` in length, each using approximately the same number of bits from the `seed`.
- `randomGenerator(seed)`: Return a function which itself takes no arguments and returns a stream of random numbers between 0 and 1. This uses the Prando algorithm. There is also `cheapRandomGenerator` (using SFC32) and `secureRandomGenerator` (using SHA-256).
