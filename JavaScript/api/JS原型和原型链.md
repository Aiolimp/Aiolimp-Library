## JS原型和原型链

- [JS原型和原型链](#js原型和原型链)
  - [1.原型和原型链](#1原型和原型链)
    - [何为prototype？](#何为prototype)
    - [四个规则：](#四个规则)
    - [原型链：](#原型链)
    - [instanceof:](#instanceof)
- [参考资料：](#参考资料)

### 1.原型和原型链

#### 何为prototype？

先看一个例子：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.eat = function() {
    console.log(age + "岁的" + name + "在吃饭。");
  }
}

let p1 = new Person("Aiolimp", 24);
let p2 = new Person("Aiolimp", 24);

console.log(p1.eat === p2.eat); // false

```

此时，对于同一个函数，我们通过 `new` 生成出来的实例，都会开出新的一块堆区，所以上面代码中 person 1 和 person 2 的吃饭是不同的。

例子2：

```js
function Person(name) {
  this.name = name;
}

// 通过构造函数的 Person 的 prototype 属性找到 Person 的原型对象
Person.prototype.eat = function() {
  console.log("吃饭");
}

let p1 = new Person("Aiolimp", 24);
let p2 = new Person("Aiolimp", 24);

console.log(p1.eat === p2.eat); // true
```

当我们通过构造函数的 Person 的 prototype 属性找到 Person 的原型对象，此时P1和P2相等。

#### 四个规则：

我们先来了解下面引用类型的四个规则：

1、引用类型，都具有对象特性，即可自由扩展属性。

2、引用类型，都有一个隐式原型 `__proto__` 属性，属性值是一个普通的对象。

3、引用类型，隐式原型 `__proto__` 的属性值指向它的构造函数的显式原型 `prototype` 属性值。

4、当你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 `__proto__`（也就是它的构造函数的显式原型 `prototype`）中寻找。

> 引用类型：Object、Array、Function、Date、RegExp。这里我姑且称 **proto** 为隐式原型，没有官方中文叫法，大家都瞎叫居多。

下面我们逐一验证上面几个规则，就会慢慢地理解原型和原型链。

- #### 规则一

```js
const obj = {}
const arr = []
const fn = function () {}

obj.a = 1
arr.a = 1
fn.a = 1

console.log(obj.a) // 1
console.log(arr.a) // 1
console.log(fn.a) // 1
```

> 引用类型，都具有对象特性，即可自由扩展属性：

- #### 规则二

```js
const obj = {};
const arr = [];
const fn = function() {}

console.log('obj.__proto__', obj.__proto__);
console.log('arr.__proto__', arr.__proto__);
console.log('fn.__proto__', fn.__proto__);
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8640c1029037485ca324b2cf61bdf928~tplv-k3u1fbpfcp-zoom-1.image)

> 引用类型，都有一个隐式原型 `__proto__` 属性，属性值是一个普通的对象：

- #### 规则三

```js
const obj = {};
const arr = [];
const fn = function() {}

obj.__proto__ == Object.prototype // true
arr.__proto__ === Array.prototype // true
fn.__proto__ == Function.prototype // true
```

> 引用类型，隐式原型 `__proto__` 的属性值指向它的构造函数的显式原型 `prototype` 属性值：

- #### 规则四

当你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 `__proto__`（也就是它的构造函数的显式原型 `prototype`）中寻找：

```js
const obj = { a:1 }
obj.toString
// ƒ toString() { [native code] }
```

> 首先， `obj` 对象并没有 `toString` 属性，之所以能获取到 `toString` 属性，是遵循了第四条规则，从它的构造函数 `Object` 的 `prototype` 里去获取。

#### 原型链：

```js
function Person(name) {
  this.name = name
  return this // 其实这行可以不写，默认返回 this 对象
}

var nick = new Person("nick")
nick.toString
// ƒ toString() { [native code] }
```

按理说， `nick` 是 `Person` 构造函数生成的实例，而 `Person` 的 `prototype` 并没有 `toString` 方法，那么为什么， `nick` 能获取到 `toString` 方法？

这里就引出 `原型链` 的概念了， `nick` 实例先从自身出发检讨自己，发现并没有 `toString` 方法。找不到，就往上走，找 `Person` 构造函数的 `prototype` 属性，还是没找到。构造函数的 `prototype` 也是一个对象嘛，那对象的构造函数是 `Object` ，所以就找到了 `Object.prototype` 下的 `toString` 方法。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc4cc571148745f4b25545d3a7ccf73d~tplv-k3u1fbpfcp-zoom-1.image)

> 上述寻找的过程就形成了原型链的概念，原型链大概就是这样一个过程。JavaScript 里万物皆对象。从上述情况看来，好像是这么个理。

**图片理解**：

![img](https://user-gold-cdn.xitu.io/2019/2/24/1691fc9305a0c6b0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- JS 说，我好寂寞。因为 JS 的本源是空的，即：null。

- JS 说，要有神。所以它通过万能术 `__proto__` 产生了 No1 这号神，即：`No1.__proto__ == null`。

- JS 说，神你要有自己的想法啊。所以神自己想了个方法，根据自己的原型 `prototype` 创建了对象 `Object`，即：`Object.prototype == No1; No1.__proto__ == null`。于是我们把 `prototype` 叫做原型，就好比 `Object` 的原型是神，男人的原型是人类一样，同时 `__proto__` 叫做原型链，毕竟有了 `__proto__`，对象、神、JS 之间才有联系。这时候 `Object.prototype.__proto__ == null`。

- JS 说，神你要有更多的想法啊，我把万能术 `__proto__` 借你用了。所以神根据 `Object`，使用 `__proto__` 做了个机器 No2，即 `No2.__proto__ == No1`，并规定所有的东西，通过 `__proto__` 可以连接机器，再找到自己，包括 `Object` 也是，于是 **Object 成为所有对象的原型**，`Object.__proto__.__proto__ == No1`，然后 `String`、`Number`、`Boolean`、 `Array` 这些物种也是如此。

- JS 说，神你的机器好厉害喔！你的机器能不能做出更多的机器啊？神咧嘴一笑：你通过万能术创造了我，我通过自己原型创造了对象。如此，那我造个机器 Function，`Function.prototype == No2, Function.__proto__ == No2`，即 `Function.prototype == Function.__proto__` 吧！这样 No2 就成了造机器的机器，它负责管理 Object、Function、String、Number、Boolean、Array 这几个。

**最后**，能清楚地了解下面几条公式了：

```js
Object.__proto__ === Function.prototype;
Function.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
```

#### instanceof:

`instanceof` 运算符用于测试构造函数的 `prototype` 属性是否出现在对象原型链中的任何位置。 `instanceof` 的简易手写版，如下所示：

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

我们再来看下面这段代码：

```js
function Foo(name) {
  this.name = name;
}
var f = new Foo('nick')

f instanceof Foo // true
f instanceof Object // true
```

上述代码判断流程大致如下：

1、 `f instanceof Foo`： `f` 的隐式原型 `__proto__` 和 `Foo.prototype` ，是相等的，所以返回 `true` 。

2、 `f instanceof Object`： `f` 的隐式原型 `__proto__` ，和 `Object.prototype` 不等，所以继续往上走。 `f` 的隐式原型 `__proto__` 指向 `Foo.prototype` ，所以继续用 `Foo.prototype.__proto__` 去对比 `Object.prototype` ，这会儿就相等了，因为 `Foo.prototype` 就是一个普通的对象。

> 万物皆对象！！！

## 参考资料：

- [《JavaScript中的call、apply、bind深入理解》](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F00dc4ad9b83f)

- [《面不面试的，你都得懂原型和原型链》](https://juejin.cn/post/6934498361475072014#heading-4)
- [《JS 原型与原型链》](https://juejin.cn/post/6844903782229213197#heading-7)

