window.onload = function() {
	var lis = document.querySelectorAll('.tabs > ul > li');
	for (var i = 0; i < lis.length; i++) {

		// 使用立即调用函数表达式创建局部作用域 (方法1)
		// lis[i].onclick = (function(li) {
		// 	return function() {
		// 		clearSelected(lis);
		//
		// 		if (!(li.classList.contains('selected'))) {
		// 			li.classList.add('selected');
		// 		}
		// 		// call Ajax to get JSON for data, update contents area
		// 		// use innerHTML
		// 		// TODO
		// 	};
		// })(lis[i]);

		// 使用立即调用函数表达式创建局部作用域 (方法2)
		(function(j) {
			lis[i].onclick = function() {
				clearSelected(lis);
				if (!(lis[j].classList.contains('selected'))) {
					lis[j].classList.add('selected');
				}
			};
		})(i);
	}
};

function clearSelected(lis) {
	for (var i = 0; i < lis.length; i++) {
		lis[i].classList.remove('selected');
	}
}
