import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const prepare = x => ({ input: x, copy: JSON.parse(JSON.stringify(x)) });

export default function (dset, isMerge) {
	const objects = suite('objects');
	const verb = isMerge ? 'merge' : 'overwrite';

	objects(`should ${verb} existing object value`, () => {
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

	objects.run();
}
