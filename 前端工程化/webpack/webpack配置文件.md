# Webpack配置文件

webpack的配置文件主要是`webpack.config.js`。

如果没有此配置文件，它默认会使用自己的默认配置。

```JS
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};

```

## entry和output

`entry`选项是用来配置入口文件的，它可以是字符串、数组或者对象类型。`webpack`默认只支持`js`和`json`文件作为入口文件，因此如果引入其他类型文件会保存。

`output`选项是设置输出配置，**该选项必须是对象类型**，不能是其它类型格式。在`output`对象中，必填的两个选项就是导出路径`path`和导出`bundle`文件名称`filename`。其中`path`选项必须为绝对路径。

`entry`和`output`的配置，对于不同的应用场景的配置也会有所不同。

### 单入口单输出

我们最普遍的就是单个入口文件，然后打包成单个`bundle`文件。这种应用场景下，`entry`可以使用字符串的形式，则跟默认配置文件类似：

```javascript
entry: './src/index.js'
```

### 多入口单输出

当我们的项目需要有多个入口文件，但只需要一个输出`bundle`的时候，这时候`entry`可以使用数组的形式：

```javascript
entry: ['./src/index_1.js', './src/index_2.js']
```

> **注意：此时其实只有一个chunk**

### 多入口多输出

当我们的项目同时多个入口文件，并且它们需要单独打包，也就是意味着会有多个`bundle`文件输出，此时我们的`entry`需要使用对象形式，并且对象`key`对应的对应`chunk`的名称。

```javascript
entry: {
  index: "./src/index.js",  // chunkName为index
  main: "./src/main.js"     // chunkName为main
}
```

此时，我们的`output.filename`也不能写死了，这时候`webpack`提供了一个占位符`[name]`给我们使用，它会自动替换为对应的`chunkName`。

```javascript
output: {
   path: path.resolve(__dirname, 'dist'),
   filename: '[name].js'  // [name]占位符会自动替换为chunkName
},
```

根据上面的配置，最后会打包出`index.js`和`main.js`。

### 补充

在单入口单输出的应用场景下，`entry`也可以使用对象的形式，从而来自定义`chunkName`，然后`output.filename`也使用`[name]`占位符来自动匹配。当然也可以使用数组，但是不太大必要。

当`entry`使用数组或字符串的时候，`chunkName`默认为`main`，因此如果`output.filename`使用`[name]`占位符的时候，会自动替换为`main`。

## mode

在前面的打包测试的时候，命令行都会报一个警告：

```shell
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
```

这是因为`webpack`需要我们配置`mode`选项。

wepack给我们提供了三个选项，即`none`、`development`和`production`，而默认就是`production`。

三者的区别呢，在于`webpack`自带的代码压缩和优化插件使用。

- `none`：不使用任何默认优化选项；
- `development`：指的是开发环境，会默认开启一些有利于开发调试的选项，比如`NamedModulesPlugin`和`NamedChunksPlugin`，分别是给`module`和`chunk`命名的，而默认是一个数组，对应的`chunkName`也只是下标，不利于开发调试；
- `production`：指的是生产环境，则会开启代码压缩和代码性能优化的插件，从而打包出来的文件也相对`none`和`development`小很多。

> 当我们设置mode之后，我们可以在`process.env.NODE_ENV`获取到当前的环境

因此我们可以在配置文件上文件上配置`mode`：

```javascript
const path = require('path');

module.exports = {
    mode:'development', // 开发模式
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
};
```

`webpack`也给我们提供了另一种方式，就是在命令行中配置，也就是加上`--mode`：

```javascript
//   package.json 
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```

## devtool

聊完`mode`后，说到开发调试，不难想起的就是`sourceMap`。而我们可以在配置文件中，使用`devtool`开启它。

```javascript
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
  	// 开启source-map
    devtool: "source-map"
};
```

打包后，你的`dist`中就会多了一个`main.js.map`文件。

当然，官方不止提供这么一个选项，具体的可以去[官网](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Fconfiguration%2Fdevtool%2F%23devtool)看看，这里就说其他几个比较常用的选项。

- `none`：不会生成`sourceMap`；
- `eval`**：每个模块都会使用`eval()`执行，不建议生成环境中使用；
- `cheap-source-map`：生成`sourceMap`，但是没有列映射，则只会提醒是在代码的第几行，不会提示到第几列；
- `inline-source-map`：会生成`sourceMap`，但不会生成`map`文件，而是将`sourceMap`放在打包文件中。

## module

前面我们有提到过，就是`webpack`的入口文件只能接收`JavaScript`文件和`JSON`文件。

但我们通常项目还会有其他类型的文件，比如`html`、`css`、图片、字体等等，这时候我们就需要用到第三方`loader`来帮助`webpack`来解析这些文件。理论上只要有相应的`loader`，就可以处理任何类型的文件。

> 在`webpack`[官网](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Floaders%2F)其实提供了很多`loader`，已经能满足我们日常使用，当然我们也可以去`github`找找别人写的`loader`或者自己手写`loader`来使用。

而对于`loader`的配置，是写着`module`选项里面的。`module`选项是一个对象，它里面有一个`rules`属性，是一个数组，在里面我们可以配置多个匹配规则。

而匹配规则是一个对象，会有`test`属性和`use`属性，`test`属性一般是正则表达式，用来识别文件类型，而`use`属性是一个数组，里面用来存放对该文件类型使用的`loader`。

```javascript
module: {
    rules: [
        {
          test: /\.css$/,  // 识别css文件
          use: ['style-loader', 'css-loader']  // 对css文件使用的三个loader
        }
    ]
}
```

对于`use`数组的顺序是有要求的，`webpack`会根据**自后向前**的规则去执行`loader`。也就是说，上面的例子`webpack`会先执行`css-loader`，再执行`style-loader`。

其次，当我们需要对对应`loader`提供配置的时候，我们可以选用对象写法：

```javascript
module: {
    rules: [
        {
          test: /\.css$/,  
          use: [
            'style-loader', 
            {
              	// loader名称
              	loader: 'css-loader',
              	// loader选项
              	options: {
                  	... 
                }
            }
          ] 
        }
    ]
}
```

在后面我们根据实际应用场景再讲讲`module`的使用。

## plugins

`webpack`还提供了一个`plugins`选项，让我们可以使用一些第三方插件，因此我们可以使用第三方插件来实现打包优化、资源管理、注入环境变量等任务。

> 同样的，`webpack`[官方](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2F)也提供了很多`plugin`。

`plugins`选项是一个数组，里面可以放入多个`plugin`插件。

```javascript
plugins: [
  new htmlWebpackPlugin(),
  new CleanWebpackPlugin(),
  new miniCssExtractPlugin(),
  new TxtWebpackPlugin()
]
```

而对于`plugins`数组对排序位置是没有要求，因为在`plugin`的实现中，`webpack`会通过打包过程的生命周期钩子，因此在插件逻辑中就已经设置好需要在哪个生命周期执行哪些任务。

