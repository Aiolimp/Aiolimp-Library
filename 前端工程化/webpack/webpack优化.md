# 优化webpack配置

## 1. 优化打包速度

###  1.1合理的配置mode参数与devtool参数

`mode`可设置`development`` production`两个参数
 如果没有设置，`webpack4` 会将 `mode` 的默认值设置为 `production` 
 `production`模式下会进行`tree shaking`(去除无用代码)和`uglifyjs`(代码压缩混淆)

### 1.2缩小文件搜索范围

#### :选项

在配置文件中，其实有一个`resovle.alias`选项，它可以创建`import`和`reuquire`别名，来确保模块引入变得更简单，同时`webpack`在打包的时候也能更快的找到引入文件。

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  ...
  
  resolve: {
    alias: {
      // 配置style路径的别名
      style: path.resolve(__dirname, 'src/style/')
    },
  }
};

// 使用
import "style/style.scss";
import "style/style.css";

```

#### include、exclude选项

当我们使用`loader`的时候，我们可以配置`include`来指定只解析该路径下的对应文件，同时我们可以配置`exclude`来指定不解析该路径下的对应文件。

```javascript
const path = require('path');

module.exports = {
  ...
  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        include: [path.resolve(__dirname, 'src')]  // 只解析src路径下的css
      }
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/   // 不解析node_modules路径下的js
      }
  ]
}
};
```

#### noParse选项

我们可以在`module.noParse`选项中，只配置不需要解析的文件。通常我们会忽略一些大型插件从而来提高构建性能。

```javascript
module.exports = {
  ...
  module: {
    noParse: /jquery|lodash/,
  },
};
```

#### extensions 选项

`webpack`会根据`extensions`定义的后缀查找文件(频率较高的文件类型优先写在前面)

```js
module.exports = {
  ...
  
  resolve: {
   extensions:['*','.js','.json','.vue']
  }
};
```

### 1.3使用HappyPack开启多进程Loader转换

> 在webpack构建过程中，实际上耗费时间大多数用在loader解析转换以及代码的压缩中。日常开发中我们需要使用Loader对js，css，图片，字体等文件做转换操作，并且转换的文件数据量也是非常大。由于js单线程的特性使得这些转换操作不能并发处理文件，而是需要一个个文件进行处理。HappyPack的基本原理是将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间

```
# 2.0.0
yarn add webpack-parallel-uglify-plugin -D
```

```js
// webpack.config.js
const HappyPack = require("happypack");
const os = require("os");
const HappyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'happypack/loader?id=happyBabelLoader'
        }]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'happyBabelLoader',  // 与loader对应的id标识
      // 用法跟loader配置一样
      loaders: [
        {loader: 'babel-loader', options: {}}
      ],
      threadPool: HappyThreadPool  // 共享进程池
    })
  ]
};
```

### 1.4使用webpack-parallel-uglify-plugin 增强代码压缩

>上面对于loader转换已经做优化，那么下面还有另一个难点就是优化代码的压缩时间。

```
yarn add webpack-parallel-uglify-plugin -D
```

```js
// webpack.config.js
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin")

module.exports = {
  ...
  
  optimization: {
    minimizer: [
      new ParallelUglifyPlugin({
        // 缓存路径
        cacheDir: '.cache/',  
        // 压缩配置
        uglifyJS: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      })
    ]
  }
};

```

### 1.5配置缓存

我们每次执行构建都会把所有的文件都重新编译一边，如果我们可以将这些重复动作缓存下来的话，对下一步的构建速度会有很大的帮助。

现在大部分的`loader`都提供了缓存选项，但并非所有的`loader`都有，因此我们最好自己去配置一下全局的缓存动作。

在`Webpack5`之前，我们都使用了`cache-loader`，而在`webpack5`中，官方提供了一个`cache`选项给我们带来持久性缓存。

```js
// 开发环境
module.exports = {
  cache: {
    type: 'memory'  // 默认配置
  }
}

// 生产环境
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  }
}

```

## 2. 优化打包文件体积

> 打包的速度我们是进行了优化，但是打包后的文件体积却是十分大，造成了页面加载缓慢，浪费流量等，接下来让我们从文件体积上继续优化

### 2.1 引入webpack-bundle-analyzer分析打包后的文件

`webpack-bundle-analyzer`将打包后的内容束展示为方便交互的直观树状图，让我们知道我们所构建包中真正引入的内容

```
npm i -D webpack-bundle-analyzer
```



![carbon-6.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0d6291cc2f70c~tplv-t2oaga2asx-watermark.awebp)

接下来在`package.json`里配置启动命令



```
"analyz": "NODE_ENV=production npm_config_report=true npm run build" 
```

windows请安装`npm i -D cross-env`

```
"analyz": "cross-env NODE_ENV=production npm_config_report=true npm run build" 
```

接下来`npm run analyz`浏览器会自动打开文件依赖图的网页

### 2.2 externals

> 按照官方文档的解释，如果我们想引用一个库，但是又不想让`webpack`打包，并且又不影响我们在程序中以`CMD、AMD`或者`window/global`全局等方式进行使用，那就可以通过配置`Externals`。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用 `Externals`的方式，我们将这些不需要打包的静态资源从构建逻辑中剔除出去，而使用 `CDN` 的方式，去引用它们。

有时我们希望我们通过`script`引入的库，如用CDN的方式引入的`jquery`，我们在使用时，依旧用`require`的方式来使用，但是却不希望`webpack`将它又编译进文件中。这里官网案例已经足够清晰明了，大家有兴趣可以点击了解  

[webpack](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fexternals%2F%23root) 官网案例

```js
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
module.exports = {
  //...
  externals: {
    jquery: 'jQuery'
  }
};
import $ from 'jquery';
$('.my-element').animate(/* ... */);
```

### 2.3 Tree-shaking

> 这里单独提一下`tree-shaking`,是因为这里有个坑。`tree-shaking`的主要作用是用来清除代码中无用的部分。目前在`webpack4` 我们设置`mode`为`production`的时候已经自动开启了`tree-shaking`。但是要想使其生效，生成的代码必须是ES6模块。不能使用其它类型的模块如`CommonJS`之流。如果使用`Babel`的话，这里有一个小问题，因为`Babel`的预案（preset）默认会将任何模块类型都转译成`CommonJS`类型，这样会导致`tree-shaking`失效。修正这个问题也很简单，在`.babelrc`文件或在`webpack.config.js`文件中设置`modules： false`就好了

```js
// .babelrc
{
  "presets": [
    ["@babel/preset-env",
      {
        "modules": false
      }
    ]
  ]
}
```

或者

```js
// webpack.config.js

module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', { modules: false }]
                }
            }，
            exclude: /(node_modules)/
        }
    ]
}
```

