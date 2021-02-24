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
