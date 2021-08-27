## JavaScript转义

不仅仅`css`需要转义，`JavaScript`也要为了兼容多浏览器进行转义，因此我们需要用到`babel`。

```shell
# 8.2.2
yarn add babel-loader -D
```

同时，我们需要使用`babel`中用于`JavaScript`兼容的插件：

```shell
# @babel/preset-env -> 7.14.9; @babel/core -> 7.14.8; @core-js -> 3.16.0
yarn add @babel/preset-env @babel/core core-js -D
```

接下来，我们需要配置一下`webpack`的配置文件。

```javascript
{
  test: /\.js$/,
  use: ['babel-loader'] 
}
```

然后我们需要配置一下`babel`。当然我们可以直接在`webpack.config.js`里面配置，但是`babel`同样也提供了配置文件`.babelrc`，因此我们就直接在这边进行配置。

在根路径新建一个`.babelrc`。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
      	// 浏览器版本
        "targets": {
          "edge": "17",
          "chrome": "67"
        },
         // 配置corejs版本，但需要额外安装corejs
        "corejs": 3,
        // 加载情况
        // entry: 需要在入口文件进入@babel/polyfill，然后babel根据使用情况按需载入
        // usage: 无需引入，自动按需加载
        // false: 入口文件引入，全部载入
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

接下来，我们来测试一下，先修改一下`index.js`。

```javascript
new Promise(resolve => {
    resolve('HelloWorld')
}).then(res => {
    console.log(res);
})
```

然后执行`yarn build`进行打包。

在使用`babel`之前，打包出来的`main.js`如下。

```javascript
!function(){"use strict";new Promise((o=>{o("HelloWorld")})).then((o=>{console.log(o)}))}();
```

上面打包代码是直接使用了`Promise`，而没有考虑到低版本浏览器的兼容。然后我们打开`babel`后，执行一下打包命令，会发现代码多出了很多。

而在打包代码中，可以看到`webpack`使用了`polyfill`实现`promise`类，然后再去调用，从而兼容了低版本浏览器没有`promise`属性问题。