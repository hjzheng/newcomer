// 单例模式, 缓存代理

let createDiv = function(text) {
	const div = document.createElement('div');
	div.innerHTML = text;
	return div;
};

let proxyCreateDiv = (function() {
	let div = null;

	return function(text){
		if(!div) {
			createDiv(text);
		}
		return div;	
	}
})();

var a = proxyCreateDiv('haha');
var b = proxyCreateDiv('hehe');

console.log(a === b);
