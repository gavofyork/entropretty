import Prando from './prando.js';

export const white = "#fff";
export const light = "#aaa";
export const dark = "#666";
export const black = "#000";
export const pi = Math.PI;

export function deg(x) {
  return (x / 90) * 2 * Math.PI;
}
export function turn(x) {
  return (2 * Math.PI) / x;
}
export function gray(x) {
  return `rgba(${x}, ${x}, ${x}, 1)`;
}

export function shade(x) {
  if (x < 1) {
    return white;
  }
  if (x < 2) {
    return light;
  }
  if (x < 3) {
    return dark;
  }
  return black;
}

export function bit(seed, i) {
  return (seed[Math.floor(i / 8) % 4] >> i % 8) & 1;
}

export function bits(seed, from = 0, to = 32) {
  let r = 0;
  for (let i = from; i < to; ++i) {
    r = ((r << 1) | bit(seed, i)) >>> 0;
  }
  return r;
}

export function split(seed, parts) {
  let r = [];
  let last = 0;
  for (let i = 0; i < parts; ++i) {
    let next = Math.round(((i + 1) * 32) / parts);
    r.push(bits(seed, last, next));
    last = next;
  }
  return r;
}

export function numeric(seed) {
  return (seed[0] | seed[1] << 8 | seed[2] << 16 | seed[3] << 24) >>> 0
}

export function randomGenerator(seed) {
  let p = new Prando(numeric(seed));
  return function() { return p.next() }
}

export function cheapRandomGenerator(seed) {
  let a = bits(seed);
  let b = bits(seed);
  let c = bits(seed);
  let d = bits(seed);
  return function () {
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

export function secureRandomGenerator(seed) {
  var state = sha256("" + seed);
  let f = function () {
    state = sha256(state);
    return Number.parseInt(state.substring(0, 8), 16) / 0xffffffff
  };
  return f
}

export function randSeed(bytes = 4) {
    let s = [];
    for (var i = 0; i < bytes; ++i) {
        let n = Math.floor(Math.random() * 255);
        s.push(n);
    }
    return s
}

export function mutateBits(count) {
    return (seed) => {
        for(var b = 0; b < count; ++b) {
            let bit = 2 ** Math.floor(Math.random() * 8);
            let item = Math.floor(Math.random() * 4);
            seed[item] ^= bit;
        }
    }
}

let context;

export function setDefaultContext(c) {
  context = c
}

export function symmetrical(factor, fn, ctx = context) {
  ctx.translate(50, 50);
  ctx.scale(50, 50);
  for (let i = 0; i < factor; ++i) {
    ctx.save();
    ctx.rotate((Math.PI * 2) * i / factor);
    fn(i);
    ctx.restore();
  }
}

export function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length';
	var i, j; // Used as a counter across the whole file
	var result = '';

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	
	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80'; // Append '1' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00'; // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	
	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the "working hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
}