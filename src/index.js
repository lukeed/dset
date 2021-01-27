export default function (obj, keys, val) {
	keys.split && (keys=keys.split('.'));
	var i=0, l=keys.length, t=obj, x, k;
	for (; i < l; ++i) {
		k = keys[i];
		if (k == '__proto__' || k == 'constructor' || k == 'prototype') continue;
		x = t[k];
		t = t[k] = (i === l - 1 ? val : (x != null ? x : (!!~keys[i+1].indexOf('.') || !(+keys[i+1] > -1)) ? {} : []));
	}
}
