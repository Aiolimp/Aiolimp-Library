## 初次渲染原理

### 1. 步骤

![在这里插入图片描述](https://img-blog.csdnimg.cn/658bad7234634dd0bac467c45b8fa05a.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0Fpb2xpbXA=,size_16,color_FFFFFF,t_70)

$mountmountComponent_render执行获得虚拟DOM_update执行将虚拟DOM转真实DOM并渲染

### 2.组件挂载入口

```js
// src/init.js

Vue.prototype.$mount = function (el) {
  const vm = this;
  const options = vm.$options;
  el = document.querySelector(el);

  // 如果不存在render属性
  if (!options.render) {
    // 如果存在template属性
    let template = options.template;

    if (!template && el) {
      // 如果不存在render和template 但是存在el属性 直接将模板赋值到el所在的外层html结构（就是el本身 并不是父元素）
      template = el.outerHTML;
    }

    // 最终需要把tempalte模板转化成render函数
    if (template) {
      const render = compileToFunctions(template);
      options.render = render;
    }
  }

  // 将当前组件实例挂载到真实的el节点上面
  return mountComponent(vm, el);
};
```

`mountComponent `就是组件实例挂载的入口函数 这个方法放在源码的 `lifecycle `文件里面 代表了与生命周期相关 因为我们组件初始渲染前后对应有 `beforeMount `和 `mounted `生命周期钩子

### 2. 初始化Vue

```js
const { initMixin } = require('./init')
const { lifecycleMixin } = require('./lifecycle')
const { renderMixin } = require("./render")

function Vue(options) {
    this._init(options)
}

initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)
```

### 3. mountComponent函数（渲染的入口函数）

```js
// lifecycle.js


const { patch } = require('./vdom/patch')

function mountComponent (vm, el) {
    vm.$el = el;

    // 上一节讲到把模板编译成render函数渲染所需格式
    // 那么这一节就需要执行_render函数，来调用render函数生成虚拟DOM
    // 然后接收返回值虚拟DOM，调用_update函数把虚拟DOM转为真实DOM并渲染
    vm._update(vm._render())

    return vm
}

function lifecycleMixin(Vue) {
    // 将_update挂在Vue原型上
    Vue.prototype._update = function (vnode) {
        const vm = this

        // 执行patch函数，patch函数在下面有讲
        vm.$el = patch(vm.$el, vnode) || vm.$el
    }
}

module.exports = {
    mountComponent,
    lifecycleMixin
}
```

新建` lifecycle.js` 文件 表示生命周期相关功能 核心导出 `mountComponent `函数 主要使用 `vm._update(vm._render())`方法进行实例挂载。

### 4. _render函数（执行render函数，获得虚拟DOM）

```js
// render.js


const { createElement, createTextNode } = require('./vdom/index')

function renderMixin(Vue) {
    // 将_render函数挂在Vue原型上
    Vue.prototype._render = function() {
        const vm = this

        // 把上一节生成的render函数取出来
        const { render } = vm.$options

        // 执行render函数并获得虚拟DOM
        const vnode = render.call(vm)

        return vnode 
    }

    // 创建元素节点虚拟DOM
    Vue.prototype._c = function(...args) {
        return createElement(...args)
    }

    // 创建文本节点虚拟DOM
    Vue.prototype._v = function (text) {
        return createTextNode(text)
    }

    // 对象的情况，把对象转成字符串
    Vue.prototype._s = function (val) {
        return val === null ? '' : typeof val === 'object' ? JSON.stringify(val) : val
    }
}

module.exports = {
    renderMixin
}
```

> 下面是创建虚拟DOM的具体所需函数以及类

```js
// vdom/index.js


// 创建某一个节点的虚拟DOM
class Vnode {
    constructor(tag, data, key, children, text) {
        this.tag = tag
        this.data = data
        this.key = key
        this.children = children
        this.text = text
    }
}

// 创建元素节点虚拟DOM
function createElement(tag, data= {}, ...children) {
    const key = data.key
    return new Vnode(tag, data, key, children)
}

// 创建文本节点虚拟DOM
function createTextNode(text) {
    return new Vnode(undefined, undefined, undefined, undefined, text)
}

module.exports = {
    createElement,
    createTextNode
}
```

### 5. patch函数（将虚拟DOM转真实DOM并渲染）

```js
// vdom/patch.js


function patch(oldVnode, vnode) {
    // 本节只讲初次渲染
    // 初次渲染时oldVnode就是el节点，以后非初次渲染时，oldVnode就是上一次的虚拟DOM

    // 判断oldVnode的类型
    const isRealElement = oldVnode.nodeType
    if (isRealElement) {
        // 初次渲染
        const oldElm = oldVnode
        const parentElm = oldElm.parentNode

        // 生成真实DOM对象
        const el = createElm(vnode)

        // 将生成的真实DOM。插入到el的下一个节点的前面
        // 也就是插到el的后面
        // 不直接appendChild是因为可能页面中有其他el同级节点，不能破坏顺序
        parentElm.insertBefore(el, oldElm.nextSibling)

        // 删除老el节点
        parentElm.removeChild(oldVnode)

        return el
    }
}

// 虚拟DOM生成真实DOM
function createElm(vnode) {
    const { tag, data, key, children, text } = vnode

    // 判断是元素节点还是文本节点
    if (typeof tag === 'string') {
        // 创建标签
        vnode.el = document.createElement(tag)

        // 解析虚拟DOM属性
        updateProperties(vnode)

        // 递归，将子节点也生成真实DOM
        children.forEach(child => {
            return vnode.el.appendChild(createElm(child))
        })
    } else {
        // 文本节点直接创建
        vnode.el = document.createTextNode(text)
    }

    return vnode.el
}

// 解析虚拟DOM的属性
function updateProperties(vnode) {
    const newProps = vnode.data || {}
    const el = vnode.el
    for(let key in newProps) {
        if (key === 'style') {
            // style的处理
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if (key === 'class') {
            // class的处理
            el.className = newProps.class
        } else {
            // 调用dom的setAttribute进行属性设置
            el.setAttribute(key, newProps[key])
        }
    }
}

module.exports = {
    patch
}
```

_update 核心方法就是 patch 初始渲染和后续更新都是共用这一个方法 只是传入的第一个参数不同 初始渲染总体思路就是根据虚拟 `dom(vnode)` 调用原生 js 方法创建真实 dom 节点并替换掉 el 选项的位置

### 6. 具体流程图

![在这里插入图片描述](https://img-blog.csdnimg.cn/f7e8705f493d4a798ea0f740063bdcf8.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0Fpb2xpbXA=,size_16,color_FFFFFF,t_70)
