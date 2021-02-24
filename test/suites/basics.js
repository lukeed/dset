import { suite } from 'uvu';
import * as assert from 'uvu/assert';

export default function (dset) {
	const basics = suite('basics');

	basics('should not give return value', () => {
		let output = dset({}, 'c', 3); // add c
		assert.is(output, undefined);
	});

	basics('should mutate original object', () => {
		let item = { foo: 1 };
		dset(item, 'bar', 123);
		assert.ok(item === item);
		assert.equal(item, {
			foo: 1,
			bar: 123
		});
	});

	basics.run();
}
