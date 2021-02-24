import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { dset, merge } from '../src/merge';

import arrays from './suites/arrays';
import assigns from './suites/assigns';
import pollution from './suites/pollution';
import preserve from './suites/preserve';
import objects from './suites/objects';
import basics from './suites/basics';

// ---

const API = suite('API');

API('should export `dset` function', () => {
	assert.type(dset, 'function');
});

API('should export `merge` function', () => {
	assert.type(merge, 'function');
});

API.run();

// ---

basics(dset);
assigns(dset);
preserve(dset);
pollution(dset);
objects(dset, true);
arrays(dset);

// ---

const merges = suite('merge()');

merges('should return `b` when either non-object', () => {
	let output = merge(123, { b: 2 });
	assert.equal(output, { b: 2 });

	output = merge(123, null);
	assert.equal(output, null);

	output = merge(123, undefined);
	assert.equal(output, undefined);

	output = merge(123, 456);
	assert.equal(output, 456);

	output = merge({ a: 1 }, 456);
	assert.is(output, 456);

	output = merge(123, { b: 2 });
	assert.equal(output, { b: 2 });
});

merges('should merge objects together :: simple', () => {
	let input =  { foo: 123 };
	let output = merge(input, { bar: 456 });
	assert.equal(input, { foo: 123, bar: 456 });
	assert.equal(input, output);
});

merges('should merge objects together :: nested', () => {
	let input = {
		a: {
			b: {
				c: 'hi'
			}
		}
	};

	let output = merge(input, {
		a: {
			b: {
				d: 'hello'
			}
		}
	});

	assert.equal(input, output);

	// mutates
	assert.equal(input, {
		a: {
			b: {
				c: 'hi',
				d: 'hello',
			}
		}
	});
});

merges('should merge arrays together :: simple', () => {
	let input = ['foo', /*hole*/, 'baz'];
	let output = merge(input, ['hello', 'world']);
	assert.equal(input, ['hello', 'world', 'baz']);
	assert.equal(input, output);
});

merges('should merge arrays together :: nested', () => {
	let input = [
		{ name: 'bob', age: 56, friends: ['alice'] },
		{ name: 'alice', age: 47, friends: ['mary'] },
	];

	let output = merge(input, [
		{ age: 57, friends: ['alice', 'mary'] },
		{ friends: ['bob'] },
		{ name: 'mary', age: 49, friends: ['bob'] },
	]);

	assert.equal(input, [
		{ name: 'bob', age: 57, friends: ['alice', 'mary'] },
		{ name: 'alice', age: 47, friends: ['bob'] },
		{ name: 'mary', age: 49, friends: ['bob'] },
	]);

	assert.equal(input, output);
});

merges.run();

// ---

const dsets = suite('dset()');

dsets('should merge object at path notation', () => {
	let input = {
		a: {
			b: { c: 'hi' }
		}
	};

	dset(input, 'a.b.c', { d: 'howdy' });

	assert.equal(input, {
		a: {
			b: {
				c: {
					d: 'howdy'
				}
			}
		}
	});

	dset(input, 'a.b.c', { e: 'partner' });

	assert.equal(input, {
		a: {
			b: {
				c: {
					d: 'howdy',
					e: 'partner',
				}
			}
		}
	});
});

dsets('should merge array at path notation', () => {
	let input = [
		[{ foo: [1, 2, 3]}]
	];

	dset(input, '0.0.foo.0', 9);
	assert.equal(input, [
		[{ foo: [9, 2, 3]}]
	]);

	dset(input, '1.0.foo', [7, 8, 9]);
	assert.equal(input, [
		[{ foo: [9, 2, 3]}],
		[{ foo: [7, 8, 9]}],
	]);
});

dsets.run();

// ---

const kitchen = suite('kitchensink', {
	input: {}
});

kitchen('greeting.0', ctx => {
	dset(ctx.input, 'greeting.0', { value: 'hello' });

	assert.equal(ctx.input, {
		greeting: [
			{ value: 'hello' }
		]
	});
});

kitchen('greeting.1', ctx => {
	dset(ctx.input, 'greeting.1', { value: 'world' });

	assert.equal(ctx.input, {
		greeting: [
			{ value: 'hello' },
			{ value: 'world' },
		]
	});
});

kitchen('user { fname }', ctx => {
	dset(ctx.input, 'user', { fname: 'luke' });

	assert.equal(ctx.input, {
		greeting: [
			{ value: 'hello' },
			{ value: 'world' }
		],
		user: { fname: 'luke' }
	});
});

kitchen('user { lname }', ctx => {
	dset(ctx.input, 'user', { lname: 'edwards' });

	assert.equal(ctx.input, {
		greeting: [
			{ value: 'hello' },
			{ value: 'world' }
		],
		user: {
			fname: 'luke',
			lname: 'edwards'
		}
	});
});

kitchen('user.friends.0 { fname }', ctx => {
	dset(ctx.input, 'user.friends.0', { fname: 'foobar' });

	assert.equal(ctx.input, {
		greeting: [
			{ value: 'hello' },
			{ value: 'world' }
		],
		user: {
			fname: 'luke',
			lname: 'edwards',
			friends: [
				{ fname: 'foobar' }
			]
		}
	});
});

kitchen('user.friends.0 { humanoid }', ctx => {
	dset(ctx.input, 'user.friends.0', { humanoid: false });

	assert.equal(ctx.input, {
		greeting: [
			{ value: 'hello' },
			{ value: 'world' }
		],
		user: {
			fname: 'luke',
			lname: 'edwards',
			friends: [
				{
					fname: 'foobar',
					humanoid: false
				}
			]
		}
	});
});

kitchen.run();
