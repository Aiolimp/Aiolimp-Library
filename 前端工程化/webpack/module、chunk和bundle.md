# module、chunk和bundle

### module

先看看`webpack`官方对`module`的解读：

> `Module`是离散功能块，相比于完整程序提供了更小的接触面。精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。

其实简单来说，`module`模块就是我们编写的代码文件，比如`JavaScript`文件、`CSS`文件、`Image`文件、`Font`文件等等，它们都是属于`module`模块。而`module`模块的一个特点，就是可以被引入使用。

### chunk

同样的先看看官方解读：

> 此 `webpack` 特定术语在内部用于管理捆绑过程。输出束（bundle）由块组成，其中有几种类型（例如 `entry` 和 `child` ）。通常，块直接与输出束 (`bundle`）相对应，但是，有些配置不会产生一对一的关系

其实`chunk`是`webpack`打包过程的中间产物，`webpack`会根据文件的引入关系生成`chunk`，也就是说一个`chunk`是由一个`module`或多个`module`组成的，这取决于有没有引入其他的`module`。

### Bundle

先看看官方解读：

> `bundle` 由许多不同的模块生成，包含已经经过加载和编译过程的源文件的最终版本。

`bundle`其实是`webpack`的最终产物，通常来说，一个`bundle`对应这一个`chunk`。

### 总结

其实`module`、`chunk`和`bundle`可以说是同一份代码在不同转换场景的不同名称：

- 我们编写的是`module`
- `webpack`处理时时`chunk`
- 最终生成供使用的是`bundle`

