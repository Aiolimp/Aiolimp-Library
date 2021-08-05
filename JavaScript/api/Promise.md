## Promise

### 1.Promise的含义

Promise 是异步编程的一种解决方案，从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

#### 基本用法：

ES6 规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。

```js
const promise = new Promise((resolve, reject) => {
   resolve('success')
   reject('err')
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})

// 输出 resolve success
```

#### 特点：

> Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
>
> Promise 会有三种状态
>
> - pending（等待态）为初始态，并可以转化为fulfilled（成功态）和rejected（失败态）
> - Fulfilled 完成  成功时，不可转为其他状态，且必须有一个不可改变的值（value）
> - Rejected 失败 失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）
>
> 状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
>
> - new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。
>
> - new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。
>
> then 方法，里面有两个参数resolve、reject
>
> - 如果状态是成功，调用成功回调函数
> - 如果状态是失败，调用失败回调函数

#### 作用：解决地狱回调

**什么是回调地狱:**

回调当中嵌套回调，也称`回调地狱`。这种代码的可读性和可维护性都是非常差的，因为嵌套的层级太多。而且还有一个严重的问题，就是每次任务可能会失败，需要在回调里面对每个任务的失败情况进行处理，增加了代码的混乱程度。

```js
fs.readFile('1.json', (err, data) => {
    fs.readFile('2.json', (err, data) => {
        fs.readFile('3.json', (err, data) => {
            fs.readFile('4.json', (err, data) => {

            });
        });
    });
});
```

- 多层嵌套的问题。
- 每种任务的处理结果存在两种可能性（成功或失败），那么需要在每种任务执行结束后分别处理这两种可能性。

**Promise如何解决地狱回调**

- 回调函数延迟绑定。
- 返回值穿透。
- 错误冒泡。

```js
let readFilePromise = (filename) => {
  fs.readFile(filename, (err, data) => {
    if(err) {
      reject(err);
    }else {
      resolve(data);
    }
  })
}
readFilePromise('1.json').then(data => {
  return readFilePromise('2.json')
});
```

回调函数不是直接声明的，而是在通过后面的 then 方法传入的，即延迟传入。这就是`回调函数延迟绑定`。

```js
let x = readFilePromise('1.json').then(data => {
  return readFilePromise('2.json')//这是返回的Promise
});
x.then(/* 内部逻辑省略 */)
```

根据 then 中回调函数的传入值创建不同类型的Promise, 然后把返回的 Promise 穿透到外层, 以供后续的调用。这里的 x 指的就是内部返回的 Promise，然后在 x 后面可以依次完成链式调用。

这便是`返回值穿透`的效果。

这两种技术一起作用便可以将深层的嵌套回调写成下面的形式:

```js
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
});
```

Promise 采用了`错误冒泡`的方式。

```js
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
}).catch(err => {
  // xxx
})
```

这样前面产生的错误会一直向后传递，被 catch 接收到，就不用频繁地检查错误了。

**解决效果**

- 实现链式调用，解决多层嵌套问题
- 实现错误冒泡后一站式处理，解决每次任务中判断错误、增加代码混乱度的问题

### 2.Promise链式调用

**我门常常用到`new Promise().then().then()`,这就是链式调用，用来解决回调地狱**

1、为了达成链式，默认在第一个then里返回一个promise。规定了一种方法，就是在then里面返回一个新的promise,称为promise2：`promise2 = new Promise((resolve, reject)=>{})`

- 将这个promise2返回的值传递到下一个then中
- 如果返回一个普通的值，则将普通的值传递给下一个then中

2、当第一个then中`return`了一个参数（参数未知，需判断）。这个return出来的新的promise就是onFulfilled()或onRejected()的值

则规定onFulfilled()或onRejected()的值，即第一个then返回的值，叫做x，判断x的函数叫做resolvePromise

- 首先，要看x是不是promise。
- 如果是promise，则取它的结果，作为新的promise2成功的结果
- 如果是普通值，直接作为promise2成功的结果
- 所以要比较x和promise2
- resolvePromise的参数有promise2（默认返回的promise）、x（我们自己`return`的对象）、resolve、reject
- resolve和reject是promise2的

#### 简易版实现

```js
//定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(executor) {
  let self = this; // 缓存当前promise实例
  self.value = null;
  self.error = null; 
  self.status = PENDING;
  self.onFulfilled = null; //成功的回调函数
  self.onRejected = null; //失败的回调函数

  const resolve = (value) => {
    if(self.status !== PENDING) return;
    setTimeout(() => {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled(self.value);//resolve时执行成功回调
    });
  };

  const reject = (error) => {
    if(self.status !== PENDING) return;
    setTimeout(() => {
      self.status = REJECTED;
      self.error = error;
      self.onRejected(self.error);//resolve时执行成功回调
    });
  };
  executor(resolve, reject);
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  if (this.status === PENDING) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  } else if (this.status === FULFILLED) {
    //如果状态是fulfilled，直接执行成功回调，并将成功值传入
    onFulfilled(this.value)
  } else {
    //如果状态是rejected，直接执行失败回调，并将失败原因传入
    onRejected(this.error)
  }
  return this;
}
```

可以看到，Promise 的本质是一个`有限状态机`，存在三种状态:

- PENDING(等待)
- FULFILLED(成功)
- REJECTED(失败)

状态改变规则如下图:

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/23/16e96b8e92d3868d~tplv-t2oaga2asx-no-mark:1280:960:0:0.awebp)

对于 Promise 而言，状态的改变`不可逆`，即由等待态变为其他的状态后，就无法再改变了。

不过，回到目前这一版的 Promise, 还是存在一些问题的。

#### 设置回调数组

首先只能执行一个回调函数，对于多个回调的绑定就无能为力，比如下面这样:

```js
let promise1 = new MyPromise((resolve, reject) => {
  fs.readFile('./001.txt', (err, data) => {
    if(!err){
      resolve(data);
    }else {
      reject(err);
    }
  })
});

let x1 = promise1.then(data => {
  console.log("第一次展示", data.toString());    
});

let x2 = promise1.then(data => {
  console.log("第二次展示", data.toString());    
});

let x3 = promise1.then(data => {
  console.log("第三次展示", data.toString());    
});
```

这里我绑定了三个回调，想要在 resolve() 之后一起执行，那怎么办呢？

需要将 `onFulfilled ` 和 `onRejected` 改为数组，调用 resolve 时将其中的方法拿出来一一执行即可。

```js
self.onFulfilledCallbacks = [];
self.onRejectedCallbacks = [];
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  if (this.status === PENDING) {
    this.onFulfilledCallbacks.push(onFulfilled);
    this.onRejectedCallbacks.push(onRejected);
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value);
  } else {
    onRejected(this.error);
  }
  return this;
}
```

接下来将 resolve 和 reject 方法中执行回调的部分进行修改：

```js
// resolve 中
self.onFulfilledCallbacks.forEach((callback) => callback(self.value));
//reject 中
self.onRejectedCallbacks.forEach((callback) => callback(self.error));
```

#### 链式调用完成

我们采用目前的代码来进行测试:

```js
let fs = require('fs');
let readFilePromise = (filename) => {
  return new MyPromise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(!err){
        resolve(data);
      }else {
        reject(err);
      }
    })
  })
}
readFilePromise('./001.txt').then(data => {
  console.log(data.toString());    
  return readFilePromise('./002.txt');
}).then(data => {
  console.log(data.toString());
})
// 001.txt的内容
// 001.txt的内容
```

咦？怎么打印了两个 `001`，第二次不是读的 `002` 文件吗？

问题出在这里:

```js
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  //...
  return this;
}
```

这么写每次返回的都是第一个 Promise。then 函数当中返回的第二个 Promise 直接被无视了！

说明 then 当中的实现还需要改进, 我们现在需要对 then 中返回值重视起来。

```js
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let bridgePromise;
  let self = this;
  if (self.status === PENDING) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push((value) => {
        try {
          // 看到了吗？要拿到 then 中回调返回的结果。
          let x = onFulfilled(value);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push((error) => {
        try {
          let x = onRejected(error);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  //...
}
```

假若当前状态为 PENDING，将回调数组中添加如上的函数，当 Promise 状态变化后，会遍历相应回调数组并执行回调。

但是这段程度还是存在一些问题:

1. 首先 then 中的两个参数不传的情况并没有处理，
2. 假如 then 中的回调执行后返回的结果(也就是上面的`x`)是一个 Promise, 直接给 resolve 了，这是我们不希望看到的。

怎么来解决这两个问题呢？

先对参数不传的情况做判断:

```js
// 成功回调不传给它一个默认函数
onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
// 对于失败回调直接抛错
onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };
```

然后对`返回Promise`的情况进行处理:

```js
function resolvePromise(bridgePromise, x, resolve, reject) {
  //如果x是一个promise
  if (x instanceof MyPromise) {
    // 拆解这个 promise ，直到返回值不为 promise 为止
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(bridgePromise, y, resolve, reject);
      }, error => {
        reject(error);
      });
    } else {
      x.then(resolve, reject);
    }
  } else {
    // 非 Promise 的话直接 resolve 即可
    resolve(x);
  }
}
```

然后在 then 的方法实现中作如下修改:

```js
resolve(x)  ->  resolvePromise(bridgePromise, x, resolve, reject);
```

在这里大家好好体会一下拆解 Promise 的过程，其实不难理解，我要强调的是其中的递归调用始终传入的`resolve`和`reject`这两个参数是什么含义，其实他们控制的是最开始传入的`bridgePromise`的状态，这一点非常重要。

紧接着，我们实现一下当 Promise 状态不为 PENDING 时的逻辑。

成功状态下调用then：

```js
if (self.status === FULFILLED) {
  return bridgePromise = new MyPromise((resolve, reject) => {
    try {
      // 状态变为成功，会有相应的 self.value
      let x = onFulfilled(self.value);
      // 暂时可以理解为 resolve(x)，后面具体实现中有拆解的过程
      resolvePromise(bridgePromise, x, resolve, reject);
    } catch (e) {
      reject(e);
    }
  })
}
```

失败状态下调用then：

```js
if (self.status === REJECTED) {
  return bridgePromise = new MyPromise((resolve, reject) => {
    try {
      // 状态变为失败，会有相应的 self.error
      let x = onRejected(self.error);
      resolvePromise(bridgePromise, x, resolve, reject);
    } catch (e) {
      reject(e);
    }
  });
}
```

Promise A+中规定成功和失败的回调都是微任务，由于浏览器中 JS 触碰不到底层微任务的分配，可以直接拿 `setTimeout`(属于**宏任务**的范畴) 来模拟，用 `setTimeout`将需要执行的任务包裹 ，当然，上面的 resolve 实现也是同理, 大家注意一下即可，其实并不是真正的微任

```js
if (self.status === FULFILLED) {
  return bridgePromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      //...
    })
}
if (self.status === REJECTED) {
  return bridgePromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      //...
    })
}
```

好了，到这里, 我们基本实现了 then 方法，现在我们拿刚刚的测试代码做一下测试, 依次打印如下:

```js
001.txt的内容
002.txt的内容
```

可以看到，已经可以顺利地完成链式调用。

#### **错误捕获及冒泡机制分析**

现在来实现 catch 方法:

```js
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}
```

对，就是这么几行，catch 原本就是 then 方法的语法糖。

相比于实现来讲，更重要的是理解其中错误冒泡的机制，即中途一旦发生错误，可以在最后用 catch 捕获错误。

我们回顾一下 Promise 的运作流程也不难理解，贴上一行关键的代码:

```js
// then 的实现中
onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };
```

一旦其中有一个`PENDING状态`的 Promise 出现错误后状态必然会变为`失败`, 然后执行 `onRejected`函数，而这个 onRejected 执行又会抛错，把新的 Promise 状态变为`失败`，新的 Promise 状态变为失败后又会执行`onRejected`......就这样一直抛下去，直到用`catch` 捕获到这个错误，才停止往下抛。

这就是 Promise 的`错误冒泡机制`。

至此，Promise 三大法宝: `回调函数延迟绑定`、`回调返回值穿透`和`错误冒泡`。

### 3.实现Promise的 resolve、reject 和 finall

#### 实现 Promise.resolve

实现 resolve 静态方法有三个要点:

- 1. 传参为一个 Promise, 则直接返回它。
- 1. 传参为一个 thenable 对象，返回的 Promise 会跟随这个对象，`采用它的最终状态`作为`自己的状态`。
- 1. 其他情况，直接返回以该值为成功状态的promise对象。

具体实现如下:

```js
Promise.resolve = (param) => {
  if(param instanceof Promise) return param;
  return new Promise((resolve, reject) => {
    if(param && param.then && typeof param.then === 'function') {
      // param 状态变为成功会调用resolve，将新 Promise 的状态变为成功，反之亦然
      param.then(resolve, reject);
    }else {
      resolve(param);
    }
  })
}
```

`Promise.resolve()`方法的参数分成四种情况。

**（1）参数是一个 Promise 实例**

如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

**（2）参数是一个`thenable`对象**

`thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

`Promise.resolve()`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then()`方法。

```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value);  // 42
});
```

上面代码中，`thenable`对象的`then()`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then()`方法指定的回调函数，输出42。

**（3）参数不是具有`then()`方法的对象，或根本就不是对象**

如果参数是一个原始值，或者是一个不具有`then()`方法的对象，则`Promise.resolve()`方法返回一个新的 Promise 对象，状态为`resolved`。

```javascript
const p = Promise.resolve('Hello');

p.then(function (s) {
  console.log(s)
});
// Hello
```

上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve()`方法的参数，会同时传给回调函数。

**（4）不带有任何参数**

`Promise.resolve()`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve()`方法。

```javascript
const p = Promise.resolve();

p.then(function () {
  // ...
});
```

上面代码的变量`p`就是一个 Promise 对象。

#### 实现 Promise.reject

Promise.reject 中传入的参数会作为一个 reason 原封不动地往下传, 实现如下:

```js
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}
```

#### 实现 Promise.prototype.finally

无论当前 Promise 是成功还是失败，调用`finally`之后都会执行 finally 中传入的函数，并且将值原封不动的往下传。

```js
Promise.prototype.finally = function(callback) {
  this.then(value => {
    return Promise.resolve(callback()).then(() => {
      return value;
    })
  }, error => {
    return Promise.resolve(callback()).then(() => {
      throw error;
    })
  })
}
```

### 4.Promise.all()、Promise.race()、Promise.any()

#### Promise.all()

`Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.all([p1, p2, p3]);
```

上面代码中，`Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。另外，`Promise.all()`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

下面是一个具体的例子。

```javascript
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```

上面代码中，`promises`是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。

**注意：**

- 如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。

- 如果没有自己的`catch`方法，就会调用`Promise.all()`的`catch`方法。

**实现 Promise.all**

```js
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let index = 0;
    let len = promises.length;
    if(len === 0) {
      resolve(result);
      return;
    }
   
    for(let i = 0; i < len; i++) {
      // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
      Promise.resolve(promise[i]).then(data => {
        result[i] = data;
        index++;
        if(index === len) resolve(result);
      }).catch(err => {
        reject(err);
      })
    }
  })
}
```

#### Promise.race()

`Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

`Promise.race()`方法的参数与`Promise.all()`方法一样，如果不是 Promise 实例，就会先调用下面讲到的`Promise.resolve()`方法，将参数转为 Promise 实例，再进一步处理。

下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为`reject`，否则变为`resolve`。

```javascript
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```

上面代码中，如果 5 秒之内`fetch`方法无法返回结果，变量`p`的状态就会变为`rejected`，从而触发`catch`方法指定的回调函数。

**实现 Promise.race**

```js
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length;
    if(len === 0) return;
    for(let i = 0; i < len; i++) {
      Promise.resolve(promise[i]).then(data => {
        resolve(data);
        return;
      }).catch(err => {
        reject(err);
        return;
      })
    }
  })
}
```

#### Promise.any()

ES2021 引入了[`Promise.any()`方法](https://github.com/tc39/proposal-promise-any)。该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。

```javascript
Promise.any([
  fetch('https://v8.dev/').then(() => 'home'),
  fetch('https://v8.dev/blog').then(() => 'blog'),
  fetch('https://v8.dev/docs').then(() => 'docs')
]).then((first) => {  // 只要有一个 fetch() 请求成功
  console.log(first);
}).catch((error) => { // 所有三个 fetch() 全部请求失败
  console.log(error);
});
```

只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

`Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是`Promise.any()`不会因为某个 Promise 变成`rejected`状态而结束，必须等到所有参数 Promise 变成`rejected`状态才会结束。

**参考文章：**

[神三元Promise之问](https://juejin.cn/post/6844904004007247880#heading-53)

[ES6Promise对象](https://es6.ruanyifeng.com/#docs/promise#Promise-all)

[从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469#heading-5)

