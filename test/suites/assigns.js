import { suite } from 'uvu';
import * as assert from 'uvu/assert';

export default function (dset) {
	const assigns = suite('assigns');

	assigns('should add value to key path :: shallow :: string', () => {
		let input = {};
		dset(input, 'abc', 123);
		assert.equal(input, { abc: 123 });
	});

	assigns('should add value to key path :: shallow :: array', () => {
		let input = {};
		dset(input, ['abc'], 123);
		assert.equal(input, { abc: 123 });
	});

	assigns('should add value to key path :: nested :: string', () => {
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

	assigns('should add value to key path :: nested :: array', () => {
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

	assigns('should create Array via integer key :: string', () => {
		let input = {};
		dset(input, ['foo', '0'], 123);
		assert.instance(input.foo, Array);
		assert.equal(input, {
			foo: [123]
		})
	});

	assigns('should create Array via integer key :: number', () => {
		let input = {};
		dset(input, ['foo', 0], 123);
		assert.instance(input.foo, Array);
		assert.equal(input, {
			foo: [123]
		})
	});

	assigns.run();
}
