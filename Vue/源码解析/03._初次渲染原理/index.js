
import { initMixin } from "./init.js";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";
// Vue就是一个构造函数 通过new关键字进行实例化
function Vue(options) {
  // 这里开始进行Vue初始化工作
  this._init(options);
}
// _init方法是挂载在Vue原型的方法 通过引入文件的方式进行原型挂载需要传入Vue
// 此做法有利于代码分割
initMixin(vue);

let vue = new Vue({
  el: '#app',
  data() {
      return {
          a: 1,
          b: [1]
      }
  },
  render(h) {
      return h('div', { id: 'hhh' }, 'hello')
  },
  template: `<div id='hhh' style="aa:1;bb:2"><a>{{xxx}}{{ccc}}</a></div>`
}).$mount('#app')


// 混入_render
renderMixin(vue);
// 混入_update
lifecycleMixin(vue);
export default vue;


