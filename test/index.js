import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { dset } from '../src';

import arrays from './suites/arrays';
import assigns from './suites/assigns';
import pollution from './suites/pollution';
import preserve from './suites/preserve';
import objects from './suites/objects';
import basics from './suites/basics';

// ---

const API = suite('API');

API('should export a function', () => {
	assert.type(dset, 'function');
});

API.run();

// ---

basics(dset);
assigns(dset);
preserve(dset);
pollution(dset);
objects(dset);
arrays(dset);

// ---

const edgecases = suite('edgecases');

edgecases('should ignore "__proto__" assignment :: direct string key', () => {
	let input = { abc: 123 };
	dset(input, '__proto__', 'value');
	assert.equal(input, { abc: 123 });
	assert.is({}.value, undefined);
});

edgecases('should ignore "__proto__" assignment :: direct array key', () => {
	let input = { abc: 123 };
	dset(input, ['__proto__'], 'value');
	assert.equal(input, { abc: 123 });
	assert.is({}.value, undefined);
});

edgecases('should ignore "constructor" assignment :: direct string key', () => {
	let input = { abc: 123 };
	dset(input, 'constructor', 'value');
	assert.equal(input, { abc: 123 });
	assert.is(input.constructor, Object.prototype.constructor);
});

edgecases('should ignore "constructor" assignment :: direct array key', () => {
	let input = { abc: 123 };
	dset(input, ['constructor'], 'value');
	assert.equal(input, { abc: 123 });
	assert.is(input.constructor, Object.prototype.constructor);
});

edgecases('should ignore "prototype" assignment :: direct string key', () => {
	let input = { abc: 123 };
	dset(input, 'prototype', 'value');
	assert.equal(input, { abc: 123 });
	assert.is(input.prototype, undefined);
});

edgecases('should ignore "prototype" assignment :: direct array key', () => {
	let input = { abc: 123 };
	dset(input, ['prototype'], 'value');
	assert.equal(input, { abc: 123 });
	assert.is(input.prototype, undefined);
});

edgecases('should treat numeric and numeric-string keys identically :: nested arrays', () => {
	let numeric = {};
	let string = {};
	dset(numeric, ['x', 0, 1], 'a');
	dset(string, ['x', '0', '1'], 'a');
	assert.equal(numeric, { x: [[, 'a']] });
	assert.equal(string, numeric);
});

edgecases('should treat numeric and numeric-string keys identically :: existing array', () => {
	let numeric = { arr: [] };
	let string = { arr: [] };
	dset(numeric, ['arr', 0, 'y'], 'a');
	dset(string, ['arr', '0', 'y'], 'a');
	assert.equal(numeric, { arr: [{ y: 'a' }] });
	assert.equal(string, numeric);
});

edgecases('should treat numeric and numeric-string keys identically :: nested existing array', () => {
	let numeric = { arr: [[1]] };
	let string = { arr: [[1]] };
	dset(numeric, ['arr', 0, 0], 999);
	dset(string, ['arr', '0', '0'], 999);
	assert.equal(numeric, { arr: [[999]] });
	assert.equal(string, numeric);
});

edgecases.run();
