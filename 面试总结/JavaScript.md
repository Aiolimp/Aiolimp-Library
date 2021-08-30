## 目录
- [目录](#目录)
- [变量和类型](#变量和类型)
  - [1. JavaScript 有几种类型的值？你能画一下他们的内存图吗？](#1-javascript-有几种类型的值你能画一下他们的内存图吗)
  - [2.介绍 js 的基本数据类型。](#2介绍-js-的基本数据类型)
  - [3.什么是堆？什么是栈？它们之间有什么区别和联系？](#3什么是堆什么是栈它们之间有什么区别和联系)
  - [4.undefined 与 undeclared 的区别？](#4undefined-与-undeclared-的区别)
  - [5.null 和 undefined 的区别？](#5null-和-undefined-的区别)
  - [6.JS数据类型判断](#6js数据类型判断)
  - [7.JS如何判断数组](#7js如何判断数组)
  - [8.JS隐式转换的场景以及转换原则](#8js隐式转换的场景以及转换原则)
    - [场景一、算术运算符](#场景一算术运算符)
    - [场景二、关系(比较)运算符](#场景二关系比较运算符)
    - [场景三、`isNaN( )`](#场景三isnan-)
    - [场景四、关系(比较)运算符](#场景四关系比较运算符)
  - [9.Object.is() 与原来的比较操作符 “===”、“==” 的区别？](#9objectis-与原来的比较操作符--的区别)
  - [10.typeof NaN 的结果是什么？](#10typeof-nan-的结果是什么)
- [变量和类](#变量和类)
- [原型和原型链](#原型和原型链)
  - [1. JavaScript 原型，原型链？ 有什么特点？](#1-javascript-原型原型链-有什么特点)
  - [2.实现继承的几种方式](#2实现继承的几种方式)
  - [3.javascript 创建对象的几种方式](#3javascript-创建对象的几种方式)
  - [4.new 操作符具体干了什么呢？如何实现？](#4new-操作符具体干了什么呢如何实现)
- [作用域和闭包](#作用域和闭包)
  - [1.作用域和作用域链](#1作用域和作用域链)
    - [作用域：](#作用域)
    - [全局作用域：](#全局作用域)
    - [函数作用域：](#函数作用域)
    - [块级作用域：](#块级作用域)
    - [作用域链](#作用域链)
  - [2.JS执行上下文](#2js执行上下文)
    - [执行栈](#执行栈)
  - [3.this](#3this)
    - [怎么改变 this 的指向](#怎么改变-this-的指向)
    - [箭头函数注意事项：](#箭头函数注意事项)
    - [4.闭包](#4闭包)
- [执行机制](#执行机制)
  - [1.三种事件模型是什么？](#1三种事件模型是什么)
  - [2.事件委托是什么？](#2事件委托是什么)
  - [3.js 延迟加载的方式有哪些？](#3js-延迟加载的方式有哪些)
  - [4.同步和异步请求的区别](#4同步和异步请求的区别)
  - [5.哪些操作会造成内存泄漏？](#5哪些操作会造成内存泄漏)
  - [6.什么是 DOM 和 BOM？](#6什么是-dom-和-bom)
- [语法和API](#语法和api)
  - [1.浅谈 JavaScript 中变量和函数声明的提升?](#1浅谈-javascript-中变量和函数声明的提升)
  - [2.var,let和const的区别是什么？](#2varlet和const的区别是什么)
## 变量和类型

### 1. JavaScript 有几种类型的值？你能画一下他们的内存图吗？

涉及知识点：

- 栈：原始数据类型（Undefined、Null、Boolean、Number、String）
- 堆：引用数据类型（对象、数组和函数）

```
两种类型的区别是：存储位置不同。
原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。

引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在
栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实
体。
```

回答：

```
js 可以分为两种类型的值，一种是基本数据类型，一种是复杂数据类型。

基本数据类型....（参考1）

复杂数据类型指的是 Object 类型，所有其他的如 Array、Date 等数据类型都可以理解为 Object 类型的子类。

两种类型间的主要区别是它们的存储位置不同，基本数据类型的值直接保存在栈中，而复杂数据类型的值保存在堆中，通过使用在栈中
保存对应的指针来获取堆中的值。
```

详细资料可以参考： [《JavaScript 有几种类型的值？》](https://blog.csdn.net/lxcao/article/details/52749421) [《JavaScript 有几种类型的值？能否画一下它们的内存图；》](https://blog.csdn.net/jiangjuanjaun/article/details/80327342)

### 2.介绍 js 的基本数据类型。

js 一共有六种基本数据类型，分别是 Undefined、Null、Boolean、Number、String，还有在 ES6 中新增的 Symbol 和 ES10 中新增的 BigInt 类型。
Symbol 代表创建后独一无二且不可变的数据类型，它的出现我认为主要是为了解决可能出现的全局变量冲突的问题。
BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全范围。

详细资料：[js数据类型](https://github.com/Aiolimp/Aiolimp-Library/blob/main/JavaScript/%E5%8F%98%E9%87%8F%E5%92%8C%E7%B1%BB%E5%9E%8B/JS%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.md)

### 3.什么是堆？什么是栈？它们之间有什么区别和联系？

堆和栈的概念存在于数据结构中和操作系统内存中。

在数据结构中，栈中数据的存取方式为先进后出。而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全
二叉树是堆的一种实现方式。

在操作系统中，内存被分为栈区和堆区。

栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。

堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。

### 4.undefined 与 undeclared 的区别？

已在作用域中声明但还没有赋值的变量，是 undefined 的。相反，还没有在作用域中声明过的变量，是 undeclared 的。

对于 undeclared 变量的引用，浏览器会报引用错误，如 ReferenceError: b is not defined 。但是我们可以使用 typ
eof 的安全防范机制来避免报错，因为对于 undeclared（或者 not defined ）变量，typeof 会返回 "undefined"。

### 5.null 和 undefined 的区别？

Undefined 和 Null 都是javaScript中的基本数据类型.

- undefined 表示未定义，不存在这个值，例如变量被声明了，但没有赋值时，就等于 undefined。

- null 表示一个空对象，里面没有任何方法和属性。

在验证 null 时，一定要使用===，因为==无法分别 null 和 undefined

详细资料可以参考： [《JavaScript 深入理解之 undefined 与 null》](http://cavszhouyou.top/JavaScript深入理解之undefined与null.html)

### 6.JS数据类型判断

- **typeof**

typeof 对于原始类型来说，除了 null 都可以显示正确的类型。

typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型,所以想判断一个对象的正确类型，这时候可以考虑使用 instanceof。

- **instanceof**

instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是否存在一个构造函数的 prototype 属性。

实现原理:

```js
// 变量R的原型 存在于 变量L的原型链上
function instance_of (L, R) {    
  // 验证如果为基本数据类型，就直接返回 false
  const baseType = ['string', 'number', 'boolean', 'undefined', 'symbol']
  if(baseType.includes(typeof(L))) { return false }

  let RP = R.prototype;  // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null) { // 找到最顶层
      return false;
    }
    if (L === RP) { // 严格相等
      return true;
    }
    L = L.__proto__;  // 没找到继续向上一层原型链查找
  }
}
```



- **Object.prototype.toString.call()**

Object.prototype.toString.call() 使用 Object 对象的原型方法 toString ，使用 call 修改this指向判断数据类型。

### 7.JS如何判断数组

1、通过**Object.prototype.toString.call()**做判断

```js
function isArray(obj){
　　return Object.prototype.toString.call().slice(8,-1) === 'Array';
};
```

2、**通过原型链来判断**

```js
function isArray(obj){
　　return obj.__proto__ === Array.prototype;
};
```

3、通过es6 **Array.isArrray()**做判断

```js
function isArray(obj){
　　return Array.isArrray(obj);
};
```

4、通过**instanceof**做判断

```js
function isArray(obj){
　　return obj instanceof Array
};
```

5、通过**Array.prototype.isPrototypeOf**

```js
function isArray(obj){
　　return Array.prototype.isPrototypeOf(obj)
}
```

### 8.JS隐式转换的场景以及转换原则

#### **场景一、算术运算符**

规则：

- `+` 号两边只要出现字符，结果必然为字符

```js
	console.log(1 + 1); // 2
	console.log("1" + 1); // 11 只要有一边出现字符，就是字符串的拼接
```

- `-`、 `*`、`/`、 `%`将字符转换成数字，再进行正常的运算，结果必为数值
- 如果某个数据不能转成数值，会得到`NaN`，`NaN`和任何数据做运算都是`NaN`

```js
	console.log("2" - 1); // 1 将字符"2"转换成数字2，再进行正常的运算
	console.log("2" * 1); // 2
	console.log("1a" / 1); // NaN 字符"1a"转不了数值
```

【注】除字符串以外的数据，在进行算术运算的时候，先转成数字，再进行运算

```js
	console.log(10 + true); // 11，true == 1，false == 0，null == 0
```

#### **场景二、关系(比较)运算符**

规则：

- `<`、`<=`、`>`、`>=`、`!=`、`==`任意一边出现数值，就会把另一边转成数值，再进行比较
- 只有一边出现数值，都是数值的比较规则(比谁数值大)
- 如果都是字符，才是字符的比较规则：逐位比较，得到结果就停止比较

```js
	console.log("2" > 11); // false 将字符"2"转成数值2，再进行比较
	console.log("2" > "11"); // true 两边都是字符，就是字符的比较规则(逐位)比较
```

#### **场景三、`isNaN( )`**

规则：

- 判断数据能否转成数值，严格转换，能识别小数点

```js
    console.log(isNaN('hello')); //true,'hello'不能转成数值，因此会得到NaN
    console.log(isNaN('123')); //false，'123'能转成数值，因此不是NaN
    console.log(isNaN('12a3'));//true,严格转换，出现字母就不能转成数值，因此是NaN
    console.log(isNaN('12.3'));//false，能识别小数点，因此能转成数值，因此不是NaN
```

#### **场景四、关系(比较)运算符**

规则：判断语句`if()`

- 判断语句的判断条件，表达式的结果就是真和假，隐式转换，将其他转成布尔值
  - 数值转布尔：非0为真，0为假
  - 字符转布尔：非空字符为真，空字符("")为假
  - 对象转布尔：对象为真
  - 数组转布尔：数组为真
  - 函数转布尔：函数为真
  - 特殊数据转布尔：NaN为假；undefined为假；null为假

```js
	// 0为假
	if(0){
		console.log("真");
	}else{
		console.log("假"); // 打印结果 假，0转为假，走else里的代码
	}
	// 空字符为假
	if(""){
		console.log("真");
	}else{
		console.log("假"); // 打印结果 假，""转为假，走else里的代码
	}
```

### 9.Object.is() 与原来的比较操作符 “===”、“==” 的区别？

使用双等号进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。

使用三等号进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。

使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 认定为是相等的。

### 10.typeof NaN 的结果是什么？

NaN 意指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出
数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。

typeof NaN; // "number"

NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN != NaN
为 true。

## 变量和类

## 原型和原型链

### 1. JavaScript 原型，原型链？ 有什么特点？

**原型：**

在 JavaScript 中，每个构造函数都拥有一个`prototype`属性，它指向构造函数的原型对象，这个原型对象中有一个 constructor 属性指回构造函数；每个实例都有一个`__proto__`属性，当我们使用构造函数去创建实例时，实例的`__proto__`属性就会指向构造函数的原型对象。。其次也可以通过ES5的`Object.getPrototypeOf()` 方法方法来获取对象的原型。

**原型链：**

当我试图访问一个 JavaScript 实例的属性/方法时，它首先搜索这个实例本身；当发现实例没有定义对应的属性/方法时，它会转而去搜索实例的原型对象；如果原型对象中也搜索不到，它就去搜索原型对象的原型对象，这个搜索的轨迹，就叫做原型链。

特点：

JavaScript 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与
之相关的对象也会继承这一改变。

### 2.实现继承的几种方式

**1.借助call**

```js
function Parent1(){
    this.name = 'parent1';
  }
  function Child1(){
    Parent1.call(this);
    this.type = 'child1'
  }
  console.log(new Child1);
```

缺点：父类原型对象中一旦存在方法那么子类无法继承。

**2.借助原型链**

```js
 function Parent2() {
    this.name = 'parent2';
    this.play = [1, 2, 3]
  }
  function Child2() {
    this.type = 'child2';
  }
  Child2.prototype = new Parent2();

  console.log(new Child2());
```

缺点：在包含有引用类型的数据时，实例使用的是同一个原型对象。还有就是在创建子类型的时候不能向超类型传递参数。

**3.组合继承**

```js
 function Parent3 () {
    this.name = 'parent3';
    this.play = [1, 2, 3];
  }
  function Child3() {
    Parent3.call(this);
    this.type = 'child3';
  }
  Child3.prototype = new Parent3();
  var s3 = new Child3();
  var s4 = new Child3();
  s3.play.push(4);
  console.log(s3.play, s4.play);
```

缺点：父类构造函数会调用两次

**4.寄生组合继承**

通过`Object.create（）`使用父类原型的副本来作为子类的原型。

```js
function Parent5 () {
    this.name = 'parent5';
    this.play = [1, 2, 3];
  }
  function Child5() {
    Parent5.call(this);
    this.type = 'child5';
  }
  Child5.prototype = Object.create(Parent5.prototype);
  Child5.prototype.constructor = Child5;
```

**object.create()** 接收两个参数:

- 一个用作新对象原型的对象
- (可选的)一个为新对象定义额外属性的对象

```js
var person = {
	friends : ["Van","Louis","Nick"]
};
var anotherPerson = Object.create(person);
anotherPerson.friends.push("Rob");
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.friends.push("Style");
alert(person.friends);//"Van,Louis,Nick,Rob,Style"
```

### 3.javascript 创建对象的几种方式

（1）第一种是工厂模式，工厂模式的主要工作原理是用函数来封装创建对象的细节，从而通过调用函数来达到复用的目的。但是它有一个很大的问题就是创建出来的对象无法和某个类型联系起来，它只是简单的封装了复用代码，而没有建立起对象和类型间的关系。

（2）第二种是构造函数模式。js 中每一个函数都可以作为构造函数，只要一个函数是通过 new 来调用的，那么我们就可以把它称为构造函数。执行构造函数首先会创建一个对象，然后将对象的原型指向构造函数的 prototype 属性，然后将执行上下文中的 this 指向这个对象，最后再执行整个函数，如果返回值不是对象，则返回新建的对象。因为 this 的值指向了新建的对象，因此我们可以使用 this 给对象赋值。构造函数模式相对于工厂模式的优点是，所创建的对象和构造函数建立起了联系，因此我们可以通过原型来识别对象的类型。但是构造函数存在一个缺点就是，造成了不必要的函数对象的创建，因为在 js 中函数也是一个对象，因此如果对象属性中如果包含函数的话，那么每次我们都会新建一个函数对象，浪费了不必要的内存空间，因为函数是所有的实例都可以通用的。

（3）第三种模式是原型模式，因为每一个函数都有一个 prototype 属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例都能共享的属性和方法。因此我们可以使用原型对象来添加公用属性和方法，从而实现代码的复用。这种方式相对于构造函数模式来说，解决了函数对象的复用问题。但是这种模式也存在一些问题，一个是没有办法通过传入参数来初始化值，另一个是如果存在一个引用类型如 Array 这样的值，那么所有的实例将共享一个对象，一个实例对引用类型值的改变会影响所有的实例。

（4）第四种模式是组合使用构造函数模式和原型模式，这是创建自定义类型的最常见方式。因为构造函数模式和原型模式分开使用都存在一些问题，因此我们可以组合使用这两种模式，通过构造函数来初始化对象的属性，通过原型对象来实现函数方法的复用。这种方法很好的解决了两种模式单独使用时的缺点，但是有一点不足的就是，因为使用了两种不同的模式，所以对于代码的封装性不够好。

（5）第五种模式是动态原型模式，这一种模式将原型方法赋值的创建过程移动到了构造函数的内部，通过对属性是否存在的判断，可以实现仅在第一次调用函数时对原型对象赋值一次的效果。这一种方式很好地对上面的混合模式进行了封装。

（6）第六种模式是寄生构造函数模式，这一种模式和工厂模式的实现基本相同，我对这个模式的理解是，它主要是基于一个已有的类型，在实例化时对实例化的对象进行扩展。这样既不用修改原来的构造函数，也达到了扩展对象的目的。它的一个缺点和工厂模式一样，无法实现对象的识别。

### 4.new 操作符具体干了什么呢？如何实现？

**new**共经历了四个过程。

```php
var fn = function () { };
var fnObj = new fn();
```

1、创建了一个空对象

```csharp
var obj = new object();
```

2、设置原型链

将这个空对象的`__proto__`成员指向了fn函数对象的`prototype`。

```ini
obj._proto_ = fn.prototype;
```

3、让fn的this指向obj，并执行fn的函数体

```js
var result = fn.call(obj);
```

4、判断fn的返回值类型，如果是值类型，返回obj。如果是引用类型，就返回这个引用类型的对象。

```js
if (typeof(result) == "object"){  
    fnObj = result;  
} else {  
    fnObj = obj;
}  
```

> **实例的 `__proto__` 属性（原型）等于其构造函数的 `prototype` 属性。**

## 作用域和闭包

### 1.作用域和作用域链

#### **作用域：**

作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期。

#### **全局作用域：**

在代码中任何地方都能访问到的对象拥有全局作用域。

- 最外层函数 和在最外层函数外面定义的变量拥有全局作用域
- 所有末定义直接赋值的变量自动声明为拥有全局作用域
- 所有window对象的属性拥有全局作用域

#### **函数作用域：**

函数作用域是指声明在函数内部的变量，和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部。

- **作用域是分层的，内层作用域可以访问外层作用域的变量，反之则不行**。
- **块语句（大括号“｛｝”中间的语句），如 if 和 switch 条件语句或 for 和 while 循环语句，不像函数，它们不会创建一个新的作用域。**

#### **块级作用域**：

块级作用域可通过新增命令`let`和`const`声明，所声明的变量在指定块的作用域外无法被访问。块级作用域在如下情况被创建：

1. 在一个函数内部
2. 在一个代码块（由一对花括号包裹）内部

- **声明变量不会提升到代码块顶部**

- **禁止重复声明**

- **循环中的绑定块作用域的妙用**

```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

上面代码中，变量i是let声明的，**当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。**

#### 作用域链

**作用域链**的作用是保证执行环境里有权访问所有的的变量和函数并且是有序的，作用域链的变量只能向上访问，变量访问到 window 对象即被终止，作用域链向下访问变量是不被允许的。

### 2.JS执行上下文

执行上下文就是当前 JavaScript 代码被解析和执行时所在环境。

执行上下文总共有三种类型：

- **全局执行上下文：** 这是默认的、最基础的执行上下文。不在任何函数中的代码都位于全局执行上下文中。它做了两件事：1. 创建一个全局对象，在浏览器中这个全局对象就是 window 对象。2. 将 `this` 指针指向这个全局对象。一个程序中只能存在一个全局执行上下文。
- **函数执行上下文：** 每次调用函数时，都会为该函数创建一个新的执行上下文。每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被创建。一个程序中可以存在任意数量的函数执行上下文。每当一个新的执行上下文被创建，它都会按照特定的顺序执行一系列步骤，具体过程将在本文后面讨论。
- **Eval 函数执行上下文：** 运行在 `eval` 函数中的代码也获得了自己的执行上下文，但由于 Javascript 开发人员不常用 eval 函数，所以在这里不再讨论。

#### 执行栈

执行栈，在其他编程语言中也被叫做调用栈，具有 LIFO（后进先出）结构，用于存储在代码执行期间创建的所有执行上下文。

当 JavaScript 引擎首次读取你的脚本时，它会创建一个全局执行上下文并将其推入当前的执行栈。每当发生一个函数调用，引擎都会为该函数创建一个新的执行上下文并将其推到当前执行栈的顶端。

引擎会运行执行上下文在执行栈顶端的函数，当此函数运行完成后，其对应的执行上下文将会从执行栈中弹出，上下文控制权将移到当前执行栈的下一个执行上下文。

### 3.this

this 就是一个指针，**永远指向最后调用它的那个对象**。

- 函数是否在new中调用，如果是，那么this绑定的是新创建的对象。

- 函数是否通过call,apply、bind修改了this的指向，如果是，那么this绑定的就是指定的对象。

> 如果把null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际指向全局对象

- 函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。一般是obj.foo()

- 当一个函数不是一个对象的属性，直接作为函数来调用时，this 指向全局对象。

- 如果是箭头函数，箭头函数的this继承的是外层代码块的this。

#### 怎么改变 this 的指向

- 使用 ES6 的箭头函数
- 在函数内部使用 `_this = this`
- 使用 `apply`、`call`、`bind`
- new 实例化一个对象

#### 箭头函数注意事项：

- 函数体内的this对象，继承的是外层代码块的this。
- 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
- 箭头函数没有自己的this，所以不能用call()、apply()、bind()这些方法去改变this的指向.

#### 4.闭包

> 闭包是指有权访问另一个函数作用域中的变量的函数。闭包产生的本质就是，当前环境中存在指向父级作用域的引用

创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。其次将函数作为一个参数进行传递。还有在定时器、事件监听、Ajax请求或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。

**作用：**

闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，我们可以通过在外部调用闭包函数，从而在外
部访问到函数内部的变量，可以使用这种方法来创建私有变量。

闭包的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以
这个变量对象不会被回收。

**缺点：** 无法回收闭包中引用变量，容易造成内存泄漏

### 5.bind call apply区别

- 三者都可以改变函数的this对象指向。

- 三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window。

- 三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入。

- bind 改变this指向后不会立即执行，而是返回一个永久改变this指向的函数便于稍后调用； apply, call则是立即调用

## 执行机制

### 1.三种事件模型是什么？

1.DOM0事件模型（原始事件模型），一个DOM节点只能绑定一个事件。

2.DOM2事件模型新增了冒泡和捕获的概念，支持一个元素节点绑定多个事件。(**事件传播**：三个阶段)

事件捕获阶段：事件从 document 向下传播到目标元素，依次检查所有节点是否绑定了监听事件，如果有则执行。 阻止捕获：使用preventDefault() 方法

事件处理阶段(目标阶段)：事件在达到目标元素时，触发监听事件。

事件冒泡阶段：事件从目标元素冒泡到 document，并且一次检查各个节点是否绑定了监听函数，如果有则执行。阻止冒泡：使用 stopPropagation()方法

3.IE事件模型。只支持冒泡，

事件绑定方法：

**addEventListener**有三个参数 事件名称、事件回调、捕获/冒泡

设置为true，则事件在捕获阶段执行，为false则在冒泡阶段执行。

### 2.事件委托是什么？

“事件委托”就是把原本需要绑定的事件委托给父节点，由父节点的监听函数统一处理多个子元素的事件。事件委托的本质实际就是浏览器的事件冒泡机制。

使用事件委托的好处是可以提高性能。 减少内存消耗。比如在 table 上代理所有 td 的 click 事件。 可以实现当新增子对象时无需再次对其绑定。

### 3.js 延迟加载的方式有哪些？

js 的加载、解析和执行会阻塞页面的渲染过程，因此我们希望 js 脚本能够尽可能的延迟加载，提高页面的渲染速度。

我了解到的几种方式是：

第一种方式是我们一般采用的是将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

第二种方式是给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。

第三种方式是给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。

第四种方式是动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。

第五种方式使用 setTimeout 延迟方法。

### **4.同步和异步请求的区别**

同步：上一件事情没有完成，继续处理上一件事情，只有上一件事情完成了，才会做下一件事情 （ JS中大部分都是同步编程）。

异步：规划要做一件事情，但是不是当前立马去执行这件事情，需要等一定的时间，这样的话，我们不会等着他执行，而是继续执行下面的操作。
JS中常见的异步操作：

- 定时器都是异步编程的
- 所有的事件绑定都是异步编程的
- Ajax读取数据都是异步编程的
- 回调函数都是异步编程的

### 5.哪些操作会造成内存泄漏？

- 由于使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收。

- 设置了 setInterval 定时器，而忘记取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留
  在内存中，而无法被回收。

- 获取一个 DOM 元素的引用，而后面这个元素被删除，由于我们一直保留了对这个元素的引用，所以它也无法被回
  收。

- 不合理的使用闭包，从而导致某些变量一直被留在内存当中。

### 6.什么是 DOM 和 BOM？

DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。

BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM
的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）
对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 locati
on 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对
象的子对象。

### 8.DOM 操作——怎样添加、移除、移动、复制、创建和查找节点？

（1）创建新节点

```js
  createDocumentFragment()    //创建一个DOM片段
  createElement()   //创建一个具体的元素
  createTextNode()   //创建一个文本节点
```

（2）添加、移除、替换、插入

```js
appendChild(node)
removeChild(node)
replaceChild(new,old)
insertBefore(new,old)
```

（3）查找

```js
getElementById();
getElementsByName();
getElementsByTagName();
getElementsByClassName();
querySelector();
querySelectorAll();
```

（4）属性操作

```js
getAttribute(key);
setAttribute(key, value);
hasAttribute(key);
removeAttribute(key);
```

### 19.JS延迟加载的几种

### 7.JS的运行机制

1.js 是单线程运行的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。

2.在执行同步代码的时候，如果遇到了异步事件，js 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务

3.当同步事件执行完毕后，再将异步事件对应的回调加入到与当前执行栈中不同的另一个任务队列中等待执行。

4.任务队列可以分为宏任务对列和微任务对列，当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。

5.当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。

微任务包括了 promise 的回调、node 中的 process.nextTick 、对 Dom 变化监听的 MutationObserver。

宏任务包括了 script 脚本的执行、setTimeout ，setInterval ，setImmediate 一类的定时事件，还有如 I/O 操作、UI 渲 染等。

## 语法和API

### 1.浅谈 JavaScript 中变量和函数声明的提升?

- 在 JavaScript 中变量和函数的声明会提升到最顶部执行

- 函数的提升高于变量的提升。  

- 函数内部如果用 var 声明了相同名称的外部变量，函数将不再向上寻找。 

- 匿名函数不会提升。

### 2.var,let和const的区别是什么？

1.var声明的变量会挂载在window上，而let和const声明的变量不会：

2.var声明变量存在变量提升，let和const不存在变量提升:

3.let和const声明形成块作用域

4.同一作用域下let和const不能声明同名变量，而var可以

5.暂时性死区  const声明的是常量，不能修改。

### 3.`async/await`

async/await是一种建立在promise对象上编写异步操作的解决方案。

使用async就表示声明的函数是异步的，async会返回一个Promise对象，如果返回的是一个值，Promise的rseolve方法会负责传递这个值。当async函数抛出异常时，Promise的reject方法也会传递这个异常值。await会暂停执行async中的代码，等待一个异步方法执行完成。await关键字后面需要跟一个promise对象，并且执行的结果就是后面promise执行的结果。

当一个async函数中有多个await时，程序变成串行操作，可以使用Promise.all实现并行操作，all中的方法是同时执行的。其中一个await状态变成reject，后面的操作都不会执行。

### 4.Generator

Generator（生成器）就是Iterator接口的具体实现方式。特点就是可以控制函数的执行。

执行Generator函数会返回一个遍历器对象，每一次Generator函数里面的yield都相当与执行一次遍历器对象的next()方法，并且可以通过next(value)方法传入自定义的value,来改变Generator函数的行为，控制函数的执行。

### 5.for...of和for...in区别

1. 推荐在循环对象属性的时候，使用`for...in`,在遍历数组的时候的时候使用`for...of`。
2. `for...in`循环出的是key，`for...of`循环出的是value
3. 注意，`for...of`是ES6新引入的特性。修复了ES5引入的`for...in`的不足
4. `for...of`不能循环普通的对象，需要通过和`Object.keys()`搭配使用

### 6.iterator

iterator迭代器，它主要为所有的数据结构提供一个统一的访问接口，通过iterator来实现遍历操作。[Symbol.iterator]属性名是它的固定写法，只要拥有这个属性对象，就能够用迭代器的方式进行遍历，该函数必须返回一个对象，并且对象中包含next()方法，执行next()方法可以返回包含value/done属性的iterator对象，value就是当前对象的值，done是一个属性值，遍历是否结束。而部署了iterator接口就可以使用for...of进行遍历

### 7.promise对象

Promise 是异步编程的一种解决方案，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API包括他自身的all、race、reject、resovle等方法以及原型中包含catch、then、finally等方法。各种异步操作都可以用同样的方法进行处理。很好的解决了地狱回调问题(避免了层层嵌套的回调函数)。

promis对象有三种状态：**pending(进行中)、fulfilled(已成功)、reject(已失败)**。

可以通过过new promise来创建一个对象，Promise对象的参数为一个函数，并且传入resolve和reject两个参数，分别表示异步操作执行成功的回调函数和异步操作执行失败的回调函数。

promise.all返回一个新的promise对象，并且只有所有promise都成功的时候才会触发成功，只要有一个触发失败就会返回失败的对象。

promise.race就是看他参数中那个处理的快就返回哪个结果

### 8.模块化开发的理解

 模块化就是实现一组特定功能的方法，通过模块化我们可以存储多个独立的功能块，复用性高。

JS中有四种模块加载方案：

1.CommonJS，它通过require来引入模块，通过module.exports来导出模块。主要作用与服务端的解决方案，并且以同步的方式来引入模块。

2.其次就是AMD和CMD方案，这两种方案都是通过异步的方式来加载模块，不同的是在定义模块时对依赖的处理方式和执行依赖的时间不同。

3.ES6 提出的方案，使用 import 和 export 的形式来导入导出模块。

### 9. requireJS的核心原理是什么？

require.js 的核心原理是通过动态创建 script 脚本来异步引入模块，然后对每个脚本的 load 事件进行监听，如果每个脚本都加载完成了，再调用回调函数。

### 10.set、weakSet 、map、weakMap

Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

WeakSet 结构与 Set 类似，也是不重复的值的集合。WeakSet 的成员只能是对象

Map是JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。`WeakMap`只接受对象作为键名（`null`除外）

`WeakMap`的键名所指向的对象，不计入垃圾回收机制。

### 11.JS深拷贝和浅拷贝

如何区分深拷贝与浅拷贝，简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝如果B没变，那就是深拷贝。

**浅拷贝：**

**1.object.assign(target,source)**
Object.assign 方法只复制源对象中可枚举的属性和对象自身的属性。
如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。后来的源的属性将类似地覆盖早先的属性。
**2.使用扩展运算符**

**深拷贝：**

1用递归去复制所有层级属性。

```javascript
function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}    
let a=[1,2,3,4],
    b=deepClone(a);
a[0]=2;
console.log(a,b);
```

 2.利用JSON.parse(JSON.stringify())。

### 12. js 的节流与防抖

**函数防抖** 是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。

**函数节流** 是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

```js
// 函数防抖的实现
function debounce(fn, wait) {
  var timer = null;

  return function() {
    var context = this,
      args = arguments;

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

// 函数节流的实现;
function throttle(fn, delay) {
  var preTime = Date.now();

  return function() {
    var context = this,
      args = arguments,
      nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```

## Webpack

### 1.你知道webpack的作用是什么吗？

模块打包。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。

编译兼容。在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过`webpack`的`Loader`机制，不仅仅可以帮助我们对代码做`polyfill`，还可以编译转换诸如`.less, .vue, .jsx`这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。

能力扩展。通过`webpack`的`Plugin`机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

### 2.说一下模块打包运行原理？

如果面试官问你`Webpack`是如何把这些模块合并到一起，并且保证其正常工作的，你是否了解呢？

首先我们应该简单了解一下`webpack`的整个打包流程：

- 1、读取`webpack`的配置参数；
- 2、启动`webpack`，创建`Compiler`对象并开始解析项目；
- 3、从入口文件（`entry`）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
- 4、对不同文件类型的依赖模块文件使用对应的`Loader`进行编译，最终转为`Javascript`文件；
- 5、整个过程中`webpack`会通过发布订阅模式，向外抛出一些`hooks`，而`webpack`的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。

其中文件的解析与构建是一个比较复杂的过程，在`webpack`源码中主要依赖于`compiler`和`compilation`两个核心对象实现。

`compiler`对象是一个全局单例，他负责把控整个`webpack`打包的构建流程。 `compilation`对象是每一次构建的上下文对象，它包含了当次构建所需要的所有信息，每次热更新和重新构建，`compiler`都会重新生成一个新的`compilation`对象，负责此次更新的构建过程。

而每个模块间的依赖关系，则依赖于`AST`语法树。每个模块文件在通过`Loader`解析完成之后，会通过`acorn`库生成模块代码的`AST`语法树，通过语法树就可以分析这个模块是否还有依赖的模块，进而继续循环执行下一个模块的编译解析。

最终`Webpack`打包出来的`bundle`文件是一个`IIFE`的执行函数。

```js
// webpack 5 打包的bundle文件内容

(() => { // webpackBootstrap
    var __webpack_modules__ = ({
        'file-A-path': ((modules) => { // ... })
        'index-file-path': ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => { // ... })
    })
    
    // The module cache
    var __webpack_module_cache__ = {};
    
    // The require function
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
                return cachedModule.exports;
        }
        // Create a new module (and put it into the cache)
        var module = __webpack_module_cache__[moduleId] = {
                // no module.id needed
                // no module.loaded needed
                exports: {}
        };

        // Execute the module function
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

        // Return the exports of the module
        return module.exports;
    }
    
    // startup
    // Load entry module and return exports
    // This entry module can't be inlined because the eval devtool is used.
    var __webpack_exports__ = __webpack_require__("./src/index.js");
})
```

和`webpack4`相比，`webpack5`打包出来的bundle做了相当的精简。在上面的打包`demo`中，整个立即执行函数里边只有三个变量和一个函数方法，`__webpack_modules__`存放了编译后的各个文件模块的JS内容，`__webpack_module_cache__ `用来做模块缓存，`__webpack_require__`是`Webpack`内部实现的一套依赖引入函数。最后一句则是代码运行的起点，从入口文件开始，启动整个项目。

其中值得一提的是`__webpack_require__`模块引入函数，我们在模块化开发的时候，通常会使用`ES Module`或者`CommonJS`规范导出/引入依赖模块，`webpack`打包编译的时候，会统一替换成自己的`__webpack_require__`来实现模块的引入和导出，从而实现模块缓存机制，以及抹平不同模块规范之间的一些差异性。

### 4.Loader和Plugin的区别？

`Loader` 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。 因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。

`Plugin` 就是插件，基于事件流框架 `Tapable`，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

`Loader` 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。

`Plugin` 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

### 5.Webpack构建流程简单说一下

- `初始化参数`：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
- `开始编译`：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
- `确定入口`：根据配置中的 entry 找出所有的入口文件
- `编译模块`：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
- `完成模块编译`：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- `输出资源`：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
- `输出完成`：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，`Webpack` 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

简单说

- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
- 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

### 6.常见的loader

- `file-loader`：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)

- `url-loader`：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于阈值时返回文件 base64 形式编码 (处理图片和字体)

- `image-loader`：加载并且压缩图片文件
- `json-loader` 加载 JSON 文件（默认包含）

- `babel-loader`：把 ES6 转换成 ES5

- `sass-loader`：将SCSS/SASS代码转换成CSS
- `css-loader`：加载 CSS，支持模块化、压缩、文件导入等特性
- `style-loader`：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS

- `vue-loader`：加载 Vue.js 单文件组件

### 7.有哪些常见的Plugin？

- `html-webpack-plugin`：简化 HTML 文件创建 (依赖于 html-loader)

- `mini-css-extract-plugin`: 分离样式文件，CSS 提取为独立文件，支持按需加载 (替代extract-text-webpack-plugin)

- `OptimizeCssAssetsWebpackPlugin`:压缩css代码

- `HotModuleReplacementPlugin` 热更新

### 8.source map是什么？生产环境怎么用？

`source map` 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map。

map文件只要不打开开发者工具，浏览器是不会加载的。

线上环境一般有三种处理方案：

- `hidden-source-map`：借助第三方错误监控平台 Sentry 使用
- `nosources-source-map`：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高
- `sourcemap`：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)

注意：避免在生产中使用 `inline-` 和 `eval-`，因为它们会增加 bundle 体积大小，并降低整体性能。

### 9.说一下 Webpack 的热更新原理吧

(敲黑板，这道题必考)

`Webpack` 的热更新又称热替换（`Hot Module Replacement`），缩写为 `HMR`。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS（`webpack dev server`） 与浏览器之间维护了一个 `Websocket`，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 `Ajax` 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 `jsonp` 请求获取该chunk的增量更新。

后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 `HotModulePlugin` 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像`react-hot-loader` 和 `vue-loader` 都是借助这些 API 实现 HMR。

### 10.loader

loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中。`Loader` 在 `module.rules` 中配置，作为模块的解析规则，类型为数组。每一项都是一个 `Object`，内部包含了 test(类型文件)、loader、options (参数)等属性。Webpack在转换该文件类型的时候，会按顺序链式调用每一个`loader`，每个loader遵循单一原则，并且各个loader完全独立。

### 11.Plugin

`Plugin`主要负责扩展功能，在webpack运行的生命周期中会广播出许多事件，plugin可以监听这些事件，在合适的时机通过webpack提供的API改变输出结果。

### 12.webpack优化

- 使用HappyPack开启多进程Loader
- webpack-parallel-uglify-plugin进行代码压缩
  - mini-css-extract-plugin压缩css
  -  image-webpack-loader压缩图片
- 缩小文件搜索范围
  - alias：通过alias创建文件别名
  - include、exclude：`include`来指定只解析该路径下的对应文件，`exclude`来指定不解析该路径下的对应文件。
  - noParse：`noParse`配置不需要解析的文件。通常我们会忽略一些大型插件从而来提高构建性能。
  - extensions ：webpack会根据`extensions`定义的后缀查找文件(频率较高的文件类型优先写在前面)

- cache-loader 配置缓存
- `tree-shaking`：用来清除代码中无用的部分。

## 设计模式

### 1.简单工厂模式

1.定义：又叫静态工厂方法，就是创建对象，并赋予属性和方法
2.应用：抽取类相同的属性和方法封装到对象上

### 2.单例模式

1.定义:只允许被实例化依次的类 2.应用:提供一个命名空间

### 3.装饰器模式

1.定义:不改变原对象的基础上,给对象添加属性或方法

### 4.适配器模式

1.定义:将一个接口转换成客户端需要的接口而不需要去修改客户端代码，使得不兼容的代码可以一起工作 2.应用:适配函数参数
