## 生成器(Generator)

### 生成器执行流程

生成器是一个带`星号`的"函数"(注意：它并不是真正的函数)，可以通过`yield`关键字`暂停执行`和`恢复执行`的。

```js
function* gen() {
  console.log("enter");
  let a = yield 1;
  let b = yield (function () {return 2})();
  return 3;
}
var g = gen() // 阻塞住，不会执行任何语句
console.log(typeof g)  // object  看到了吗？不是"function"

console.log(g.next())  
console.log(g.next())  
console.log(g.next())  
console.log(g.next()) 


// enter
// { value: 1, done: false }

// { value: 2, done: false }
// { value: 3, done: true }
// { value: undefined, done: true }
```

由此可以看到，生成器的执行有这样几个关键点:

1. 调用 gen() 后，程序会阻塞住，不会执行任何语句。
2. 调用 g.next() 后，程序继续执行，直到遇到 yield 程序暂停。
3. next 方法返回一个对象， 有两个属性: `value` 和 `done`。value 为`当前 yield 后面的结果`，done 表示`是否执行完`，遇到了`return` 后，`done` 会由`false`变为`true`。

### yield*

当一个生成器要调用另一个生成器时，使用 yield* 就变得十分方便。比如下面的例子:

```js
function* gen1() {
    yield 1;
    yield 4;
}
function* gen2() {
    yield 2;
    yield 3;
}

```

我们想要按照`1234`的顺序执行，如何来做呢？

在 `gen1` 中，修改如下:

```js
function* gen1() {
    yield 1;
    yield* gen2();
    yield 4;
}
```

这样修改之后，之后依次调用`next`即可。

### 生成器实现机制——协程

可能你会比较好奇，生成器究竟是如何让函数暂停, 又会如何恢复的呢？接下来我们就来对其中的执行机制——`协程`一探究竟。

#### 什么是协程？

协程是一种比线程更加轻量级的存在，协程处在线程的环境中，`一个线程可以存在多个协程`，可以将协程理解为线程中的一个个任务。不像进程和线程，协程并不受操作系统的管理，而是被具体的应用程序代码所控制。

#### 协程的运作过程

那你可能要问了，JS 不是单线程执行的吗，开这么多协程难道可以一起执行吗？

答案是：并不能。一个线程一次只能执行一个协程。比如当前执行 A 协程，另外还有一个 B 协程，如果想要执行 B 的任务，就必须在 A 协程中将` JS 线程的控制权转交给 B协程`，那么现在 B 执行，A 就相当于处于暂停的状态。

举个具体的例子:

```js
function* A() {
  console.log("我是A");
  yield B(); // A停住，在这里转交线程执行权给B
  console.log("结束了");
}
function B() {
  console.log("我是B");
  return 100;// 返回，并且将线程执行权还给A
}
let gen = A();
gen.next();
gen.next();

// 我是A
// 我是B
// 结束了
```

在这个过程中，A 将执行权交给 B，也就是 `A 启动 B`，我们也称 A 是 B 的**父协程**。因此 B 当中最后`return 100`其实是将 100 传给了父协程。

需要强调的是，对于协程来说，它并不受操作系统的控制，完全由用户自定义切换，因此并没有进程/线程`上下文切换`的开销，这是`高性能`的重要原因。

### Generator 的异步代码

#### thunk 函数

要想知道 `Generator` 跟异步的关系，首先带大家搞清楚一个概念——thunk函数(即`偏函数`)，虽然这只是实现两者关系的方式之一。(另一种方式是`Promise`, 后面会讲到)

举个例子，比如我们现在要判断数据类型。可以写如下的判断逻辑:

```js
let isString = (obj) => {
  return Object.prototype.toString.call(obj) === '[object String]';
};
let isFunction = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Function]';
};
let isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
let isSet = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Set]';
};
// ...
```

可以看到，出现了非常多重复的逻辑。我们将它们做一下封装:

```js
let isType = (type) => {
  return (obj) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }
}
```

现在我们这样做即可:

```js
let isString = isType('String');
let isFunction = isType('Function');
//...
```

相应的 `isString`和`isFunction`是由`isType`生产出来的函数，但它们依然可以判断出参数是否为String（Function），而且代码简洁了不少。

```js
isString("123");
isFunction(val => val);
```

**isType**这样的函数我们称为**thunk 函数**。它的核心逻辑是接收一定的参数，生产出定制化的函数，然后使用定制化的函数去完成功能。thunk函数的实现会比单个的判断函数复杂一点点，但就是这一点点的复杂，大大方便了后续的操作。

### Generator 和 异步

#### thunk 版本

以`文件操作`为例，我们来看看 **异步操作** 如何应用于`Generator`。

```js
const readFileThunk = (filename) => {
  return (callback) => {
    fs.readFile(filename, callback);
  }
}
```

`readFileThunk`就是一个`thunk函数`。异步操作核心的一环就是绑定回调函数，而`thunk函数`可以帮我们做到。首先传入文件名，然后生成一个针对某个文件的定制化函数。这个函数中传入回调，这个回调就会成为异步操作的回调。这样就让 `Generator` 和`异步`关联起来了。

紧接者我们做如下的操作:

```js
const gen = function* () {
  const data1 = yield readFileThunk('001.txt')
  console.log(data1.toString())
  const data2 = yield readFileThunk('002.txt')
  console.log(data2.toString)
}
```

接着我们让它执行完:

```js
let g = gen();
// 第一步: 由于进场是暂停的，我们调用next，让它开始执行。
// next返回值中有一个value值，这个value是yield后面的结果，放在这里也就是是thunk函数生成的定制化函数，里面需要传一个回调函数作为参数
g.next().value((err, data1) => {
  // 第二步: 拿到上一次得到的结果，调用next, 将结果作为参数传入，程序继续执行。
  // 同理，value传入回调
  g.next(data1).value((err, data2) => {
    g.next(data2);
  })
})
```

打印结果如下:

```
001.txt的内容
002.txt的内容
```

上面嵌套的情况还算简单，如果任务多起来，就会产生很多层的嵌套，可操作性不强，有必要把执行的代码封装一下:

```js
function run(gen){
  const next = (err, data) => {
    let res = gen.next(data);
    if(res.done) return;
    res.value(next);
  }
  next();
}
run(g);
```

Ok,再次执行，依然打印正确的结果。代码虽然就这么几行，但包含了递归的过程，好好体会一下。

这是通过`thunk`完成异步操作的情况。

#### Promise 版本

还是拿上面的例子，用`Promise`来实现就轻松一些:

```js
const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(err) {
        reject(err);
      }else {
        resolve(data);
      }
    })
  }).then(res => res);
}
const gen = function* () {
  const data1 = yield readFilePromise('001.txt')
  console.log(data1.toString())
  const data2 = yield readFilePromise('002.txt')
  console.log(data2.toString)
}
```

执行的代码如下:

```js
let g = gen();
function getGenPromise(gen, data) { 
  return gen.next(data).value;
}
getGenPromise(g).then(data1 => {
  return getGenPromise(g, data1);
}).then(data2 => {
  return getGenPromise(g, data2)
})
```

打印结果如下:

```
001.txt的内容
002.txt的内容
```

同样，我们可以对执行`Generator`的代码加以封装:

```js
function run(g) {
  const next = (data) => {
    let res = g.next();
    if(res.done) return;
    res.value.then(data => {
      next(data);
    })
  }
  next();
}
```

同样能输出正确的结果。代码非常精炼，希望能参照刚刚链式调用的例子，仔细体会一下递归调用的过程。

#### 采用 co 库

以上我们针对 `thunk 函数`和`Promise`两种`Generator异步操作`的一次性执行完毕做了封装，但实际场景中已经存在成熟的工具包了，如果大名鼎鼎的**co**库, 其实核心原理就是我们已经手写过了（就是刚刚封装的Promise情况下的执行代码），只不过源码会各种边界情况做了处理。使用起来非常简单:

```js
const co = require('co');
let g = gen();
co(g).then(res =>{
  console.log(res);
})
```

打印结果如下:

```js
001.txt的内容
002.txt的内容
100
```