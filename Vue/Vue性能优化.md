## vue性能优化总结

### 1.函数式组件

优化前代码：

```js
<template>
  <div class="cell">
    <div v-if="value" class="on"></div>
    <section v-else class="off"></section>
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>
```

优化后代码：

```js
<template functional>
  <div class="cell">
    <div v-if="props.value" class="on"></div>
    <section v-else class="off"></section>
  </div>
</template>
```

函数式组件和普通的对象类型的组件不同，它不会被看作成一个真正的组件，我们知道在 `patch` 过程中，如果遇到一个节点是组件 `vnode`，会递归执行子组件的初始化过程；而函数式组件的 `render` 生成的是普通的 `vnode`，不会有递归子组件的过程，因此渲染开销会低很多。

因此，函数式组件也不会有状态，不会有响应式数据，生命周期钩子函数这些东西。你可以把它当成把普通组件模板中的一部分 DOM 剥离出来，通过函数的方式渲染出来，是一种在 DOM 层面的复用

### 2.子组件拆分

优化前代码：

```js
<template>
  <div :style="{ opacity: number / 300 }">
    <div>{{ heavy() }}</div>
  </div>
</template>

<script>
export default {
  props: ['number'],
  methods: {
    heavy () {
      const n = 100000
      let result = 0
      for (let i = 0; i < n; i++) {
        result += Math.sqrt(Math.cos(Math.sin(42)))
      }
      return result
    }
  }
}
</script>
```

优化后代码：

```js
<template>
  <div :style="{ opacity: number / 300 }">
    <ChildComp/>
  </div>
</template>

<script>
export default {
  components: {
    ChildComp: {
      methods: {
        heavy () {
          const n = 100000
          let result = 0
          for (let i = 0; i < n; i++) {
            result += Math.sqrt(Math.cos(Math.sin(42)))
          }
          return result
        },
      },
      render (h) {
        return h('div', this.heavy())
      }
    }
  },
  props: ['number']
}
</script>
```

优化前的组件，示例通过一个 `heavy` 函数模拟了一个耗时的任务，且这个函数在每次渲染的时候都会执行一次，所以每次组件的渲染都会消耗较长的时间执行 JavaScript。

而优化后的方式是把这个耗时任务 `heavy` 函数的执行逻辑用子组件 `ChildComp` 封装了，由于 Vue 的更新是组件粒度的，虽然每一帧都通过数据修改导致了父组件的重新渲染，但是 `ChildComp` 却不会重新渲染，因为它的内部也没有任何响应式数据的变化。所以优化后的组件不会在每次渲染都执行耗时任务，自然执行的 JavaScript 时间就变少了。

#### 使用计算属性优化

```js
<template>
  <div :style="{ opacity: number / 300 }">
    <div>{{ heavy }}</div>
  </div>
</template>

<script>
export default {
  props: ['number'],
  computed: {
    heavy () {
      const n = 100000
      let result = 0
      for (let i = 0; i < n; i++) {
        result += Math.sqrt(Math.cos(Math.sin(42)))
      }
      return result
    }
  }
}
```

计算属性自身缓存特性，耗时的逻辑也只会在第一次渲染的时候执行，而且使用计算属性也没有额外渲染子组件的开销。

### 3.局部变量

优化前代码：

```js
<template>
  <div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
export default {
  props: ['start'],
  computed: {
    base () {
      return 42
    },
    result () {
      let result = this.start
      for (let i = 0; i < 1000; i++) {
        result += Math.sqrt(Math.cos(Math.sin(this.base))) + this.base * this.base + this.base + this.base * 2 + this.base * 3
      }
      return result
    },
  },
}
</script>
```

优化后代码：

```js
<template>
  <div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
export default {
  props: ['start'],
  computed: {
    base () {
      return 42
    },
    result ({ base, start }) {
      let result = start
      for (let i = 0; i < 1000; i++) {
        result += Math.sqrt(Math.cos(Math.sin(base))) + base * base + base + base * 2 + base * 3
      }
      return result
    },
  },
}
</script>
```

这里主要是优化前后的组件的计算属性 `result` 的实现差异，优化前的组件多次在计算过程中访问 `this.base`，而优化后的组件会在计算前先用局部变量 `base`，缓存 `this.base`，后面直接访问 `base`。

那么为啥这个差异会造成性能上的差异呢，原因是你每次访问 `this.base` 的时候，由于 `this.base` 是一个响应式对象，所以会触发它的 `getter`，进而会执行依赖收集相关逻辑代码。类似的逻辑执行多了，像示例这样，几百次循环更新几百个组件，每个组件触发 `computed` 重新计算，然后又多次执行依赖收集相关逻辑，性能自然就下降了。

从需求上来说，`this.base` 执行一次依赖收集就够了，把它的 `getter` 求值结果返回给局部变量 `base`，后续再次访问 `base` 的时候就不会触发 `getter`，也不会走依赖收集的逻辑了，性能自然就得到了提升。

这是一个非常实用的性能优化技巧。因为很多人在开发 Vue.js 项目的时候，每当取变量的时候就习惯性直接写 `this.xxx` 了，因为大部分人并不会注意到访问 `this.xxx` 背后做的事情。在访问次数不多的时候，性能问题并没有凸显，但是一旦访问次数变多，比如在一个大循环中多次访问，类似示例这种场景，就会产生性能问题了。

### 4.KeepAlive

优化前的组件代码如下：

```html
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
```

优化后的组件代码如下：

```html
<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
```

在非优化场景下，我们每次点击按钮切换路由视图，都会重新渲染一次组件，渲染组件就会经过组件初始化，`render`、`patch` 等过程，如果组件比较复杂，或者嵌套较深，那么整个渲染耗时就会很长。

而在使用 `KeepAlive` 后，被 `KeepAlive` 包裹的组件在经过第一次渲染后，的 `vnode` 以及 DOM 都会被缓存起来，然后再下一次再次渲染该组件的时候，直接从缓存中拿到对应的 `vnode` 和 DOM，然后渲染，并不需要再走一次组件初始化，`render` 和 `patch` 等一系列流程，减少了 `script` 的执行时间，性能更好。

但是使用 `KeepAlive` 组件并非没有成本，因为它会占用更多的内存去做缓存，这是一种典型的空间换时间优化思想的应用。

### 5.使用 `Deferred` 组件延时分批渲染组件

优化前的组件代码如下：

```html
<template>
  <div class="deferred-off">
    <VueIcon icon="fitness_center" class="gigantic"/>

    <h2>I'm an heavy page</h2>

    <Heavy v-for="n in 8" :key="n"/>

    <Heavy class="super-heavy" :n="9999999"/>
  </div>
</template>
```

优化后的组件代码如下：

```html
<template>
  <div class="deferred-on">
    <VueIcon icon="fitness_center" class="gigantic"/>

    <h2>I'm an heavy page</h2>

    <template v-if="defer(2)">
      <Heavy v-for="n in 8" :key="n"/>
    </template>

    <Heavy v-if="defer(3)" class="super-heavy" :n="9999999"/>
  </div>
</template>

<script>
import Defer from '@/mixins/Defer'

export default {
  mixins: [
    Defer(),
  ],
}
</script>
```

优化前后的差距主要是后者使用了 `Defer` 这个 `mixin`，那么它具体是怎么工作的，我们来一探究竟：

```js
export default function (count = 10) {
  return {
    data () {
      return {
        displayPriority: 0
      }
    },

    mounted () {
      this.runDisplayPriority()
    },

    methods: {
      runDisplayPriority () {
        const step = () => {
          requestAnimationFrame(() => {
            this.displayPriority++
            if (this.displayPriority < count) {
              step()
            }
          })
        }
        step()
      },

      defer (priority) {
        return this.displayPriority >= priority
      }
    }
  }
}
```

`Defer` 的主要思想就是把一个组件的一次渲染拆成多次，它内部维护了 `displayPriority` 变量，然后在通过 `requestAnimationFrame` 在每一帧渲染的时候自增，最多加到 `count`。然后使用 `Defer mixin` 的组件内部就可以通过 `v-if="defer(xxx)"` 的方式来控制在 `displayPriority` 增加到 `xxx` 的时候渲染某些区块了。

当你有渲染耗时的组件，使用 `Deferred` 做渐进式渲染是不错的注意，它能避免一次 `render` 由于 JS 执行时间过长导致渲染卡住的现象。

### 6.使用 `Non-reactive data` 非响应式数据

优化前代码如下：

```js
const data = items.map(
  item => ({
    id: uid++,
    data: item,
    vote: 0
  })
)
```

优化后代码如下：

```js
const data = items.map(
  item => optimizeItem(item)
)

function optimizeItem (item) {
  const itemData = {
    id: uid++,
    vote: 0
  }
  Object.defineProperty(itemData, 'data', {
    // Mark as non-reactive
    configurable: false,
    value: item
  })
  return itemData
}
```

之所以有这种差异，是因为内部提交的数据的时候，会默认把新提交的数据也定义成响应式，如果数据的子属性是对象形式，还会递归让子属性也变成响应式，因此当提交数据很多的时候，这个过程就变成了一个耗时过程。

而优化后我们把新提交的数据中的对象属性 `data` 手动变成了 `configurable` 为 `false`，这样内部在 `walk` 时通过 `Object.keys(obj)` 获取对象属性数组会忽略 `data`，也就不会为 `data` 这个属性 `defineReactive`，由于 `data` 指向的是一个对象，这样也就会减少递归响应式的逻辑，相当于减少了这部分的性能损耗。数据量越大，这种优化的效果就会更明显。

其实类似这种优化的方式还有很多，比如我们在组件中定义的一些数据，也不一定都要在 `data` 中定义。有些数据我们并不是用在模板中，也不需要监听它的变化，只是想在组件的上下文中共享这个数据，这个时候我们可以仅仅把这个数据挂载到组件实例 `this` 上，例如：

```js
export default {
  created() {
    this.scroll = null
  },
  mounted() {
    this.scroll = new BScroll(this.$el)
  }
}
```

这样我们就可以在组件上下文中共享 `scroll` 对象了，尽管它不是一个响应式对象。

