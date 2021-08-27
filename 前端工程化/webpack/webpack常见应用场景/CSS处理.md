## CSS处理

### 解析CSS文件

在前面的例子也能看到，我们解析`css`需要用到的`loader`有`css-loader`和`style-loader`。`css-loader`主要用来解析`css`文件，而`style-loader`是将`css`渲染到`DOM`节点上。

首先我们来安装一下：

```shell
 # css-loader -> 6.2.0;  style-loader -> 3.2.1
 yarn add css-loader style-loader -D
```

然后我们新建一个`css`文件。

```css
/* style.css */
body {
  background: #222;
  color: #fff;
}
```

然后在`index.js`引入一下：

```javascript
import "./style.css";
```

紧接着我们配置一下`webpack`：

```javascript
module.exports = {
   ...
  
  module: {
    rules: [
      {
        test: /\.css$/,  // 识别css文件
        use: ['style-loader', 'css-loader']  // 先使用css-loader,再使用style-loader
      }
    ]
  },
  
   ...
};
```

这时候我们打包一下，会发现`dist`路径下只有`main.js`和`index.html`。但打开一下`index.html`会发现`css`是生效的。

这是因为`style-loader`是将`css`代码插入到了`main.js`当中去了。

### 打包css文件

如果我们不想将`css`代码放进`js`中，而是直接导出一份`css`文件的话，就得使用另一个插件——`mini-css-extract-plugin`。

```shell
# 2.1.0
yarn add mini-css-extract-plugin -D
```

然后将其引入到配置文件，并且在`plugins`引入。

```javascript
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    ...
  
    plugins: [
      	// 使用miniCssExtractPlugin插件
        new miniCssExtractPlugin({
          	filename: "[name].css"  // 设置导出css名称，[name]占位符对应chunkName
        })
    ]
};
```

紧接着，我们还需要更改一下`loader`，我们不再使用`style-loader`，而是使用`miniCssExtractPlugin`提供的`loader`。

```javascript
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    ...
  
    module: {
        rules: [
            {
                test: /\.css$/,
              	// 使用miniCssExtractPlugin.loader替换style-loader
                use: [miniCssExtractPlugin.loader,'css-loader']
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
          	filename: "[name].css" 
        })
    ]
};
```

接下来打包一下，`dist`路径下就会多出一个`main.css`文件，并且在`index.html`中也会自动引入。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
<script defer src="main.js"></script><link href="main.css" rel="stylesheet"></head>
<body>
    HelloWorld！
</body>
</html>
```

### css添加浏览器前缀

当我们使用一下`css`新特性的时候，可能需要考虑到浏览器兼容的问题，这时候可能需要对一些`css`属性添加浏览器前缀。而这类工作，其实可以交给`webpack`去实现。准确来说，是交给`postcss`去实现。

`postcss`对于`css`犹如`babel`对于`JavaScript`，它专注于对转换`css`，比如添加前缀兼容、压缩`css`代码等等。

首先我们需要先安装一下`postcss`和`post-css-loader`。

```shell
# postcss -> 8.3.6，postcss-loader -> 6.1.1
yarn add postcss postcss-loader -D
```

接下来，我们在`webpack`配置文件先引入`postcss-loader`，它的顺序是在`css-loader`之前执行的。

```javascript
rules: [
  {
    test: /\.css$/,
    // 引入postcss-loader
    use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
  }
]
```

接下来配置`postcss`的工作，就不在`webpack`的配置文件里面了。`postcss`自身也是有配置文件的，我们需要在项目根路径下新建一个`postcss,config.js`。然后里面也有一个配置项，为`plugins`。

```javascript
module.exports = {
    plugins: []
}
```

这也意味着，`postcss`自身也支持很多第三方插件使用。

现在我们想实现的添加前缀的功能，需要安装的插件叫`autoprefixer`。

```shell
# 1.22.10
yarn add autoprefixer -D
```

然后我们只需要引入到`postcss`的配置文件中，并且它里面会有一个配置选项，叫`overrideBrowserslist`，是用来填写适用浏览器的版本。

```javascript
module.exports = {
    plugins: [
        // 将css编译为适应于多版本浏览器
        require('autoprefixer')({
            // 覆盖浏览器版本
          	// last 2 versions: 兼容各个浏览器最新的两个版本
          	// > 1%: 浏览器全球使用占有率大于1%
            overrideBrowserslist: ['last 2 versions', '> 1%']
        })
    ]
}
```

关于`overrideBrowserslist`的选项填写，我们可以去参考一下[browserslist](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbrowserslist%2Fbrowserslist)，这里就不多讲。

当然，我们其实可以在`package.json`中填写兼容浏览器信息，或者使用`browserslist`配置文件`.browserslistrc`来填写，这样子如果我们以后使用其他插件也需要考虑到兼容浏览器的时候，就可以统一用到，比如说`babel`。

```json
// package.json 文件
{
  ...
  "browserslist": ['last 2 versions', '> 1%']
}

# .browserslsetrc 文件
last 2 versions
> 1%
```

但如果你多个地方都配置的话，`overrideBrowserslist`的优先级是最高的。

接下来，我们修改一下`style.css`，使用一下比较新的特性。

```css
body {
    display: flex;
}
```

然后打包一下，看看打包出来后的`main.css`。

```css
body {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
```

### 压缩css代码

当我们需要压缩`css`代码的时候，可以使用`postcss`另一个插件——`cssnano`。

```shell
# 5.0.7
yarn add cssnano -D
```

然后还是在`postcss`配置文件中引入：

```javascript
module.exports = {
    plugins: [
        ... ,
        require('cssnano')
    ]
}
```

打包一下，看看`main.css`。

```css
body{display:-webkit-box;display:-ms-flexbox;display:flex}
```

### 解析CSS预处理器

在现在我们实际开发中，我们会更多使用`Sass`、`Less`或者`stylus`这类`css`预处理器。而其实`html`是无法直接解析这类文件的，因此我们需要使用对应的`loader`将其转换成`css`。

接下来，我就以`sass`为例，来讲一下如何使用`webpack`解析`sass`。

首先我们需要安装一下`sass`和`sass-loader`。

```shell
# sass -> 1.36.0, sass-loader -> 12.1.0
yarn add sass sass-loader -D
```

然后我们在`module`加上`sass`的匹配规则，`sass-loader`的执行顺序应该是排第一，我们需要先将其转换成`css`，然后才能执行后续的操作。

```javascript
rules: [
  ...
  
  {
    test: /\.(scss|sass)$/,
    use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
  }
]
```

然后我们在项目中新建一个`style.scss`。

```scss
$color-white: #fff;
$color-black: #222;

body {
    background: $color-black;

    div {
        color: $color-white;
    }
}
```

然后在`index.js`引入。

```javascript
import "./style.css";
import "./style.scss";
```

然后执行打包，再看看打包出来的`main.css`，`scss`文件内容被解析到里面，同时如果我们引入多个`css`或`css`预处理器文件的话，`miniCssExtractPlugin`也会将其打包成一个`bundle`文件里面。

```css
body{display:-webkit-box;display:-ms-flexbox;display:flex}
body{background:#222}body div{color:#fff}
```

