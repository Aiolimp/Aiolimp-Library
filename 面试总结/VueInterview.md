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

### 10.params 和 query 的区别

用法：query 要用 path 来引入，params 要用 name 来引入，接收参数都是类似的，分别是 `this.$route.query.name` 和 `this.$route.params.name` 。url 地址显示：query 更加类似于我们 ajax 中 get 传参，params 则类似于 post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示

注意点：query 刷新不会丢失 query 里面的数据 params 刷新 会 丢失 params 里面的数据。

- router 为 VueRouter 实例，想要导航到不同 URL，则使用 router.push 方法
- $route 为当前 router 跳转对象，里面可以获取 name、path、query、params 等

### 11.vue中Key的作用

key的作用主要是为了更高效的更新虚拟DOM。vue在patch过程中**判断两个节点是否是相同节点时key是一个必要条件**，渲染一组列表时，key往往是它的唯一标识，所以如果不定义key的话，它的值就是undefined，则永远认为这是两个相同节点，这导致了频繁更新元素，使得整个patch过程性能降低。

### 12.如果子组件改变props里的数据会发生什么

#### 改变的props数据是基本类型

> 如果修改的是基本类型，则会报错

```js
props: {
    num: Number,
  }
created() {
    this.num = 999
  }
```

#### 改变的props数据是引用类型

```js
props: {
    item: {
      default: () => {},
    }
  }
created() {
    // 不报错，并且父级数据会跟着变
    this.item.name = 'sanxin';
    
    // 会报错，跟基础类型报错一样
    this.item = 'sss'
  },
```

### 13.Vue的el属性和$mount优先级？

> 比如下面这种情况，Vue会渲染到哪个节点上

```js
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#ggg')
```

> 这是官方的一张图，可以看出`el`和`$mount`同时存在时，`el优先级` > `$mount`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da6331091cb145459e0b543c76e9bfc6~tplv-k3u1fbpfcp-watermark.awebp)

### 14. 相同的路由组件如何重新渲染？

> 开发人员经常遇到的情况是，多个路由解析为同一个Vue组件。问题是，Vue出于性能原因，默认情况下共享组件将不会重新渲染，如果你尝试在使用相同组件的路由之间进行切换，则不会发生任何变化。

```js
const routes = [
  {
    path: "/a",
    component: MyComponent
  },
  {
    path: "/b",
    component: MyComponent
  },
];
```

> 如果依然想重新渲染，怎么办呢？可以使用`key`

```js
<template>
    <router-view :key="$route.path"></router-view>
</template>
```

### 15.如何将获取data中某一个数据的初始状态？

> 在开发中，有时候需要拿初始状态去计算。例如

```js
data() {
    return {
      num: 10
  },
mounted() {
    this.num = 1000
  },
methods: {
    howMuch() {
        // 计算出num增加了多少，那就是1000 - 初始值
        // 可以通过this.$options.data().xxx来获取初始值
        console.log(1000 - this.$options.data().num)
    }
  }
```

### 15.分别简述 computed 和 watch 的使用场景

- `computed` : 当一个属性受多个属性影响的时候就需要用到 `computed` ，最典型的栗子：购物车商品结算的时候
- `watch` : 当一条数据影响多条数据的时候就需要用 `watch` ，栗子：搜索数据

### 16.单页面应用和多页面应用区别及优缺点

单页面应用（SPA），通俗一点说就是指只有一个主页面的应用，浏览器一开始要加载所有必须的 html, js, css。所有的页面内容都包含在这个所谓的主页面中。但在写的时候，还是会分开写（页面片段），然后在交互的时候由路由程序动态载入，单页面的页面跳转，仅刷新局部资源。多应用于 pc 端。

多页面（MPA），就是指一个应用中有多个页面，页面跳转时是整页刷新

单页面的优点：用户体验好，快，内容的改变不需要重新加载整个页面，基于这一点 spa 对服务器压力较小；前后端分离；页面效果会比较炫酷（比如切换页面内容时的专场动画）。

单页面缺点：不利于 seo；导航不可用，如果一定要导航需要自行实现前进、后退。（由于是单页面不能用浏览器的前进后退功能，所以需要自己建立堆栈管理）；初次加载时耗时多；页面复杂度提高很多。

### 13.assets 和 static 的区别

### 17.Vue-router 跳转和 location.href 有什么区别

使用 `location.href= /url `来跳转，简单方便，但是刷新了页面

引进 router ，然后使用 `router.push( /url )` 来跳转，使用了 `diff` 算法，实现了按需加载，减少了 dom 的消耗。其实使用 router 跳转和使用 `history.pushState()` 没什么差别的，因为 vue-router 就是用了 `history.pushState()` ，尤其是在 history 模式下。

### 18.双向绑定

我做过测试，输出包含v-model模板的组件渲染函数，发现它会被转换为value属性的绑定以及一个事件监听，事件回调函数中会做相应变量更新操作，这说明神奇魔法实际上是vue的编译器完成的。

双向绑定v-model通常用在表单项上，可以绑定一个动态值到视图，同时视图的改变也能改变改值。v-model是一种语法糖，相当于：value和@input，使用v-model可以减少繁琐的事件处理代码，提高开发效率，在原生表单上可以直接使用v-model，自定义组件上如果要使用它需要在组件内绑定value并处理事件。



**v-model和sync修饰符有什么区别**：.

v-model针对更多的是最终操作结果，是双向绑定的结果，是value，是一种change操作。

sync针对更多的是各种各样的状态，是状态的互相传递，是status，是一种update操作。

### 19.你了解vue中的diff算法吗？

1. diff算法是虚拟DOM技术的产物，vue里面实际叫做patch，它的核心实现来自于snabbdom；通过新旧虚拟DOM作对比（即patch），将变化的地方转换为DOM操作
2. 在vue 1中是没有patch的，因为界面中每个依赖都有专门的watcher负责更新，这样项目规模变大就会成为性能瓶颈，vue 2中为了降低watcher粒度，每个组件只有一个watcher，但是当需要更新的时候，怎样才能精确找到发生变化的地方？这就需要引入patch才行。
3. 组件中数据发生变化时，对应的watcher会通知更新并执行其更新函数，它会执行渲染函数获取全新虚拟dom：newVnode，此时就会执行patch比对上次渲染结果oldVnode和新的渲染结果newVnode。
4. patch过程遵循深度优先、同层比较的策略；两个节点之间比较时，如果它们拥有子节点，会先比较子节点；比较两组子节点时，会假设头尾节点可能相同先做尝试，没有找到相同节点后才按照通用方式遍历查找；查找结束再按情况处理剩下的节点；借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

diff算法是一种优化手段，将前后两个模块进行差异化对比，修补(更新)差异的过程叫做patch，也就是打补丁。diff算法比较的是虚拟 DOM，虚拟DOM是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。当虚拟 DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上。在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。同时借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

### 20.VUEX

1. vuex是vue专用的状态管理库。它以全局方式集中管理应用的状态，并且可以保证状态变更的可预测性。
2. vuex主要解决的问题是多组件之间状态共享的问题，利用各种组件通信方式，我们虽然能够做到状态共享，但是往往需要在多个组件之间保持状态的一致性，这种模式很容易出现问题，也会使程序逻辑变得复杂。vuex通过把组件的共享状态抽取出来，以全局单例模式管理，这样任何组件都能用一致的方式获取和修改状态，响应式的数据也能够保证简洁的单向数据流动，我们的代码将变得更结构化且易维护。
3. vuex并非必须的，它帮我们管理共享状态，但却带来更多的概念和框架。如果我们不打算开发大型单页应用或者我们的应用并没有大量全局的状态需要维护，完全没有使用vuex的必要。一个简单的[store 模式](https://cn.vuejs.org/v2/guide/state-management.html#简单状态管理起步使用)就足够了。反之，Vuex 将会成为自然而然的选择。引用 Redux 的作者 Dan Abramov 的话说就是：Flux 架构就像眼镜：您自会知道什么时候需要它。
4. 我在使用vuex过程中有如下理解：首先是对核心概念的理解和运用，将全局状态放入state对象中，它本身一棵状态树，组件中使用store实例的state访问这些状态；然后有配套的mutation方法修改这些状态，并且只能用mutation修改状态，在组件中调用commit方法提交mutation；如果应用中有异步操作或者复杂逻辑组合，我们需要编写action，执行结束如果有状态修改仍然需要提交mutation，组件中调用这些action使用dispatch方法派发。最后是模块化，通过modules选项组织拆分出去的各个子模块，在访问状态时注意添加子模块的名称，如果子模块有设置namespace，那么在提交mutation和派发action时还需要额外的命名空间前缀。
5. vuex在实现单项数据流时需要做到数据的响应式，通过源码的学习发现是借用了vue的数据响应化特性实现的，它会利用Vue将state作为data对其进行响应化处理，从而使得这些状态发生变化时，能够导致组件重新渲染。

vuex是vue专用的状态管理库，它主要解决多组件之间状态共享的问题，vuex通过把组件的共享状态抽取出来，以全局单例模式管理，这样任何组件都能用一致的方式获取和修改状态，使我们的代码将变得更结构化且易维护。

自己对vuex过程的理解：首先是vuex的核心概念，将全局状态放入state对象中，它本身一棵状态树，组件中使用store实例的state访问这些状态；然后有配套的mutation方法修改这些状态，在组件中调用commit方法提交mutation；如果应用中有异步操作或者复杂逻辑组合，我们需要编写action，执行结束如果有状态修改，仍然需要提交mutation，组件中调用这些action使用dispatch方法派发。最后是模块化，通过modules选项组织拆分出去的各个子模块，在访问状态时注意添加子模块的名称，如果子模块有设置namespace为true，那么在提交mutation和派发action时还需要额外的命名空间前缀。

### 21.vue-router中如何保护路由？

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

### 22.你了解哪些Vue性能优化方法？

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

### 23.你知道nextTick吗，它是干什么的，实现原理是什么？

1. nextTick是Vue提供的一个全局API，由于vue的异步更新策略导致我们对数据的修改不会立刻体现在dom变化上，此时如果想要立即获取更新后的dom状态，就需要使用这个方法
2. Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。nextTick方法会在队列中加入一个回调函数，确保该函数在前面的dom操作完成后才调用。
3. 所以当我们想在修改数据后立即看到dom执行结果就需要用到nextTick方法。
4. 比如，我在干什么的时候就会使用nextTick，传一个回调函数进去，在里面执行dom操作即可。
5. 我也有简单了解nextTick实现，它会在callbacks里面加入我们传入的函数，然后用timerFunc异步方式调用它们，首选的异步方式会是Promise。这让我明白了为什么可以在nextTick中看到dom操作结果。

nextTick是Vue提供的一个全局API，因为vue在更新DOM时是异步执行的，导致我们在修改数据时，不会立刻体现在DOM变化上，nextTick方法会在vue数据变化的队列中加入一个回调函数，在里面执行dom操作，这样就可以立即获取更新后的dom变化

### 24.说一说你对vue响应式理解？

1. 所谓数据响应式就是能够使数据变化可以被检测并对这种变化做出响应的机制。
2. mvvm框架中要解决的一个核心问题是连接数据层和视图层，通过数据驱动应用，数据变化，视图更新，要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理。
3. 以vue为例说明，通过数据响应式加上虚拟DOM和patch算法，可以使我们只需要操作数据，完全不用接触繁琐的dom操作，从而大大提升开发效率，降低开发难度。
4. vue2中的数据响应式会根据数据类型来做不同处理，如果是对象则采用Object.defineProperty()的方式定义数据拦截，当数据被访问或发生变化时，我们感知并作出响应；如果是数组则通过覆盖该数组原型的方法，扩展它的7个变更方法，使这些方法可以额外的做更新通知，从而作出响应。这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：比如初始化时的递归遍历会造成性能损失；新增或删除属性时需要用户使用Vue.set/delete这样特殊的api才能生效；对于es6中新产生的Map、Set这些数据结构不支持等问题。
5. 为了解决这些问题，vue3重新编写了这一部分的实现：利用ES6的Proxy机制代理要响应化的数据，它有很多好处，编程体验是一致的，不需要使用特殊api，初始化性能和内存消耗都得到了大幅改善；另外由于响应化的实现代码抽取为独立的reactivity包，使得我们可以更灵活的使用它，我们甚至不需要引入vue都可以体验。

数据响应式就是能够使数据变化可以被检测并对这种变化做出响应的机制。mvvm框架中要解决的一个核心问题是连接数据层和视图层，进行数据变化，视图更新，要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理。以vue为例说明，通过数据响应式加上虚拟DOM和patch算法，可以使我们只需要操作数据，完全不用接触繁琐的dom操作，从而大大提升开发效率，降低开发难度。

### 25.你如果想要扩展某个Vue组件时会怎么做？

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

### 26.Vue2和Vue3中的响应式原理对比，分别的具体实现思路

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

### 27.Vue2.0 响应式数据的原理

整体思路是数据劫持+观察者模式


首先判断传进来的值是对象还是数组，如果是对象，内部通过递归调用defineReactive方法，使用 Object.defineProperty 将属性进行劫持，拦截对象里每个key的get和set属性，在get里进行依赖收集`dep.depend（）`，在set`dep.notify()`方法里进行派发更新。如果是数组通过重写数组的方法，对数组中的对象继续进行数据劫持。当页面使用对应属性时，每个属性都拥有自己的 dep 属性，存放他所依赖的 watcher（依赖收集），当属性变化后会通知自己对应的 watcher 去派发更新。通过 Object.defineProperty （）把data中的数据代理到VUE实例上面，就可以直接使用this.进行调用。

### 28.Vue2.0模板编译原理

#### vue渲染过程

渲染的方式：**无论什么情况，最后都统一是要使用render函数渲染**

- 渲染到哪个根节点上 
  - 判断有无el属性，有的话直接获取el根节点，没有的话调用$mount去获取根节点
- 渲染哪个模板
  - 有render：这时候优先执行render函数，render优先级 > template
  - 无render：
    - 有template：拿template去解析成render函数的所需的格式，并使用调用render函数渲染
    - 无template：拿el根节点的outerHTML去解析成render函数的所需的格式，并使用调用render函数渲染

Vue 的编译过程就是将 template 转化为 render 函数的过程 分为以下三步

第一步是将 模板字符串template 解析成`抽象语法树（AST）`（解析器）
第二步是对 AST 进行静态节点标记，主要用来做虚拟DOM的渲染优化（优化器）
第三步是 将`抽象语法树（AST）`转成render渲染所需的格式

### 29.Vue2.0初始渲染原理

- 将渲染函数`_render`和视图更新函数`_update`挂载在Vue的原型上
- 通过创建元素的元素和文本的虚拟节点来将render函数渲染成虚拟dom
- 通过patch方法比较新旧节点将虚拟dom转化为真实dom

### 30.虚拟 DOM 是什么 有什么优缺点

由于在浏览器中操作 DOM 是很昂贵的。频繁的操作 DOM，会产生一定的性能问题。这就是虚拟 Dom 的产生原因。Vue2 的 Virtual DOM 借鉴了开源库 snabbdom 的实现。Virtual DOM 本质就是用一个原生的 JS 对象去描述一个 DOM 节点，是对真实 DOM 的一层抽象。

**优点：**

1. 保证性能下限： 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
2. 无需手动操作 DOM： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
3. 跨平台： 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

**缺点:**

1. 无法进行极致优化： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。
2. 首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，会比 innerHTML 插入慢。

### 31. v-model 原理

v-model 只是语法糖而已

v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

- text 和 textarea 元素使用 value property 和 input 事件；
- checkbox 和 radio 使用 checked property 和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

> 注意:对于需要使用输入法 (如中文、日文、韩文等) 的语言，你会发现 v-model 不会在输入法组合文字过程中得到更新。

在普通标签上

```javascript
    <input v-model="sth" />  //这一行等于下一行
    <input v-bind:value="sth" v-on:input="sth = $event.target.value" />
```

在组件上

```html
<currency-input v-model="price"></currentcy-input>
<!--上行代码是下行的语法糖
 <currency-input :value="price" @input="price = arguments[0]"></currency-input>
-->

<!-- 子组件定义 -->
Vue.component('currency-input', {
 template: `
  <span>
   <input
    ref="input"
    :value="value"
    @input="$emit('input', $event.target.value)"
   >
  </span>
 `,
 props: ['value'],
})
```

### 32. v-for 为什么要加 key

如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速

**更准确**：因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。

**更快速**：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快

### 33. Vue 事件绑定原理

原生事件绑定是通过 addEventListener 绑定给真实元素的，组件事件绑定是通过 Vue 自定义的$on 实现的。如果要在组件上使用原生事件，需要加.native 修饰符，这样就相当于在父组件中把子组件当做普通 html 标签，然后加上原生事件。

$on、$emit 是基于发布订阅模式的，维护一个事件中心，on 的时候将事件按名称存在事件中心里，称之为订阅者，然后 emit 将对应的事件进行发布，去执行事件中心里的对应的监听器

### 34. vue-router 动态路由是什么 有什么问题

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```javascript
const User = {
  template: "<div>User</div>",
};

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User },
  ],
});
```

> 问题:vue-router 组件复用导致路由参数失效怎么办？

解决方法：

1.通过 watch 监听路由参数再发请求

```javascript
watch: { //通过watch来监听路由变化

 "$route": function(){
 this.getData(this.$route.params.xxx);
 }
}
```

2.用 :key 来阻止“复用”

```html
<router-view :key="$route.fullPath" />
```

### 34. 使用过 Vue SSR 吗？说说 SSR

SSR 也就是服务端渲染，也就是将 Vue 在客户端把标签渲染成 HTML 的工作放在服务端完成，然后再把 html 直接返回给客户端。

**优点：**

SSR 有着更好的 SEO、并且首屏加载速度更快

**缺点：** 开发条件会受到限制，服务器端渲染只支持 beforeCreate 和 created 两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 Node.js 的运行环境。

服务器会有更大的负载需求

### 35. vue 中使用了哪些设计模式

1.工厂模式 - 传入参数即可创建实例

虚拟 DOM 根据参数的不同返回基础标签的 Vnode 和组件 Vnode

2.单例模式 - 整个程序有且仅有一个实例

vuex 和 vue-router 的插件注册方法 install 判断如果系统存在实例就直接返回掉

3.发布-订阅模式 (vue 事件机制)

4.观察者模式 (响应式数据原理)

5.装饰模式: (@装饰器的用法)

6.策略模式 策略模式指对象有某个行为,但是在不同的场景中,该行为有不同的实现方案-比如选项的合并策略

#### 36. 你都做过哪些 Vue 的性能优化

> 这里只列举针对 Vue 的性能优化 整个项目的性能优化是一个大工程 可以另写一篇性能优化的文章 哈哈

- 对象层级不要过深，否则性能就会差
- 不需要响应式的数据不要放到 data 中（可以用 Object.freeze() 冻结数据）
- v-if 和 v-show 区分使用场景
- computed 和 watch 区分使用场景
- v-for 遍历必须加 key，key 最好是 id 值，且避免同时使用 v-if
- 大数据列表和表格性能优化-虚拟列表/虚拟表格
- 防止内部泄漏，组件销毁后把全局变量和事件销毁
- 图片懒加载
- 路由懒加载
- 第三方插件的按需引入
- 适当采用 keep-alive 缓存组件
- 防抖、节流运用
- 服务端渲染 SSR or 预渲染

### 37. 能说下 vue-router 中常用的路由模式实现原理吗

**hash 模式**

1. location.hash 的值实际就是 URL 中#后面的东西 它的特点在于：hash 虽然出现 URL 中，但不会被包含在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
2. 可以为 hash 的改变添加监听事件

```javascript
window.addEventListener("hashchange", funcRef, false);
```

每一次改变 hash（window.location.hash），都会在浏览器的访问历史中增加一个记录利用 hash 的以上特点，就可以来实现前端路由“更新视图但不重新请求页面”的功能了

> 特点：兼容性好但是不美观

**history 模式**

利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。

这两个方法应用于浏览器的历史记录站，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。这两个方法有个共同的特点：当调用他们修改浏览器历史记录栈后，虽然当前 URL 改变了，但浏览器不会刷新页面，这就为单页应用前端路由“更新视图但不重新请求页面”提供了基础。

> 特点：虽然美观，但是刷新会出现 404 需要后端进行配置



