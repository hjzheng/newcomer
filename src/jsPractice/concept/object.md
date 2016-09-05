### JavaScript中的对象
#### 对象的三种创建方式
```js
var obj = {};
var nextObj = Object.create(Object.prototype);
var lastObj = new Object();
```

#### 对象的属性的定义和访问
```js
//使用 dot
//使用 放括号
//使用 define
var task = {
    name: 'myTask',
    description: 'my description'
};

Object.defineProperties(task, 'toString', {
    value: function() {
      return this.name + ' ' + this.description;
    },
    writeable: true,
    enumerable: true,
    configurable: true,
});

console.log(task.toString());

// writeable 是否可以被重写
task.toString = 'toStr';

// enumerable 是否可以被枚举
console.log(task.keys());

// configurable 是否可以重新配置
Object.defineProperties(task, 'toString', {
    value: function() {
      return this.name + ', ' + this.description;
    },
    writeable: false,
    enumerable: false,
    configurable: false,
});
```

// 继承
```js
var urgentTask = Object.create(task)
Object.defineProperties(urgentTask, 'toString', {
    value: function() {
      return this.name + ', is urgent';
    },
    writeable: true,
    enumerable: true,
    configurable: true,
});
```
