# deepset [![Build Status](https://travis-ci.org/lukeed/deepset.svg?branch=master)](https://travis-ci.org/lukeed/deepset)

> A tiny (145B) utlity for safely writing deep Object values~!

This module exposes two module definitions:

* **ES Module**: `dist/deepset.es.js`
* **CommonJS**: `dist/deepset.js`


## Install

```
$ npm install --save deepset
```


## Usage

```js
const deepset = require('deepset');

let foo = { a:1, b:2 };
let bar = { foo:123, bar:[4, 5, 6], baz:{} };
let baz = { a:1, b:{ x:{ y:{ z:999 } } }, c:3 };

deepset(foo, 'd.e.f', 'hello');
// or ~> deepset(foo, ['d', 'e', 'f'], 'hello');
console.log(foo);
//=> { a:1, b:2, d:{ e:{ f:'hello' } } };

deepset(bar, 'bar.1', 999);
// or ~> deepset(bar, ['bar', 1], 999);
console.log(bar);
//=> { foo:123, bar:[4, 999, 6], baz:{} };

deepset(baz, 'b.x.j.k', 'mundo');
deepset(baz, 'b.x.y.z', 'hola');
console.log(baz);
//=> { a:1, b:{ x:{ y:{ z:'hola' }, j:{ k:'mundo' } } }, c:3 }
```

## API

### deepset(obj, path, val)

Returns: `void`

#### obj

Type: `Object`

The Object to traverse & mutate with a value.

#### path

Type: `String` or `Array`

The key path that should receive the value. May be in `x.y.z` or `['x', 'y', 'z']` formats.

> **Note:** Please be aware that only the _last_ key actually receives the value!

> **Important:** New Objects are created at each segment if there is not an existing structure.

#### value

Type: `Any`

The value that you want to set. Can be of any type!


## License

MIT © [Luke Edwards](https://lukeed.com)
