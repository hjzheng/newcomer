#### javascript 编码规范
1. 文件

    [建议] JavaScript 文件使用无 BOM 的 UTF-8 编码。

    解释: UTF-8 编码具有更广泛的适应性。BOM 在使用程序或工具处理文件时可能造成不必要的干扰.

2. 空格

    2.1 [强制] 二元运算符两侧必须有一个空格，一元运算符与操作对象之间不允许有空格.
    ```javascript
    var a = !arr.length;
    a++;
    a = b + c;
    ```
    2.2 [强制] 用作代码块起始的左花括号 { 前必须有一个空格。
    ```javascript
    // good
    if (condition) {
    }

    function funcName() {
    }

    // bad
    if (condition){
    }

    function funcName(){
    }
    ```
    2.3 [强制] if / else / for / while / function / switch / do / try / catch / finally 关键字后，必须有一个空格.

    ```javascript
    // good
    if (condition) {
    }

    for (let i = 0; i < 10; i++) {
    }

    // bad
    if(condition) {
    }

    for(let i=0;i<10;i++) {
    }
    ```
    2.4  : 之后必须有空格，: 之前建议不用空格。常见于json数据格式.

    ```javascript
     // good
    var obj = {
         a: 1,
         b: 2,
         c: 3
    };

     // bad
     var obj = {
         a : 1,
         b:2,
         c :3
     };
    ```
    2.5 [强制] 函数声明、具名函数表达式、函数调用中，函数名和 ( 之间不允许有空格.

    ```javascript

    // good
    function funcName() {
    }

    var funcName = function funcName() {
    };

    funcName();

    // bad
    function funcName () {
    }

    var funcName = function funcName () {
    };

    funcName ();
    ```
    2.6 [强制] , 和 ; 前不允许有空格。

    ```javascript
    // good
    callFunc(a, b);

    // bad
    callFunc(a , b) ;
    ```
    2.7 [强制] 单行声明的数组与对象，如果包含元素，{} 和 [] 内紧贴括号部分不允许包含空格。

    解释:声明包含元素的数组与对象，只有当内部元素的形式较为简单时，才允许写在一行。元素复杂的情况，还是应该换行书写。

    ```javascript
        // good
        var arr1 = [];
        var arr2 = [1, 2, 3];
        var obj1 = {};
        var obj2 = {name: 'obj'};
        var obj3 = {
            name: 'obj',
            age: 20,
            sex: 1
        };

        // bad
        var arr1 = [ ];
        var arr2 = [ 1, 2, 3 ];
        var obj1 = { };
        var obj2 = { name: 'obj' };
        var obj3 = {name: 'obj', age: 20, sex: 1};
    ```
3.  换行

    3.1 [强制] 每个独立语句结束后必须换行。

    3.2 [强制] 运算符处换行时，运算符必须在新行的行首。

    ```javascript
    // good
    if (user.isAuthenticated()
        && user.isInRole('admin')
        && user.hasAuthority('add-admin')
        || user.hasAuthority('delete-admin')
    ) {
        // Code
    }
    var result = number1 + number2 + number3 + number4 + number5;

    // bad
    if (user.isAuthenticated() &&
        user.isInRole('admin') &&
        user.hasAuthority('add-admin') ||
        user.hasAuthority('delete-admin')) {
        // Code
    }
    var result = number1 + number2 + number3 + number4 + number5;
    ```
    3.3 [建议] 不同行为或逻辑的语句集，使用空行隔开，更易阅读。

    ```javascript
        // 仅为按逻辑换行的示例，不代表setStyle的最优实现
        function setStyle(element, property, value) {

            if (element == null) {
                return;
            }
           element.style[property] = value;
        }
    ```
    3.4  [建议] 在语句的行长度太长时，根据逻辑条件合理缩进。

    ```javascript
    // 按一定长度截断字符串，并使用 + 运算符进行连接。
    // 分隔字符串尽量按语义进行，如不要在一个完整的名词中间断开。
    // 特别的，对于HTML片段的拼接，通过缩进，保持和HTML相同的结构。
    var html = '' // 此处用一个空字符串，以便整个HTML片段都在新行严格对齐
        + '<article>'
        +     '<h1>Title here</h1>'
        +     '<p>This is a paragraph</p>'
        +     '<footer>Complete</footer>'
        + '</article>';

    // 也可使用数组来进行拼接，相对 + 更容易调整缩进。
    var html = [
        '<article>',
            '<h1>Title here</h1>',
            '<p>This is a paragraph</p>',
            '<footer>Complete</footer>',
        '</article>'
    ];
    html = html.join('');

    // 当函数调用时，如果有一个或以上参数跨越多行，应当每一个参数独立一行。
    // 这通常出现在匿名函数或者对象初始化等作为参数时，如setTimeout函数等。
    setTimeout(
        function () {
            alert('hello');
        },
        200
    );

    order.data.read(
        'id=' + me.model.id,
        function (data) {
            // code...
        },
        300
    );

    // 链式调用较长时采用缩进进行调整。
    $('#id').find('.active')
            .highlight()
            .end();

    // 数组和对象初始化的混用，严格按照每个对象的 { 和结束 } 在独立一行的风格书写。
    var array = [
        {
            // ...
        },
        {
            // ...
        }
    ];
    ```

    3.5 [建议] 对于 if...else... 、 try...catch...finally 等语句，推荐使用在 } 号后添加一个空格 的风格，使代码层次结构更清晰，阅读性更好。

    ```javascript
    if (condition) {
        // some statements;
    } else {
        // some statements;
    }

    try {
        // some statements;
    } catch (ex) {
        // some statements;
    }
    ```

4.  命名

    4.1 [强制] 变量 使用 Camel命名法 。

    ```javascript
    var loadingModules = {};
    ```
    4.2 [强制] 常量 使用 全部字母大写，单词间下划线分隔 的命名方式。

    ```javascript
    var HTML_ENTITY = {};
    ```

    4.3 [强制] 函数 使用 Camel命名法 。

    ```javascript
    function stringFormat(source) {
    }
    ```
    4.4

        id使用 Camel命名法

        class值如果用于js逻辑使用，使用js-className 不涉及任何样式

        class 采用a-c-d这种形式

    4.5 [强制] 枚举变量使用Pascal命名法 ，枚举的属性 使用 全部字母大写，单词间下划线分隔 的命名方式。

    解释：Pascal：单字之间不以空格断开或连接号（-）、底线（_）连结，第一个单字首字母采用大写字母；后续单字的首字母亦用大写字母，例如：FirstName、LastName。
    ```javascript
    var TargetState = {
        READING: 1,
        READED: 2,
        APPLIED: 3,
        READY: 4
    };
    ```
    4.6 [建议] 函数名 使用 动宾短语 。

    ```javascript
    function getStyle(element) {
    }
    ```
    4.7 [建议] boolean 类型的变量使用 is 或 has 开头。

    ```javascript
      var isReady = false;
      var hasMoreCommands = false;
    ```
    4.8 [建议] Promise对象 用 动宾短语的进行时 表达。

    ```javascript

        var loadingData = ajax.get('url');

        loadingData.then(callback);
    ```
5.  注释

    5.1 单行注释

        [强制] 必须独占一行。// 后跟一个空格，缩进与下一行被注释说明的代码一致。

    5.2 多行注释

        [建议] 避免使用 /.../ 这样的多行注释。有多行注释内容时，使用多个单行注释。

    5.3 函数/方法注释

        [强制] 函数/方法注释必须包含函数说明，有参数和返回值时必须使用注释标识。

        [强制] 参数和返回值注释必须包含类型信息和说明。

        [建议] 当函数是内部函数，外部不可访问时，可以使用 @inner 标识。

    ```javascript
    /**
     * 函数描述
     *
     * @param {string} p1 参数1的说明
     * @param {string} p2 参数2的说明，比较长
     *     那就换行了.
     * @param {number=} p3 参数3的说明（可选）
     * @return {Object} 返回值描述
    */
    function foo(p1, p2, p3) {
        var p3 = p3 || 10;
        return {
            p1: p1,
            p2: p2,
            p3: p3
        };
    }
    ```
    5.4 [建议] 每个js文件最前面写上创建文件描述信息,处理哪个页面业务,接口地址等
    ```javascript
        /**
        * boss 角色列表controller
        * @file list.html的逻辑处理js
        * @author  fang.yang@shuyun.com
        * @date  2016-05-21
        * Interface: 接口地址，看后端有没有维护的吧
        */
    ```

6. 变量

    6.1 [强制] 变量在使用前必须通过 var 定义, ES6中使用 let 和 const 声明。

    解释: 不通过 var 定义变量将导致变量污染全局环境。

    ```javascript
    // good
    var name = 'MyName';

    // bad
    name = 'MyName';
    ```
7.  字符串

    7.1 声明字符串变量，使用单引号

    7.2 单引号嵌套双引号

    7.3 超过80个字符串应该使用字符串换行（80是一个泛指，主要是不要声明过长的字符串）

    7.4 可以使用数组的join方法，经行字符串连接，避免加号相加来拼接

8. 对象

    8.1 使用字面值创建对象 var item = {}

    8.2 不要使用保留字作为键值

9.  数组

    9.1  使用字面值创建数组  var item = [];

    9.2  如果不知道数组的长度，添加元素使用push，避免使用 arr[arr.length] = "XXX"

10. 条件表达式和等号

    10.1 适当使用===和 !== 以及 == 和 ﻿﻿!=

    10.2 使用快捷方式

    ```javascript

    // bad
    if (name !== '') {
        // ...stuff...
    }

    // good
    if (name) {
       // ...stuff...
    }
    ```
11. 块: 给所有多行的块使用大括号
    ```javascript
    // bad
    if (test)
      return false;

    // good
    if (test) return false;

    // good
    if (test) {
       return false;
    }

    // bad
    function() { return false; }

    // good
    function() {
        return false;
    }
    ```

12. 分号: 语句结束一定要加分号

13. 循环

    13.1 不要在循环体重包含函数表达式，事先将函数提取到循环体外（循环体中的函数表达式，运行过程中会生成循环次数个函数对象）
    ```javascript
    // good
    function clicker(){
     //....
    }
    var element;
    for (var i = 0,len = elements.length; i< len; i++) {
	    element = elements[i];
        addListener(element, 'click', clicker);
    }

    //bad
    for (var i = 0,len = elements.length; i< len; i++) {
	    var element = elements[i];
	    addListener(element, 'click', function() {});
     }
    ```
    13.2  变量缓存,这点很重要,尤其是在jquery的项目中,把获取的dom缓存起来.

14. 函数

    14.1 函数长度控制在50行以内（复杂操作应进一步抽取）

    14.2 函数的参数控制在6个以内（6个以上可以通过options的字面量来声明参数）
