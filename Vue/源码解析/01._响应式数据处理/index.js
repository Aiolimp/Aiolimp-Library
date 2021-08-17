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
    render: () => { }
})
