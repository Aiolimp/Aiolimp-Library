
//渲染函数的入口
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
