## JS数据类型判断

### 1.typeof

typeof 对于原始类型来说，除了 null 都可以显示正确的类型

```js
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object     []数组的数据类型在 typeof 中被解释为 object
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object     null 的数据类型被 typeof 解释为 object
```

但对于引用数据类型，除了函数之外，都会显示"object"。

```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型,所以想判断一个对象的正确类型，这时候可以考虑使用 instanceof。

### 2.**instanceof**

instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

```js
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true    
// console.log(undefined instanceof Undefined);
// console.log(null instanceof Null);
```

可以看出直接的字面量值判断数据类型，instanceof可以精准判断引用数据类型（Array，Function，Object），而基本数据类型不能被instanceof精准判断。

我们来看一下 instanceof 在MDN中的解释：instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。其意思就是判断对象是否是某一数据类型（如Array）的实例，请重点关注一下是判断一个对象是否是数据类型的实例。在这里字面量值，2， true ，'str'不是实例，所以判断值为false。

#### 手动实现一下instanceof

核心: 原型链的向上查找。

```js
function myInstanceof(left, right) {
    //基本数据类型直接返回false
    if(typeof left !== 'object' || left === null) return false;
    //getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true) {
        //查找到尽头，还没找到
        if(proto == null) return false;
        //找到相同的原型对象
        if(proto == right.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
```

测试:

```js
console.log(myInstanceof("111", String)); //false
console.log(myInstanceof(new String("111"), String));//true
```

### 3.**Object.prototype.toString.call()**

**Object.prototype.toString.call()** 使用 Object 对象的原型方法 toString ，使用 call 进行狸猫换太子，借用Object的 toString 方法。

```js
var a = Object.prototype.toString;
 
console.log(a.call(2));
console.log(a.call(true));
console.log(a.call('str'));
console.log(a.call([]));
console.log(a.call(function(){}));
console.log(a.call({}));
console.log(a.call(undefined));
console.log(a.call(null));
```

#### 4. Object.is和===的区别？

Object在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0和-0，NaN和NaN。 源码如下

```js

function is(x, y) {
  if (x === y) {
    //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
    //两个都是NaN的时候返回true
    return x !== x && y !== y;
  }
```

