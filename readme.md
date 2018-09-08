# dset [![Build Status](https://travis-ci.org/lukeed/dset.svg?branch=master)](https://travis-ci.org/lukeed/dset)

> A tiny (161B) utility for safely writing deep Object values~!

This module exposes two module definitions:

* **ES Module**: `dist/dset.es.js`
* **CommonJS**: `dist/dset.js`
* **UMD**: `dist/dset.min.js`

For _accessing_ deep object properties, please see [`dlv`](https://github.com/developit/dlv).

## Install

```
$ npm install --save dset
```


## Usage

```js
const dset = require('dset');

let foo = { a:1, b:2 };
let bar = { foo:123, bar:[4, 5, 6], baz:{} };
let baz = { a:1, b:{ x:{ y:{ z:999 } } }, c:3 };
let qux = { };

dset(foo, 'd.e.f', 'hello');
// or ~> dset(foo, ['d', 'e', 'f'], 'hello');
console.log(foo);
//=> { a:1, b:2, d:{ e:{ f:'hello' } } };

dset(bar, 'bar.1', 999);
// or ~> dset(bar, ['bar', 1], 999);
console.log(bar);
//=> { foo:123, bar:[4, 999, 6], baz:{} };

dset(baz, 'b.x.j.k', 'mundo');
dset(baz, 'b.x.y.z', 'hola');
console.log(baz);
//=> { a:1, b:{ x:{ y:{ z:'hola' }, j:{ k:'mundo' } } }, c:3 }

dset(qux, 'a.0.b.0', 1);
dset(qux, 'a.0.b.1', 2);
console.log(qux);
//=> { a: [{ b: [1, 2] }] }
```

## API

### dset(obj, path, val)

Returns: `void`

#### obj

Type: `Object`

The Object to traverse & mutate with a value.

#### path

Type: `String` or `Array`

The key path that should receive the value. May be in `x.y.z` or `['x', 'y', 'z']` formats.

> **Note:** Please be aware that only the _last_ key actually receives the value!

> **Important:** New Objects are created at each segment if there is not an existing structure.<br>When numerical-types are encounted, Arrays are created instead!

#### value

Type: `Any`

The value that you want to set. Can be of any type!


## License

MIT © [Luke Edwards](https://lukeed.com)
