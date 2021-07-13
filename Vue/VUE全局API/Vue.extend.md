## Vue.extend

- [Vue.extend](#vueextend)
- [官方文档](#官方文档)
  - [Vue.extend( options )](#vueextend-options-)
- [为什么使用 extend](#为什么使用-extend)
- [简单示例](#简单示例)
- [实现 alert 方法](#实现-alert-方法)
        - [main.vue](#mainvue)
        - [index.js](#indexjs)
      - [使用](#使用)

## 官方文档

> 学习开始之前我们先来看一下官方文档是怎么描述的。

### [Vue.extend( options )](https://cn.vuejs.org/v2/api/index.html#Vue-extend)

- **参数**：

  - `{Object} options`

- **用法**：

  使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

  `data` 选项是特例，需要注意 - 在 `Vue.extend()` 中它必须是函数

  ```html
  <div id="mount-point"></div>
  ```

  ```js
  // 创建构造器
  var Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function () {
      return {
        firstName: 'Walter',- [官方文档](#官方文档)
  - [Vue.extend( options )](#vueextend-options-)

        lastName: 'White',
        alias: 'Heisenberg'
      }
    }
  })
  // 创建 Profile 实例，并挂载到一个元素上。
  new Profile().$mount('#mount-point')
  ```

  结果如下：

  ```html
  <p>Walter White aka Heisenberg</p>
  ```

- **参考**：[组件](https://cn.vuejs.org/v2/guide/components.html)

可以看到，`extend` 创建的是 Vue 构造器，而不是我们平时常写的组件实例，所以不可以通过 `new Vue({ components: testExtend })` 来直接使用，需要通过 `new Profile().$mount('#mount-point')` 来挂载到指定的元素上。

## 为什么使用 extend

在 vue 项目中，我们有了初始化的根实例后，所有页面基本上都是通过 router 来管理，组件也是通过 `import` 来进行局部注册，所以组件的创建我们不需要去关注，相比 `extend` 要更省心一点点。但是这样做会有几个缺点：

1. 组件模板都是事先定义好的，如果我要从接口动态渲染组件怎么办？
2. 所有内容都是在 `#app` 下渲染，注册组件都是在当前位置渲染。如果我要实现一个类似于 `window.alert()` 提示组件要求像调用 JS 函数一样调用它，该怎么办？

这时候，`Vue.extend + vm.$mount` 组合就派上用场了。

## 简单示例

我们照着官方文档来创建一个示例：

```js
import Vue from "vue";

const testComponent = Vue.extend({
  template: "<div>{{ text }}</div>",
  data: function () {
    return {
      text: "extend test",
    };
  },
});
```

然后我们将它手动渲染：

```js
const extendComponent = new testComponent().$mount();
```

这时候，我们就将组件渲染挂载到 `body` 节点上了。

我们可以通过 `$el` 属性来访问 `extendComponent` 组件实例：

```js
document.body.appendChild(extendComponent.$el);
```

如果想深入掌握 extend 知识，不妨做一个 alert 组件来实现类似于原生的全局调用。

## 实现 alert 方法

我们需要新建一个目录，目录中有俩个文件 index.js 和 main.vue

###### main.vue

```xml
<template>
  <transition name="el-message-fade">
    <div  v-show="visible" class="my-msg">{{message}}</div>
  </transition>
</template>

<script  >
  export default{
    data(){
      return{
        message:'',  //需要提示用户的内容
        visible:true //线上与隐藏
      }
    },
    methods:{
      close(){
        setTimeout(()=>{
          this.$emit("results","test"); // 自定义方法
          this.visible = false; // 隐藏元素
          this.$el.remove(); // 移除DOM
        },2000)
      },
    },
    mounted() {
      this.close();
    }
  }
</script>
```

###### index.js

```jsx
import Vue from "vue";
import main from "./main.vue";
let MyAlertConstructor = Vue.extend(main);
let instance;
var MyAlert = function (message) {
  //自定义传入的参数
  // 创建实例并且过滤参数
  instance = new MyAlertConstructor({
    data: {
      message: message,
    },
  });
  // 挂载实例
  instance.$mount();
  document.body.appendChild(instance.$el);
  return instance;
};
export default MyAlert;
```

##### 使用

```tsx
import Hint from '../brick/Hint/index.js'
Hint({name : 'name'}).$on('results', (text) => {
        console.log(text);
```
