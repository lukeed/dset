export default function (obj, keys, val, arr) {
	keys.split && (keys=keys.split('.'));
	var i=0, l=keys.length, t=obj, x;
	for (; i < l; ++i) {
		var n = !arr || isNaN(+keys[i + 1]) ? {} : [];
		x = t[keys[i]];
		t = t[keys[i]] = (i === l - 1 ? val : (x == null ? n : x));
	}
}
