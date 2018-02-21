module.exports = function (obj, keys, val) {
	keys.split && (keys=keys.split('.'));
	var i=0, j, o, x, len=keys.length;
	while (i < len) {
		o = obj;
		for (j=0; j < i; j++) o=o[keys[j]];
		x = (o[keys[i]] == null) ? {} : o[keys[i]];
		o[keys[i]] = (++i === len) ? val : x;
	}
}
