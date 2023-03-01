export default function del (target, key) {
    // 1. 如果是数组，使用splice方法，数组拦截器会自动向依赖发送通知。
    if (Array.isArray(target)) {
        target.splice(key, 1)
        return
    }

    // 2. 如果删除的key不是target自身的属性，直接退出执行程序
    if (!(key in target)) return

    // 3. 直接调用delete 删除key值
    delete target[key]

    // 4.通过target上是否存在__ob__判断target是不是响应式数据，只有响应式数据才发送通知，非响应式只需要执行删除操作；
    const ob = target.__ob__
    
    // 如果ob不存在直接终止程序
    if (!ob) return

    ob.dep.notify()
}
