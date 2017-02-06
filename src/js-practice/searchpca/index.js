window.onload = function() {
	var arr = [];
	var data = {};
	console.time('test');
	search(areas, '西藏', arr, data, 10);
	//console.log(arr);
	console.timeEnd('test');
};

function search(areas, keyword, arr, data, limit) {
	for (let area of areas) {
		if (area.level === 1) {
			delete data.c;
			delete data.a;
			data.p = area.name;
		}
		if (area.level === 2) {
			delete data.a;
			data.c = area.name;
		}
		if (area.level === 3) {
			data.a = area.name;
		}
		if (area.name.indexOf(keyword) !== -1) {
			arr.push(Object.assign({}, data));
			if (arr.length >= 10) {
				break;
			}
		}
		if (area.children) {
			search(area.children, keyword, arr, data, limit);
		}
	}
}
