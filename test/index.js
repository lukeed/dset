const test = require('tape');
const fn = require('../dist/deepset');

test('deepset', t => {
	t.is(typeof fn, 'function', 'exports a function');
	t.end();
});
