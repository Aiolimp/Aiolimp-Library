### 1. mvvm **和** mvc 区别

MVC 的主要思想就是在 Controller 里面把 Model 的数据赋值给 View。而MVVM则是将mvc 中 Controller 演变成中的 ViewModel。MVVM 与 MVC 最大的区别就是：它实现了 View 和 Model 的自动同步，也就是当 Model 的属性改变时，我们不用再自己手动操作 Dom 元素，来改变 View 的显示，而是改变属性后该属性对应 View 层显示会自动改变（对应Vue数据驱动的思想）在 MVVM 中，View 不知道 Model 的存在，Model 和 ViewModel 也观察不到 View，这种低耦合模式提高代码的可重用性。

Vue 并没有完全遵循 MVVM 的思想， 提供了$refs 这个属性，让 Model 可以直接操作 View。

### 2.Vue 组件通讯有哪几种方式

**父子组件**

- props 和$emit 父组件向子组件传递数据是通过 prop 传递的，子组件传递数据给父组件是通过$emit 触发事件来做到的

- $parent,$children 获取当前组件的父组件和当前组件的子组件(`$children` 的值是数组，而`$parent`是个对象)

**非父子组件**

- $attrs 和$listeners A->B->C。Vue 2.4 开始提供了$attrs 和$listeners 来解决这个问题

- 父组件中通过 provide 来提供变量，然后在子组件中通过 inject 来注入变量。(官方不推荐在实际业务中使用，但是写组件库时很常用)

- $refs 获取组件实例

- `eventBus` 为事件总线来实现无关组件之间的通信 
- vuex 状态管理

[vue中8种组件通信方式](https://juejin.cn/post/6844903887162310669#heading-0)

### 3.简述每个周期具体适合哪些场景

**beforeCreate：** 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问。

**created：** data 和 methods 都已经被初始化好了，可以要调用 methods 中的方法，或者操作 data 中的数据。挂载元素$el 还没有初始化，但是可以通过 vm.$nextTick 来访问 Dom。

**beforeMount：** 在挂载开始之前被调用：相关的 render 函数首次被调用。

**mounted：** 在挂载完成后发生，在当前阶段，真实的 DOM挂载完毕，可以访问到 DOM节点，进行DOM操作。

**beforeUpdate：** 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。此处获取的数据是更新后的数据，但是获取页面中的DOM元素是更新之前的。

**updated：** 组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。

**beforeDestory：** 实例销毁之前调用。在这一步，实例仍然完全可用。执行清理任务，比如：清除定时器等。

**destroyed：** Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

### 4.异步请求在哪个生命周期发起？

可以在钩子函数 created、beforeMount、mounted 中进行异步请求，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

如果异步请求不需要依赖 Dom 推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面  loading 时间；
- ssr  不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

### 5.keep-alive 的作用是什么?

如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keepalive 组件包裹需要保存的组件。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行`activated` 钩子函数，缓存渲染后会执行 `deactivated` 钩子函数。

### 6.v-if 和 v-show 的区别

**共同点**：都可以动态的显示DOM元素

**不同点**：

1.`v-if`是动态的向DOM树中添加或者删除元素。在编译过程中会被转化成三元表达式,条件不满足时不渲染此节点。

2.`v-show` 是通过设置 DOM 元素的 display 样式属性控制显隐。

**总结**：如果要频繁切换某节点，使用 `v-show` (切换开销比较小，初始开销较大)。如果不需要频繁切换某节点使用 `v-if`（初始渲染开销较小，切换开销比较大）。

### 7.v-if和v-for哪个优先级更高？

v-for优先于v-if被解析，把他们放在一起，输出的渲染函数中可以看出会先执行循环再判断条件。

哪怕我们只渲染列表中一小部分元素，也得在每次重渲染的时候遍历整个列表。所以不建议放在一起，可以吧v-if

移到容器上，如`ul`或者`ol`。或者写成计算属性的方式。

### 8.说出几种 vue 当中的指令和它的用法？

`v-model` 变成value和input的语法糖，进行双向数据绑定；

`v-for` 循环指令；

`v-show` 控制元素显示与隐藏相当于dispalay；

`v-on` ：监听DOM事件；

`v-once：`  定义的元素或组件只渲染一次。

`v-cloak：`:保持在元素上直到关联实力结束编译，解决初始化慢导致页面闪动。。

`v-text`:更新元素的textContent

`v-html:`更新 innerHtml

`v-if/v-else/v-eles-if:`在render函数里就是三元表达式

`v-slot:` 在<template> 中使用插槽

`v-pre:` 跳过这个元素以及子元素的编译过程，加快编译。

`v-bind:` 动态进行属性绑定。

### 9.computed和watch的区别

#### 计算属性computed：

- 支持缓存，只有依赖数据发生改变，才会重新进行计算
- 不支持异步，当computed内有异步操作时无效，无法监听数据的变化
- computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值
- 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed
- 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。

#### 侦听属性watch：

- 不支持缓存，数据变，直接会触发相应的操作；
- watch支持异步；
- 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
- 当一个属性发生变化时，需要执行对应的操作；一对多；
- 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数：

>immediate：组件加载立即触发回调函数执行
>
>

### 16.params 和 query 的区别

用法：query 要用 path 来引入，params 要用 name 来引入，接收参数都是类似的，分别是 `this.$route.query.name` 和 `this.$route.params.name` 。url 地址显示：query 更加类似于我们 ajax 中 get 传参，params 则类似于 post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示

注意点：query 刷新不会丢失 query 里面的数据 params 刷新 会 丢失 params 里面的数据。

- router 为 VueRouter 实例，想要导航到不同 URL，则使用 router.push 方法
- $route 为当前 router 跳转对象，里面可以获取 name、path、query、params 等