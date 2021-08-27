## Webpack本地服务

当我们使用`webpack`的时候，不仅仅只是用于打包文件，大部分我们还会依赖`webpack`来搭建本地服务，同时利用其热更新的功能，让我们更好的开发和调试代码。

接下来我们来安装一下`webpack-dev-server`：

```shell
# 版本为3.11.2
yarn add webpack-dev-server -D
```

然后执行下列代码开启服务：

```shell
npx webpack serve
```

或者在package.json配置一下：

```json
"scripts": {
  "serve": "webpack serve --mode development"
}
```

然后通过`yarn serve`运行。

这时，webpack会默认开启`http://localhost:8080/`服务（具体看你们运行返回的代码），而该服务指向的是`dist/index.html`。

但你会发现，你的`dist`中其实是没有任何文件的，这是因为`webpack`将实时编译后的文件都保存到了内存当中。

### webpack-dev-server的好处

其实`webpack`自带提供了`--watch`命令，可以实现动态监听文件的改变并实时打包，输出新的打包文件。

但这种方案存在着几个缺点，一就是每次你一修改代码，webpack就会全部文件进行重新打包，这时候每次更新打包的速度就会慢了很多；其次，这样的监听方式做不到热更新，即每次你修改代码后，webpack重新编译打包后，你就得手动刷新浏览器，才能看到最新的页面结果。

而`webpack-dev-server`，却有效了弥补这两个问题。它的实现，是使用了`express`启动了一个`http`服务器，来伺候资源文件。然后这个`http`服务器和客户端使用了`websocket`通讯协议，当原始文件作出改动后，`webpack-dev-server`就会实时编译，然后将最后编译文件实时渲染到页面上。

### webpack-dev-server配置

在`webpack.config.js`中，有一个`devServer`选项是用来配置`webpack-dev-server`，这里简单讲几个比较常用的配置。

#### port

我们可以通过port来设置服务器端口号。

```javascript
module.exports = {
  
    ...
  
    // 配置webpack-dev-server
    devServer: {
        port: 8888,  // 自定义端口号
    },
};
```

#### open

在`devServer`中有一个`open`选项，默认是为`false`，当你设置为`true`的时候，你每次运行`webpack-dev-server`就会自动帮你打开浏览器。

```javascript
module.exports = {
  
    ...
  
    // 配置webpack-dev-server
    devServer: {
        open: true,   // 自动打开浏览器窗口
    },
};
```

#### proxy

这个选项是用来设置本地开发的跨域代理的，关于跨域的知识就不多在这说了，这里就说说如何去配置。

`proxy`的值必须是一个对象，在里面我们可以配置一个或多个跨域代理。最简单的配置写法就是地址配上`api`地址。

```javascript
module.exports = {
  
    ...
  
    devServer: {
      	// 跨域代理
        proxy: {
          '/api': 'http://localhost:3000'
        },
    },
};
```

这时候，当你请求`/api/users`的时候，就会代理到`http://localhost:3000/api/users`。

如果你不需要传递`/api`的话，你就需要使用对象的写法，从而增加一些配置选项：

```javascript
module.exports = {
    //...
    devServer: {
      	// 跨域代理
        proxy: {
            '/api': {
              target: 'http://localhost:3000',  // 代理地址
              pathRewrite: { '^/api': '' },   // 重写路径
            },
        },
    },
};
```

这时候，当你请求`/api/users`的时候，就会代理到`http://localhost:3000/users`。

在proxy中的选项，还有两个比较常用的，一个就是`changeOrigin`，默认情况下，代理时会保留主机头的来源，当我们将其设置为`true`可以覆盖这种行为；还有一个是`secure`选项，当你的接口使用了`https`的时候，需要将其设置为`false`。

```javascript
module.exports = {
    //...
    devServer: {
      	// 跨域代理
        proxy: {
            '/api': {
              target: 'http://localhost:3000',  // 代理地址
              pathRewrite: { '^/api': '' },   // 重写路径
              secure: false,  // 使用https
              changeOrigin: true   // 覆盖主机源
            },
        },
    },
};
```

