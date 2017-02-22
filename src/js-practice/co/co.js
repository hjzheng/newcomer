var promise1 = function() {
	return new Promise(resolve => {
		console.log('p1')
		resolve('promise1');
	});
};

var promise2 = function(p1) {
	return new Promise(resolve => {
		console.log('p2', '<-', p1);
		resolve('promise2');
	});
};

var promise3 = function(p2) {
	return new Promise(resolve => {
		console.log('p3', '<-', p2);
		resolve('promise3');
	});
};

function co(generator) {

	return function() {
		var gen = generator.apply(this, arguments);

		function handle(result) {
			if (result.done) return Promise.resolve(result.value);

			return Promise.resolve(result.value).then(function(res){
				return handle(gen.next(res));
			}).catch(e => {
				return Promise.reject(e);
			});
		}

		try {
			return handle(gen.next());
		} catch(e) {
			return Promise.reject(e);
		}
	}();
}

var a = co(function*() {
	var p1 = yield promise1();
	var p2 = yield promise2(p1);
	var p3 = yield promise3(p2);
	return p3;
});

a.then(function(res) {
	console.log(res);
});
