大家都知道 Vue 的一个核心特点是**数据驱动** 如果按照以往 Jquery 的思想 咱们数据变化了想要同步到视图就必须要手动操作 dom 更新 但是 Vue 帮我们做到了数据变动自动更新视图的功能 那在 Vue 内部就一定有一个机制能监听到数据变化然后触发更新 本篇主要介绍**响应式数据**的原理

### 1.new一个Vue的实例

>想要使用vue，肯定要先new一个Vue实例，参数是一个对象，我们称之为`options`

```js
// index.js
// 实例一个Vue对象
let vue = new Vue({
    props: {},
    data() {
        return {
            a: 1,
            b: [1],
            c: { d: 1 }
        }
    },
    watch: {},
    render: () => {}
})

```

### 2.对options对象的初始化

> 传进来的options对象，需要对数据进行初始化

```js
// index.js
const { initMixin } = require('./init')

function Vue(options) {
    // 初始化传进来的options配置
    this._init(options)
}

// 配置Vue构造函数的_init方法
// 这么做有利于代码分割
initMixin(Vue)
// 实例一个Vue对象
let vue = new Vue({
    props: {},
    data() {
        return {
            a: 1,
            b: [1],
            c: { d: 1 }
        }
    },
    watch: {},
    render: () => {}
})
```

> 将初始化函数`_init`挂到`Vue`的原型上

```js
// init.js
const { initState } = require('./state')

function initMixin(Vue) {
    // 在Vue的原型上挂载_init函数
    Vue.prototype._init = function (options) {
        // vm变量赋值为Vue实例
        const vm = this

        // 将传进来的options对象赋值给vm上的$options变量
        vm.$options = options

        // 执行初始化状态函数
        initState(vm)
    }
}

module.exports = {
    initMixin: initMixin
}
```

> - initState：总初始化函数，初始化`props，data，watch，methods，computed`等
> - initData：初始化`data`的函数
> - proxy：代理函数，主要作用是this.data.xxx的读写可以直接this.xxx实现，少去中间的data

```js
const { observe } = require('./observer/index')

function initState(vm) {

    // 获取vm上的$options对象，也就是options配置对象
    const opts = vm.$options
    if (opts.props) {
        initProps(vm)
    }
    if (opts.methods) {
        initMethods(vm)
    }
    if (opts.data) {
        // 如有有options里有data，则初始化data
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
}

// 初始化data的函数
function initData(vm) {
    // 获取options对象里的data
    let data = vm.$options.data

    // 判断data是否为函数，是函数就执行（注意this指向vm），否则就直接赋值给vm上的_data
    // 这里建议data应为一个函数，return 一个 {}，这样做的好处是防止组件的变量污染
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

    // 为data上的每个数据都进行代理
    // 这样做的好处就是，this.data.a可以直接this.a就可以访问了
    for (let key in data) {
        proxy(vm, '_data', key)
    }


    // 对data里的数据进行响应式处理
    // 重头戏
    observe(data)
}

// 数据代理
function proxy(object, sourceData, key) {
    Object.defineProperty(object, key, {
        // 比如本来需要this.data.a才能获取到a的数据
        // 这么做之后，this.a就可以获取到a的数据了
        get() {
            return object[sourceData][key]
        },
        // 比如本来需要this.data.a = 1才能修改a的数据
        // 这么做之后，this.a = 1就能修改a的数据了
        set(newVal) {
            object[sourceData][key] = newVal
        }
    })
}

module.exports = { initState: initState }
```

### 3.响应式处理

> - Observer：观察者对象，对`对象或数组`进行响应式处理的地方
> - defineReactive：拦截对象上每一个`key`的`get与set函数`的地方
> - observe：响应式处理的入口

> 流程大概是这样：observe -> Observer -> defineReactive -> observe -> Observer -> defineReactive 递归

```js
const { arrayMethods } = require('./array')

// 观察者对象，使用es6的class来构建会比较方便
class Observer {
    constructor(value) {
        // 给传进来的value对象或者数组设置一个__ob__对象
        // 这个__ob__对象大有用处，如果value上有这个__ob__，则说明value已经做了响应式处理
        Object.defineProperty(value, '__ob__', {
            value: this, // 值为this，也就是new出来的Observer实例
            enumerable: false, // 不可被枚举
            writable: true, // 可用赋值运算符改写__ob__
            configurable: true // 可改写可删除
        })

        // 判断value是函数还是对象
        if(Array.isArray(value)) {
            // 如果是数组的话就修改数组的原型
            value.__proto__ = arrayMethods
            // 对数组进行响应式处理
            this.observeArray(value)
        } else {
            // 如果是对象，则执行walk函数对对象进行响应式处理
            this.walk(value)
        }
    }

    walk(data) {
        // 获取data对象的所有key
        let keys = Object.keys(data)
        // 遍历所有key，对每个key的值进行响应式处理
        for(let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = data[key]
            // 传入data对象，key，以及value
            defineReactive(data, key, value)
        }
    }

    observeArray(items) {
        // 遍历传进来的数组，对数组的每一个元素进行响应式处理
        for(let i = 0; i < items.length; i++) {
            observe(items[i])
        }
    }
}

function defineReactive(data, key, value) {
    // 递归重要步骤
    // 因为对象里可能有对象或者数组，所以需要递归
    observe(value)


    // 核心
    // 拦截对象里每个key的get和set属性，进行读写监听
    // 从而实现了读写都能捕捉到，响应式的底层原理
    Object.defineProperty(data, key, {
        get() {
            console.log('获取值')
            return value
        },
        set(newVal) {
            if (newVal === value) return
            console.log('设置值')
            value = newVal
        }
    })
}


function observe(value) {
    // 如果传进来的是对象或者数组，则进行响应式处理
    if (Object.prototype.toString.call(value) === '[object Object]' || Array.isArray(value)) {
        return new Observer(value)
    }
}

module.exports = {
    observe: observe
}
```

修改数组原型上的部分方法，实现修改数组触发响应式

```js
// 先保留数组原型
const arrayProto = Array.prototype;
// 然后将arrayMethods继承自数组原型
// 这里是面向切片编程思想（AOP）--不破坏封装的前提下，动态的扩展功能
export const arrayMethods = Object.create(arrayProto);
let methodsToPatch = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "reverse",
    "sort",
];
methodsToPatch.forEach((method) => {
    arrayMethods[method] = function (...args) {
        //   这里保留原型方法的执行结果
        const result = arrayProto[method].apply(this, args);
        // 这句话是关键
        // this代表的就是数据本身 比如数据是{a:[1,2,3]} 那么我们使用a.push(4)  this就是a  ob就是a.__ob__ 这个属性就是上段代码增加的 代表的是该数据已经被响应式观察过了指向Observer实例
        const ob = this.__ob__;

        // 这里的标志就是代表数组有新增操作
        let inserted;
        switch (method) {
            case "push":
            case "unshift":
                inserted = args;
                break;
            case "splice":
                inserted = args.slice(2);
            default:
                break;
        }
        // 如果有新增的元素 inserted是一个数组 调用Observer实例的observeArray对数组每一项进行观测
        if (inserted) ob.observeArray(inserted);
        // 之后咱们还可以在这里检测到数组改变了之后从而触发视图更新的操作--后续源码会揭晓
        return result;
    };
});

```



### 4.为什么对象和数组要分开处理呢：

> - `对象`的属性通常比较少，对每一个属性都劫持`set和get`，并不会消耗很多性能
> - `数组`有可能有成千上万个元素，如果每一个元素都劫持`set和get`，无疑消耗太多性能了
> - 所以`对象`通过`defineProperty`进行正常的劫持`set和get`
> - `数组`则通过`修改数组原型上的部分方法`，来实现`修改数组触发响应式`

### 5.遗留下的问题：

> - 对象新增属性时没有劫持到`set函数`，所以新增属性无法触发响应式
> - 数组修改只能通过改写的方法，无法直接arr[index] = xxx 进行修改，也无法通过length属性进行修改

### 6.Vue官方提供的解决方案

> Vue官方提供了`$set`的方法解决了以上问题，使用方法是`this.$set(obj, key, value)`

### 7.流程图

![在这里插入图片描述](https://img-blog.csdnimg.cn/b63afd36eeed400c8ed215d05b2f1264.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0Fpb2xpbXA=,size_16,color_FFFFFF,t_70)

