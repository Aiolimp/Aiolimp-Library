## Vue.nextTick

### 官方文档

- **参数**：

  - `{Function} [callback]`
  - `{Object} [context]`

- **用法**：

  在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

  ```js
  // 修改数据
  vm.msg = 'Hello'
  // DOM 还没有更新
  Vue.nextTick(function () {
    // DOM 更新了
  })
  
  // 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
  Vue.nextTick()
    .then(function () {
      // DOM 更新了
    })
  ```

### 异步更新队列

------

> 可能你还没有注意到，Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

> 例如，当你设置 `vm.someData = 'new value'`，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用

`如果同一个 watcher 被多次触发，只会被推入到队列中一次`这句话什么意思呢？跑个例子就知道了



```xml
    <div id="example">
        {{ msg }}
    </div>
```



```kotlin
<script type="text/javascript">
var vm = new Vue({
    el: '#example',
    data: {
        msg: 1
    },
    created(){
        this.msg = 1
        this.msg = 2
        this.msg = 3
    },
    watch: {
        msg(){
            console.log(this.msg)
        }
    }
})
</script>
```

浏览器控制台会输出什么呢？答案是3，而不是1、2、3。这就是官网说的多次触发，只会被推入队列一次。
 再看个例子



```xml
    <div id="example">
        {{ msg }}
    </div>
```



```php
var vm = new Vue({
    el: '#example',
    data: {
        msg: '123'
    }
})
vm.msg = 'new message'
console.log(1)
console.log(vm.$el.innerText)
console.log(2)
Vue.nextTick(()=>{
    console.log(vm.$el.innerText)
})
console.log(3)
</script>
```

在谷歌浏览器控制台中的输出是



```cpp
1
123
2
3
new message
```

是不是和想象中不太一样，为什么最后打出的是'new message'而不是代码的最后3，为什么第一次打印vm.$el.innerText是123，而不是赋值后的'new message'这个就要了解一下JavaScript的EventLoop，这个稍后会说，再来看一个例子，这个例子也是之前我为什么取不到div实例的简化版



```xml
  <div id="example">
        <div v-for="i in number" :ref="'div'+i" v-if="number > 0">{{i}}</div>
        <button @click="addNumber">点击</button>
    </div>
```



```xml
<script type="text/javascript">
var vm = new Vue({
    el: '#example',
    data: {
        number: 0
    },
    methods:{
        addNumber(){
            this.number = 3
            console.log(1)
            console.log(this.$refs['div1'])
            console.log(2)
            this.$nextTick(()=>{
                console.log(this.$refs['div1'])
            })
            console.log(3)
        }
    }
})
</script>
```

打印结果为



```csharp
1
undefined
2
3
[div]
```

可以看到第一次并没有取到id为div1的div元素，在nextTick里面就取到了。这个就对应官网里面的`为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback)`

## Javascript EventLoop

### 为什么JavaScript是单线程？

JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么JavaScript不能有多个线程呢？这样能提高效率啊。

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

### 任务队列

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果排队是因为计算量大，CPU忙不过来，倒也算了，但是很多时候CPU是闲着的，因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据），不得不等着结果出来，再往下执行。

JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。
 具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

> （1）所有同步任务都在主线程上执行，形成一个[执行栈](http://www.ruanyifeng.com/blog/2013/11/stack.html)（execution context stack）。
>  （2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
>  （3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
>  （4）主线程不断重复上面的第三步。

![img](https://upload-images.jianshu.io/upload_images/5183118-3636be634f31d726.jpg?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

![img](https://upload-images.jianshu.io/upload_images/5183118-a9ba6bd58184b534.png?imageMogr2/auto-orient/strip|imageView2/2/w/601/format/webp)

主线程在运行的时候会产生堆栈，堆就是存储变量，栈记录执行的顺序，如果碰到回调函数、DOM操作比如点击、鼠标移上去等、setTimeout操作会放到任务队列，只有栈中的代码执行完毕才会从任务队列取出代码，进行执行。所以这也是为什么上面代码例子中虽然console.log(3)在代码最后，但是比nextTick里面的代码先输出。**你可以这么理解，一堆代码，该放到stack里面的方法，放到stack里面，然后这堆代码里面的异步操作放到任务队列里面，然后执行栈里面的代码，栈里面的代码执行完毕，执行任务队列里面的代码，所以代码的执行顺序和写的顺序并不是一直的**

上面的任务队列分为两种，执行顺序也是有一点差别的，Macrotasks 和 Microtasks

- Macrotasks: setTimeout, setInterval, setImmediate, I/O, UI rendering
- Microtasks: process.nextTick, Promises, Object.observe(废弃), MutationObserver

Macrotasks 和 Microtasks有什么区别呢？我们以setTimeout和Promises来举例。



```jsx
   console.log('1');
    setTimeout(function() {
      console.log('2');
    }, 0);
    Promise.resolve().then(function() {
      console.log('3');
    }).then(function() {
      console.log('4');
    });
    console.log('5');
    //输出结果：
    //1
    //5
    //3
    //4
    //2
```

原因是Promise中的then方法的函数会被推入 microtasks 队列，而setTimeout的任务会被推入 macrotasks 队列。在每一次事件循环中，macrotask 只会提取一个执行，而 microtask 会一直提取，直到 microtasks 队列清空。结论如下：

1. microtask会优先macrotask执行
2. microtasks会被循环提取到执行引擎主线程的执行栈，直到microtasks任务队列清空，才会执行macrotask

【注：一般情况下，macrotask queues 我们会直接称为 task queues，只有 microtask queues 才会特别指明。】

## 从event loop看vue的nextTick



查看一下vue nextTick的代码实现



```jsx
const callbacks = []
let pending = false

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
let microTimerFunc
let macroTimerFunc
let useMacroTask = false

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  /* istanbul ignore next */
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc
}
```

从上面这一段代码知道，vue nextTick默认使用microTask，然后生成两个函数，首先是macroTimerFunc，顺序是setImmediate->MessageChannnel->setTimeout，microTimerFunc生成顺序是 Promise



```tsx
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
```

nextTick函数其实做了两件事情，一是生成两个timerFunc，把回调作为microTask或macroTask参与到事件循环中来。二是把回调函数放入一个callbacks队列，等待适当的时机执行。（这个时机和timerFunc不同的实现有关），**说白了就是改变代码的执行顺序，在dom节点更新完毕再去执行，因为有些操作需要dom节点更新完毕才行，所以不能立刻执行，需要放到nextTick里面去执行，下面图片可以参考一下**

> 原始代码
>  A();
>  B();
>  C();
>  执行顺序
>
> ![img](https:////upload-images.jianshu.io/upload_images/5183118-186a56f285cee39c?imageMogr2/auto-orient/strip|imageView2/2/w/931/format/webp)
>
> 正常顺序

> 原始代码(这个nextTick可不是vue里面的nextTick，而是原生的函数，不过可以借鉴一下，有助于理解vue里面的nextTick执行顺序)
>  A();
>  process.nextTick(B);
>  C();
>
> ![img](https:////upload-images.jianshu.io/upload_images/5183118-3341e2016efd6a0d?imageMogr2/auto-orient/strip|imageView2/2/w/915/format/webp)
>
> nextTick

> 原始代码
>  A();
>  setImmediate(B);//或者setTimeout(B,0);
>  C();
>
> ![img](https:////upload-images.jianshu.io/upload_images/5183118-c7036ed06d0dc427?imageMogr2/auto-orient/strip|imageView2/2/w/832/format/webp)
>
> setImmediate|setTimeout

## 应用场景

在操作DOM节点无效的时候，就要考虑操作的实际DOM节点是否存在，或者相应的DOM是否被更新完毕。

比如说，在created钩子中涉及DOM节点的操作肯定是无效的，因为此时还没有完成相关DOM的挂载。解决的方法就是在nextTick函数中去处理DOM，这样才能保证DOM被成功挂载而有效操作。

还有就是在**数据变化之后要执行某个操作，而这个操作需要使用随数据改变而改变的DOM时，这个操作应该放进Vue.nextTick。**

参考资料

- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [从event loop看vue的nextTick](https://juejin.im/post/59b499e86fb9a00a4e677825)
- [Vue.js异步更新DOM策略及nextTick](https://github.com/answershuto/learnVue/blob/master/docs/Vue.js%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0DOM%E7%AD%96%E7%95%A5%E5%8F%8AnextTick.MarkDown)
- [全面解析Vue.nextTick实现原理](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247495702&idx=1&sn=757a0817674daedb86fb9eb34c657a2d&source=41#wechat_redirect)

