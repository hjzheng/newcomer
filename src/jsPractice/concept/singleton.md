### 单例模式

Used to restrict an Object to one instance of that object across the application

#### 关键点

- Remembers the last time you used it
- Hands the same instance back

#### 实现

```js
// 简单实现
var taskRepo = taskRepo || new Object('TASK');

// 复杂点的
var TaskRepo = (function() {
    var taskRepo = null;

    function createTaskRepo() {
        var taskRepo = new Object('TASK');
        return taskRepo;
    }

    return {
        getInstance: function() {
            if (!taskRepo) {
                taskRepo = createTaskRepo();
            }
            return taskRepo;
        }
    }
})();

var taskRepo = TaskRepo.getInstance();

// ES6 的实现
class TaskRepo {
    constructor() {

    }
}

TaskRepo.getInstance = function() {
    if(!TaskRepo.singleInstance) {
        TaskRepo.singleInstance = new TaskRepo();
    }
    return TaskRepo.singleInstance;
}

let  a = TaskRepo.getInstance();
let  b = TaskRepo.getInstance();

a === b;

```
