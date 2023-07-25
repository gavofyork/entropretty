# Entropretty

A simple Javascript-based entropy-to-graphic harness.

Try it at https://gavofyork.github.io/entropretty/.

<img width="735" alt="image" src="https://github.com/gavofyork/entropretty/assets/138296/0832a8a7-7e6e-4e9b-9de6-6b48d0e80998">

## Usage

Just view the `index.html` file in a browser locally.

## Playing around

1. Create a new `.js` file with a unique name, for example `foo.js`. 
2. Implement a draw function (see below) and call it something like `drawFoo`.
3. Put a call to `addSchema("Foo", drawFoo)` at the bottom. See below for the additional arguments.
4. Introduce a new line right before `</body>` in `index.html`:

```html
<script type="text/javascript" src="foo.js"></script>
```

### The `addSchema` function

The `addSchema` function accepts up to 4 arguments (the last two are optional):

- `name`: The name of your schema.
- `draw`: The function to draw a figure, see below.
- `nibbles`: The number of nibbles of entropy your schema can place into a figure. It is best to make this at least 4 but preferably the maximum and default which is 8.
- `mutate`: A function for mutating a seed. This defaults to the flip of three random bits.

### Seeds

A seed represents the entropy of a figure and is just an array of nibbles (numbers between 0 and 15 inclusive). There are several functions provided for operating on them:

- `bit(seed, n)`: Get the `n`th bit from the `seed`, indexed from `0`. Returns either `0` or `1`.
- `bits(seed, from, to)`: Get a number built from the bits of `seed` of the given span `from` and `to`.
- `split(seed, parts)`: Return an array of numbers, `parts` in length, each using approximately the same number of bits from the `seed`.

### The Draw Function

Draw functions take three arguments:

- `ctx`: The Javascript canvas 2D drawing context.
- `size`: The size (width and height) which the figure should be drawn in.
- `seed`: The seed entropy from which the figure should be drawn.
