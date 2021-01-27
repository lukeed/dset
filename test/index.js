// @ts-check
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import dset from '../dist/dset';

test('dset', () => {
	assert.type(dset, 'function', 'exports a function');

	let foo = { a:1, b:2 };
	let out = dset(foo, 'c', 3); // add c
	assert.is(out, undefined, 'does not return output');
	assert.equal(foo, { a:1, b:2, c:3 }, 'mutates; adds simple key:val');

	foo = {};
	dset(foo, 'a.b.c', 999); // add deep
	assert.equal(foo, { a:{ b:{ c:999 } } }, 'mutates; adds deeply nested key:val');

	foo = {};
	dset(foo, ['a', 'b', 'c'], 123); // change via array
	assert.equal(foo, { a:{ b:{ c:123 } } }, 'mutates; changes the value via array-type keys');

	foo = { a:1 };
	dset(foo, 'e.0.0', 2); // create arrays instead of objects
	assert.is(foo.e[0][0], 2, 'mutates; can create arrays when key is numeric');
	assert.equal(foo, { a: 1, e:[[2]] });
	assert.instance(foo.e, Array);

	foo = { a:{ b:{ c:123 } } };
	dset(foo, 'a.b.x.y', 456); // preserve existing structure
	assert.equal(foo, { a:{ b:{ c:123, x:{ y:456 } }} }, 'mutates; writes into/preserves existing object');

	foo = { a: { b:123 } };
	dset(foo, 'a.b.c', 'hello'); // preserve non-object value, won't alter
	assert.is(foo.a.b, 123, 'refuses to convert existing non-object value into object');
	assert.equal(foo, { a: { b:123 }});

	foo = { a:{ b:{ c:123, d:{ e:5 } } } };
	dset(foo, 'a.b.d.z', [1,2,3,4]); // preserve object tree, with array value
	assert.equal(foo.a.b.d, { e:5, z:[1,2,3,4] }, 'mutates; writes into existing object w/ array value');

	foo = { b:123 };
	assert.not.throws(_ => dset(foo, 'b.c.d.e', 123), 'silently preserves existing non-null value');
	assert.is(foo.b, 123, 'preserves existing value');

	foo = { b:0 };
	assert.not.throws(_ => dset(foo, 'b.a.s.d', 123), 'silently preserves `0` as existing non-null value');
	assert.equal(foo, { b:0 }, 'preserves existing object values');

	foo = {};
	dset(foo, ['x', 'y', 'z'], 123);
	assert.equal(foo, { x:{ y:{ z:123 } } });

	foo = {};
	dset(foo, ['x', '0', 'z'], 123);
	assert.equal(foo, { x:[{ z:123 }] });
	assert.instance(foo.x, Array);

	foo = {};
	dset(foo, ['x', '1', 'z'], 123);
	assert.equal(foo, { x:[,{ z:123 }] });
	assert.instance(foo.x, Array);

	foo = {};
	dset(foo, ['x', '10.0', 'z'], 123);
	assert.equal(foo, { x:{ '10.0':{ z:123 } } });
	assert.not.instance(foo.x, Array);

	foo = {};
	dset(foo, ['x', '10.2', 'z'], 123);
	assert.equal(foo, { x:{ '10.2':{ z:123 } } });
	assert.not.instance(foo.x, Array);
});

test.run();
