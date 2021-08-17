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
        if (Array.isArray(value)) {
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
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = data[key]
            // 传入data对象，key，以及value
            defineReactive(data, key, value)
        }
    }

    observeArray(items) {
        // 遍历传进来的数组，对数组的每一个元素进行响应式处理
        for (let i = 0; i < items.length; i++) {
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
