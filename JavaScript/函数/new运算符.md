## new运算符

要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下 4
个步骤：
(1) 创建一个新对象；
(2) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象） ；
(3) 执行构造函数中的代码（为这个新对象添加属性） ；
(4) 返回新对象。

```js
// 定义人类
function Person(name) {
  this.name = name;
}

// 创造一只人
let person = new Person('jack');
```

这样代码的结果是什么，我们在Javascript引擎中看到的对象模型是：

![img](http://coolshell.cn/wp-content/uploads/2012/02/joo_3.png)

```js
var obj = new Base();
```

new操作符具体干了什么呢?其实很简单，就干了三件事情。

```js
var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj);
```

第一行，我们创建了一个空对象obj
第二行，我们将这个空对象的`__proto__`成员指向了Base函数对象`prototype`成员对象
第三行，我们将Base函数对象的this指针替换成obj，然后再调用Base函数，于是我们就给obj对象赋值了一个id成员变量，这个成员变量的值是”base”。

我们可以这么理解: 以 new 操作符调用构造函数的时候，函数内部实际上发生以下变化：

1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。

2、属性和方法被加入到 this 引用的对象中。

3、新创建的对象由 this 所引用，并且最后隐式的返回 this.

如果我们给Person.prototype的对象添加一些函数会有什么效果呢？

例如代码如下

```js
function Person(name){
    this.name = name
}

Person.prototype = {
  eat:function(){
    console.log('吃饭')
  },
  sleep:function(){
    console.log('睡觉')
  }
};

let p = new Person('Aiolimp',23);

// 访问原型对象
console.log(Person.prototype);
console.log(p.__proto__); // __proto__仅用于测试，不能写在正式代码中

/* Console
  * {eat: ƒ, sleep: ƒ}
  * {eat: ƒ, sleep: ƒ}
*/
```

那么当我们使用new创建一个新对象的时候，根据`__proto__`的特性，eat、sleep方法也可以做新对象的方法被访问到。于是我们看到了：
**构造子中，我们来设置‘类’的成员变量（例如：例子中的eat、sleep），构造子对象prototype中我们来设置‘类’的公共方法。于是通过函数对象和Javascript特有的`__proto__`与`prototype`成员及`new`操作符，模拟出类和类实例化的效果。**

给出总结的公式：

> **实例的 `__proto__` 属性（原型）等于其构造函数的 `prototype` 属性。**