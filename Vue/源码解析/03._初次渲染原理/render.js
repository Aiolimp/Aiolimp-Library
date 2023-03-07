//（执行render函数，获得虚拟DOM）
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
