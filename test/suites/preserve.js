import { suite } from 'uvu';
import * as assert from 'uvu/assert';

export default function (dset) {
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

	preserves('should overwrite existing non-object values as object', () => {
		let input = {
			a: {
				b: 123
			}
		};

		dset(input, 'a.b.c', 'hello');

		assert.equal(input, {
			a: {
				b: {
					c: 'hello'
				}
			}
		});
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

	preserves.run();
}
