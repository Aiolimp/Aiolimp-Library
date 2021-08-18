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

### 3.vue 优点？

- 轻量级框架：只关注视图层，是一个构建数据的视图集合，大小只有几十 `kb` ；
- 简单易学：国人开发，中文文档，不存在语言障碍 ，易于理解和学习；
- 双向数据绑定：保留了 `angular` 的特点，在数据操作方面更为简单；
- 组件化：保留了 `react` 的优点，实现了 `html` 的封装和重用，在构建单页面应用方面有着独特的优势；
- 视图，数据，结构分离：使数据的更改更为简单，不需要进行逻辑代码的修改，只需要操作数据就能完成相关操作；
- 虚拟 DOM：`dom` 操作是非常耗费性能的， 不再使用原生的 `dom` 操作节点，极大解放 `dom` 操作，但具体操作的还是 `dom` 不过是换了另一种方式；
- 运行速度更快：相比较于 `react` 而言，同样是操作虚拟 `dom` ，就性能而言， `vue` 存在很大的优势。

### 4. **为什么说** vue **是一个渐进式框架**?

vue 采用了 MVVM 模式，自己拥有一套完整的生态系统，可以添加 Vuex，vuerouter，也可以添加别的第三方库，并且是相互独立的，可以根据不同的需求选择不同的层级，所以它是轻量级的，渐进式的框架。

### 5.`<keep-alive>` 的作用是什么?

如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keepalive 组件包裹需要保存的组件。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行
deactivated 钩子函数，缓存渲染后会执行 actived 钩子函数。

### 6.说出几种 vue 当中的指令和它的用法？

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

### **7.vue-loader 是什么？使用它的用途有哪些？**

vue 文件的一个加载器，将 `template/js/style` 转换成 `js` 模块。

用途：`js` 可以写 `es6` 、 `style`样式可以 `scss` 或 `less` 、 `template` 可以加 `jade`等

### **8.请说出 vue.cli 项目中 src 目录每个文件夹和文件的用法？**

`assets` 文件夹是放静态资源；`components` 是放组件；`router` 是定义路由相关的配置; `app.vue` 是一个应用主组件；`main.js` 是入口文件。

### 9.vue 常用修饰符

**v-model 修饰符：**

.lazy：输入框改变，这个数据就会改变，这个修饰符会在光标离开 input 框才会更新数据

.number：营先输入数字就会限制输入只能是数字，先字符串就相当于没有加 number，注

意，不是输入框不能输入字符串，是这个数据是数字

.trim：输入框过滤首尾的空格

**事件修饰符：**

.stop：阻止事件冒泡，相当于调用了 event.stopPropagation()方法

.prevent：阻止默认行为，相当于调用了 event.preventDefault()方法，比如表单的提交、

a 标签的跳转就是默认事件

.self：只有元素本身触发时才触发方法，就是只有点击元素本身才会触发。比如一个 div

里面有个按钮，div 和按钮都有事件，我们点击按钮，div 绑定的方法也会触发，如果 div

的 click 加上 self，只有点击到 div 的时候才会触发，变相的算是阻止冒泡 

.once：事件只能用一次，无论点击几次，执行一次之后都不会再执行

.capture：事件的完整机制是捕获-目标-冒泡，事件触发是目标往外冒泡

.sync：对 prop 进行双向绑定

.keyCode：监听按键的指令，具体可以查看 vue 的键码对应表

### **10.分别简述 computed 和 watch 的使用场景**

- `computed` : 当一个属性受多个属性影响的时候就需要用到 `computed` ，最典型的栗子：购物车商品结算的时候
- `watch` : 当一条数据影响多条数据的时候就需要用 `watch` ，栗子：搜索数据

### 11.vue 组件中 data 为什么必须是一个函数

组件中的 `data` 写成一个函数，数据以函数返回值的形式定义，这样每次复用组件的时候，都会返回一份新的 `data` ，每个 vue 组件的实例都有自己的作用域，互不干扰。而单纯的写成对象形式，就是所有的组件实例共用了一个 `data`的内存地址 ，这样改一个数据其他都改变。

### 12.单页面应用和多页面应用区别及优缺点

单页面应用（SPA），通俗一点说就是指只有一个主页面的应用，浏览器一开始要加载所有必须的 html, js, css。所有的页面内容都包含在这个所谓的主页面中。但在写的时候，还是会分开写（页面片段），然后在交互的时候由路由程序动态载入，单页面的页面跳转，仅刷新局部资源。多应用于 pc 端。

多页面（MPA），就是指一个应用中有多个页面，页面跳转时是整页刷新

单页面的优点：用户体验好，快，内容的改变不需要重新加载整个页面，基于这一点 spa 对服务器压力较小；前后端分离；页面效果会比较炫酷（比如切换页面内容时的专场动画）。

单页面缺点：不利于 seo；导航不可用，如果一定要导航需要自行实现前进、后退。（由于是单页面不能用浏览器的前进后退功能，所以需要自己建立堆栈管理）；初次加载时耗时多；页面复杂度提高很多。

### 13.assets 和 static 的区别

**相同点：** `assets` 和 `static` 两个都是存放静态资源文件。项目中所需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件下，这是相同点

**不相同点：**`assets` 中存放的静态资源文件在项目打包时，也就是运行 `npm run build` 时会将 `assets` 中放置的静态资源文件进行打包上传，所谓打包简单点可以理解为压缩体积，代码格式化。而压缩后的静态资源文件最终也都会放置在 `static` 文件中跟着 `index.html` 一同上传至服务器。`static` 中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是 `static` 中的资源文件由于没有进行压缩等操作，所以文件的体积也就相对于 `assets` 中打包后的文件提交较大点。在服务器中就会占据更大的空间。

**建议：** 将项目中 `template`需要的样式文件 js 文件等都可以放置在 `assets` 中，走打包这一流程。减少体积。而项目中引入的第三方的资源文件如`iconfoont.css` 等文件可以放置在 `static` 中，因为这些引入的第三方文件已经经过处理，我们不再需要处理，直接上传。

### 14.Vue-router 跳转和 location.href 有什么区别

使用 `location.href= /url `来跳转，简单方便，但是刷新了页面

引进 router ，然后使用 `router.push( /url )` 来跳转，使用了 `diff` 算法，实现了按需加载，减少了 dom 的消耗。其实使用 router 跳转和使用 `history.pushState()` 没什么差别的，因为 vue-router 就是用了 `history.pushState()` ，尤其是在 history 模式下。

### 15.请说下封装 vue 组件的过程？

1. 建立组件的模板，先把架子搭起来，写写样式，考虑好组件的基本逻辑。
2. 准备好组件的数据输入。即分析好逻辑，定好 props 里面的数据、类型。
3. 准备好组件的数据输出。即根据组件逻辑，做好要暴露出来的方法。
4. 封装完毕了，直接调用即可

### 16.params 和 query 的区别

用法：query 要用 path 来引入，params 要用 name 来引入，接收参数都是类似的，分别是 `this.$route.query.name` 和 `this.$route.params.name` 。url 地址显示：query 更加类似于我们 ajax 中 get 传参，params 则类似于 post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示

注意点：query 刷新不会丢失 query 里面的数据 params 刷新 会 丢失 params 里面的数据。

- router 为 VueRouter 实例，想要导航到不同 URL，则使用 router.push 方法
- $route 为当前 router 跳转对象，里面可以获取 name、path、query、params 等

### **17.vue 更新数组时触发视图更新的方法**

push()；pop()；shift()；unshift()；splice()；sort()；reverse()

### 18.简述每个周期具体适合哪些场景

**beforeCreate：** 在 beforeCreate 生命周期执行的时候，挂载元素$el、data 和 methods 中的数据都还没有初始化。不能在这个阶段使用 data 中的数据和 methods 中的方法

**created：** 挂载元素$el 还没有初始化，data 和 methods 都已经被初始化好了，可以要调用 methods 中的方法，或者操作 data 中的数据，

**beforeMount：** 执行到这个钩子的时候，在内存中已经编译好了模板了，但是还没有挂载到页面中，此时，页面还是旧的

**mounted：** 执行到这个钩子的时候，就表示 Vue 实例已经初始化完成了。此时组件脱离了创建阶段，进入到了运行阶段。如果我们想要通过插件操作页面上的 DOM 节点，最早可以在和这个阶段中进行

**beforeUpdate：** 当执行这个钩子时，页面中的显示的数据还是旧的，data 中的数据是更新后的， 页面还没有和最新的数据保持同步

**updated：** 页面显示的数据和 data 中的数据已经保持同步了，都是最新的

**beforeDestory：** Vue 实例从运行阶段进入到了销毁阶段，这个时候上所有的 data 和 methods ， 指令， 过滤器 ……都是处于可用状态。还没有真正被销毁

**destroyed：** 这个时候上所有的 data 和 methods ， 指令， 过滤器 ……都是处于不可用状态。组件已经被销毁了。

### 18.created 和 mounted 的区别

created:在模板渲染成 html 前调用，即通常初始化某些属性值，然后再渲染成视图。

mounted:在模板渲染成 html 后调用，通常是初始化页面完成后，再对 html 的 dom 节点进行一些需要的操作。

### 1.v-if和v-for哪个优先级更高？

v-for优先于v-if被解析，把他们放在一起，输出的渲染函数中可以看出会先执行循环再判断条件。

哪怕我们只渲染列表中一小部分元素，也得在每次重渲染的时候遍历整个列表。所以不建议放在一起，可以吧v-if

移到容器上，如`ul`或者`ol`。



### 2.**请问** v-if **和** v-show **有什么区别**? 

共同点：都可以动态的显示DOM元素

不同点：

1.`v-if`是动态的向DOM树中添加或者删除元素。若初始值为 `false` ，就不会编译了。而且 `v-if` 不停的销毁和创建比较消耗性能

2.`v-show` 是通过设置 DOM 元素的 display 样式属性控制显隐。

总结：如果要频繁切换某节点，使用 `v-show` (切换开销比较小，初始开销较大)。如果不需要频繁切换某节点使用 `v-if`（初始渲染开销较小，切换开销比较大）。

### 3. vue中Key的作用

1. key的作用主要是为了更高效的更新虚拟DOM。
2. vue在patch过程中**判断两个节点是否是相同节点时key是一个必要条件**，渲染一组列表时，key往往是唯一标识，所以如果不定义key的话，vue只能认为比较的两个节点是同一个，哪怕它们实际上不是，这导致了频繁更新元素，使得整个patch过程比较低效，影响性能。
3. 实际使用中在渲染一组列表时key必须设置，而且必须是唯一标识，应该避免使用数组索引作为key，这可能导致一些隐蔽的bug；vue中在使用相同标签元素过渡切换时，也会使用key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。
4. 从源码中可以知道，vue判断两个节点是否相同时主要判断两者的key和元素类型等，因此如果不设置key，它的值就是undefined，则可能永远认为这是两个相同节点，只能去做更新操作，这造成了大量的dom更新操作，明显是不可取的。

key的作用主要是为了更高效的更新虚拟DOM。vue在patch过程中**判断两个节点是否是相同节点时key是一个必要条件**，渲染一组列表时，key往往是它的唯一标识，所以如果不定义key的话，它的值就是undefined，则永远认为这是两个相同节点，这导致了频繁更新元素，使得整个patch过程性能降低。

### 4.双向绑定

我做过测试，输出包含v-model模板的组件渲染函数，发现它会被转换为value属性的绑定以及一个事件监听，事件回调函数中会做相应变量更新操作，这说明神奇魔法实际上是vue的编译器完成的。

双向绑定v-model通常用在表单项上，可以绑定一个动态值到视图，同时视图的改变也能改变改值。v-model是一种语法糖，相当于：value和@input，使用v-model可以减少繁琐的事件处理代码，提高开发效率，在原生表单上可以直接使用v-model，自定义组件上如果要使用它需要在组件内绑定value并处理事件。



**v-model和sync修饰符有什么区别**：.

v-model针对更多的是最终操作结果，是双向绑定的结果，是value，是一种change操作。

sync针对更多的是各种各样的状态，是状态的互相传递，是status，是一种update操作。

### 5.你了解vue中的diff算法吗？

1. diff算法是虚拟DOM技术的产物，vue里面实际叫做patch，它的核心实现来自于snabbdom；通过新旧虚拟DOM作对比（即patch），将变化的地方转换为DOM操作
2. 在vue 1中是没有patch的，因为界面中每个依赖都有专门的watcher负责更新，这样项目规模变大就会成为性能瓶颈，vue 2中为了降低watcher粒度，每个组件只有一个watcher，但是当需要更新的时候，怎样才能精确找到发生变化的地方？这就需要引入patch才行。
3. 组件中数据发生变化时，对应的watcher会通知更新并执行其更新函数，它会执行渲染函数获取全新虚拟dom：newVnode，此时就会执行patch比对上次渲染结果oldVnode和新的渲染结果newVnode。
4. patch过程遵循深度优先、同层比较的策略；两个节点之间比较时，如果它们拥有子节点，会先比较子节点；比较两组子节点时，会假设头尾节点可能相同先做尝试，没有找到相同节点后才按照通用方式遍历查找；查找结束再按情况处理剩下的节点；借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

diff算法是一种优化手段，将前后两个模块进行差异化对比，修补(更新)差异的过程叫做patch，也就是打补丁。diff算法比较的是虚拟 DOM，虚拟DOM是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。当虚拟 DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上。在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。同时借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

### **6vue中组件之间的通信方式？**

- 父子组件
  - `props`
  - `$emit`/`$on`
  - `$parent` / `$children`
  - `ref`
  - `$attrs` / `$listeners`
- 兄弟组件
  - `$parent`
  - `eventbus`
  - `vuex`
- 跨层级关系
  - `provide`/`inject`
  - `$root`
  - `eventbus`
  - `vuex`

### 7.VUEX

1. vuex是vue专用的状态管理库。它以全局方式集中管理应用的状态，并且可以保证状态变更的可预测性。
2. vuex主要解决的问题是多组件之间状态共享的问题，利用各种组件通信方式，我们虽然能够做到状态共享，但是往往需要在多个组件之间保持状态的一致性，这种模式很容易出现问题，也会使程序逻辑变得复杂。vuex通过把组件的共享状态抽取出来，以全局单例模式管理，这样任何组件都能用一致的方式获取和修改状态，响应式的数据也能够保证简洁的单向数据流动，我们的代码将变得更结构化且易维护。
3. vuex并非必须的，它帮我们管理共享状态，但却带来更多的概念和框架。如果我们不打算开发大型单页应用或者我们的应用并没有大量全局的状态需要维护，完全没有使用vuex的必要。一个简单的[store 模式](https://cn.vuejs.org/v2/guide/state-management.html#简单状态管理起步使用)就足够了。反之，Vuex 将会成为自然而然的选择。引用 Redux 的作者 Dan Abramov 的话说就是：Flux 架构就像眼镜：您自会知道什么时候需要它。
4. 我在使用vuex过程中有如下理解：首先是对核心概念的理解和运用，将全局状态放入state对象中，它本身一棵状态树，组件中使用store实例的state访问这些状态；然后有配套的mutation方法修改这些状态，并且只能用mutation修改状态，在组件中调用commit方法提交mutation；如果应用中有异步操作或者复杂逻辑组合，我们需要编写action，执行结束如果有状态修改仍然需要提交mutation，组件中调用这些action使用dispatch方法派发。最后是模块化，通过modules选项组织拆分出去的各个子模块，在访问状态时注意添加子模块的名称，如果子模块有设置namespace，那么在提交mutation和派发action时还需要额外的命名空间前缀。
5. vuex在实现单项数据流时需要做到数据的响应式，通过源码的学习发现是借用了vue的数据响应化特性实现的，它会利用Vue将state作为data对其进行响应化处理，从而使得这些状态发生变化时，能够导致组件重新渲染。

vuex是vue专用的状态管理库，它主要解决多组件之间状态共享的问题，vuex通过把组件的共享状态抽取出来，以全局单例模式管理，这样任何组件都能用一致的方式获取和修改状态，使我们的代码将变得更结构化且易维护。

自己对vuex过程的理解：首先是vuex的核心概念，将全局状态放入state对象中，它本身一棵状态树，组件中使用store实例的state访问这些状态；然后有配套的mutation方法修改这些状态，在组件中调用commit方法提交mutation；如果应用中有异步操作或者复杂逻辑组合，我们需要编写action，执行结束如果有状态修改，仍然需要提交mutation，组件中调用这些action使用dispatch方法派发。最后是模块化，通过modules选项组织拆分出去的各个子模块，在访问状态时注意添加子模块的名称，如果子模块有设置namespace为true，那么在提交mutation和派发action时还需要额外的命名空间前缀。

### 8.vue-router中如何保护路由？

1. vue-router中保护路由安全通常使用导航守卫来做，通过设置路由导航钩子函数的方式添加守卫函数，在里面判断用户的登录状态和权限，从而达到保护指定路由的目的。

2. 具体实现有几个层级：全局前置守卫beforeEach、路由独享守卫beforeEnter或组件内守卫beforeRouteEnter。以全局守卫为例来说，可以使用`router.beforeEach((to,from,next)=>{})`方式设置守卫，每次路由导航时，都会执行该守卫，从而检查当前用户是否可以继续导航，通过给next函数传递多种参数达到不同的目的，比如如果禁止用户继续导航可以传递next(false)，正常放行可以不传递参数，传递path字符串可以重定向到一个新的地址等等。

3. 这些钩子函数之所以能够生效，也和vue-router工作方式有关，像beforeEach只是注册一个hook，当路由发生变化，router准备导航之前会批量执行这些hooks，并且把目标路由to，当前路由from，以及后续处理函数next传递给我们设置的hook。

   **追问**：

   1.能不能说说全局守卫、路由独享守卫和组件内守卫区别？

   1. 你项目中的路由守卫是怎么做的？
   2. 前后端路由一样吗？
   3. 前端路由是用什么方式实现的？
   4. 你前面提到的next方法是怎么实现的？

   vue-router中保护路由安全通常使用导航守卫来做，通过设置守卫函数，判断用户的登录状态和权限，从而达到保护指定路由的目的。比如全局前置守卫BeforeEach、路由独享守卫beforeEnter或者组件内守卫beforeRouterEnter。以全局守卫为例：使用router.beforeEach((to,from,next)=>{})方式来设置守卫，每次路由导航时，都会执行该守卫，通过next函数传递参数达到不同的目的。比如禁止用户导航就可以传递next（false），允许导航就可以不传参，以及传递path字符串重定向到新的地址。这些钩子函数之所以能够生效，也和vue-router工作方式有关，像beforeEach只是注册一个hook，当路由发生变化，router准备导航之前会批量执行这些hooks，并且把目标路由to，当前路由from，以及后续处理函数next传递给我们设置的hook。

### **9.你了解哪些Vue性能优化方法？**

- 路由懒加载

```
const router = new VueRouter({
  routes: [
    { path: '/foo', component: () => import('./Foo.vue') }
  ]
})
```

- keep-alive缓存页面

  ```
  <template>
    <div id="app">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </template>
  ```

- 使用v-show复用DOM

  ```
  <template>
    <div class="cell">
      <!--这种情况用v-show复用DOM，比v-if效果好-->
      <div v-show="value" class="on">
        <Heavy :n="10000"/>
      </div>
      <section v-show="!value" class="off">
        <Heavy :n="10000"/>
      </section>
    </div>
  </template>
  ```

- v-for 遍历避免同时使用 v-if

  ```
  <template>
      <ul>
        <li
          v-for="user in activeUsers"
          :key="user.id">
          {{ user.name }}
        </li>
      </ul>
  </template>
  <script>
  	export default {
          computed: {
            activeUsers: function () {
              return this.users.filter(function (user) {
               return user.isActive
              })
            }
          }
      }
  </script>
  ```

- 长列表性能优化

  - 如果列表是纯粹的数据展示，不会有任何改变，就不需要做响应化

    ```
    export default {
      data: () => ({
        users: []
      }),
      async created() {
        const users = await axios.get("/api/users");
        this.users = Object.freeze(users);
      }
    };
    ```

  - 如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容

    ```
    <recycle-scroller
      class="items"
      :items="items"
      :item-size="24"
    >
      <template v-slot="{ item }">
        <FetchItemView
          :item="item"
          @vote="voteItem(item)"
        />
      </template>
    </recycle-scroller>
    ```

    > 参考[vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)、[vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list)

- 事件的销毁

  Vue 组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。

  ```
  created() {
    this.timer = setInterval(this.refresh, 2000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
  ```

- 图片懒加载

  对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。

  ```
  <img v-lazy="/static/img/1.png">
  ```

  > 参考项目：[vue-lazyload](https://github.com/hilongjw/vue-lazyload)

- 第三方插件按需引入

  像element-ui这样的第三方组件库可以按需引入避免体积太大。

  ```
  import Vue from 'vue';
  import { Button, Select } from 'element-ui';
  
   Vue.use(Button)
   Vue.use(Select)
  ```

- 无状态的组件标记为函数式组件

  ```
  <template functional>
    <div class="cell">
      <div v-if="props.value" class="on"></div>
      <section v-else class="off"></section>
    </div>
  </template>
  
  <script>
  export default {
    props: ['value']
  }
  </script>
  ```

- 子组件分割

  ```
  <template>
    <div>
      <ChildComp/>
    </div>
  </template>
  
  <script>
  export default {
    components: {
      ChildComp: {
        methods: {
          heavy () { /* 耗时任务 */ }
        },
        render (h) {
          return h('div', this.heavy())
        }
      }
    }
  }
  </script>
  ```

- 变量本地化

  ```
  <template>
    <div :style="{ opacity: start / 300 }">
      {{ result }}
    </div>
  </template>
  
  <script>
  import { heavy } from '@/utils'
  
  export default {
    props: ['start'],
    computed: {
      base () { return 42 },
      result () {
        const base = this.base // 不要频繁引用this.base
        let result = this.start
        for (let i = 0; i < 1000; i++) {
          result += heavy(base)
        }
        return result
      }
    }
  }
  </script>
  ```

- SSR

### 10.你知道nextTick吗，它是干什么的，实现原理是什么？

1. nextTick是Vue提供的一个全局API，由于vue的异步更新策略导致我们对数据的修改不会立刻体现在dom变化上，此时如果想要立即获取更新后的dom状态，就需要使用这个方法
2. Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。nextTick方法会在队列中加入一个回调函数，确保该函数在前面的dom操作完成后才调用。
3. 所以当我们想在修改数据后立即看到dom执行结果就需要用到nextTick方法。
4. 比如，我在干什么的时候就会使用nextTick，传一个回调函数进去，在里面执行dom操作即可。
5. 我也有简单了解nextTick实现，它会在callbacks里面加入我们传入的函数，然后用timerFunc异步方式调用它们，首选的异步方式会是Promise。这让我明白了为什么可以在nextTick中看到dom操作结果。

nextTick是Vue提供的一个全局API，因为vue在更新DOM时是异步执行的，导致我们在修改数据时，不会立刻体现在DOM变化上，nextTick方法会在vue数据变化的队列中加入一个回调函数，在里面执行dom操作，这样就可以立即获取更新后的dom变化。

### **11.说一说你对vue响应式理解？**

1. 所谓数据响应式就是能够使数据变化可以被检测并对这种变化做出响应的机制。
2. mvvm框架中要解决的一个核心问题是连接数据层和视图层，通过数据驱动应用，数据变化，视图更新，要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理。
3. 以vue为例说明，通过数据响应式加上虚拟DOM和patch算法，可以使我们只需要操作数据，完全不用接触繁琐的dom操作，从而大大提升开发效率，降低开发难度。
4. vue2中的数据响应式会根据数据类型来做不同处理，如果是对象则采用Object.defineProperty()的方式定义数据拦截，当数据被访问或发生变化时，我们感知并作出响应；如果是数组则通过覆盖该数组原型的方法，扩展它的7个变更方法，使这些方法可以额外的做更新通知，从而作出响应。这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：比如初始化时的递归遍历会造成性能损失；新增或删除属性时需要用户使用Vue.set/delete这样特殊的api才能生效；对于es6中新产生的Map、Set这些数据结构不支持等问题。
5. 为了解决这些问题，vue3重新编写了这一部分的实现：利用ES6的Proxy机制代理要响应化的数据，它有很多好处，编程体验是一致的，不需要使用特殊api，初始化性能和内存消耗都得到了大幅改善；另外由于响应化的实现代码抽取为独立的reactivity包，使得我们可以更灵活的使用它，我们甚至不需要引入vue都可以体验。

数据响应式就是能够使数据变化可以被检测并对这种变化做出响应的机制。mvvm框架中要解决的一个核心问题是连接数据层和视图层，进行数据变化，视图更新，要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理。以vue为例说明，通过数据响应式加上虚拟DOM和patch算法，可以使我们只需要操作数据，完全不用接触繁琐的dom操作，从而大大提升开发效率，降低开发难度。

### 12你如果想要扩展某个Vue组件时会怎么做？

1. 常见的组件扩展方法有：mixins，slots，extends等

2. 混入mixins是分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

   ```
   // 复用代码：它是一个配置对象，选项和组件里面一样
   const mymixin = {
   	methods: {
   		dosomething(){}
   	}
   }
   // 全局混入：将混入对象传入
   Vue.mixin(mymixin)
   
   // 局部混入：做数组项设置到mixins选项，仅作用于当前组件
   const Comp = {
   	mixins: [mymixin]
   }
   ```

3. 插槽主要用于vue组件中的内容分发，也可以用于组件扩展。

   子组件Child

   ```
   <div>
     <slot>这个内容会被父组件传递的内容替换</slot>
   </div>
   ```

   父组件Parent

   ```
   <div>
   	<Child>来自老爹的内容</Child>
   </div>
   ```

   如果要精确分发到不同位置可以使用具名插槽，如果要使用子组件中的数据可以使用作用域插槽。

4. 组件选项中还有一个不太常用的选项extends，也可以起到扩展组件的目的

   ```
   // 扩展对象
   const myextends = {
   	methods: {
   		dosomething(){}
   	}
   }
   // 组件扩展：做数组项设置到extends选项，仅作用于当前组件
   // 跟混入的不同是它只能扩展单个对象
   // 另外如果和混入发生冲突，该选项优先级较高，优先起作用
   const Comp = {
   	extends: myextends
   }
   ```

5. 混入的数据和方法不能明确判断来源且可能和当前组件内变量产生命名冲突，vue3中引入的composition api，可以很好解决这些问题，利用独立出来的响应式模块可以很方便的编写独立逻辑并提供响应式的数据，然后在setup选项中有机组合使用。例如：

   ```
   // 复用逻辑1
   function useXX() {}
   // 复用逻辑2
   function useYY() {}
   // 逻辑组合
   const Comp = {
   	setup() {
   		const {xx} = useXX()
   		const {yy} = useYY()
   		return {xx, yy}
   	}
   }
   ```

### 13.Vue2和Vue3中的响应式原理对比，分别的具体实现思路

1. vue2数据响应式实现根据对象类型做不同处理，如果是object，则通过`Object.defineProperty(obj,key,descriptor)`拦截对象属性访问

   ```
   function defineReactive(obj, key, val) {
     Object.defineProperty(obj, key, {
       get() {
         return val
       },
       set(v) {
         val = v
         notify()
       }
     })
   }
   ```

   如果是数组，则覆盖数组的7个变更方法实现变更通知

   ```
   const arrayProto = Array.prototype
   const arrayMethods = Object.create(arrayProto)
   
   ;['push','pop','shift','unshift','splice','sort','reverse']
     .forEach(function (method) {
     const original = arrayProto[method]
     def(arrayMethods, method, function mutator (...args) {
       const result = original.apply(this, args)
       notify()
       return result
     })
   })
   ```

2. 可以看到vue2中有几个问题：

   - 初始化时需要遍历对象所有key，如果对象层级较深，性能不好
   - 通知更新过程需要维护大量dep实例和watcher实例，额外占用内存较多
   - 动态新增、删除对象属性无法拦截，只能用特定set/delete api代替
   - 不支持新的Map、Set等数据结构

3. vue3中为了解决以上问题，使用原生的Proxy代替：

   ```
   function defineReactive(obj) {
     return new Proxy(obj, {
       get(target, key) {
         track(target, key)
         return Reflect.get(target, key)
       },
       set(target, key, val) {
         Reflect.set(target, key, val)
         trigger(target, key)
       },
       deleteProperty(target, key) {
         Reflect.deleteProperty(target, key)
         trigger(target, key)
       }
     })
   }
   ```

   可以同时支持object和array，动态属性增、删都可以拦截，新增数据结构均支持，对象嵌套属性运行时递归，用到才代理，也不需要维护特别多的依赖关系，性能取得很大进步。

