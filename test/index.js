const test = require('tape');
const fn = require('../dist/deepset');

test('deepset', t => {
	let foo = { a:1, b:2 };

	t.is(typeof fn, 'function', 'exports a function');

	let out = fn(foo, 'c', 3); // add c
	t.is(out, undefined, 'does not return output');
	t.same(foo, { a:1, b:2, c:3 }, 'mutates; adds simple key:val');

	fn(foo, 'd.a.b', 999); // add deep
	t.same(foo, { a:1, b:2, c:3, d:{ a:{ b:999 } } }, 'mutates; adds deeply nested key:val');

	fn(foo, ['d', 'a', 'b'], 123); // change via array
	t.is(foo.d.a.b, 123, 'mutates; changes the value via array-type keys');

	fn(foo, 'd.a.x.y', 456); // preserve existing structure
	t.same(foo.d, { a:{ b:123, x:{y:456} }}, 'mutates; writes into/preserves existing object');

	fn(foo, 'd.a.x.y.z', 'hello'); // preserve non-object value, won't alter
	t.is(foo.d.a.x.y, 456, 'refuses to convert existing non-object value into object');

	fn(foo, 'd.a.x.z', [1,2,3,4]); // preserve object tree, with array value
	t.same(foo.d.a, { b:123, x:{y:456,z:[1,2,3,4]} }, 'mutates; writes into existing object w/ array value');

	t.doesNotThrow(_ => fn(foo, 'b.c.d.e', 123), undefined, 'silently preserves existing non-null value');
	t.is(foo.b, 2, 'preserves existing value');

	let bar = { a:1, b:0, c:2 };
	t.doesNotThrow(_ => fn(bar, 'b.a.s.d', 123), undefined, 'silently preserves `0` as existing non-null value');
	t.same(bar, { a:1, b:0, c:2 }, 'preserves existing object values');

	t.end();
});
