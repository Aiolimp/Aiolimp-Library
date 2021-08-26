
//创建渲染Watcher 执行核心渲染页面
export function mountComponent(vm, el) {
    //   _update和._render方法都是挂载在Vue原型的方法  类似_init
  
    // 引入watcher的概念 这里注册一个渲染watcher 执行vm._update(vm._render())方法渲染视图
  
    let updateComponent = () => {
      console.log("刷新页面");
      vm._update(vm._render());
    };
    new Watcher(vm, updateComponent, null, true);
  }
  
