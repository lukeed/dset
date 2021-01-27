import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import dset from '../src';

const API = suite('API');

API('should export a function', () => {
	assert.type(dset, 'function');
});

API.run();

// ---

const usage = suite('usage');

usage('should not give return value', () => {
	let output = dset({}, 'c', 3); // add c
	assert.is(output, undefined);
});

usage('should mutate original object', () => {
	let item = { foo: 1 };
	dset(item, 'bar', 123);
	assert.ok(item === item);
	assert.equal(item, {
		foo: 1,
		bar: 123
	});
});

usage.run();

// ---

const keys = suite('keys');

keys('should add value to key path :: shallow :: string', () => {
	let input = {};
	dset(input, 'abc', 123);
	assert.equal(input, { abc: 123 });
});

keys('should add value to key path :: shallow :: array', () => {
	let input = {};
	dset(input, ['abc'], 123);
	assert.equal(input, { abc: 123 });
});

keys('should add value to key path :: nested :: string', () => {
	let input = {};
	dset(input, 'a.b.c', 123);
	assert.equal(input, {
		a: {
			b: {
				c: 123
			}
		}
	});
});

keys('should add value to key path :: nested :: array', () => {
	let input = {};
	dset(input, ['a', 'b', 'c'], 123);
	assert.equal(input, {
		a: {
			b: {
				c: 123
			}
		}
	});
});

keys.run();

// ---

const arrays = suite('arrays');

arrays('should create array instead of object via numeric key :: simple', () => {
	let input = { a: 1 };
	dset(input, 'e.0', 2);
	assert.instance(input.e, Array);
	assert.is(input.e[0], 2);
	assert.equal(input, {
		a: 1,
		e: [2]
	});
});

arrays('should create array instead of object via numeric key :: nested', () => {
	let input = { a: 1 };
	dset(input, 'e.0.0', 123);
	assert.instance(input.e, Array);
	assert.is(input.e[0][0], 123);
	assert.equal(input, {
		a: 1,
		e: [ [123] ]
	});
});

arrays('should be able to create object inside of array', () => {
	let input = {};
	dset(input, ['x', '0', 'z'], 123);
	assert.instance(input.x, Array);
	assert.equal(input, {
		x: [{ z:123 }]
	});
});

arrays('should create arrays with hole(s) if needed', () => {
	let input = {};
	dset(input, ['x', '1', 'z'], 123);
	assert.instance(input.x, Array);
	assert.equal(input, {
		x: [, { z:123 }]
	});
});

arrays('should create object from decimal-like key :: array :: zero', () => {
	let input = {};
	dset(input, ['x', '10.0', 'z'], 123);
	assert.not.instance(input.x, Array);
	assert.equal(input, {
		x: {
			'10.0': {
				z: 123
			}
		}
	});
});

arrays('should create object from decimal-like key :: array :: nonzero', () => {
	let input = {};
	dset(input, ['x', '10.2', 'z'], 123);
	assert.not.instance(input.x, Array);
	assert.equal(input, {
		x: {
			'10.2': {
				z: 123
			}
		}
	});
});

arrays.run();

// ---

const preserves = suite('preserves');

preserves('should preserve existing object structure', () => {
	let input = {
		a: {
			b: {
				c: 123
			}
		}
	};

	dset(input, 'a.b.x.y', 456);

	assert.equal(input, {
		a: {
			b: {
				c: 123,
				x: {
					y:456
				}
			}
		}
	});
});

preserves('should not convert existing non-object values into object', () => {
	let input = {
		a: {
			b: 123
		}
	};

	let before = JSON.stringify(input);
	dset(input, 'a.b.c', 'hello');

	assert.is(
		JSON.stringify(input),
		before
	);
});

preserves('should preserve existing object tree w/ array value', () => {
	let input = {
		a: {
			b: {
				c: 123,
				d: {
					e: 5
				}
			}
		}
	};

	dset(input, 'a.b.d.z', [1,2,3,4]);

	assert.equal(input.a.b.d, {
		e: 5,
		z: [1,2,3,4]
	});
});

preserves('should not throw when refusing to convert non-object into object', () => {
	try {
		let input = { b:123 };
		dset(input, 'b.c.d.e', 123);
		assert.is(input.b, 123);
	} catch (err) {
		assert.unreachable('should not have thrown');
	}
});

preserves('should not throw when refusing to convert `0` into object', () => {
	try {
		let input = { b:0 };
		dset(input, 'b.a.s.d', 123);
		assert.equal(input, { b: 0 });
	} catch (err) {
		assert.unreachable('should not have thrown');
	}
});

preserves.run();
