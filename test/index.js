const test = require('tape');
const fn = require('../dist/dset');

test('dset', t => {
	t.is(typeof fn, 'function', 'exports a function');

	let foo = { a:1, b:2 };
	let out = fn(foo, 'c', 3); // add c
	t.is(out, undefined, 'does not return output');
	t.same(foo, { a:1, b:2, c:3 }, 'mutates; adds simple key:val');

	foo = {};
	fn(foo, 'a.b.c', 999); // add deep
	t.same(foo, { a:{ b:{ c:999 } } }, 'mutates; adds deeply nested key:val');

	foo = {};
	fn(foo, ['a', 'b', 'c'], 123); // change via array
	t.same(foo, { a:{ b:{ c:123 } } }, 'mutates; changes the value via array-type keys');

	foo = { a:1 };
	fn(foo, 'e.0.0', 2); // create arrays instead of objects
	t.is(foo.e[0][0], 2, 'mutates; can create arrays when key is numeric');
	t.same(foo, { a: 1, e:[[2]] });
	t.true(Array.isArray(foo.e));

	foo = { a:{ b:{ c:123 } } };
	fn(foo, 'a.b.x.y', 456); // preserve existing structure
	t.same(foo, { a:{ b:{ c:123, x:{ y:456 } }} }, 'mutates; writes into/preserves existing object');

	foo = { a: { b:123 } };
	fn(foo, 'a.b.c', 'hello'); // preserve non-object value, won't alter
	t.is(foo.a.b, 123, 'refuses to convert existing non-object value into object');
	t.same(foo, { a: { b:123 }});

	foo = { a:{ b:{ c:123, d:{ e:5 } } } };
	fn(foo, 'a.b.d.z', [1,2,3,4]); // preserve object tree, with array value
	t.same(foo.a.b.d, { e:5, z:[1,2,3,4] }, 'mutates; writes into existing object w/ array value');

	foo = { b:123 };
	t.doesNotThrow(_ => fn(foo, 'b.c.d.e', 123), undefined, 'silently preserves existing non-null value');
	t.is(foo.b, 123, 'preserves existing value');

	foo = { b:0 };
	t.doesNotThrow(_ => fn(foo, 'b.a.s.d', 123), undefined, 'silently preserves `0` as existing non-null value');
	t.same(foo, { b:0 }, 'preserves existing object values');

	foo = {};
	fn(foo, ['x', 'y', 'z'], 123);
	t.same(foo, { x:{ y:{ z:123 } } });

	foo = {};
	fn(foo, ['x', '0', 'z'], 123);
	t.same(foo, { x:[{ z:123 }] });
	t.true(Array.isArray(foo.x));

	foo = {};
	fn(foo, ['x', '1', 'z'], 123);
	t.same(foo, { x:[,{ z:123 }] });
	t.true(Array.isArray(foo.x));

	foo = {};
	fn(foo, ['x', '10.0', 'z'], 123);
	t.same(foo, { x:{ '10.0':{ z:123 } } });
	t.false(Array.isArray(foo.x));

	foo = {};
	fn(foo, ['x', '10.2', 'z'], 123);
	t.same(foo, { x:{ '10.2':{ z:123 } } });
	t.false(Array.isArray(foo.x));

	t.end();
});
