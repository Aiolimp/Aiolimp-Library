## vue 中 mixins 的使用方法

### 官方解释：

混入 (mixins)： 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

### 举个栗子：

定义一个混入对象:

```js
export default {
  data() {
    return {
      num: 1,
    };
  },
  created() {
    this.hello();
  },
  methods: {
    hello() {
      console.log('hello from mixin');
    },
  },
};
```

把混入对象混入到当前的组件中

```js
<template>
  <div>
    <h1>使用mixins</h1>
    <div>组件1</div>
  </div>
</template>

<script>
import myMixins from "@/mixins/myMinixn";
export default {
  mixins: [myMixins],
  computed: {},
  created(){
  },
  methods: {},
};
</script>
<style>
</style>
```

### mixins 的特点:

**1.方法和参数在各组件中不共享，虽然组件调用了 mixins 并将其属性合并到自身组件中来了，但是其属性只会被当前组件所识别并不会被共享，也就是其他组件无法从当前组件中获取到 mixins 中的数据和方法。**

混合对象中的参数 num

```js
export default {
  data() {
    return {
      num: 1,
    };
  },
  created() {
    this.hello();
  },
  methods: {
    hello() {
      console.log('hello from mixin');
    },
    fun_one() {
      console.log('fun_one from mixin');
    },
    fun_two() {
      console.log('fun_two from mixin');
    },
  },
};
```

组件 1 中的参数 num 进行+1 的操作

```js
<template>
  <div>
    <div>组件1里的num：{{num}}</div>
  </div>
</template>

<script>
import myMixins from "@/mixins/myMinixn";
export default {
  mixins: [myMixins],
  computed: {},
  created(){
    this.num++
  },
  methods: {},
};
</script>
<style>
</style>
```

组件 2 中的参数 num 未进行操作

```js
<template>
  <div>
    <div>
      组件2里的num:{{num}}
    </div>
  </div>
</template>

<script>
import myMixins from "@/mixins/myMinixn";
export default {
  data() {
    return {};
  },
  mixins: [myMixins],
  methods: {},
};
</script>

<style>
</style>

```

> 输出结果为：组件 1 里的 num：2
>
> 组件 2 里的 num:1

组件 1 里改变了 num 里面的值，组件 2 中的 num 值还是混入对象里的初始值。

**2.值为对象的选项，如 methods,components 等，选项会被合并，键冲突的组件会覆盖混入对象的**

混入对象中的方法

```js
export default {
  data() {
    return {
      num: 1,
    };
  },
  created() {
    this.hello();
  },
  methods: {
    hello() {
      console.log('hello from mixin');
    },
    fun_one() {
      console.log('fun_one from mixin');
    },
    fun_two() {
      console.log('fun_two from mixin');
    },
  },
};
```

组件中的方法

```js
<template>
  <div>
    <div>组件1里的num：{{num}}</div>
  </div>
</template>

<script>
import myMixins from "@/mixins/myMinixn";
export default {
  mixins: [myMixins],
  computed: {},
  created() {
    this.fun_self();
    this.fun_one();
    this.fun_two();
  },
  methods: {
    fun_self() {
      console.log("fun_self from template1");
    },
    fun_two() {
      console.log("fun_two from template1");
    },
  },
};
</script>
<style>
</style>
```

打印台的输出

![1630649546(1).jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1242dc7a8504d15acc050206ec34fec~tplv-k3u1fbpfcp-watermark.awebp)

**3 值为函数的选项，如 created,mounted 等，就会被合并调用，混合对象里的钩子函数在组件里的钩子函数之前调用** 混入对象函数中的 console

```js
export default {
  data() {
    return {
      num: 1,
    };
  },
  created() {
    console.log('hello from mixin');
  },
};
```

组件函数中的 console

```js
<template>
  <div>
    <div>组件1里的num：{{num}}</div>
  </div>
</template>

<script>
import myMixins from "@/mixins/myMinixn";
export default {
  mixins: [myMixins],
  computed: {},
  created() {
   console.log('hello from self');
  },
  methods: {
  },
};
</script>
<style>
</style>
```

控制台中的打印：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f975a42ec95b446fa55d7df421164288~tplv-k3u1fbpfcp-watermark.awebp)

### 与 vuex 的区别

vuex：用来做状态管理的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。

Mixins：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响。

### 与公共组件的区别

组件：在父组件中引入组件，相当于在父组件中给出一片独立的空间供子组件使用，然后根据 props 来传值，但本质上两者是相对独立的。

Mixins：则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件。
