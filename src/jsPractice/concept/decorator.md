### 装饰器模式

Used to add new functionality to an existing object, without being obtrusive

#### 关键点
- More complete inheritance
- Wraps an object
- Protects existing objects
- Allow extended functionality

#### 实现

```js
var Task = function(name) {
    this.name = name;
}

Task.prototype.complete = function() {
    console.log('task ', this.name, ' is completed');
}

Task.prototype.save = function() {
    console.log('task ', this.name, ' is saved');
}

var myTask = new Task('Legacy Task');
myTask.complete();
myTask.save();

var urgentTask = new Task('Urgent Task');
urgentTask.priority = 1;
urgentTask.notify = function() {
  console.log("notify someone");
};


urgentTask.complete();

urgentTask.save = function() {
    this.notify();
    Task.prototype.save.call(this);
}

urgentTask.save();

```

```js
var Task = function(name) {
    this.name = name;
}

Task.prototype.complete = function() {
    console.log('task ', this.name, ' is completed');
}

Task.prototype.save = function() {
    console.log('task ', this.name, ' is saved');
}

var myTask = new Task('Legacy Task');
myTask.complete();
myTask.save();

var UrgentTask = function(name, priority) {
    Task.call(this, name);
    this.priority = priority;
}

UrgentTask.prototype = Object.create(Task.prototype);


UrgentTask.prototype.notify = function() {
     console.log("notify someone");
}

UrgentTask.prototype.save = function() {
     this.notify();
     Task.prototype.save.call(this);
}
```
#### decorator in ES6

#### decorator in angular
https://github.com/ShuyunXIANFESchool/FE-problem-collection/issues/18
