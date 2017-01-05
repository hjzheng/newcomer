window.onload = function() {
	var arr = [];
	var data = {};
	search(areas, '西安', arr, data);
	console.log(arr);
};

function search(areas, keyword, arr, data) {
	for(let area of areas) {
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
		}
		if (area.children) {
			search(area.children, keyword, arr, data);
		}
	}
}
