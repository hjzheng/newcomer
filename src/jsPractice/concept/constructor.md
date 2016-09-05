### 构造器模式
Use to create new objects with their own object scope.

#### 关键点
- creates a brand new object
- links to an object prototype
- binds 'this' to new object scope
- implicitly returns this

#### 实现

```js
function Task(name, description) {
    this.name = name;
    this.description = description;
}

Task.prototype.finish = function() {
    console.log('Task finished:', this.name);
}

Task.prototype.save = function() {
    console.log('Task saved:', this.name);
}
```

#### prototype


#### ES6 Class

```js
class Task {
    constructor(name) {
        this.name = name;
    }

    finish() {
        console.log('Task finished:', this.name);
    }

    save() {
        console.log('Task saved:', this.name);
    }
}
```

#### 继承

```js
function UrgentTask(name, priority) {
    Task.call(this, name);
    this.priority = priority;
}

UrgentTask.prototype = Object.create(Task.prototype);
```
