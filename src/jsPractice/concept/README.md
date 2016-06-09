### 概念的理解
#### 闭包

闭包的三个事实:

- JavaScript允许你引入函数以外定义的变量

```js
    function makeNoodles() {
        var noodlesType = 'Lamian'
        function make(ingredients) {
            return noodlesType + ' with ' + ingredients;
        }
        return make('beef');
    }

    makeNoodles(); // 'Lamian with beef'
    // 注意 make函数可以访问外部变量 noodlesType 和 ingredients
```
- 即使外部函数已经执行结束, 内部函数依然可以引用在外部函数所定义的变量

```js
    function makeNoodles() {
        var noodlesType = 'Lamian'
        function make(ingredients) {
            return noodlesType + ' with ' + ingredients;
        }
        return make;
    }

    var f = makeNoodles();
    f('beef'); // 'Lamian with beef'
    f('fish'); // 'Lamian with fish'
    f('eggs and tomatoes'); // 'Lamian with eggs and tomatoes'
    // 注意 与第一个例子不同的是, makeNoodles 函数返回 make 函数, 此时外部函数执行已经结束, 但是内部函数 make
    // 依然可以访问 noodlesType 变量
```
基于上面的例子, 我们可以写的更通用.

```js
    function makeNoodles(noodlesType) {
        function make(ingredients) {
            return noodlesType + ' with ' + ingredients;
        }
        return make;
    }

    var makeLamian = makeNoodles('Lamian');
    makeLamian('beef'); // 'Lamian with beef'
    makeLamian('fish'); // 'Lamian with fish'
    makeLamian('eggs and tomatoes'); // 'Lamian with eggs and tomatoes'

    var makeRiceNoodles = makeNoodles('Rice noodles');
    makeRiceNoodles('beef'); // 'Rice noodles with beef'
    makeRiceNoodles('fish'); // 'Rice noodles with fish'
    makeRiceNoodles('eggs and tomatoes'); // 'Rice noodles with eggs and tomatoes'
```

- 最后一个, 闭包可以更新外部函数定义的变量

```js
    function counter() {
        var num = 0;
        return {
            increase: function() {
               num++;
            },
            currentNum: function() {
                return num;
            }
        };
    }

    var counter1 = counter();
    counter1.increase();
    counter1.increase();
    counter1.currentNum(); // 2

    var counter2 = counter();
    counter2.currentNum(); // 0
```

实际例子, 看看 AngularJS1.x 的源码中的 minErr

```js
function minErr(module, ErrorConstructor) {
  ErrorConstructor = ErrorConstructor || Error;
  return function() {
    var SKIP_INDEXES = 2;

    var templateArgs = arguments,
      code = templateArgs[0],
      message = '[' + (module ? module + ':' : '') + code + '] ',
      template = templateArgs[1],
      paramPrefix, i;

    message += template.replace(/\{\d+\}/g, function(match) {
      var index = +match.slice(1, -1),
        shiftedIndex = index + SKIP_INDEXES;

      if (shiftedIndex < templateArgs.length) {
        return toDebugString(templateArgs[shiftedIndex]);
      }

      return match;
    });

    message += '\nhttp://errors.angularjs.org/1.5.6/' +
      (module ? module + '/' : '') + code;

    for (i = SKIP_INDEXES, paramPrefix = '?'; i < templateArgs.length; i++, paramPrefix = '&') {
      message += paramPrefix + 'p' + (i - SKIP_INDEXES) + '=' +
        encodeURIComponent(toDebugString(templateArgs[i]));
    }

    return new ErrorConstructor(message);
  };
}

...
     var $injectorMinErr = minErr('$injector');
     var ngMinErr = minErr('ng');
...

```




