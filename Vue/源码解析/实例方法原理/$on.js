// $on(event,callback)
// event：可以是字符串或者数组(多个$emit触发)
// callback： 回调函数，返回$emit传入的参数
// 监听当前实例上的自定义事件，事件可以由$emit触发。回调函数会接收所有传入事件所触发的函数的额外参数。

$on('test', (msg) => {
    console.log(msg) // hello
})

$emit('test', 'hello')

// 原理：
Vue.prototype.$on = function (event, fn) {
    const vm = this
    // 当event是数组时，需要遍历数组，将其中的每一项递归调用$on
    if (Array.isArray(event)) {
        for (let i = 0; i < event.length; i++) {
            this.$on(event[i], fn)
        }
    } else {
        // vm._events是一个对象，用来存储事件。将回调存储到事件列表中
        (vm._events[event] || (vm._evenst[event] = [])).push(fn)
    }
    return vm
}
// 在代码中使用事件名（event）从vm._events中取出事件列表，如果列表不存在，则使用空数组初始化，然后再将回调函数添加到事件列表中
// vm._events：在执行new Vue()时，Vue会执行this._init方法进行一系列初始化操作，其中就会在Vue.js的实例上创建_events属性，用来存储事件; vm._events = Object.create(null)