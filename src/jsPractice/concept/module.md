### module 模式

#### 说白了, module 模式就是一个 toolbox
```JS
// 对象字面量
var module = {
    method: function() {
      
    },
    anotherMethod: function() {
      
    }
}

// 通过函数实现
var module = function() {
    var privateTest = 'test';

    return {
        method: function() {
          
        },
        anotherMethod: function() {
          
        }
    }
}
```

#### AngularJS 的 module 实现

angular.module('app', []);
angular.module('app');

```js
function setupModuleLoader(window) {
  var ensure = function(obj, name, factory) {
    return obj[name] || (obj[name] = factory());
  };

  var angular = ensure(window, 'angular', Object);

  var createModule = function(name, requires, modules) {
    if (name === 'hasOwnProperty') {
      throw 'hasOwnProperty is not a valid module name';
    }
    var invokeQueue = [];
    var moduleInstance = {
      name: name,
      requires: requires,
      constant: function(key, value) {
        invokeQueue.push(['constant', [key, value]]);
      },
      _invokeQueue: invokeQueue
    };
    modules[name] = moduleInstance;
    return moduleInstance;
  };

  var getModule = function(name, modules) {
    if (modules.hasOwnProperty(name)) {
      return modules[name];
    } else {
      throw 'Module '+name+' is not available!';
    }
  };

  ensure(angular, 'module', function() {
    var modules = {};
    return function(name, requires) {
      if (requires) {
        return createModule(name, requires, modules);
      } else {
        return getModule(name, modules);
      }
    };
  });

}

```
