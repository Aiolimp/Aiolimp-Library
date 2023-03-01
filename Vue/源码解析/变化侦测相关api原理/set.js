export default function set(target, key, val) {
    // 1. Array的处理
    // 判断target是否为数组
    if (Array.isArray(target)) {
        // 如果传递的索引值大于当前的数组length，则需要让target的length等于索引值
        target.length = Math.max(target.length, key)
        // 通过splice方法把val设置到target中的指定位置，数组拦截去会侦测到target发生了变化，并且会自动帮助我们把这个新增的val转换成响应式的;
        target.splice(key, 1, val)
        // 返回val
        return val
    }
    // 2. key已经存在于target中，直接修改数据
    if (key in target && !(key in target.prototype)) {
        target[key] = val
        return val
    }
    // 3. 处理新增属性
    // 获取target的__ob__属性，如果target身上没有__ob__属性，说明它并不是响应式的，直接通过key和val在target上设置;
    const ob = target.__ob__

    if (!ob) {
        target[key] = val
        return val
    }
    // 4.如果上面条件都不满足，说明是在响应式数据上新增了一个属性，需要追踪这个新属性的变化，使用defineReactive将新增属性转换成getter/setter即可。
    defineReactive(target, key, val)
    // 最后想target的依赖触发变化通知，并返回val
    return val
}
