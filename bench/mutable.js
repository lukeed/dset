const assert = require('uvu/assert');
const { Suite } = require('benchmark');

const contenders = {
	'deep-set': require('deep-set'),
	'set-value': require('set-value'),
	'lodash/set': require('lodash/set'),
	'dset': require('../dist/dset'),
};

console.log('Validation: ');
Object.keys(contenders).forEach(name => {
	try {
		const input = {};
		contenders[name](input, 'x.y.z', 'foobar');
		assert.equal(input, {
			x: {
				y: {
					z: 'foobar'
				}
			}
		});

		console.log('  ✔', name);
	} catch (err) {
		console.log('  ✘', name, `(FAILED)`);
	}
});


console.log('\nBenchmark:');
const onCycle = e => console.log('  ' + e.target);
const bench = new Suite({ onCycle });

Object.keys(contenders).forEach(name => {
	bench.add(name + ' '.repeat(12 - name.length), () => {
		contenders[name]({}, 'x.y.z', 'foobar');
		contenders[name]({}, 'x.a.b.c', 'howdy');
	});
});

bench.run();
