## call,apply,bind的基本介绍

#### 语法：

```
fun.call(thisArg, param1, param2, ...)
fun.apply(thisArg, [param1,param2,...])
fun.bind(thisArg, param1, param2, ...)
```

#### 返回值：

call/apply：`fun`执行的结果 bind：返回`fun`的拷贝，并拥有指定的`this`值和初始参数

#### 参数

`thisArg`(可选):

1. **`fun`的`this`指向`thisArg`对象**
2. 非严格模式下：thisArg指定为null，undefined，fun中的this指向window对象.
3. 严格模式下：`fun`的`this`为`undefined`
4. 值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象，如 String、Number、Boolean

`param1,param2`(可选): 传给`fun`的参数。

1. 如果param不传或为 null/undefined，则表示不需要传入任何参数.
2. apply第二个参数为数组，数组内的值为传给`fun`的参数。

### 调用`call`/`apply`/`bind`的必须是个函数

call、apply和bind是挂在Function对象上的三个方法,只有函数才有这些方法。

只要是函数就可以，比如: `Object.prototype.toString`就是个函数，我们经常看到这样的用法：`Object.prototype.toString.call(data)`

### 作用：

改变函数执行时的this指向，目前所有关于它们的运用，都是基于这一点来进行的。

### 如何不弄混call和apply

> 弄混这两个API的不在少数，不要小看这个问题，记住下面的这个方法就好了。

`apply`是以`a`开头，它传给`fun`的参数是`Array`，也是以`a`开头的。

### 区别：

#### call与apply的唯一区别

传给`fun`的参数写法不同：

- `apply`是第2个参数，这个参数是一个数组：传给`fun`参数都写在数组中。
- `call`从第2~n的参数都是传给`fun`的。

#### call/apply与bind的区别

**执行**：

- call/apply改变了函数的this上下文后马上**执行该函数**
- bind则是返回改变了上下文后的函数,**不执行该函数**

**返回值**:

- call/apply 返回`fun`的执行结果
- bind返回fun的拷贝，并指定了fun的this指向，保存了fun的参数。

## call和apply的应用场景：

1. 判断数据类型：

`Object.prototype.toString`用来判断类型再合适不过，借用它我们几乎可以判断所有类型的数据：

```
function isType(data, type) {
    const typeObj = {
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Boolean]': 'boolean',
        '[object Null]': 'null',
        '[object Undefined]': 'undefined',
        '[object Object]': 'object',
        '[object Array]': 'array',
        '[object Function]': 'function',
        '[object Date]': 'date', // Object.prototype.toString.call(new Date())
        '[object RegExp]': 'regExp',
        '[object Map]': 'map',
        '[object Set]': 'set',
        '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
        '[object WeakMap]': 'weakMap',
        '[object Window]': 'window',  // Object.prototype.toString.call(window)
        '[object Error]': 'error', // new Error('1')
        '[object Arguments]': 'arguments',
    }
    let name = Object.prototype.toString.call(data) // 借用Object.prototype.toString()获取数据类型
    let typeName = typeObj[name] || '未知类型' // 匹配数据类型
    return typeName === type // 判断该数据类型是否为传入的类型
}
console.log(
    isType({}, 'object'), // true
    isType([], 'array'), // true
    isType(new Date(), 'object'), // false
    isType(new Date(), 'date'), // true
)
```

2.类数组借用数组的方法：

类数组因为不是真正的数组所有没有数组类型上自带的种种方法，所以我们需要去借用数组的方法。

比如借用数组的push方法：

```
var arrayLike = {
  0: 'OB',
  1: 'Koro1',
  length: 2
}
Array.prototype.push.call(arrayLike, '添加元素1', '添加元素2');
console.log(arrayLike) // {"0":"OB","1":"Koro1","2":"添加元素1","3":"添加元素2","length":4}
```

3.apply获取数组最大值最小值：

apply直接传递数组做要调用方法的参数，也省一步展开数组，比如使用`Math.max`、`Math.min`来获取数组的最大值/最小值:

```
const arr = [15, 6, 12, 13, 16];
const max = Math.max.apply(Math, arr); // 16
const min = Math.min.apply(Math, arr); // 6
```

4.继承

ES5的继承也都是通过借用父类的构造方法来实现父类方法/属性的继承：

```
// 父类
function supFather(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']; // 复杂类型
}
supFather.prototype.sayName = function (age) {
    console.log(this.name, 'age');
};
// 子类
function sub(name, age) {
    // 借用父类的方法：修改它的this指向,赋值父类的构造函数里面方法、属性到子类上
    supFather.call(this, name);
    this.age = age;
}
// 重写子类的prototype，修正constructor指向
function inheritPrototype(sonFn, fatherFn) {
    sonFn.prototype = Object.create(fatherFn.prototype); // 继承父类的属性以及方法
    sonFn.prototype.constructor = sonFn; // 修正constructor指向到继承的那个函数上
}
inheritPrototype(sub, supFather);
sub.prototype.sayAge = function () {
    console.log(this.age, 'foo');
};
// 实例化子类，可以在实例上找到属性、方法
const instance1 = new sub("OBKoro1", 24);
const instance2 = new sub("小明", 18);
instance1.colors.push('black')
console.log(instance1) // {"name":"OBKoro1","colors":["red","blue","green","black"],"age":24}
console.log(instance2) // {"name":"小明","colors":["red","blue","green"],"age":18} 
```



## bind的应用场景：

#### 1. 保存函数参数：

首先来看下一道经典的面试题：

```
for (var i = 1; i <= 5; i++) {
   setTimeout(function test() {
        console.log(i) // 依次输出：6 6 6 6 6
    }, i * 1000);
}
```

造成这个现象的原因是等到`setTimeout`异步执行时,`i`已经变成6了。

关于js事件循环机制不理解的同学，可以看我这篇博客：[Js 的事件循环(Event Loop)机制以及实例讲解](https://juejin.im/post/6844903621872582669)

那么如何使他输出: 1,2,3,4,5呢？

方法有很多：

- 闭包, 保存变量

```
for (var i = 1; i <= 5; i++) {
    (function (i) {
        setTimeout(function () {
            console.log('闭包:', i); // 依次输出：1 2 3 4 5
        }, i * 1000);
    }(i));
}
```

在这里创建了一个闭包，每次循环都会把`i`的最新值传进去，然后被闭包保存起来。

- **bind**

```
for (var i = 1; i <= 5; i++) {
    // 缓存参数
    setTimeout(function (i) {
        console.log('bind', i) // 依次输出：1 2 3 4 5
    }.bind(null, i), i * 1000);
}
```

**实际上这里也用了闭包，我们知道bind会返回一个函数，这个函数也是闭包**。

它保存了函数的this指向、初始参数，每次`i`的变更都会被bind的闭包存起来，所以输出1-5。

具体细节，下面有个手写bind方法，研究一下，就能搞懂了。

- `let`

用`let`声明`i`也可以输出1-5: 因为`let`是块级作用域,所以每次都会创建一个新的变量,所以`setTimeout`每次读的值都是不同的,[详解](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fq%2F1010000007541743)。

#### 2. 回调函数this丢失问题：

这是一个常见的问题，下面是我在开发VSCode插件处理`webview`通信时，遇到的真实问题，一开始以为VSCode的API哪里出问题，调试了一番才发现是`this`指向丢失的问题。

```
class Page {
    constructor(callBack) {
        this.className = 'Page'
        this.MessageCallBack = callBack // 
        this.MessageCallBack('发给注册页面的信息') // 执行PageA的回调函数
    }
}
class PageA {
    constructor() {
        this.className = 'PageA'
        this.pageClass = new Page(this.handleMessage) // 注册页面 传递回调函数 问题在这里
    }
    // 与页面通信回调
    handleMessage(msg) {
        console.log('处理通信', this.className, msg) //  'Page' this指向错误
    }
}
new PageA()
```

#### 回调函数`this`为何会丢失？

显然声明的时候不会出现问题，执行回调函数的时候也不可能出现问题。

问题出在传递回调函数的时候：

```
this.pageClass = new Page(this.handleMessage)
```

因为传递过去的`this.handleMessage`是一个函数内存地址，没有上下文对象，也就是说该函数没有绑定它的`this`指向。

那它的`this`指向于它所应用的[绑定规则](https://juejin.im/post/6844903630592540686#comment)：

```
class Page {
    constructor(callBack) {
        this.className = 'Page'
        // callBack() // 直接执行的话 由于class 内部是严格模式，所以this 实际指向的是 undefined
        this.MessageCallBack = callBack // 回调函数的this 隐式绑定到class page
        this.MessageCallBack('发给注册页面的信息')
    }
}
```

既然知道问题了，那我们只要绑定回调函数的`this`指向为`PageA`就解决问题了。

**回调函数this丢失的解决方案**：

1. `bind`绑定回调函数的`this`指向：

这是典型bind的应用场景, 绑定this指向，用做回调函数。

```
this.pageClass = new Page(this.handleMessage.bind(this)) // 绑定回调函数的this指向
```

PS： 这也是为什么`react`的`render`函数在绑定回调函数的时候，也要使用bind绑定一下`this`的指向，也是因为同样的问题以及原理。

1. 箭头函数绑定this指向

箭头函数的this指向定义的时候外层第一个普通函数的this，在这里指的是class类：`PageA`

这块内容，可以看下我之前写的博客：[详解箭头函数和普通函数的区别以及箭头函数的注意事项、不适用场景](https://juejin.im/post/6844903801799835655#heading-3)

```
this.pageClass = new Page(() => this.handleMessage()) // 箭头函数绑定this指向
```



### 手写call/apply、bind

- call

```
//传递参数从一个数组变成逐个传参了,不用...扩展运算符的也可以用arguments代替
Function.prototype.myCall = function (context, ...args) {
    //这里默认不传就是给window,也可以用es6给参数设置默认参数
    context = context || window
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
    context[key] = this
    //通过隐式绑定的方式调用函数
    const result = context[key](...args)
    //删除添加的属性
    delete context[key]
    //返回函数调用的返回值
    return result
}
```

- apply

```
    Function.prototype.myApply = function(context) {
            // 如果没有传或传的值为空对象 context指向window
            if (typeof context === "undefined" || context === null) {
                context = window
            }
            let fn = mySymbol(context)
            context[fn] = this //给context添加一个方法 指向this
                // 处理参数 去除第一个参数this 其它传入fn函数
            let arg = [...arguments].slice(1) //[...xxx]把类数组变成数组，arguments为啥不是数组自行搜索 slice返回一个新数组
            context[fn](arg) //执行fn
            delete context[fn] //删除方法

        }

```

- bind

**思路**

1. 拷贝源函数:
   - 通过变量储存源函数
   - 使用`Object.create`复制源函数的prototype给fToBind
2. 返回拷贝的函数
3. 调用拷贝的函数：
   - new调用判断：通过`instanceof`判断函数是否通过`new`调用，来决定绑定的`context`
   - 绑定this+传递参数
   - 返回源函数的执行结果

```js
Function.prototype.myBind = function (objThis, ...params) {
    const thisFn = this; // 存储源函数以及上方的params(函数参数)
    // 对返回的函数 secondParams 二次传参
    let fToBind = function (...secondParams) {
        const isNew = this instanceof fToBind // this是否是fToBind的实例 也就是返回的fToBind是否通过new调用
        const context = isNew ? this : Object(objThis) // new调用就绑定到this上,否则就绑定到传入的objThis上
        return thisFn.call(context, ...params, ...secondParams); // 用call调用源函数绑定this的指向并传递参数,返回执行结果
    };
    if (thisFn.prototype) {
        // 复制源函数的prototype给fToBind 一些情况下函数没有prototype，比如箭头函数
        fToBind.prototype = Object.create(thisFn.prototype);
    }
    return fToBind; // 返回拷贝的函数
};
```

