const { initState } = require('./state')
const { compileToFunctions } = require('./compiler/index.js')

function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this

        vm.$options = options

        initState(vm)

        if(vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }

    // 把$mount函数挂在Vue的原型上
    Vue.prototype.$mount = function(el) {
        // 使用vm变量获取Vue实例（也就是this）
        const vm = this
        // 获取vm上的$options
        // $options是在_init的时候就绑再vm上了
        const options = vm.$options

        // 获取传进来的doml
        
        el = document.querySelector(el)
        // el = {}

        // 如果options里没有render函数属性
        if (!options.render) {

            // 获取options里的template属性
            let template = options.template


            // 如果template属性也没有，但是dom获取到了
            if (!template && el) {
                // 那就把dom的outerHTML赋值给template属性
                template = el.outerHTML
            }

            // 如果有template属性有的话
            if (template) {
                // 那就把template传入compileToFunctions函数，生成一个render函数
                const render = compileToFunctions(template)
                // 把生成的render函数赋值到options的render属性上
                options.render = render
            }
        }

        // 记得return出Vue实例（也就是this）
        // 为了let vue = new Vue().$mount('#a')之后，能通过vue变量去访问这个Vue实例
        return this
    }
}

module.exports = {
    initMixin: initMixin
}