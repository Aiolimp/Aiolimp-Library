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
