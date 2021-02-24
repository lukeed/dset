import { suite } from 'uvu';
import * as assert from 'uvu/assert';

export default function (dset) {
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

	arrays('should create object from decimal-like key :: array :: zero :: string', () => {
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

	arrays('should create array from decimal-like key :: array :: zero :: number', () => {
		let input = {};
		dset(input, ['x', 10.0, 'z'], 123);
		assert.instance(input.x, Array);

		let x = Array(10);
		x.push({ z: 123 });
		assert.equal(input, { x });
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
}
