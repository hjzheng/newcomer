### 工厂模式

#### 简单工厂

```js
var LaMian = function(ingredients) {
    console.log('LaMian with ' + ingredients);
};

var RiceNoodle = function(ingredients) {
    console.log('Rice Noodles with ' + ingredients);
};

var NoodlesFactory = function(type, ingredients) {
    switch(type) {
        case 'LaMian':
            return new LaMian(ingredients);
        case 'RiceNoodle':
            return new RiceNoodle(ingredients);
    }
};

NoodlesFactory('LaMian', 'beef');
NoodlesFactory('LaMian', 'fish');
NoodlesFactory('LaMian', 'eggs and tomatoes');

NoodlesFactory('RiceNoodle', 'beef');
NoodlesFactory('RiceNoodle', 'fish');
NoodlesFactory('RiceNoodle', 'eggs and tomatoes');
```

#### 安全工厂

```js
var NoodlesFactory = function(type, ingredients) {
    if (this instanceof NoodlesFactory) {
        return new this[type](ingredients);
    } else {
        return new NoodlesFactory(type, ingredients);
    }
};

NoodlesFactory.prototype = {
    LaMian: function(ingredients) {
        console.log('LaMian with ' + ingredients);
    },
    RiceNoodle: function(ingredients) {
        console.log('Rice Noodles with ' + ingredients);
    }
};

NoodlesFactory('LaMian', 'beef');
NoodlesFactory('LaMian', 'fish');
NoodlesFactory('LaMian', 'eggs and tomatoes');

NoodlesFactory('RiceNoodle', 'beef');
NoodlesFactory('RiceNoodle', 'fish');
NoodlesFactory('RiceNoodle', 'eggs and tomatoes');
```

#### 抽象工厂模式

```js
var MealFactory = function(subType, superType) {
    // 判断抽象工厂中是否有该抽象类
    if (typeof MealFactory[superType] === 'function') {
        // 缓存类
        function F(){}
        // 继承父类的属性和方法
        F.prototype = new MealFactory[superType]();
        // 将子类的 constructor 指向子类
        subType.constructor = subType;
        // 子类原型继承父类
        subType.prototype = new F();
    } else {
        throw new Error('未创建该抽象类');
    }
};

MealFactory.Noodles = function() {
    this.type = 'noodles';
};
MealFactory.Noodles.prototype = {
    getNoodleType: function() {
        return new Error('抽象方法不能使用');
    },
    getIngredients: function() {
        return new Error('抽象方法不能使用');
    }
};
MealFactory.Gaifan.prototype = {
    getRice: function() {
        return new Error('抽象方法不能使用');
    },
    getTopping: function() {
        return new Error('抽象方法不能使用');
    }
};

var PotatoesOnRice = function(rice, topping) {
    this.rice = rice;
    this.topping = topping;
};

MealFactory(PotatoesOnRice, 'GaiFan');

PotatoesOnRice.prototype.getRice = function() {
    return this.rice;
};
PotatoesOnRice.prototype.getTopping = function() {
    return this.topping;
};


var potatoesOnRice = new PotatoesOnRice('大份米饭', '咖喱土豆');

var LaMianWithBeef = function(noodleType, ingredients) {
    this.noodleType = noodleType;
    this.ingredients = ingredients;
};

MealFactory(LaMianWithBeef, 'Noodles');

PotatoesOnRice.prototype.getNoodleType = function() {
    return this.noodleType;
};
PotatoesOnRice.prototype.getIngredients = function() {
    return this.ingredients;
};

var laMianWithBeef = new LaMianWithBeef('毛细型拉面', '大块牛肉');

```

#### 应用
gulp-load-plugins
https://github.com/jackfranklin/gulp-load-plugins/blob/master/index.js
