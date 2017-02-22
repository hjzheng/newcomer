function deepCopy(obj) {
	var key, value, out;
	out = Array.isArray(obj) ? [] : {};
	for (key in obj) {
		value = obj[key];
		out[key] = typeof value === 'object' ? deepCopy(value) : value;
	}
	return out;
}

var obj = {
	1: [2,3],
	t: {
		t1:2,
		t2: {
			t3: 3
		}
	}
};

var b = deepCopy(obj);

console.log(b);

// another way is JSON.parse(JSON.stringify(obj))
