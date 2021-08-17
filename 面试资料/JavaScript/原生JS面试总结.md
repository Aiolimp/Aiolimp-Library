原生JS常见面试题整理
===


## <a name="chapter-one" id="chapter-one"></a>一 目录

| 目录 |
| --- |
| [一 目录](#chapter-one) |
| <a name="catalog-chapter-two" id="catalog-chapter-two"></a>[二 JS数据类型](#chapter-two) |
| <a name="catalog-chapter-three" id="catalog-chapter-three"></a>[二 谈谈你对闭包的理解](#chapter-three) |
| <a name="catalog-chapter-four" id="catalog-chapter-four"></a>[三 谈谈你对原型、原型链的理解](#chapter-four) |
| <a name="catalog-chapter-five" id="catalog-chapter-five"></a>[四 JS如何实现继承](#chapter-five) |








### <a name="chapter-one" id="chapter-one"></a>1.MVVM

MVVM(Model-View-ViewModel), 源自于经典的 Model–View–Controller（MVC）模式。MVVM 的出现促进了 GUI 前端开发与后端业务逻辑的分离，极大地提高了前端开发效率。MVVM 的核心是 ViewModel 层，它就像是一个中转站（value converter），负责转换 Model 中的数据对象来让数据变得更容易管理和使用，该层向上与视图层进行双向数据绑定，向下与 Model 层通过接口请求进行数据交互，起呈上启下作用。View 层展现的不是 Model 层的数据，而是 ViewModel 的数据，由 ViewModel 负责与 Model 层交互，这就完全解耦了 View 层和 Model 层，此时开发者只需要关注业务逻辑，不需要手动操作DOM。

### <a name="chapter-two" id="chapter-two"></a>2.mvvm和mvc区别？它和其它框架（jquery）的区别是什么?

mvc 中 Controller 演变成mvvm 中的 ViewModel。mvvm 主要解决了 mvc 中大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。 

和jquery的区别：jQuery是使用选择器（ `$` ）选取DOM对象，对其进行赋值、取值、事件绑定等操作，其实和原生的HTML的区别只在于可以更方便的选取和操作DOM对象，而数据和界面是在一起的。比如需要获取label标签的内容：`$("lable").val();` ,它还是依赖DOM元素的值。Vue则是通过Vue对象将数据和View完全分离开来了。对数据进行操作不再需要引用相应的DOM对象，他们通过Vue对象的viewModel实现相互的绑定。这就是传说中的MVVM。

### <a name="chapter-three" id="chapter-three"></a>3.vue优点？

- 轻量级框架：只关注视图层，是一个构建数据的视图集合，大小只有几十 `kb` ；
- 简单易学：国人开发，中文文档，不存在语言障碍 ，易于理解和学习；
- 双向数据绑定：保留了 `angular` 的特点，在数据操作方面更为简单；
- 组件化：保留了 `react` 的优点，实现了 `html` 的封装和重用，在构建单页面应用方面有着独特的优势；
- 视图，数据，结构分离：使数据的更改更为简单，不需要进行逻辑代码的修改，只需要操作数据就能完成相关操作；
- 虚拟DOM：`dom` 操作是非常耗费性能的， 不再使用原生的 `dom` 操作节点，极大解放 `dom` 操作，但具体操作的还是 `dom` 不过是换了另一种方式；
- 运行速度更快：相比较于 `react` 而言，同样是操作虚拟 `dom` ，就性能而言， `vue` 存在很大的优势。

### <a name="chapter-four" id="chapter-four"></a>4.为什么说vue是一个渐进式框架

vue采用了MVVM模式，自己拥有一套完整的生态系统，可以添加Vuex，vuerouter，也可以添加别的第三方库，并且是相互独立的，可以根据不同的需求选择不同的层级，所以它是轻量级的，渐进式的框架。

### <a name="chapter-five" id="chapter-five"></a>5.<keep-alive>的作用是什么

如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keepalive 组件包裹需要保存的组件。用keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行
deactivated 钩子函数，缓存渲染后会执行 actived 钩子函数。

### <a name="chapter-six" id="chapter-six"></a>6.说出几种vue当中的指令和它的用法？

`v-model` 双向数据绑定；

`v-for` 循环；

`v-if` `v-show` 显示与隐藏；

`v-on` 事件；

`v-once` : 只绑定一次。

`v-cloak`:和和 CSS 规则如 `[v-cloak] { display: none }`一起使用，影藏未编译的标签。

`v-text`:更新文本

`v-html:`更新innerHtml

`v-else:`

`v-slot:` 在<template> 中使用插槽

`v-pre:`  显示标签，跳过没有指令的节点，加快编译。

`v-bind:` 动态绑定多个值

---
