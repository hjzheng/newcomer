function DataBinder() {

	// 创建一个简单地 pubsub 对象
	// 没有做任何优化处理和错误处理
	// 更完整的 PubSub(也就是 EventBus), 可以参考 https://github.com/hjzheng/angular-utils/blob/master/src/utils/EventBus.js
	var PubSub = {

		callbacks: {},

		subscribe: function(msg, callback) {
			this.callbacks[msg] = this.callbacks[msg] || [];
			this.callbacks[msg].push(callback);
		},

		publish: function() {
			var args = Array.prototype.slice.call(arguments);
			var msg = args.shift();
			this.callbacks[msg] = this.callbacks[msg] || [];
			for (var i = 0, len = this.callbacks[msg].length; i < len; i++) {
				this.callbacks[msg][i].apply(this, args);
			}
		}
	};

	// 数据模型
	var Modal = {
		modals: {},
		set: function(modalName, value) {
			this.modals[modalName] = value;
			console.log('模型发生了变化, 通知视图');
			PubSub.publish('modal-2-view', modalName, value);
		},
		get: function(modalName) {
			return this.modals[modalName];
		}
	};

	var directive = 'data-bind';

	var changeHandler = function(evt) {
		var target = evt.target;
		var modalName = target.getAttribute(directive);

		if (modalName && modalName !== '') {
			console.log('视图发生了变化, 通知模型');
			PubSub.publish('ui-2-modal', modalName, target.value);
		}
	};

	// 监听变化事件并代理到 PubSub
	if (document.addEventListener) {
		document.addEventListener('keyup', changeHandler, false);
		// document.addEventListener('change', changeHandler, false);
	}

	PubSub.subscribe('modal-2-view', function(modalName, newValue) {

		console.log('由于模型发生了变化, 更新视图');

		var	tagName;
		var elements = document.querySelectorAll('[' + directive + '="' + modalName + '"]');

		for (var i = 0, len = elements.length; i < len; i++) {
			tagName = elements[i].tagName.toLowerCase();

			if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
				elements[i].value = newValue;
			} else {
				elements[i].innerHTML = newValue;
			}
		}
	});

	PubSub.subscribe('ui-2-modal', function(modalName, newValue) {
		console.log('由于视图发生了变化, 更新模型');
		Modal.set(modalName, newValue);
	});

	return Modal;
}

window.onload = function() {
	var user = DataBinder();
	user.set('name', 'hjzheng');
};

// use.set 方法中 会发布事件 (模型,修改数据)
// DataBinder 会订阅该事件, 对 dom 进行更新 (视图)

// 当我们修改 input 的值时, document.addEventListener 会触发 'change' 事件, 会发布事件 (视图发生变化)
// 最后, 使用 set 方法修改数据 (模型)
