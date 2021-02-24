import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const prepare = x => ({ input: x, copy: JSON.parse(JSON.stringify(x)) });

export default function (dset, isMerge) {
	const objects = suite('objects');
	const verb = isMerge ? 'merge' : 'overwrite';

	objects(`should ${verb} existing object value :: simple`, () => {
		let { input } = prepare({
			hello: { a: 1 }
		});

		dset(input, 'hello', { foo: 123 });

		if (isMerge) {
			assert.equal(input, {
				hello: {
					a: 1,
					foo: 123,
				}
			});
		} else {
			assert.equal(input, {
				hello: { foo: 123 }
			});
		}
	});

	objects(`should ${verb} existing object value :: nested`, () => {
		let { input, copy } = prepare({
			a: {
				b: {
					c: 123
				}
			}
		});

		dset(input, 'a.b', { foo: 123 });

		if (isMerge) {
			Object.assign(copy.a.b, { foo: 123 });
		} else {
			copy.a.b = { foo: 123 };
		}

		assert.equal(input, copy);
	});

	objects(`should ${verb} existing array value :: simple`, () => {
		let { input } = prepare([
			{ foo: 1 },
		]);

		dset(input, '0', { bar: 2 });

		if (isMerge) {
			assert.equal(input, [
				{ foo: 1, bar: 2 }
			]);
		} else {
			assert.equal(input, [
				{ bar: 2 }
			]);
		}
	});

	objects(`should ${verb} existing array value :: nested`, () => {
		let { input } = prepare([
			{ name: 'bob', age: 56, friends: ['foobar'] },
			{ name: 'alice', age: 47, friends: ['mary'] },
		]);

		dset(input, '0', { age: 57, friends: ['alice', 'mary'] });
		dset(input, '1', { friends: ['bob'] });
		dset(input, '2', { name: 'mary', age: 49, friends: ['bob'] });

		if (isMerge) {
			assert.equal(input, [
				{ name: 'bob', age: 57, friends: ['alice', 'mary'] },
				{ name: 'alice', age: 47, friends: ['bob'] },
				{ name: 'mary', age: 49, friends: ['bob'] },
			]);
		} else {
			assert.equal(input, [
				{ age: 57, friends: ['alice', 'mary'] },
				{ friends: ['bob'] },
				{ name: 'mary', age: 49, friends: ['bob'] },
			]);
		}
	});

	objects.run();
}
