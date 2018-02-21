export default function (o, k, v) {
	k.split && (k=k.split('.'));
	var i = 0, l = k.length, t = o;
	for(; i < l; ++i) {
		t = t[k[i]] = (i === l - 1 ? v : (t[k[i]] || {}));
	}
}
