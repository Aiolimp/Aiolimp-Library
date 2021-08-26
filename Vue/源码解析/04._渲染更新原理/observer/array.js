// 数组的派发更新,关键代码就是 ob.dep.notify()

methodsToPatch.forEach((method) => {
    arrayMethods[method] = function (...args) {
        //   这里保留原型方法的执行结果
        const result = arrayProto[method].apply(this, args);
        // 这句话是关键
        // this代表的就是数据本身 比如数据是{a:[1,2,3]} 那么我们使用a.push(4)  this就是a  ob就是a.__ob__ 这个属性代表的是该数据已经被响应式观察过了 __ob__对象指的就是Observer实例
        const ob = this.__ob__;
        let inserted;
        switch (method) {
            case "push":
            case "unshift":
                inserted = args;
                break;
            case "splice":
                inserted = args.slice(2);
            default:
                break;
        }
        if (inserted) ob.observeArray(inserted); // 对新增的每一项进行观测
        ob.dep.notify(); //数组派发更新 ob指的就是数组对应的Observer实例 我们在get的时候判断如果属性的值还是对象那么就在Observer实例的dep收集依赖 所以这里是一一对应的  可以直接更新
        return result;
    };
});