## 1.介绍

1. nodejs 并不是`JavaScript`应用，也不是编程语言，因为编程语言使用的`JavaScript`,Nodejs 是 `JavaScript`的运行时。
2. Nodejs 是构建在 V8 引擎之上的，V8 引擎是由 C/C++编写的，因此我们的 JavaSCript 代码需要由 C/C++转化后再执行。

3. NodeJs 使用异步 I/O 和事件驱动的设计理念，可以高效地处理大量并发请求，提供了非阻塞式 I/O 接口和事件循环机制，使得开发人员可以编写高性能、可扩展的应用程序,异步 I/O 最终都是由`libuv` 事件循环库去实现的。
4. NodeJs 使用 npm 作为包管理工具类似于 python 的 pip，或者是 java 的 Maven，目前 npm 拥有上百万个模块。 [www.npmjs.com/](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2F)
5. nodejs 适合干一些 IO 密集型应用，不适合 CPU 密集型应用，nodejsIO 依靠 libuv 有很强的处理能力，而 CPU 因为 nodejs 单线程原因，容易造成 CPU 占用率高，如果非要做 CPU 密集型应用，可以使用 C++插件编写 或者 nodejs 提供的`cluster`。(CPU 密集型指的是图像的处理 或者音频处理需要大量数据结构 + 算法)

## 2.NPM

#### npm

`npm`（全称 Node Package Manager）是 Node.js 的包管理工具，它是一个基于命令行的工具，用于帮助开发者在自己的项目中安装、升级、移除和管理依赖项。

#### npm 命令

1. `npm init`：初始化一个新的 npm 项目，创建 package.json 文件。
2. `npm install`：安装一个包或一组包，并且会在当前目录存放一个 node_modules。
3. `npm install <package-name>`：安装指定的包。
4. `npm install <package-name> --save`：安装指定的包，并将其添加到 package.json 文件中的依赖列表中。
5. `npm install <package-name> --save-dev`：安装指定的包，并将其添加到 package.json 文件中的开发依赖列表中。
6. `npm install -g <package-name>`：全局安装指定的包。
7. `npm update <package-name>`：更新指定的包。
8. `npm uninstall <package-name>`：卸载指定的包。
9. `npm run <script-name>`：执行 package.json 文件中定义的脚本命令。
10. `npm search <keyword>`：搜索 npm 库中包含指定关键字的包。
11. `npm info <package-name>`：查看指定包的详细信息。
12. `npm list`：列出当前项目中安装的所有包。
13. `npm outdated`：列出当前项目中需要更新的包。
14. `npm audit`：检查当前项目中的依赖项是否存在安全漏洞。
15. `npm publish`：发布自己开发的包到 npm 库中。
16. `npm login`：登录到 npm 账户。
17. `npm logout`：注销当前 npm 账户。
18. `npm link`: 将本地模块链接到全局的 `node_modules` 目录下
19. `npm config list` 用于列出所有的 npm 配置信息。执行该命令可以查看当前系统和用户级别的所有 npm 配置信息，以及当前项目的配置信息（如果在项目目录下执行该命令）
20. `npm get registry` 用于获取当前 npm 配置中的 registry 配置项的值。registry 配置项用于指定 npm 包的下载地址，如果未指定，则默认使用 npm 官方的包注册表地址
21. `npm set registry` `npm config set registry <registry-url>` 命令，将 registry 配置项的值修改为指定的 `<registry-url>` 地址

#### Package json

执行 npm init 便可以初始化一个 package.json

1. `name`：项目名称，必须是唯一的字符串，通常采用小写字母和连字符的组合。
2. `version`：项目版本号，通常采用语义化版本号规范。
3. `description`：项目描述。
4. `main`：项目的主入口文件路径，通常是一个 JavaScript 文件。
5. `keywords`：项目的关键字列表，方便他人搜索和发现该项目。
6. `author`：项目作者的信息，包括姓名、邮箱、网址等。
7. `license`：项目的许可证类型，可以是自定义的许可证类型或者常见的开源许可证（如 MIT、Apache 等）。
8. `dependencies`：项目所依赖的包的列表，这些包会在项目运行时自动安装。
9. `devDependencies`：项目开发过程中所需要的包的列表，这些包不会随项目一起发布，而是只在开发时使用。
10. `peerDependencies`：项目的同级依赖，即项目所需要的模块被其他模块所依赖。
11. `scripts`：定义了一些脚本命令，比如启动项目、运行测试等。
12. `repository`：项目代码仓库的信息，包括类型、网址等。
13. `bugs`：项目的 bug 报告地址。
14. `homepage`：项目的官方网站地址或者文档地址。

#### Npm install 原理

##### 在执行 npm install 的时候发生了什么？

首先安装的依赖都会存放在根目录的 node_modules,默认采用扁平化的方式安装，并且排序规则.bin 第一个然后@系列，再然后按照首字母排序 abcd 等，并且使用的算法是广度优先遍历，在遍历依赖树时，npm 会首先处理项目根目录下的依赖，然后逐层处理每个依赖包的依赖，直到所有依赖都被处理完毕。在处理每个依赖时，npm 会检查该依赖的版本号是否符合依赖树中其他依赖的版本要求，如果不符合，则会尝试安装适合的版本

##### npm install 后续流程

1. 从**.npmrc**文件中获取 npm 配置（项目级.npmrc => 用户级.npmrc => 全局的.npmrc => npm 内置.npmrc）
2. 检查 **package-lock.json**是否存在：

   - **存在**：对比**package.json** 和 **package-lock.json**，如果一致则检查缓存。如果不一致，则根据**package.json**中的语法和版本号更新依赖包。
   - **不存在**：根据 package.json 中的依赖，解析依赖树。检查本地缓存，如果包已存在且完整性校验通过，则直接使用缓存中的包。如果包不存在或缓存被禁用，则从远程注册表获取，并存储到本地缓存，最后将包解压并放置到 **node_modules**。

3. **package-lock.json**：
   - 锁定版本记录依赖树详细信息
   - 生成唯一 key，缓存依赖包

#### Npm run 原理

##### npm run xxx 发生了什么

读取 package json 的 scripts 对应的脚本命令(dev:vite),vite 是个可执行脚本，他的查找规则是：

- 先从当前项目的 node_modules/.bin 去查找可执行命令 vite
- 如果没找到就去全局的 node_modules 去找可执行命令 vite
- 如果还没找到就去环境变量查找
- 再找不到就进行报错

如果成功找到会发现有三个文件（因为 nodejs 是跨平台的所以可执行命令兼容各个平台）

- .sh 文件是给 Linux unix Macos 使用
- .cmd 给 windows 的 cmd 使用
- .ps1 给 windows 的 powerShell 使用

##### npm 生命周期

​ • 在运行指定脚本前后，会自动执行生命周期钩子（如果存在）：

​ • pre `<script-name>`:

​ • 运行脚本前执行。例如，npm run build 前会执行 prebuild。

​ • `<script-name>`:

​ • 执行定义的脚本。

​ • post`<script-name>`:

​ • 运行脚本后执行。例如，npm run build 后会执行 postbuild。

## 3.npx

npx 是一个运行 npm 包的工具，随 Node.js 的 npm 版本 5.2.0 及以上一起发布。它的核心功能是让用户方便地运行本地或远程的 npm 包，而无需手动安装全局包。

npx 的作用是在命令行中运行 node 包中的可执行文件，而不需要全局安装这些包。这可以使开发人员更轻松地管理包的依赖关系，并且可以避免全局污染的问题。它还可以帮助开发人员在项目中使用不同版本的包，而不会出现版本冲突的问题。

**npx 的优势**

1. 避免全局安装：`npx`允许你执行 npm package，而不需要你先全局安装它。
2. 总是使用最新版本：如果你没有在本地安装相应的 npm package，`npx`会从 npm 的 package 仓库中下载并使用最新版。
3. 执行任意 npm 包：`npx`不仅可以执行在`package.json`的`scripts`部分定义的命令，还可以执行任何 npm package。
4. 执行 GitHub gist：`npx`甚至可以执行 GitHub gist 或者其他公开的 JavaScript 文件。

**npx 和 npm 区别**

`npx`侧重于执行命令的，执行某个模块命令。虽然会自动安装模块，但是重在执行某个命令

`npm`侧重于安装或者卸载某个模块的。重在安装，并不具备执行某个模块的功能。

| 特性         | npm                                                | npx                         |
| ------------ | -------------------------------------------------- | --------------------------- |
| 用途         | 用于安装和管理 npm 包                              | 用于直接执行 npm 包中的命令 |
| 全局安装     | 默认全局安装使用 npm install -g                    | 无需全局安装，直接运行      |
| 版本控制     | 无法指定临时运行的包版本                           | 可直接指定运行的版本        |
| 依赖清理     | 全局安装后需要手动清理                             | 使用后自动清理临时文件      |
| 执行本地命令 | 需要指定完整路径（如 node_modules/.bin/<command>） | 自动查找本地依赖并执行      |

## 4.nvm 和 nrm

**1. nvm (Node Version Manager)**

​ • **功能**：nvm 是用于管理 Node.js 版本的工具。它允许开发者在同一台机器上安装和切换不同版本的 Node.js，避免了全局安装版本冲突的问题。

​ • **用途**：用于安装、切换和卸载 Node.js 版本。非常适合需要在不同版本之间切换的开发环境（例如：开发、生产、测试环境）。

​ • **安装管理的对象**：管理 Node.js 版本。

​ • **常用命令**：

​ • nvm install ` <version>`：安装特定版本的 Node.js。

​ • nvm use `<version>`：切换到指定版本的 Node.js。

​ • nvm ls：列出已安装的版本。

​ • nvm ls-remote：列出可用的 Node.js 版本。

**2. nrm (NPM Registry Manager)**

​ • **功能**：nrm 是用于管理 NPM 镜像源的工具。它允许你快速切换不同的 NPM 源，尤其是在需要切换到国内源（如淘宝源）时，可以提高安装依赖的速度。

​ • **用途**：用于管理和切换 NPM 的 registry 源。特别适用于在中国的开发者，能够方便地切换到如淘宝的 NPM 镜像源，以提高下载速度。

​ • **安装管理的对象**：管理 NPM 镜像源。

​ • **常用命令**：

​ • nrm use` <registry>`：切换到指定的 NPM 源。

​ • nrm ls：列出可用的 NPM 镜像源。

​ • nrm add` <name> <url>`：添加一个自定义的 NPM 镜像源。

## 5.模块化

#### CommonJS 规范

引入模块（require）支持四种格式

1. 支持引入内置模块例如 `http` `os` `fs` `child_process` 等 nodejs 内置模块
2. 支持引入第三方模块`express` `md5` `koa` 等
3. 支持引入自己编写的模块 ./ ../ 等
4. 支持引入 addon C++扩展模块 .node 文件

```js
const fs = require('node:fs'); // 导入核心模块
const express = require('express'); // 导入 node_modules 目录下的模块
const myModule = require('./myModule.js'); // 导入相对路径下的模块
const nodeModule = require('./myModule.node'); // 导入扩展模块
```

导出模块 exports 和 module.exports

```js
module.exports = {
  hello: function () {
    console.log('Hello, world!');
  },
};
```

如果不想导出对象直接导出值

```js
module.exports = 123;
```

#### ESM 模块规范

引入模块 **import** 必须写在头部

> 注意使用 ESM 模块的时候必须开启一个选项 打开 package.json 设置 type:module

```js
import fs from 'node:fs';
```

> 如果要引入 json 文件需要特殊处理 需要增加断言并且指定类型 json node 低版本不支持

```js
import data from './data.json' assert { type: 'json' };
console.log(data);
```

加载模块的整体对象

```js
import * as all from 'xxx.js';
```

动态导入模块

import 静态加载不支持掺杂在逻辑中如果想动态加载请使用 import 函数模式

```js
if (true) {
  import('./test.js').then();
}
```

模块导出

- 导出一个默认对象 default 只能有一个不可重复 export default

```js
export default {
  name: 'test',
};
```

- 导出变量

```js
export const a = 1;
```

#### Cjs 和 ESM 的区别

1. Cjs 是基于运行时的同步加载，esm 是基于编译时的异步加载
2. Cjs 是可以修改值的，esm 值并且不可修改（可读的）
3. Cjs 不可以 tree shaking，esm 支持 tree shaking
4. commonjs 中顶层的 this 指向这个模块本身，而 ES6 中顶层 this 指向 undefined

## 6.全局变量

#### 如何在 nodejs 定义全局变量

在 nodejs 中使用**global**定义全局变量，定义的变量，可以在引入的文件中也可以访问到该变量，例如`a.js` `global.xxx = 'xxx'` `require('xxx.js')` xxx.js 也可以访问到该变量，在浏览器中我们定义的全局变量都在 window,nodejs 在 global，不同的环境还需要判断，于是在 ECMAScript 2020 出现了一个`globalThis`全局变量，在 nodejs 环境会自动切换成 global ，浏览器环境自动切换 window 非常方便

#### 关于其他全局 API

> 由于 nodejs 中没有 DOM 和 BOM，除了这些 API，其他的 ECMAscriptAPI 基本都能用

例如

```js
setTimeout setInterval Promise Math  console  Date fetch(node v18) 等...
```

这些 API 都是可以正常用的

#### nodejs 内置全局 API

> **`__dirname __filename 只能在cjs使用 esm规范没有这两个全局变量`**

```js
__dirname;
```

它表示当前模块的所在`目录`的绝对路径

```js
__filename;
```

它表示当前模块`文件`的绝对路径，包括文件名和文件扩展名

```js
require module
```

#### **process**

1. `process.argv`: 这是一个包含命令行参数的数组。第一个元素是 Node.js 的执行路径，第二个元素是当前执行的 JavaScript 文件的路径，之后的元素是传递给脚本的命令行参数。
2. `process.env`: 这是一个包含当前环境变量的对象。您可以通过`process.env`访问并操作环境变量。
3. `process.cwd()`: 这个方法返回当前工作目录的路径。
4. `process.on(event, listener)`: 用于注册事件监听器。您可以使用`process.on`监听诸如`exit`、`uncaughtException`等事件，并在事件发生时执行相应的回调函数。
5. `process.exit([code])`: 用于退出当前的 Node.js 进程。您可以提供一个可选的退出码作为参数。
6. `process.pid`: 这个属性返回当前进程的 PID（进程 ID）。

这些只是`process`对象的一些常用属性和方法，还有其他许多属性和方法可用于监控进程、设置信号处理、发送 IPC 消息等。

需要注意的是，`process`对象是一个全局对象，可以在任何模块中直接访问，无需导入或定义。

#### **Buffer**

1. 创建 `Buffer` 实例：
   - `Buffer.alloc(size[, fill[, encoding]])`: 创建一个指定大小的新的`Buffer`实例，初始内容为零。`fill`参数可用于填充缓冲区，`encoding`参数指定填充的字符编码。
   - `Buffer.from(array)`: 创建一个包含给定数组的`Buffer`实例。
   - `Buffer.from(string[, encoding])`: 创建一个包含给定字符串的`Buffer`实例。
2. 读取和写入数据：
   - `buffer[index]`: 通过索引读取或写入`Buffer`实例中的特定字节。
   - `buffer.length`: 获取`Buffer`实例的字节长度。
   - `buffer.toString([encoding[, start[, end]]])`: 将`Buffer`实例转换为字符串。
3. 转换数据：
   - `buffer.toJSON()`: 将`Buffer`实例转换为 JSON 对象。
   - `buffer.slice([start[, end]])`: 返回一个新的`Buffer`实例，其中包含原始`Buffer`实例的部分内容。
4. 其他方法：
   - `Buffer.isBuffer(obj)`: 检查一个对象是否是`Buffer`实例。
   - `Buffer.concat(list[, totalLength])`: 将一组`Buffer`实例或字节数组连接起来形成一个新的`Buffer`实例。

请注意，从 Node.js 6.0 版本开始，`Buffer`构造函数的使用已被弃用，推荐使用`Buffer.alloc()`、`Buffer.from()`等方法来创建`Buffer`实例。

`Buffer`类在处理文件、网络通信、加密和解密等操作中非常有用，尤其是在需要处理二进制数据时

## 7.CSR SSR SEO

#### **CSR（Client-Side Rendering）——客户端渲染**

**渲染时机**：所有页面内容在客户端通过 JavaScript 渲染。

**工作流程**：

    1. 浏览器加载一个基础 HTML 文件（通常包含空的` <div>` 标签）。
    1. 加载并执行 JavaScript（如 React、Vue 等框架）。
    1. JavaScript 渲染页面内容

**优点**：

    1. 页面切换流畅，适合单页应用（SPA）。
    1. 减少服务器压力，更多任务转移到客户端。

**缺点**：

    1. 初次加载慢，尤其是 JavaScript 文件较大时。
    1. 对 SEO 不友好，因为爬虫可能无法解析动态生成的内容。

**适用场景**：

- 后台管理系统。
- 用户交互复杂、实时性强的应用（如聊天、仪表盘）

#### **SSR（Server-Side Rendering）——服务端渲染**

**渲染时机**：页面内容在服务器生成，然后返回完整的 HTML。

**工作流程**：

​ 1. 用户请求页面时，服务器渲染完整的 HTML 页面。

​ 2. 浏览器显示完整内容。

​ 3. 后续通过 JavaScript 提供交互功能。

**优点**：

​ 1. 更快的首屏加载，用户可以更快看到内容。

​ 2. 更好的 SEO 支持，搜索引擎爬虫可以直接读取 HTML 内容。

**缺点**：

​ 1.增加服务器负担，每次请求都需要渲染页面。

​ 2.页面动态交互需要额外处理（如数据绑定）。

**适用场景**：

- 需要强 SEO 支持的内容型网站（如博客、电商）。
- 高度关注首屏加载速度的应用。

#### **SEO（Search Engine Optimization）——搜索引擎优化**

**目标**：通过优化网站结构和内容，提高搜索引擎收录和排名，吸引更多自然流量。

**关键点**：

1. **内容优化**：关键词、标题、描述等。

2. **技术优化**：

   - 确保页面内容可被搜索引擎爬取（CSR 的内容需要特别处理）。

   - 使用 SSR 或静态生成（SSG）提升爬虫的可见性。

3. **性能优化**：

- 提高页面加载速度。
- 使用 CDN、压缩资源等手段。

#### CSR 和 SSR 区别

| 对比项       | **CSR**                          | SSR                                |
| ------------ | -------------------------------- | ---------------------------------- |
| 首屏加载速度 | 较慢，需等待 JavaScript 渲染完成 | 较快，直接返回完整 HTML            |
| SEO 支持     | 较差，需额外配置                 | 较好，HTML 可被直接爬取            |
| 服务器压力   | 较小，渲染在客户端完成           | 较大，每次请求需服务器渲染         |
| 开发复杂度   | 较低，前后端分离                 | 较高，需同时处理前端和后端渲染逻辑 |
| 适用场景     | 动态交互强的 SPA                 | 内容型网站或注重首屏体验的应用     |

## 8.path

> path 模块在不同的操作系统是有差异的(windows | posix)

`windows`大家肯定熟悉，`posix`可能大家没听说过

**posix（Portable Operating System Interface of UNIX）**

posix 表示可移植操作系统接口，也就是定义了一套标准，遵守这套标准的操作系统有(unix,like unix,linux,macOs,windows wsl)，为什么要定义这套标准，比如在 Linux 系统启动一个进程需要调用`fork`函数,在 windows 启动一个进程需要调用`creatprocess`函数，这样就会有问题，比如我在 linux 写好了代码，需要移植到 windows 发现函数不统一，posix 标准的出现就是为了解决这个问题。

Windows 并没有完全遵循 POSIX 标准。Windows 在设计上采用了不同于 POSIX 的路径表示方法。

在 Windows 系统中，路径使用反斜杠（`\`）作为路径分隔符。这与 POSIX 系统使用的正斜杠（`/`）是不同的。这是 Windows 系统的历史原因所致，早期的 Windows 操作系统采用了不同的设计选择。

#### windows posix 差异

`path.basename()` 方法返回的是给定路径中的最后一部分

在 posix 处理 windows 路径

```js
path.basename('C:\tempmyfile.html');
// 返回: 'C:\temp\myfile.html'
```

结果返回的并不对 应该返回 myfile.html

如果要在 posix 系统处理 windows 的路径需要调用对应操作系统的方法应该修改为

```js
path.win32.basename('C:\tempmyfile.html');
```

返回 myfile.html

#### path.dirname

这个 API 和 basename 正好互补

```js
path.dirname('/aaaa/bbbb/cccc/index.html');
```

dirname API 返回 /aaaa/bbbb/cccc 除了最后一个路径的其他路径。

basename API 返回 最后一个路径 index.html

#### path.extname

这个 API 用来返回扩展名例如/bbb/ccc/file.txt 返回就是.txt

```js
path.extname('/aaaa/bbbb/cccc/index.html.ccc.ddd.aaa');
//.aaa
```

> 如果有多个 **.** 返回最后一个 如果没有扩展名返回空

#### path.join

这个 API 主要是用来拼接路径的

```js
path.join('/foo', '/cxk', '/ikun');
// /foo/cxk/ikun
```

> 可以支持 .. ./ ../操作符

```js
path.join('/foo', '/cxk', '/ikun', '../');
// /foo/cxk/
```

#### path.resolve

用于将相对路径解析并且返回`绝对路径`

如果传入了多个绝对路径 它将返回最右边的绝对路径

```js
path.resolve('/aaa', '/bbb', '/ccc');
//   /ccc
```

传入绝对路径 + 相对路径

```js
path.resolve(__dirname, './index.js');
//  /User/xiaoman/DeskTop/node/index.js
```

如果只传入相对路径

```js
path.resolve('./index.js');
// 返回工作目录 + index.js
```

#### path.parse path.format

path.format 和 path.parse 正好互补

**parse**

用于解析文件路径。它接受一个路径字符串作为输入，并返回一个包含路径各个组成部分的对象

```js
path.parse('/home/user/dir/file.txt')

{
  root: '/',
  dir: '/home/user/dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
```

- `root`：路径的根目录，即 `/`。
- `dir`：文件所在的目录，即 `/home/user/documents`。
- `base`：文件名，即 `file.txt`。
- `ext`：文件扩展名，即 `.txt`。
- `name`：文件名去除扩展名，即 `file`。

**format** 正好相反 在把对象转回字符串

```js
path.format({
  root: '/',
  dir: '/home/user/documents',
  base: 'file.txt',
  ext: '.txt',
  name: 'file',
});
// /home/user/dir/file.txt
```

## 9.os

**Nodejs os 模块可以跟操作系统进行交互**

Nodejs os 模块可以跟操作系统进行交互

```js
var os = require('node:os');
```

| 序号 | API                        | 作用                                                                                                                                                                          |
| ---- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | **os.type()**              | 它在 Linux 上返回 `'Linux'`，在 macOS 上返回 `'Darwin'`，在 Windows 上返回 `'Windows_NT'`                                                                                     |
| 2    | **os.platform()**          | 返回标识为其编译 Node.js 二进制文件的操作系统平台的字符串。 该值在编译时设置。 可能的值为 `'aix'`、`'darwin'`、`'freebsd'`、`'linux'`、`'openbsd'`、`'sunos'`、以及 `'win32'` |
| 3    | **os.release()**           | 返回操作系统的版本例如 10.xxxx win10                                                                                                                                          |
| 4    | **os.homedir()**           | 返回用户目录 例如 c:\user\xiaoman 原理就是 windows `echo %USERPROFILE% `posix $HOME                                                                                           |
| 5    | **os.arch()**              | 返回 cpu 的架构 可能的值为 `'arm'`、`'arm64'`、`'ia32'`、`'mips'`、`'mipsel'`、`'ppc'`、`'ppc64'`、`'s390'`、`'s390x'`、以及 `'x64'`                                          |
| 6    | **os.cpus()**              | 获取 CPU 的线程以及详细信息                                                                                                                                                   |
| 7    | **os.networkInterfaces()** | 获取网络信息                                                                                                                                                                  |

## 10.process

`process` 是 Nodejs 操作当前进程和控制当前进程的 API，并且是挂载到 globalThis 下面的全局 API

#### 基本信息

**process.version：返回 Node.js 的版本号**

```JS
console.log(process.version); // 输出: 'v18.16.0'
```

**process.versions：返回一个对象，包含 Node.js 和其依赖的版本信息。**

**process.platform：返回当前运行平台（如 'win32'、'linux'、'darwin'）**

**process.arch：返回当前 CPU 的架构（如 'x64'、'arm'）**

**process.pid：返回当前进程的 PID（进程 ID）**

**process.title：获取或设置进程的标题**

#### 环境变量

**process.env：返回包含环境变量的对象**

```js
console.log(process.env.PATH);
process.env.MY_VAR = '123';
console.log(process.env.MY_VAR); // 输出: '123'
```

#### **当前工作目录**

**process.cwd()：返回当前工作目录**

**process.chdir(directory)：更改当前工作目录**

```js
process.chdir('/tmp');
console.log(process.cwd()); // 输出: '/tmp'
```

#### **进程运行信息**

**process.uptime()：返回当前进程的运行时间（以秒为单位）**

**process.memoryUsage()：返回一个对象，显示内存使用情况**

**process.hrtime([time])：返回高精度的时间，适合测量性能**

```js
const start = process.hrtime();
setTimeout(() => {
  const end = process.hrtime(start);
  console.log(`Time: ${end[0]} seconds and ${end[1]} nanoseconds`);
}, 1000);
```

#### **标准输入输出**

**process.stdin：获取用户输入**

```js
process.stdin.on('data', (data) => {
  console.log(`You typed: ${data}`);
});
```

**process.stdout：输出到控制台**

```js
process.stdout.write('Hello, World!\n');
```

**process.stderr:输出错误信息到控制台**

```js
process.stderr.write('Error occurred!\n');
```

#### **信号处理**

**process.on(event, callback):监听进程事件**

```js
process.on('exit', (code) => {
  console.log(`Process exited with code: ${code}`);
});

process.on('SIGINT', () => {
  console.log('Caught interrupt signal');
  process.exit();
});
```

**process.kill(pid, [signal]):向进程发送信号**

```js
process.kill(process.pid, 'SIGTERM');
```

#### **退出进程**

**process.exit([code]):退出当前进程，默认 code 为 0。**

**process.exitCode:设置退出码，但不会立即退出。**

#### **异常处理**

**process.on('uncaughtException', callback):捕获未处理的异常**

```js
process.on('uncaughtException', (err) => {
  console.error('Caught exception:', err);
});
throw new Error('Test Error');
```

**process.on('unhandledRejection', callback):捕获未处理的 Promise 拒绝**

```js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
Promise.reject(new Error('Promise Rejection'));
```

process 提供了强大的功能，用于管理和监控 Node.js 应用程序的生命周期，是编写 CLI 工具和系统级脚本的重要工具。

## **11.child_process**

在 Node.js 中，**child_process** 模块用于创建子进程，以便执行系统命令或运行其他脚本。通过这个模块，你可以执行 shell 命令、调用其他脚本、以及启动独立的子进程。

#### 创建子进程

Nodejs 创建子进程共有`7个`API Sync 同步 API 不加是异步 API

1. spawn 执行命令
2. exec 执行命令
3. execFile 执行可执行文件
4. fork 创建 node 子进程
5. `execSync` 执行命令 同步执行
6. `execFileSync` 执行可执行文件 同步执行
7. `spawnSync` 执行命令 同步执行

#### 用法

**exec：适合运行短时间的命令并获取命令的输出结果，输出会以缓冲区的形式返回，适合处理小量数据。**

```js
const { exec } = require('child_process');

exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});
```

**execFile：直接执行一个可执行文件（不通过 shell），更安全，因为它避免了 shell 注入攻击**

```js
const { execFile } = require('child_process');

execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});
```

**spawn：用于创建一个子进程并通过流（stream）处理数据，适合处理大量数据，或需要与子进程进行实时通信。**

```js
const { spawn } = require('child_process');

const child = spawn('ls', ['-la']);

child.stdout.on('data', (data) => {
  console.log(`Stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`Stderr: ${data}`);
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});
```

**fork：专门用于创建 Node.js 子进程，加载一个独立的 JavaScript 模块，适合处理需要子进程与主进程通信的场景（通过 message 事件）。**

```js
const { fork } = require('child_process');

const child = fork('child.js');

child.on('message', (message) => {
  console.log('Message from child:', message);
});

child.send({ hello: 'world' });
```

**execSync：同步执行命令，返回命令的标准输出。适用场景：需要立即获取结果并不介意阻塞主线程的情况。**

```js
const { execSync } = require('child_process');

try {
  const output = execSync('ls -la');
  console.log(output.toString()); // 将 Buffer 转为字符串
} catch (error) {
  console.error(`Error: ${error.message}`);
}
```

**execFileSync：同步执行一个文件，直接运行可执行文件，不经过 shell。适用场景：直接执行某个二进制文件或脚本，避免 shell 注入风险。**

```js
const { execFileSync } = require('child_process');

try {
  const output = execFileSync('node', ['--version']);
  console.log(output.toString()); // 输出 Node.js 版本
} catch (error) {
  console.error(`Error: ${error.message}`);
}
```

**spawnSync：同步生成子进程，用流（stream）处理数据。 适用场景：需要同步处理复杂的子进程任务，同时控制输入输出流。**

```js
const { spawnSync } = require('child_process');

const result = spawnSync('ls', ['-la']);

if (result.error) {
  console.error(`Error: ${result.error.message}`);
} else {
  console.log(result.stdout.toString()); // 标准输出
  console.error(result.stderr.toString()); // 标准错误
}
```

## 12.event

**on：用于绑定事件监听器**

**emit:用于触发事件**

```js
const emitter = require('events');

const event = new emitter();
//监听test
event.on('test', (data) => {
  console.log(data);
});

event.emit('test', 'xmxmxmxmx'); //派发事件
```

**once:绑定的监听器只会被调用一次，之后自动移除。**

```js
emitter.once(eventName, listener);
```

**off:移除指定事件的监听器**

```js
emitter.off(eventName, listener);
```

**setMaxListeners:默认最大监听器数量是 10，可以通过 setMaxListeners 调整。**

```js
emitter.setMaxListeners(20);
```

一些核心模块（如 fs、http）使用 EventEmitter 实现事件驱动。例如：

**http.Server**：request 事件用于处理传入的 HTTP 请求。

```js
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**process**

![image-20241230163536476](/Users/dayuyu/Library/Application Support/typora-user-images/image-20241230163536476.png)

打开 nodejs 源码 搜索 `setupProcessObject` 这个函数

![image-20241230163615645](/Users/dayuyu/Library/Application Support/typora-user-images/image-20241230163615645.png)

1. 它首先引入 event 模块
2. 获取 process 的原型对象
3. 将 evnet 的原型对象设给了 process 的原型对象
4. 并且重新绑定上下文
5. 将 process 挂载到 globalThis 所以我们可以全局访问这个 API

## 13.unit

util 是 Node.js 内部提供的很多实用或者工具类型的 API，方便我们快速开发。

**util.promisify**：使用 util 的`promisify` 改为 promise 风格 Promiseify 接受 `original`一个函数体

```js
import { exec } from 'node:child_process';
import util from 'node:util';

const execPromise = util.promisify(exec);

execPromise('node -v')
  .then((res) => {
    console.log(res, 'res');
  })
  .catch((err) => {
    console.log(err, 'err');
  });
```

**util.callbackify**:将 promise 类型的 API 变成 回调函数。

```js
import util from 'node:util';

const fn = (type) => {
  if (type == 1) {
    return Promise.resolve('test');
  }
  return Promise.reject('error');
};

const callback = util.callbackify(fn);

callback(1222, (err, val) => {
  console.log(err, val);
});
```

**util.format**

- `%s`: `String` 将用于转换除 `BigInt`、`Object` 和 `-0` 之外的所有值。 `BigInt` 值将用 `n` 表示，没有用户定义的 `toString` 函数的对象使用具有选项 `{ depth: 0, colors: false, compact: 3 }` 的 `util.inspect()` 进行检查。
- `%d`: `Number` 将用于转换除 `BigInt` 和 `Symbol` 之外的所有值。
- `%i`: `parseInt(value, 10)` 用于除 `BigInt` 和 `Symbol` 之外的所有值。
- `%f`: `parseFloat(value)` 用于除 `Symbol` 之外的所有值。
- `%j`: JSON。 如果参数包含循环引用，则替换为字符串 `'[Circular]'`。
- `%o`: `Object`. 具有通用 JavaScript 对象格式的对象的字符串表示形式。 类似于具有选项 `{ showHidden: true, showProxy: true }` 的 `util.inspect()`。 这将显示完整的对象，包括不可枚举的属性和代理。
- `%O`: `Object`. 具有通用 JavaScript 对象格式的对象的字符串表示形式。 类似于没有选项的 `util.inspect()`。 这将显示完整的对象，但不包括不可枚举的属性和代理。
- `%c`: `CSS`. 此说明符被忽略，将跳过任何传入的 CSS。
- `%%`: 单个百分号 (`'%'`)。 这不消费参数。

语法 跟 C 语言的 `printf` 一样的

```js
util.format(format, [args]);
```

例子 格式化一个字符串

```js
util.format('%s-----%s %s/%s', 'foo', 'bar', 'xm', 'zs');
//foo-----bar xm/zs  可以返回指定的格式
```

如果不传入格式化参数 就按空格分开

```js
util.format(1, 2, 3);
//1 2 3
```

## 14.fs

在 Node.js 中，`fs` 模块是文件系统模块（File System module）的缩写，它提供了与文件系统进行交互的各种功能。通过 `fs` 模块，你可以执行诸如读取文件、写入文件、更改文件权限、创建目录等操作，`Node.js 核心API之一`。

#### fs 多种策略

```js
import fs from 'node:fs';
import fs2 from 'node:fs/promises';
//读取文件
fs2.readFile('./index.txt').then((result) => {
  console.log(result.toString());
});
fs.readFile('./index.txt', (err, data) => {
  if (err) {
    return err;
  }
  console.log(data.toString());
});
let txt = fs.readFileSync('./index.txt');
console.log(txt.toString());
```

1. fs 支持同步和异步两种模式 增加了`Sync` fs 就会采用同步的方式运行代码，会阻塞下面的代码，不加 Sync 就是异步的模式不会阻塞。
2. fs 新增了 promise 版本，只需要在引入包后面增加/promise 即可，fs 便可支持 promise 回调。
3. fs 返回的是一个 buffer 二进制数据 每两个十六进制数字表示一个字节

```js
<Buffer 31 e3 80 81 e9 82 a3 e4 b8 80 e5 b9 b4 e5 86 b3 e8 b5 9b ef bc 8c e6 98 af 53 53 47 e5 af b9 e6 88 98 53 4b 54 ef bc 8c e6 9c 80 e7 bb 88 e6 af 94 e5 ... 635 more bytes>
```

#### 常用 API 介绍

读取文件 `readFile` 第一个参数 读取的路径， 第二个参数是个配置项

`encoding` 支持各种编码 utf-8 之类的

flag 就很多了

- `'a'`: 打开文件进行追加。 如果文件不存在，则创建该文件。

- `'ax'`: 类似于 `'a'` 但如果路径存在则失败。

- `'a+'`: 打开文件进行读取和追加。 如果文件不存在，则创建该文件。

- `'ax+'`: 类似于 `'a+'` 但如果路径存在则失败。

- `'as'`: 以同步模式打开文件进行追加。 如果文件不存在，则创建该文件。

- `'as+'`: 以同步模式打开文件进行读取和追加。 如果文件不存在，则创建该文件。

- `'r'`: 打开文件进行读取。 如果文件不存在，则会发生异常。

- `'r+'`: 打开文件进行读写。 如果文件不存在，则会发生异常。

- `'rs+'`: 以同步模式打开文件进行读写。 指示操作系统绕过本地文件系统缓存。

  这主要用于在 NFS 挂载上打开文件，因为它允许跳过可能过时的本地缓存。 它对 I/O 性能有非常实际的影响，因此除非需要，否则不建议使用此标志。

  这不会将 `fs.open()` 或 `fsPromises.open()` 变成同步阻塞调用。 如果需要同步操作，应该使用类似 `fs.openSync()` 的东西。

- `'w'`: 打开文件进行写入。 创建（如果它不存在）或截断（如果它存在）该文件。

- `'wx'`: 类似于 `'w'` 但如果路径存在则失败。

- `'w+'`: 打开文件进行读写。 创建（如果它不存在）或截断（如果它存在）该文件。

- `'wx+'`: 类似于 `'w+'` 但如果路径存在则失败。

```js
import fs2 from 'node:fs/promises';

fs2
  .readFile('./index.txt', {
    encoding: 'utf8',
    flag: '',
  })
  .then((result) => {
    console.log(result.toString());
  });
```

使用可读流读取 使用场景适合读取`大文件`

```js
const readStream = fs.createReadStream('./index.txt', {
  encoding: 'utf8',
});

readStream.on('data', (chunk) => {
  console.log(chunk);
});

readStream.on('end', () => {
  console.log('close');
});
```

**创建文件夹** 如果开启 **recursive** 可以递归创建多个文件夹

```js
fs.mkdir('path/test/ccc', { recursive: true }, (err) => {});
```

删除文件夹 如果开启**recursive** 递归删除全部文件夹

```js
fs.rm('path', { recursive: true }, (err) => {});
```

**重命名文件** 第一个参数原始名称 第二个参数新的名称

```js
fs.renameSync('./test.txt', './test2.txt');
```

**监听文件的变化** 返回监听的事件如`change`,和监听的内容`filename`

```js
fs.watch('./test2.txt', (event, filename) => {
  console.log(event, filename);
});
```

**写入内容**

```js
const fs = require('node:fs');
fs.writeFileSync('index.txt', 'java之父\n余胜军');
```

**追加内容**

```js
//方式一
fs.writeFileSync('index.txt', '\nvue之父\n鱿鱼须', {
  flag: 'a',
});
```

```js
//方式二
const fs = require('node:fs');
fs.appendFileSync('index.txt', '\nunshift创始人\n麒麟哥');
```

**可写流**

```js
const fs = require('node:fs');

let verse = ['待到秋来九月八', '我花开后百花杀', '冲天香阵透长安', '满城尽带黄金甲'];

let writeStream = fs.createWriteStream('index.txt');

verse.forEach((item) => {
  writeStream.write(item + '\n');
});

writeStream.end();

writeStream.on('finish', () => {
  console.log('写入完成');
});
```

我们可以创建一个可写流 打开一个通道，可以一直写入数据，用于处理大量的数据写入，写入完成之后调用 end 关闭可写流，监听 finish 事件 写入完成

#### 源码解析

fs 的源码是通过 `C++` 层的 `FSReqCallback` 这个类 对`libuv` 的`uv_fs_t` 的一个封装，其实也就是将我们 fs 的参数透传给 `libuv` 层

```c
// 创建目录的异步操作函数，通过uv_fs_mkdir函数调用
// 参数：
// - loop: 事件循环对象，用于处理异步操作
// - req: 文件系统请求对象，用于保存操作的状态和结果
// - path: 要创建的目录的路径
// - mode: 目录的权限模式 777 421
// - cb: 操作完成后的回调函数
int uv_fs_mkdir(uv_loop_t* loop,
                uv_fs_t* req,
                const char* path,
                int mode,
                uv_fs_cb cb) {
  INIT(MKDIR);
  PATH;
  req->mode = mode;
  if (cb != NULL)
    if (uv__iou_fs_mkdir(loop, req))
      return 0;
  POST;
}
```

```js
const fs = require('node:fs');

fs.readFile(
  './index.txt',
  {
    encoding: 'utf-8',
    flag: 'r',
  },
  (err, dataStr) => {
    if (err) throw err;
    console.log('fs');
  }
);

setImmediate(() => {
  console.log('setImmediate');
});
```

为什么先走 setImmediate 呢，而不是 fs

Node.js 读取文件的时候是使用 libuv 进行调度的

而 setImmediate 是由 V8 进行调度的

文件读取完成后 libuv 才会将 fs 的结果 推入 V8 的队列

#### 硬链接 和 软连接

```js
fs.linkSync('./index.txt', './index2.txt'); //硬链接

fs.symlinkSync('./index.txt', './index3.txt', 'file'); //软连接
```

硬链接的作用和用途如下：

1. 文件共享：硬链接允许多个文件名指向同一个文件，这样可以在不同的位置使用不同的文件名引用相同的内容。这样的共享文件可以节省存储空间，并且在多个位置对文件的修改会反映在所有引用文件上。
2. 文件备份：通过创建硬链接，可以在不复制文件的情况下创建文件的备份。如果原始文件发生更改，备份文件也会自动更新。这样可以节省磁盘空间，并确保备份文件与原始文件保持同步。
3. 文件重命名：通过创建硬链接，可以为文件创建一个新的文件名，而无需复制或移动文件。这对于需要更改文件名但保持相同内容和属性的场景非常有用。

软链接的一些特点和用途如下：

1. 软链接可以创建指向文件或目录的引用。这使得你可以在不复制或移动文件的情况下引用它们，并在不同位置使用不同的文件名访问相同的内容。
2. 软链接可以用于创建快捷方式或别名，使得你可以通过一个简短或易记的路径来访问复杂或深层次的目录结构。
3. 软链接可以用于解决文件或目录的位置变化问题。如果目标文件或目录被移动或重命名，只需更新软链接的目标路径即可，而不需要修改引用该文件或目录的其他代码。

## 15.crypto

crypto 模块的目的是为了提供通用的`加密和哈希算法`。用纯 JavaScript 代码实现这些功能不是不可能，但速度会非常慢。nodejs 用 C/C++实现这些算法后，通过 crypto 这个模块暴露为 JavaScript 接口，这样用起来方便，运行速度也快。

密码学是计算机科学中的一个重要领域，它涉及到加密、解密、哈希函数和数字签名等技术。Node.js 是一个流行的服务器端 JavaScript 运行环境，它提供了强大的密码学模块，使开发人员能够轻松地在其应用程序中实现各种密码学功能。本文将介绍密码学的基本概念，并探讨 Node.js 中常用的密码学 API。

### 对称加密

```js
const crypto = require('node:crypto');

// 生成一个随机的 16 字节的初始化向量 (IV)
const iv = Buffer.from(crypto.randomBytes(16));

// 生成一个随机的 32 字节的密钥
const key = crypto.randomBytes(32);

// 创建加密实例，使用 AES-256-CBC 算法，提供密钥和初始化向量
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

// 对输入数据进行加密，并输出加密结果的十六进制表示
cipher.update('test', 'utf-8', 'hex');
const result = cipher.final('hex');

// 解密
const de = crypto.createDecipheriv('aes-256-cbc', key, iv);
de.update(result, 'hex');
const decrypted = de.final('utf-8');

console.log('Decrypted:', decrypted);
```

对称加密是一种简单而快速的加密方式，它使用相同的密钥（称为对称密钥）来进行加密和解密。这意味着发送者和接收者在加密和解密过程中都使用相同的密钥。对称加密算法的加密速度很快，适合对大量数据进行加密和解密操作。然而，对称密钥的安全性是一个挑战，因为需要确保发送者和接收者都安全地共享密钥，否则有风险被未授权的人获取密钥并解密数据。

### 非对称加密

```js
const crypto = require('node:crypto');
// 生成 RSA 密钥对
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// 要加密的数据
const text = 'test';

// 使用公钥进行加密
const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(text, 'utf-8'));

// 使用私钥进行解密
const decrypted = crypto.privateDecrypt(privateKey, encrypted);

console.log(decrypted.toString());
```

非对称加密使用一对密钥，分别是公钥和私钥。发送者使用接收者的公钥进行加密，而接收者使用自己的私钥进行解密。公钥可以自由分享给任何人，而私钥必须保密。非对称加密算法提供了更高的安全性，因为即使公钥泄露，只有持有私钥的接收者才能解密数据。然而，非对称加密算法的加密速度相对较慢，不适合加密大量数据。因此，在实际应用中，通常使用非对称加密来交换对称密钥，然后使用对称加密算法来加密实际的数据。

### 哈希函数

```js
const crypto = require('node:crypto');

// 要计算哈希的数据
let text = '123456';

// 创建哈希对象，并使用 MD5 算法
const hash = crypto.createHash('md5');

// 更新哈希对象的数据
hash.update(text);

// 计算哈希值，并以十六进制字符串形式输出
const hashValue = hash.digest('hex');

console.log('Text:', text);
console.log('Hash:', hashValue);
```

哈希函数具有以下特点：

1. 固定长度输出：不论输入数据的大小，哈希函数的输出长度是固定的。例如，常见的哈希函数如 MD5 和 SHA-256 生成的哈希值长度分别为 128 位和 256 位。
2. 不可逆性：哈希函数是单向的，意味着从哈希值推导出原始输入数据是非常困难的，几乎不可能。即使输入数据发生微小的变化，其哈希值也会完全不同。
3. 唯一性：哈希函数应该具有较低的碰撞概率，即不同的输入数据生成相同的哈希值的可能性应该非常小。这有助于确保哈希值能够唯一地标识输入数据。

使用场景

1. 我们可以避免密码明文传输 使用 md5 加密或者 sha256
2. 验证文件完整性，读取文件内容生成 md5 如果前端上传的 md5 和后端的读取文件内部的 md5 匹配说明文件是完整的

## 16.cli

#### 什么是脚手架？

例如:`vue-cli` `Angular CLI` `Create React App`

编写自己的脚手架是指创建一个定制化的工具，用于快速生成项目的基础结构和代码文件，以及提供一些常用的命令和功能。通过编写自己的脚手架，你可以定义项目的目录结构、文件模板，管理项目的依赖项，生成代码片段，以及提供命令行接口等功能

1. 项目结构：脚手架定义了项目的目录结构，包括源代码、配置文件、静态资源等。
2. 文件模板：脚手架提供了一些预定义的文件模板，如 HTML 模板、样式表、配置文件等，以加快开发者创建新文件的速度。
3. 命令行接口：脚手架通常提供一个命令行接口，通过输入命令和参数，开发者可以执行各种任务，如创建新项目、生成代码文件、运行测试等。
4. 依赖管理：脚手架可以帮助开发者管理项目的依赖项，自动安装和配置所需的库和工具。
5. 代码生成：脚手架可以生成常见的代码结构，如组件、模块、路由等，以提高开发效率。
6. 配置管理：脚手架可以提供一些默认的配置选项，并允许开发者根据需要进行自定义配置。

![image-20241231170909079](/Users/dayuyu/Library/Application Support/typora-user-images/image-20241231170909079.png)

#### 相关工具

- **`commander`**

> Commander 是一个用于构建命令行工具的 npm 库。它提供了一种简单而直观的方式来创建命令行接口，并处理命令行参数和选项。使用 Commander，你可以轻松定义命令、子命令、选项和帮助信息。它还可以处理命令行的交互，使用户能够与你的命令行工具进行交互

- **`inquirer`**

> Inquirer 是一个强大的命令行交互工具，用于与用户进行交互和收集信息。它提供了各种丰富的交互式提示（如输入框、选择列表、确认框等），可以帮助你构建灵活的命令行界面。通过 Inquirer，你可以向用户提出问题，获取用户的输入，并根据用户的回答采取相应的操作。

- **`ora`**

> Ora 是一个用于在命令行界面显示加载动画的 npm 库。它可以帮助你在执行耗时的任务时提供一个友好的加载状态提示。Ora 提供了一系列自定义的加载动画，如旋转器、进度条等，你可以根据需要选择合适的加载动画效果，并在任务执行期间显示对应的加载状态。

- **`download-git-repo`**

> Download-git-repo 是一个用于下载 Git 仓库的 npm 库。它提供了一个简单的接口，可以方便地从远程 Git 仓库中下载项目代码。你可以指定要下载的仓库和目标目录，并可选择指定分支或标签。Download-git-repo 支持从各种 Git 托管平台（如 GitHub、GitLab、Bitbucket 等）下载代码。

#### 编写代码

- index.js

```js
#!/usr/bin/env node
import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'node:fs';
import { checkPath, downloadTemp } from './utils.js';
let json = fs.readFileSync('./package.json', 'utf-8');
json = JSON.parse(json);

program.version(json.version); //创建版本号
//添加create 命令 和 别名crt 以及描述 以及 执行完成之后的动作
program
  .command('create <project>')
  .alias('ctr')
  .description('create a new project')
  .action((project) => {
    //命令行交互工具
    inquirer
      .prompt([
        {
          type: 'input', // 输入
          name: 'projectName', // 返回值的key
          message: 'project name', // 描述
          default: project, // 默认值
        },
        {
          type: 'confirm',
          name: 'isTs',
          message: '是否支持typeScript',
        },
      ])
      .then((answers) => {
        if (checkPath(answers.projectName)) {
          console.log('文件已存在');
          return;
        }

        if (answers.isTs) {
          downloadTemp('ts', answers.projectName);
        } else {
          downloadTemp('js', answers.projectName);
        }
      });
  });

program.parse(process.argv);
```

为什么第一行要写 `#!/usr/bin/env node`

这是一个 特殊的注释 用于告诉操作系统用 node 解释器去执行这个文件，而不是显式地调用 `node` 命令

- utils.js

```js
import fs from 'node:fs';
import download from 'download-git-repo';
import ora from 'ora';
const spinner = ora('下载中...');
//验证路径
export const checkPath = (path) => {
  return fs.existsSync(path);
};

//下载
export const downloadTemp = (branch, project) => {
  spinner.start();
  return new Promise((resolve, reject) => {
    download(
      `direct:https://gitee.com/chinafaker/vue-template.git#${branch}`,
      project,
      { clone: true },
      function (err) {
        if (err) {
          reject(err);
          console.log(err);
        }
        resolve();
        spinner.succeed('下载完成');
      }
    );
  });
};
```

- package.json

```json
 "type": "module", //使用import需要设置这个
 "bin": {
    "vue-cli": "src/index.js"
  },
```

用于生成软连接挂载到全局，便可以全局执行 vue-cli 这个命令，配置完成之后 需要执行

```
npm link
```

## 17.zlib

在 Node.js 中，`zlib` 模块提供了对数据压缩和解压缩的功能，以便在应用程序中减少数据的传输大小和提高性能。该模块支持多种压缩算法，包括 Deflate、Gzip 和 Raw Deflate。

`zlib` 模块的主要作用如下：

1. 数据压缩：使用 `zlib` 模块可以将数据以无损压缩算法（如 Deflate、Gzip）进行压缩，减少数据的大小。这在网络传输和磁盘存储中特别有用，可以节省带宽和存储空间。
2. 数据解压缩：`zlib` 模块还提供了对压缩数据的解压缩功能，可以还原压缩前的原始数据。
3. 流压缩：`zlib` 模块支持使用流（`Stream`）的方式进行数据的压缩和解压缩。这种方式使得可以对大型文件或网络数据流进行逐步处理，而不需要将整个数据加载到内存中。
4. 压缩格式支持：`zlib` 模块支持多种常见的压缩格式，如 Gzip 和 Deflate。这些格式在各种应用场景中广泛使用，例如 HTTP 响应的内容编码、文件压缩和解压缩等。

使用 `zlib` 模块进行数据压缩和解压缩可以帮助优化应用程序的性能和资源利用。通过减小数据的大小，可以减少网络传输的时间和带宽消耗，同时减少磁盘上的存储空间。此外，`zlib` 模块还提供了丰富的选项和方法，使得开发者可以根据具体需求进行灵活的压缩和解压缩操作。

### 代码案例

压缩一个 txt 文件**gzip** `index.txt(439kb)` `压缩完index.txt.gz(4b)`

```js
// 引入所需的模块
const zlib = require('zlib'); // zlib 模块提供数据压缩和解压缩功能
const fs = require('node:fs'); // 引入 Node.js 的 fs 模块用于文件操作

// 创建可读流和可写流
const readStream = fs.createReadStream('index.txt'); // 创建可读流，读取名为 index.txt 的文件
const writeStream = fs.createWriteStream('index.txt.gz'); // 创建可写流，将压缩后的数据写入 index.txt.gz 文件

// 使用管道将可读流中的数据通过 Gzip 压缩，再通过管道传输到可写流中进行写入
readStream.pipe(zlib.createGzip()).pipe(writeStream);
```

解压 **gzip**

```js
const readStream = fs.createReadStream('index.txt.gz');
const writeStream = fs.createWriteStream('index2.txt');
readStream.pipe(zlib.createGunzip()).pipe(writeStream);
```

无损压缩 `deflate` 使用 createDeflate 方法

```js
const readStream = fs.createReadStream('index.txt'); // 创建可读流，读取名为 index.txt 的文件
const writeStream = fs.createWriteStream('index.txt.deflate'); // 创建可写流，将压缩后的数据写入 index.txt.deflate 文件
readStream.pipe(zlib.createDeflate()).pipe(writeStream);
```

解压 **deflate**

```js
const readStream = fs.createReadStream('index.txt.deflate');
const writeStream = fs.createWriteStream('index3.txt');
readStream.pipe(zlib.createInflate()).pipe(writeStream);
```

### gzip 和 deflate 区别

1. 压缩算法：Gzip 使用的是 Deflate 压缩算法，该算法结合了 LZ77 算法和哈夫曼编码。LZ77 算法用于数据的重复字符串的替换和引用，而哈夫曼编码用于进一步压缩数据。
2. 压缩效率：Gzip 压缩通常具有更高的压缩率，因为它使用了哈夫曼编码来进一步压缩数据。哈夫曼编码根据字符的出现频率，将较常见的字符用较短的编码表示，从而减小数据的大小。
3. 压缩速度：相比于仅使用 Deflate 的方式，Gzip 压缩需要更多的计算和处理时间，因为它还要进行哈夫曼编码的步骤。因此，在压缩速度方面，Deflate 可能比 Gzip 更快。
4. 应用场景：Gzip 压缩常用于文件压缩、网络传输和 HTTP 响应的内容编码。它广泛应用于 Web 服务器和浏览器之间的数据传输，以减小文件大小和提高网络传输效率。

### http 请求压缩

```js
//deflate 压缩前(8.2kb)` -> `压缩后(236b)
const zlib = require('zlib');
const http = require('node:http');
const server = http.createServer((req, res) => {
  const txt = 'test'.repeat(1000);

  //res.setHeader('Content-Encoding','gzip')
  res.setHeader('Content-Encoding', 'deflate');
  res.setHeader('Content-type', 'text/plan;charset=utf-8');

  const result = zlib.deflateSync(txt);
  res.end(result);
});

server.listen(3000);
//gizp 压缩前(8.2kb)` -> `压缩后(245b)
const zlib = require('zlib');
const http = require('node:http');
const server = http.createServer((req, res) => {
  const txt = 'test'.repeat(1000);

  res.setHeader('Content-Encoding', 'gzip');
  //res.setHeader('Content-Encoding','deflate')
  res.setHeader('Content-type', 'text/plan;charset=utf-8');

  const result = zlib.gzipSync(txt);
  res.end(result);
});

server.listen(3000);
```

## 18.http

在 Node.js 中，你可以使用 http 模块创建 HTTP 服务器或客户端。

### 创建 HTTP 服务器

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Node.js HTTP Server!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

✅ **解释**：

- http.createServer() 创建一个 HTTP 服务器。
- req 是请求对象，res 是响应对象。
- res.writeHead(200, { 'Content-Type': 'text/plain' }) 设置 HTTP 头部信息。
- res.end() 结束响应并发送数据。
- server.listen(3000, callback) 监听 **3000 端口**。

### 创建 HTTP 客户端请求

```js
const http = require('http');

const options = {
  hostname: 'jsonplaceholder.typicode.com',
  path: '/posts/1',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (err) => {
  console.error('Request error:', err);
});

req.end();
```

✅ **解释**：

- 使用 http.request(options, callback) 发起 HTTP 请求。
- 监听 res.on('data', callback) 处理数据流。
- res.on('end', callback) 处理请求完成后的逻辑。
- req.end() 结束请求。

### **处理 JSON 数据**

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello, JSON!' }));
});

server.listen(3000, () => {
  console.log('JSON Server running at http://localhost:3000/');
});
```

✅ **解释**：

- res.writeHead(200, { 'Content-Type': 'application/json' }) 设置 JSON 响应。
- JSON.stringify() 转换对象为 JSON 字符串。

### **解析 URL 路由**

```js
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/hello') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

✅ **解释**：

- 使用 url.parse(req.url, true) 解析 URL。
- 根据 pathname 处理不同的路由。

## 19.反向代理

### 什么是反向代理?

反向代理（Reverse Proxy）是一种网络通信模式，它充当服务器和客户端之间的中介，将客户端的请求转发到一个或多个后端服务器，并将后端服务器的响应返回给客户端。

1. 负载均衡：反向代理可以根据预先定义的算法将请求分发到多个后端服务器，以实现负载均衡。这样可以避免某个后端服务器过载，提高整体性能和可用性。
2. 高可用性：通过反向代理，可以将请求转发到多个后端服务器，以提供冗余和故障转移。如果一个后端服务器出现故障，代理服务器可以将请求转发到其他可用的服务器，从而实现高可用性。
3. 缓存和性能优化：反向代理可以缓存静态资源或经常访问的动态内容，以减轻后端服务器的负载并提高响应速度。它还可以通过压缩、合并和优化资源等技术来优化网络性能。
4. 安全性：反向代理可以作为防火墙，保护后端服务器免受恶意请求和攻击。它可以过滤恶意请求、检测和阻止攻击，并提供安全认证和访问控制。
5. 域名和路径重写：反向代理可以根据特定的规则重写请求的域名和路径，以实现 URL 路由和重定向。这对于系统架构的灵活性和可维护性非常有用。

### 代码实现

> 用到的库 `http-proxy-middleware`

```sh
npm install http-proxy-middleware
```

**根目录自定义配置文件**

```
aiolimp.config.js
```

配置 proxy 代理

```js
module.exports = {
  server: {
    proxy: {
      //代理的路径
      '/api': {
        target: 'http://localhost:3000', //转发的地址
        changeOrigin: true, //是否有跨域
      },
    },
  },
};
```

index.js 实现层

```js
const http = require('node:http');
const fs = require('node:fs');
const url = require('node:url');
const html = fs.readFileSync('./index.html'); //给html文件起个服务
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./aiolimp.config.js');
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const proxyList = Object.keys(config.server.proxy); //获取代理的路径
  if (proxyList.includes(pathname)) {
    //如果请求的路径在里面匹配到 就进行代理
    const proxy = createProxyMiddleware(config.server.proxy[pathname]); //代理
    proxy(req, res);
    return;
  }
  console.log(proxyList);
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.end(html); //返回html
});

server.listen(80); //监听端口
```

test.js 因为我们从 80 端口转发到 3000 端口

```js
const http = require('node:http');
const url = require('node:url');

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url);

    if (pathname === '/api') {
      res.end('success proxy');
    }
  })
  .listen(3000);
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      fetch('/api')
        .then((res) => res.text())
        .then((res) => {
          console.log(res);
        });
    </script>
  </body>
</html>
这样就从80代理到了3000端口 并且无跨域
```

## 20.**动静分离**

**动静分离**（Separation of Dynamic and Static Content）是一种 **优化网站性能** 的架构模式。它的核心思想是：

- **动态请求**（API、数据库交互）交给 **Node.js 或后端服务器** 处理。
- **静态资源**（HTML、CSS、JS、图片）交给 **CDN 或 Nginx** 处理，以减少服务器压力，加快访问速度。

**动静分离的几种实现方式**

**方式 1：Node.js 直接托管静态资源**

如果你的项目是一个 **Node.js** 应用（比如 Express），可以使用 express.static 提供静态资源：

```JS
const express = require('express');
const app = express();

// 托管静态资源
app.use('/static', express.static('public'));

// API 接口
app.get('/api/data', (req, res) => {
    res.json({ message: 'This is a dynamic response' });
});

app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
```

✅ **优点**：

​ • **简单易用**，不需要额外配置服务器。

​ • **适用于小型应用**，开发环境测试很方便。

❌ **缺点**：

​ • **性能不如 Nginx/CDN**，流量大时会影响 API 请求性能。

​ • **不适合生产环境**。

**方式 2：Nginx + Node.js 动静分离**

**Nginx** 非常适合动静分离，它可以：

​ • **直接返回静态资源**，不经过 Node.js，提高性能。

​ • **将 API 请求代理到 Node.js**，保证后端业务逻辑正常运行。

📌 **示例：Nginx 配置**

```nginx
server {
    listen 80;
    server_name example.com;

    # 静态资源处理
    location /static/ {
        root /var/www/html;
        index index.html index.htm;
    }

    # 代理 API 请求到 Node.js 服务器
    location /api/ {
        proxy_pass http://localhost:3000;  # 你的 Node.js API 服务
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

✅ **优点**：

​ • **Nginx 处理静态资源，减少 Node.js 服务器压力**。

​ • **缓存优化**，提高访问速度。

​ • **更适合高并发场景**。

**方式 3：CDN + Node.js 动静分离**

如果你的网站 **用户量大、覆盖范围广**，可以使用 **CDN（内容分发网络）**：

​ • **静态资源**（HTML/CSS/JS/图片）托管到 CDN，如 **Cloudflare、阿里云 OSS、七牛云**。

​ • **API 请求** 仍然由 **Node.js 处理**。

📌 **示例：前端 Vue/React 配置静态资源 CDN**

在 vite.config.js 或 webpack.config.js 里设置 **CDN 地址**：

```js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|css|js)$/.test(name)) {
            return `https://cdn.example.com/static/${name}`;
          }
          return '[name].[ext]';
        },
      },
    },
  },
});
```

✅ **优点**：

​ • **全球加速**，适合跨区域用户。

​ • **CDN 自动缓存**，减少服务器带宽消耗。

​ • **API 和静态资源完全解耦，提升稳定性**。

❌ **缺点**：

​ • **CDN 需要额外的成本**（不过很多云厂商有免费额度）。

​ • **文件更新时要刷新 CDN 缓存**。

🚀 **推荐方案**：

​ • **小项目**：直接用 express.static() 处理静态资源。

​ • **中大型项目**：使用 **Nginx 代理**，让它处理静态资源，Node.js 只负责 API。

​ • **超大流量项目**：结合 **CDN**，最大化加速访问。

## 21.防盗链

防盗链（Hotlinking）是指在网页或其他网络资源中，通过直接链接到其他网站上的图片、视频或其他媒体文件，从而显示在自己的网页上。这种行为通常会给被链接的网站带来额外的带宽消耗和资源浪费，而且可能侵犯了原始网站的版权。

为了防止盗链，网站管理员可以采取一些措施：

1. 通过 HTTP 引用检查：网站可以检查 HTTP 请求的来源，如果来源网址与合法的来源不匹配，就拒绝提供资源。这可以通过服务器配置文件或特定的脚本实现。
2. 使用 Referrer 检查：网站可以检查 HTTP 请求中的 Referrer 字段，该字段指示了请求资源的来源页面。如果 Referrer 字段不符合预期，就拒绝提供资源。这种方法可以在服务器配置文件或脚本中实现。
3. 使用访问控制列表（ACL）：网站管理员可以配置服务器的访问控制列表，只允许特定的域名或 IP 地址访问资源，其他来源的请求将被拒绝。
4. 使用防盗链插件或脚本：一些网站平台和内容管理系统提供了专门的插件或脚本来防止盗链。这些工具可以根据需要配置，阻止来自未经授权的网站的盗链请求。
5. 使用水印技术：在图片或视频上添加水印可以帮助识别盗链行为，并提醒用户资源的来源。

**1.防盗链一般主要就是验证`host` 或者 `referer`**

```js
import express from 'express';

const app = express();

const whitelist = ['localhost'];

// 防止热链中间件
const preventHotLinking = (req, res, next) => {
  //浏览器直接访问静态资源是不会携带referer字段的，需要在html中发起一个访问静态资源的请求才会携带     referer字段
  const referer = req.get('referer'); // 获取请求头部中的 referer 字段
  if (referer) {
    const { hostname } = new URL(referer); // 从 referer 中解析主机名
    if (!whitelist.includes(hostname)) {
      // 检查主机名是否在白名单中
      res.status(403).send('Forbidden'); // 如果不在白名单中，返回 403 Forbidden
      return;
    }
  }
  next(); // 如果在白名单中，继续处理下一个中间件或路由
};

app.use(preventHotLinking); // 应用防止热链中间件
app.use('/assets', express.static('static')); // 处理静态资源请求

app.listen(3000, () => {
  console.log('Listening on port 3000'); // 启动服务器，监听端口3000
});
```

**2.基于 Token 认证**

如果防盗链更严格，可以使用**签名 Token 认证**，例如：

- 访问静态资源时，前端附带一个临时 Token（如 https://yourwebsite.com/images/logo.png?token=abc123）。

- 服务器校验 Token 是否合法，合法才返回资源。

```js
const crypto = require('crypto');

const SECRET_KEY = 'your-secret-key';

// 生成 Token
function generateToken(filePath) {
  return crypto.createHmac('sha256', SECRET_KEY).update(filePath).digest('hex');
}

// 中间件：检查 Token
app.use('/images', (req, res, next) => {
  const { token } = req.query;
  const filePath = req.path;

  if (!token || token !== generateToken(filePath)) {
    return res.status(403).send('Invalid Token');
  }

  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
```

**说明**

- 在请求资源时，前端需要带上 token（比如 logo.png?token=xyz）。

- 服务器验证 token 是否匹配，否则拒绝访问。

**3.Nginx 配合 Express 防盗链**

```nginx
location /images/ {
    valid_referers none blocked yourwebsite.com;
    if ($invalid_referer) {
        return 403;
    }
}
```

## 22.定时任务

### 什么是定时任务？

定时任务是指在预定的时间点或时间间隔内执行的任务或操作。它们是自动化执行特定逻辑的一种方式，可用于执行重复性的、周期性的或计划性的任务。

定时任务通常用于以下情况：

1. 执行后台任务：定时任务可用于自动执行后台任务，如数据备份、日志清理、缓存刷新等。通过设定适当的时间点或时间间隔，可以确保这些任务按计划进行，而无需手动干预。
2. 执行定期操作：定时任务可用于执行定期操作，如发送电子邮件提醒、生成报告、更新数据等。通过设定适当的时间点，可以自动触发这些操作，提高效率并减少人工操作的需求。
3. 调度任务和工作流：定时任务可以用于调度和协调复杂的任务和工作流程。通过设置任务之间的依赖关系和执

### 安装依赖

```sh
npm install node-schedule
```

[node-schedule 文档](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fnode-schedule)

> 一般定时任务都是用`cron`表达式去表示时间的

### cron 表达式

Cron 表达式是一种用于指定定时任务执行时间的字符串表示形式。它由 6 个或 7 个字段组成，每个字段表示任务执行的时间单位和范围。

Cron 表达式的典型格式如下：

```markdown
markdown

代码解读
复制代码\* \* \* \* \* \*
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ │
│ │ │ │ │ └── 星期（0 - 6，0 表示星期日）
│ │ │ │ └───── 月份（1 - 12）
│ │ │ └────────── 日（1 - 31）
│ │ └─────────────── 小时（0 - 23）
│ └──────────────────── 分钟（0 - 59）
└───────────────────────── 秒（0 - 59）
```

| 域              | 是否必需 | 取值范围                                                               | 特殊字符       |
| --------------- | -------- | ---------------------------------------------------------------------- | -------------- |
| 秒 Seconds      | 是       | [0, 59]                                                                | \* , - /       |
| 分钟 Minutes    | 是       | [0, 59]                                                                | \* , - /       |
| 小时 Hours      | 是       | [0, 23]                                                                | \* , - /       |
| 日期 DayofMonth | 是       | [1, 31]                                                                | \* , - / ? L W |
| 月份 Month      | 是       | [1, 12]或[JAN, DEC]                                                    | \* , - /       |
| 星期 DayofWeek  | 是       | [1, 7]或[MON, SUN]。若使用[1, 7]表达方式，1 代表星期一，7 代表星期日。 | \* , - / ? L # |
| 年 Year         | 否       | 1970+                                                                  | - \* /         |

每个字段可以接受特定的数值、范围、通配符和特殊字符来指定任务的执行时间：

- 数值：表示具体的时间单位，如 1、2、10 等。
- 范围：使用`-`连接起始和结束的数值，表示一个范围内的所有值，如 1-5 表示 1 到 5 的所有数值。
- 通配符：使用`*`表示匹配该字段的所有可能值，如`*`表示每分钟、每小时、每天等。
- 逗号分隔：使用逗号分隔多个数值或范围，表示匹配其中任意一个值，如 1,3 表示 1 或 3。
- 步长：使用`/`表示步长，用于指定间隔的数值，如`*/5`表示每隔 5 个单位执行一次。
- 特殊字符：Cron 表达式还支持一些特殊字符来表示特定的含义，如`?`用于替代日和星期字段中的任意值，`L`表示最后一天，`W`表示最近的工作日等。

以下是一些常见的 Cron 表达式示例：

- `* * * * * *`：每秒执行一次任务。
- `0 * * * * *`：每分钟的整点执行一次任务。
- `0 0 * * * *`：每小时的整点执行一次任务。
- `0 0 * * 1 *`：每周一的午夜执行一次任务。
- `0 0 1 * * *`：每月的 1 号午夜执行一次任务。
- `0 0 1 1 * *`：每年的 1 月 1 日午夜执行一次任务。

### 基本用法

**1. 使用 Cron 风格语法**

```js
const schedule = require('node-schedule');

// 每分钟的第30秒执行
const job = schedule.scheduleJob('30 * * * * *', function () {
  console.log('任务执行于:', new Date());
});

// 取消任务
// job.cancel();
```

**2. 使用 Date 对象**

```js
const schedule = require('node-schedule');
const date = new Date(2023, 10, 15, 14, 30, 0); // 2023年11月15日14:30:00

const job = schedule.scheduleJob(date, function () {
  console.log('任务在指定时间执行:', new Date());
});
```

**3. 使用 RecurrenceRule**

```js
const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
rule.hour = 14; // 每天14点
rule.minute = 30; // 30分
rule.dayOfWeek = [0, new schedule.Range(1, 5)]; // 周日和周一至周五

const job = schedule.scheduleJob(rule, function () {
  console.log('定时任务执行于:', new Date());
});
```

### 高级功能

**1. 取消任务**

```js
// 取消单个任务
job.cancel();

// 取消所有任务
schedule.gracefulShutdown().then(() => {
  console.log('所有定时任务已取消');
});
```

**2. 查看所有任务**

```js
const jobs = schedule.scheduledJobs;
console.log('当前所有定时任务:', Object.keys(jobs));
```

**3. 任务执行统计**

```js
const job = schedule.scheduleJob('*/5 * * * *', function () {
  console.log('每5分钟执行一次');
});

console.log('下次执行时间:', job.nextInvocation());
```

### 实际应用示例

**1. 数据库备份任务**

```js
const schedule = require('node-schedule');
const backup = require('./backup'); // 假设的备份模块

// 每天凌晨3点执行备份
schedule.scheduleJob('0 0 3 * * *', function () {
  console.log('开始数据库备份:', new Date());
  backup.run();
});
```

**2. 定时发送邮件**

```js
const schedule = require('node-schedule');
const mailer = require('./mailer'); // 假设的邮件模块

// 每周一上午9点发送周报
schedule.scheduleJob('0 0 9 * * 1', function () {
  console.log('发送周报邮件:', new Date());
  mailer.sendWeeklyReport();
});
```

**3. 定时清理临时文件**

```js
const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');

// 每小时清理一次临时文件夹
schedule.scheduleJob('0 0 * * * *', function () {
  const tempDir = path.join(__dirname, 'temp');
  fs.readdir(tempDir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      fs.unlink(path.join(tempDir, file), (err) => {
        if (err) console.error(err);
      });
    });
  });
});
```

**注意事项**

1. Node-Schedule 不适合高精度定时任务（毫秒级）
2. 长时间运行的任务可能会影响后续任务的执行时间
3. 在集群环境中，需要确保任务不会在多个进程重复执行
4. 服务器重启后，所有任务需要重新设置
