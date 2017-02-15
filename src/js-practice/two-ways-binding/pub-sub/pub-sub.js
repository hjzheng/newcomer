// 创建一个简单地 pubsub 对象
// 没有做任何优化处理和错误处理
// 更完整的 PubSub(也就是 EventBus), 可以参考 https://github.com/hjzheng/angular-utils/blob/master/src/utils/EventBus.js
function PubSub() {
	this.callbacks = {};
}

PubSub.prototype.subscribe = function(msg, callback) {
	this.callbacks[msg] = this.callbacks[msg] || [];
	this.callbacks[msg].push(callback);
};

PubSub.prototype.publish = function() {
	var args = Array.prototype.slice.call(arguments);
	var msg = args.shift();
	this.callbacks[msg] = this.callbacks[msg] || [];
	for (var i = 0, len = this.callbacks[msg].length; i < len; i++) {
		this.callbacks[msg][i].apply(this, args);
	}
};

function Model(pubsub) {
	this.modals = {};
	this.pubsub = pubsub;
}

Model.prototype.set = function(modalName, value) {
	this.modals[modalName] = value;
};

Model.prototype.get = function(modalName) {
	return this.modals[modalName];
};

function DataBinder() {
	this.directive = 'data-bind';
	this.pubsub = new PubSub();
	this.model = new Model();
	this.bindV2M();
	this.bindM2V();
	return this.model;
}

DataBinder.prototype.bindV2M = function() {
	var _this = this;

	// 监听页面变化, 通知模型进行更新
	document.addEventListener('keyup', changeHandler, false);
	// document.addEventListener('change', changeHandler, false);

	function changeHandler(evt) {
		var target = evt.target;
		var modelName = target.getAttribute(_this.directive);

		if (modelName && modelName !== '') {
			console.log('视图发生了变化, 通知模型');
			_this.pubsub.publish('ui-2-model', modelName, target.value);
		}
	}

	// 监听视图变化, 更新数据模型
	_this.pubsub.subscribe('ui-2-model', function(modelName, newValue) {
		console.log('由于视图发生了变化, 更新模型');
		_this.model.set(modelName, newValue);
	});

};

DataBinder.prototype.bindM2V = function() {

	var _this = this;

	var _originSet = _this.model.set;

	// 模型发生变化, 通知视图(装饰原来的 set 方法)
	_this.model.set = function(modelName, value) {
		_originSet.apply(_this.model, arguments);
		console.log('模型发生了变化, 通知视图');
		_this.pubsub.publish('model-2-view', modelName, value);
	};

	// 监听模型变化, 更新视图
	_this.pubsub.subscribe('model-2-view', function(modelName, newValue) {

		console.log('由于模型发生了变化, 更新视图');

		var	tagName;
		var elements = document.querySelectorAll('[' + _this.directive + '="' + modelName + '"]');

		for (var i = 0, len = elements.length; i < len; i++) {
			tagName = elements[i].tagName.toLowerCase();

			if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
				elements[i].value = newValue;
			} else {
				elements[i].innerHTML = newValue;
			}
		}
	});
};


window.onload = function() {
	var user = new DataBinder();
	user.set('name', 'hjzheng');
};
