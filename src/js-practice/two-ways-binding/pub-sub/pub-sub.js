function DataBinder(object_id) {
	// 创建一个简单地 pubsub 对象
	// 没有做任何优化处理和错误处理
	// 更完整的 PubSub(也就是 EventBus), 可以参考 https://github.com/hjzheng/angular-utils/blob/master/src/utils/EventBus.js

	var PubSub = {

		callbacks: {},

		on: function(msg, callback) {
			this.callbacks[msg] = this.callbacks[msg] || [];
			this.callbacks[msg].push(callback);
		},

		publish: function() {
			var args = Array.prototype.slice.call(arguments);
			var msg = args[0];
			var rest = args.slice(1, args.length);
			this.callbacks[msg] = this.callbacks[msg] || [];
			for (var i = 0, len = this.callbacks[msg].length; i < len; i++) {
				this.callbacks[msg][i].apply(this, rest);
			}
		}
	};

	var data_attr = 'data-bind-' + object_id;
	var message = object_id + ':change';

	var changeHandler = function(evt) {
		var target = evt.target;
		var prop_name = target.getAttribute(data_attr);

		if (prop_name && prop_name !== '') {
			console.log('视图发生了变化, 通知 modal');
			PubSub.publish(message, prop_name, target.value, 'view');
		}
	};

	// 监听变化事件并代理到 PubSub
	if (document.addEventListener) {
		document.addEventListener('change', changeHandler, false);
	}

	// PubSub 将变化传播到所有绑定元素
	PubSub.on(message, function(prop_name, new_val, type) {

		if (type === 'view') {
			return;
		}

		console.log('由于模型发生了变化, 更新视图');

		var elements = document.querySelectorAll('[' + data_attr + '="' + prop_name + '"]');
		var	tag_name;

		for (var i = 0, len = elements.length; i < len; i++) {
			tag_name = elements[i].tagName.toLowerCase();

			if (tag_name === 'input' || tag_name === 'textarea' || tag_name === 'select') {
				elements[i].value = new_val;
			} else {
				elements[i].innerHTML = new_val;
			}
		}
	});

	return PubSub;
}

function User(uid) {
	var binder = new DataBinder(uid);

	var user = {
		attributes: {},

		// 属性设置器使用数据绑定器 PubSub 来发布变化
		// eslint-disable-next-line
		set: function(attr_name, val, bool = true) { // eslint-disable-line
			this.attributes[attr_name] = val;
			if (bool) {
				console.log('模型发生了变化, 通知视图');
				binder.publish(uid + ':change', attr_name, val, 'model');
			}
		},

		get: function(attr_name) {
			return this.attributes[attr_name];
		},

		_binder: binder
	};

	binder.on(uid + ':change', function(attr_name, new_val, type) {
		if (type === 'model') {
			return;
		}
		console.log('由于视图发生了变化, 更新模型');
		user.set(attr_name, new_val, false);
	});

	return user;
}

window.onload = function() {
	var user = User(123);
	user.set('name', 'hjzheng');
};

// use.set 方法中 会发布事件 123:change (模型,修改数据)
// DataBinder 会订阅该事件, 对 dom 进行更新 (视图)

// 当我们修改 input 的值时, document.addEventListener 会触发 'change' 事件, 会发布事件 123:change (视图发生变化)
// User 中的最后, 使用 set 方法修改数据 (模型)
