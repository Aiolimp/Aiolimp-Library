  /* 实现observe 
  通过Object.defineProperty使对象变成可观察的
  */

  /*  1.首先我们定义一个 cb 函数，这个函数用来模拟视图更新，调用它即代表更新视图，内部可以是一些更新视图的方法。 */
  function cb(val) {
      /* 渲染视图 */
      console.log("视图更新啦～");
  }

  /**
   * 2.定义defineReactive，通过Object.defineProperty实现对象的'响应式'。
   * @param obj 需要绑定的对象
   * @param key obj的某一个属性
   * @param val 具体的值;
   **/

  function defineReactive(obj, key, val) {
      Object.defineProperty(obj, key, {
          enumerable: true,
          /* 属性可枚举 */
          configurable: true,
          /* 属性可被修改或删除 */
          get: function reactiveGetter() {
              /* obj的key属性【读】的时候触发 */
              return val
          },
          set: function ractiveSetter(newVal) {
              /* obj的key属性【写】的时候触发 */
              if (newVal === val) return;
              cb(newVal)
          }
      })
  }

  /**
   *  3.封装一层observe，遍历所有属性的方式对该对象的每一个属性都通过defineReactive处理。
   * @param value 需要响应式化的对象
   **/

  function observe(value) {
      if (!value && (typeof value !== 'object')) {
          return
      }

      Object.keys(value).forEach(key => {
          defineReactive(value, key, value[key])
          if (Object.prototype.toString.call(value[index]) === '[object Object]') {
            observe(value[index])
        }
      })
  }


  /* 5.封装Vue */
  class Vue {
      /* Vue构造类 ,对Vue项目组件的data属性进行处理*/
      constructor(options) {
          this._data = options.data;
          observe(this._data)
      }
  }
  /* 6.这样我们只要 new 一个 Vue 对象，就会将 data 中的数据进行「响应式」化。如果我们对 data 的属性进行下面的操作，就会触发 cb 方法更新视图。 */

  let o = new Vue({
      data: {
          test: 'i am test'
      }
  });
  o._data.test = 'update test' /* 视图更新 */


