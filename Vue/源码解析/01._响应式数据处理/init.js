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
