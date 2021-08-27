## HTML模板

当我们是`Web`项目的时候，我们必然会存在`html`文件去实现页面。

而对于其他类型的文件，比如`css`、图片、文件等等，我们是可以通过引入入口`js`文件，然后通过`loader`进行解析打包。而对于`html`文件，我们不可能将其引入到入口文件然后解析打包，反而我们还需要将打包出来的`bundle`文件引入`html`文件去使用，

因此，其实我们需要实现的操作只有两个，一个是复制一份`html`文件到打包路径下，另一个就是将打包出来的`bundle`文件自动引入到`html`文件中去。

这时候我们需要使用一个插件来实现这些功能——`html-webpack-plugin`。

```shell
# 5.3.2
yarn add html-webpack-plugin -D
```

安装插件后，我们先在`src`文件下新建一下`index.html`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Webpack Demo</title>
</head>
<body>
    <div>Hello World</div>
</body>
</html>
```

这里面我们暂时不需要引入任何模块。

接下来配置一下`webpack`。一般`plugin`插件都是一个类，而我们需要在`plugins`选项中需要创建一个插件实例。

对于`htmlWebpackPlugin`插件，我们需要传入一些配置：`html`模板地址`template`和打包出来的文件名`filename`。

```javascript
const path = require('path');
// 引入htmlWebpackPlugin
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
      	// 使用htmlWebpackPlugin插件
        new htmlWebpackPlugin({
         	 // 指定html模板
            template: './src/index.html',  
          	// 自定义打包的文件名
            filename: 'index.html'
        })
    ]
};
```

接下来执行一下打包，就会发现`dist`文件下会生成一个`index.html`。打开会发现，`webpack`会自动将`bundle`文件引入：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Webpack Demo</title>
<script defer src="main.js"></script></head>
<body>
    <div>Hello World</div>
</body>
</html>
```

如果我们有多个`chunk`的时候，我们可以指定该`html`要引入哪些`chunk`。在`htmlWebpackPlugin`配置中有一个`chunks`选项，是一个数组，你只需要加入你想引入的`chunkName`即可。

```javascript
const path = require('path');
// 引入htmlWebpackPlugin
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      	index: './src/index.js',
      	main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',  
            filename: 'index.html',
          	chunks: ["index"]  // 只引入index chunk
        })
    ]
};
```

打包完成后，`dist`文件下会出现`index.html`、`index.js`和`main.js`，但是`index.html`只会引入`index.js`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
<script defer src="index.js"></script></head>
<body>
    HelloWorld！
</body>
</html>
```

如果我们需要实现多页面的话，只需要再`new`一个`htmlWebpackPlugin`实例即可，这里就不再多说。