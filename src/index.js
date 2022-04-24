export function dset(obj, keys, val) {
	keys.split && (keys=keys.split('.'));
	var i=0, l=keys.length, t=obj, x, k;
	while (i < l) {
		k = keys[i++];
		if (k === '__proto__' || k === 'constructor' || k === 'prototype') break;
		t = t[k] = (i === l) ? val : ((x=t[k]) && typeof(x)===typeof(keys)) ? x : (k='+'+keys[i])*0 !== 0 || /\./.test(k) ? {} : []
	}
}
