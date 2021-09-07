JS Event Loop

### 一、**Event Loop:**

也叫做事件循环，是指浏览器或Node环境的一种解决javaScript单线程运行时不会阻塞的一种机制，也就是实现异步的原理。作为一种单线程语言，javascript本身是没有异步这一说法的，是由其宿主环境提供的。

### 二、微任务和宏任务：

​         `javascript`代码运行时，任务被分为两种，宏任务（`MacroTask/Task`）和微任务（`MircoTask`）；`Event Loop`在执行和协调各种任务时也将任务队列分为`Task Queue`和`MircoTak Queue`分别对应管理宏任务（`MacroTask/Task`）和微任务（`MircoTask`）；作为队列，`Task Queue`和`MircoTak Queue`也具备队列特性：先进先出（`FIFO—first in first out`）。

#### 1、微任务（MircoTask）

  在 HTML 标准中，并没有明确规定 Microtask，但是实际开发中包含以下四种：

- Promise中的then、catch、finally
- MutationObserver（监视 DOM 变动的API）
- Object.observe(废弃：监听标准对象的变化)
- Process.nextTick（Node环境，通常也被认为是微任务）

#### 2、宏任务（MacroTask/Task）

  基本上，我们将javascript中`非微任务（MircoTask）`的所有任务都归为宏任务，比如：

- script中全部代码
- DOM操作
- 用户交互操作
- 所有的网路请求
- 定时器相关的 setTimeout、setInterval 等

#### 3、javascript runtime

​           `javascript runtime`：为 `JavaScript` 提供一些对象或机制，使它能够与外界交互，是`javascript`的执行环境。`javascript`执行时会创建一个`main thread`主线程和`call-stack` 调用栈(执行栈，遵循后进先出的规则)，所有的任务都会被放到调用栈/执行栈等待主线程执行。其运行机制如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/670ff93747d64dca8940b3d507577702~tplv-k3u1fbpfcp-watermark.awebp)

- 1）主线程自上而下依次执行所有代码；

- 2）同步任务直接进入到主线程被执行；

- 3）异步任务进入到Event Table，当异步任务有结果后，将相对应的回调函数进行注册，放入Event Queue；

- 4）主线程任务执行完空闲下来后，从Event Queue（FIFO）中读取任务，放入主线程执行；

- 5）放入主线程的Event Queue任务继续从第一步开始，如此循环执行；

  上述步骤执行过程就是我们所说的事件循环(Event Loop)，上图展示了事件循环中的一个完整循环过程。

### 三、浏览器环境的Event Loop

​        不同的执行环境中，`Event Loop`的执行机制是不同的；例如`Chrome` 和 `Node.js` 都使用了 `V8 Engine`：V8 实现并提供了 `ECMAScript` 标准中的所有数据类型、操作符、对象和方法（注意并没有 `DOM`）。但它们的 `Runtime` 并不一样：`Chrome` 提供了 `window`、`DOM`，而 `Node.js` 则是 `require`、`process` 等等。我们在了解浏览器中`Event Loop`的具体表现前需要先整理同步、异步、微任务、宏任务之间的关系！

#### 1、同步、异步 和 宏任务、微任务

>宏任务和微任务是相对而言的，根据代码执时循环的先后，将代码执行分层理解，在每一层（一次）的事件循环中，首先整体代码块看作一个宏任务，宏任务中的 Promise（then、catch、finally）、MutationObserver、Process.nextTick就是该宏任务层的微任务；宏任务中的同步代码进入主线程中立即执行的，宏任务中的非微任务异步执行代码将作为下一次循环的宏任务时进入调用栈等待执行的；此时，调用栈中等待执行的队列分为两种，优先级较高先执行的本层循环微任务队列（MicroTask Queue），和优先级低的下层循环执行的宏任务队列（MacroTask Queue）！
>注意：每一次/层循环，都是首先从宏任务开始，微任务结束;

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/527f2467c9d94ffb851dcfea2181ad32~tplv-k3u1fbpfcp-watermark.awebp)

#### 2、简单实例分析

```js
        console.log('script start');

        setTimeout(() => {
            console.log('setTimeout');
        }, 0)

        new Promise((resolve) => {
                console.log('enter promise');
                resolve();
            })
            .then(() => {
                console.log('promise then 1');
            })
            .then(() => {
                console.log('promise then 2');
            })

        console.log('script end');
```

先进行代码分析：这是一个简单而典型的双层循环的事件循环执行案例，在这个循环中可以按照以下步骤进行分析：

- 1、首先区分出该层`宏任务`的范围（整个代码）；

- 2、区分宏任务中`同步代码`和`异步代码`
  同步代码：`console.log('script start');`、console.log('enter promise');和`console.log('script end');`；
  异步代码块：`setTimeout`和`Promise`的`then`（注意：`Promise`中只有`then`、`catch`、`finally`的执行需要等到结果，`Promise`传入的回调函数属于同步执行代码）;

- 3、在异步中找出同层的微任务（代码中的`Promise`的`then`）和下层事件循环的宏任务（代码中的`setTimeout`）

- 4、宏任务的同步代码优先进入主线程，按照自上而下顺序执行完毕；
  输出顺序为：

  ```
  //同步代码执行输出
  script start
  enter promise
  script end
  ```

- 5、当主线程空闲时，执行该层的`微任务`

  ```
  //同层微任务队列代码执行输出
  promise then 1
  promise then 2
  ```

- 6、首层事件循环结束，进入第二层事件循环（`setTimeout`包含的执行代码，只有一个同步代码）

```
//第二层宏任务队列代码执行输出
setTimeout
```

综合分析最终得出数据结果为：

```
//首层宏任务代码执行输出
script start
enter promise
script end
//首层微任务队列代码执行输出
promise then 1
promise then 2
//第二层宏任务队列代码执行输出
setTimeout
```

#### 3.复杂案例

```js
console.log('1');

setTimeout(function() {
    console.log('2');
    new Promise(function(resolve) {
        console.log('3');
        resolve();
    }).then(function() {
        console.log('4')
    })
    setTimeout(function() {
	    console.log('5');
	    new Promise(function(resolve) {
	        console.log('6');
	        resolve();
	    }).then(function() {
	        console.log('7')
	    })
	})
	console.log('14');
})

new Promise(function(resolve) {
    console.log('8');
    resolve();
}).then(function() {
    console.log('9')
})

setTimeout(function() {
    console.log('10');
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
console.log('13')

```

分析：如下图草稿所示，`左上角标a为宏任务队列，左上角标i为微任务队列`，同一层循环中，本层宏任务先执行，再执行微任务；本层宏任务中的非微任务异步代码块作为下层循环的宏任务进入下次循环，如此循环执行；

![1630892702(1).jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fd24aa00c524391a7a9e5d771f97bf6~tplv-k3u1fbpfcp-watermark.awebp)

运行结果：

```
1->8->13->9->2->3->14->4->10->11->12->5->6->7
```

