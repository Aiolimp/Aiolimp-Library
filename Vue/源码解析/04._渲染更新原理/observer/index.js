 /*
  依赖收集和派发更新的核心 其实就是在数据被访问的时候 把我们定义好的渲染Watcher 放到 dep 的 subs 数组里面 
  同时把 dep 实例对象也放到渲染 Watcher 里面去 数据更新时就可以通知 dep 的 subs 存储的 watcher 更新  
  */


// Object.defineProperty数据劫持核心 兼容性在ie9以及以上
function defineReactive(data, key, value) {
    let childOb = observe(value); // childOb就是Observer实例
  
    let dep = new Dep(); // 为每个属性实例化一个Dep
  
    Object.defineProperty(data, key, {
      get() {
        // 页面取值的时候 可以把watcher收集到dep里面--依赖收集
        if (Dep.target) {
          // 如果有watcher dep就会保存watcher 同时watcher也会保存dep
          dep.depend();
          if (childOb) {
            // 这里表示 属性的值依然是一个对象 包含数组和对象 childOb指代的就是Observer实例对象  里面的dep进行依赖收集
            // 比如{a:[1,2,3]} 属性a对应的值是一个数组 观测数组的返回值就是对应数组的Observer实例对象
            childOb.dep.depend();
            if (Array.isArray(value)) {
              // 如果数据结构类似 {a:[1,2,[3,4,[5,6]]]} 这种数组多层嵌套  数组包含数组的情况  那么我们访问a的时候 只是对第一层的数组进行了依赖收集 里面的数组因为没访问到  所以五大收集依赖  但是如果我们改变了a里面的第二层数组的值  是需要更新页面的  所以需要对数组递归进行依赖收集
              if (Array.isArray(value)) {
                // 如果内部还是数组
                dependArray(value); // 不停的进行依赖收集
              }
            }
          }
        }
        return value;
      },
      set(newValue) {
        if (newValue === value) return;
        // 如果赋值的新值也是一个对象  需要观测
        observe(newValue);
        value = newValue;
        dep.notify(); // 通知渲染watcher去更新--派发更新
      },
    });
  }
  // 递归收集数组依赖
  function dependArray(value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
      e = value[i];
      // e.__ob__代表e已经被响应式观测了 但是没有收集依赖 所以把他们收集到自己的Observer实例的dep里面
      e && e.__ob__ && e.__ob__.dep.depend();
      if (Array.isArray(e)) {
        // 如果数组里面还有数组  就递归去收集依赖
        dependArray(e);
      }
    }
  }
  


  