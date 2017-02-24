/**
 * hjzheng
 * */

hashKey.id = 1;

function hashKey(value) {
	var type = typeof value;
	var uid;

	if ((type === 'object' && value !== null) || type === 'function') {
		uid = value.$$hashKey;
		if (typeof uid === 'function') {
			uid = value.$$hashKey();
		} else if (uid === undefined) {
			uid = value.$$hashKey = hashKey.id ++;
		}
	} else {
		uid = value;
	}

	return type + ':' + uid;
}

function HashMap() {

}

HashMap.prototype.put = function(key, value) {
	this[hashKey(key)] = value;
}

HashMap.prototype.get = function(key) {
	return this[hashKey(key)];
}

var map = new HashMap();
var fun = function(){};
map.put(fun, true);
map.get(fun);
