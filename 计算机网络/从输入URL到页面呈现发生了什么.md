## 从URL输入到页面展现到底发生什么

总体来说分为以下几个过程:

- `DNS `解析:将域名解析成 `IP `地址
- `TCP` 连接：`TCP` 三次握手
- 发送 `HTTP` 请求
- 服务器处理请求并返回 `HTTP` 报文
- 浏览器解析渲染页面
- 断开连接：`TCP` 四次挥手

![图片](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsOupXl2B9Lic25rRBPogaVapogeQ2XnyencuicJto9icQzYlkJpUl6o3ibricmticfAN6c42LT18oGMyJ2w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 一、域名解析（`DNS`）

在浏览器输入网址后，首先要经过域名解析，因为浏览器并不能直接通过域名找到对应的服务器，而是要通过 `IP` 地址。

#### 1.`IP` 地址

IP 地址是指互联网协议地址，是 IP Address 的缩写。IP 地址是 IP 协议提供的一种统一的地址格式，它为互联网上的每一个网络和每一台主机分配一个逻辑地址，以此来屏蔽物理地址的差异。IP 地址是一个 32 位的二进制数，比如 127.0.0.1 为本机 IP。**域名就相当于 IP 地址乔装打扮的伪装者，带着一副面具。它的作用就是便于记忆和沟通的一组服务器的地址**。用户通常使用主机名或域名来访问对方的计算机，而不是直接通过 IP 地址访问。**因为与 IP 地址的一组纯数字相比，用字母配合数字的表示形式来指定计算机名更符合人类的记忆习惯。但要让计算机去理解名称，相对而言就变得困难了。因为计算机更擅长处理一长串数字。为了解决上述的问题，DNS 服务应运而生。**

#### 2.什么是域名解析

DNS 协议提供通过域名查找 IP 地址，或逆向从 IP 地址反查域名的服务。**DNS 是一个网络服务器，我们的域名解析简单来说就是在 DNS 上记录一条信息记录**。

```
例如 baidu.com  220.114.23.56（服务器外网IP地址）80（服务器端口号）
```

#### 3. 浏览器如何通过域名去查询 URL 对应的 IP 呢

- 浏览器缓存：浏览器会按照一定的频率缓存 DNS 记录。
- 操作系统缓存：如果浏览器缓存中找不到需要的 DNS 记录，那就去操作系统中找。
- 路由缓存：路由器也有 DNS 缓存。
- ISP 的 DNS 服务器：ISP 是互联网服务提供商(Internet Service Provider)的简称，ISP 有专门的 DNS 服务器应对 DNS 查询请求。
- 根服务器：ISP 的 DNS 服务器还找不到的话，它就会向根服务器发出请求，进行递归查询（DNS 服务器先问根域名服务器.com 域名服务器的 IP 地址，然后再问.baidu 域名服务器，依次类推）

![图片](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsOupXl2B9Lic25rRBPogaVapvb9ejcJAJ5Iw3G36otMn70n1heXQ9mOmAsPpEg588rSZTT07cGhuVA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 4. 小结

**浏览器通过向 DNS 服务器发送域名，DNS 服务器查询到与域名相对应的 IP 地址，然后返回给浏览器，浏览器再将 IP 地址打在协议上，同时请求参数也会在协议搭载，然后一并发送给对应的服务器。接下来介绍向服务器发送 HTTP 请求阶段，HTTP 请求分为三个部分：TCP 三次握手、http 请求响应信息、关闭 TCP 连接。**

![图片](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsOupXl2B9Lic25rRBPogaVapXsdp2LCx0U0VSQGK3sWsHLr3Ep10QKFJibLic6fRkOiakto09qibo1A7Ow/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 二、TCP 三次握手

**在客户端发送数据之前会发起 TCP 三次握手用以同步客户端和服务端的序列号和确认号，并交换 TCP 窗口大小信息**。

![图片](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsOupXl2B9Lic25rRBPogaVapoB8CgUS7zdhAQgRO7IQAQtr5c2HsezPoS9vGA6movzDBzF7b0Ca1KA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 1.TCP 三次握手的过程如下：

- 

  **客户端发送一个带 SYN=1，Seq=X 的数据包到服务器端口**（第一次握手，由浏览器发起，告诉服务器我要发送请求了）

- 

  **服务器发回一个带 SYN=1， ACK=X+1， Seq=Y 的响应包以示传达确认信息**（第二次握手，由服务器发起，告诉浏览器我准备接受了，你赶紧发送吧）

- 

  **客户端再回传一个带 ACK=Y+1， Seq=Z 的数据包，代表“握手结束”**（第三次握手，由浏览器发送，告诉服务器，我马上就发了，准备接受吧）

#### 2.为啥需要三次握手

谢希仁著《计算机网络》中讲“三次握手”的目的是“**为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误**”。

### 三、发送 HTTP 请求

**TCP 三次握手结束后，开始发送 HTTP 请求报文**。请求报文由请求行（request line）、请求头（header）、请求体四个部分组成,如下图所示：![图片](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsOupXl2B9Lic25rRBPogaVapLAGAgXhdFn7FqyfhiapNBBUu7qUSTPfgpt3HteYy8S0m9GYUxBWKtiaQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 1.请求行包含请求方法、URL、协议版本

- 请求方法包含 8 种：GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS、TRACE。
- URL 即请求地址，由 <协议>：//<主机>：<端口>/<路径>?<参数> 组成
- 协议版本即 http 版本号

```
POST  /chapter17/user.html HTTP/1.1
```

以上代码中“POST”代表请求方法，“/chapter17/user.html”表示 URL，“HTTP/1.1”代表协议和协议的版本。现在比较流行的是 Http1.1 版本

#### 2.请求头包含请求的附加信息，由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔。

请求头部通知服务器有关于客户端请求的信息。它包含许多有关的客户端环境和请求正文的有用信息。其中比如：**Host，表示主机名，虚拟主机；Connection,HTTP/1.1 增加的，使用 keepalive，即持久连接，一个连接可以发多个请求；User-Agent，请求发出者，兼容性以及定制化需求。**

#### 3.请求体，可以承载多个请求参数的数据，包含回车符、换行符和请求数据，并不是所有请求都具有请求数据。

```
name=tom&password=1234&realName=tomson
```

上面代码，承载着 name、password、realName 三个请求参数。

### 四、服务器处理请求并返回 HTTP 报文

#### 1. 服务器

服务器是网络环境中的高性能计算机，它侦听网络上的其他计算机（客户机）提交的服务请求，并提供相应的服务，比如网页服务、文件下载服务、邮件服务、视频服务。而客户端主要的功能是浏览网页、看视频、听音乐等等，两者截然不同。每台服务器上都会安装处理请求的应用——web server。常见的 web server 产品有 apache、nginx、IIS 或 Lighttpd 等。**web server 担任管控的角色**，对于不同用户发送的请求，会结合配置文件，把不同请求委托给服务器上处理相应请求的程序进行处理（例如 CGI 脚本，JSP 脚本，servlets，ASP 脚本，服务器端 JavaScript，或者一些其它的服务器端技术等），然后返回后台程序处理产生的结果作为响应。![图片](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsOupXl2B9Lic25rRBPogaVapRkRoOP72tQ1pZbhflic7hBnnc0eHuLnBHv6gIyMofbibQPyRS6RnAw2Q/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 2.MVC 后台处理阶段

后台开发现在有很多框架，但大部分都还是按照 MVC 设计模式进行搭建的。MVC 是一个设计模式，将应用程序分成三个核心部件：模型（model）-- 视图（view）--控制器（controller），它们各自处理自己的任务，实现输入、处理和输出的分离。![图片](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsOupXl2B9Lic25rRBPogaVapI0icWPWba4DiaShHt4C4EclKsrDG6a723XRLRqicZrEXrgy7iaIiamGPIdA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 1、视图（view）

**它是提供给用户的操作界面，是程序的外壳。**

> 2、模型（model）

**模型主要负责数据交互。**在 MVC 的三个部件中，模型拥有最多的处理任务。一个模型能为多个视图提供数据。

> 3、控制器（controller）

**它负责根据用户从"视图层"输入的指令，选取"模型层"中的数据，然后对其进行相应的操作，产生最终结果。**控制器属于管理者角色，从视图接收请求并决定调用哪个模型构件去处理请求，然后再确定用哪个视图来显示模型处理返回的数据。这三层是紧密联系在一起的，但又是互相独立的，每一层内部的变化不影响其他层。每一层都对外提供接口（Interface），供上面一层调用。至于这一阶段发生什么？简而言之，**首先浏览器发送过来的请求先经过控制器，控制器进行逻辑处理和请求分发，接着会调用模型，这一阶段模型会获取 redis db 以及 MySQL 的数据，获取数据后将渲染好的页面，响应信息会以响应报文的形式返回给客户端，最后浏览器通过渲染引擎将网页呈现在用户面前。**

#### 3.http 响应报文

响应报文由响应行（request line）、响应头部（header）、响应主体三个部分组成。如下图所示：![图片](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsOupXl2B9Lic25rRBPogaVapKc8yO7SgAKXdORqefftvWBhZ3bKnmX1p4mR9e95oU3sicBQsWELfEqQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

(1) 响应行包含：协议版本，状态码，状态码描述

状态码规则如下：1xx：指示信息--表示请求已接收，继续处理。2xx：成功--表示请求已被成功接收、理解、接受。3xx：重定向--要完成请求必须进行更进一步的操作。4xx：客户端错误--请求有语法错误或请求无法实现。5xx：服务器端错误--服务器未能实现合法的请求。

(2) 响应头部包含响应报文的附加信息，由 名/值 对组成

(3) 响应主体包含回车符、换行符和响应返回数据，并不是所有响应报文都有响应数据

### 五、浏览器解析渲染页面

浏览器拿到响应文本 HTML 后，接下来介绍下浏览器渲染机制

![图片](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsOupXl2B9Lic25rRBPogaVapKz3SwgMdm0wtkHDNZiaCohtVqSTq2PHwHcs0wYlR1zj2icgACEicHla7w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

浏览器解析渲染页面分为一下五个步骤：

- 根据 HTML 解析出 DOM 树
- 根据 CSS 解析生成 CSS 规则树
- 结合 DOM 树和 CSS 规则树，生成渲染树
- 根据渲染树计算每一个节点的信息
- 根据计算好的信息绘制页面

### 1.根据 HTML 解析 DOM 树

- 根据 HTML 的内容，将标签按照结构解析成为 DOM 树，DOM 树解析的过程是一个深度优先遍历。即先构建当前节点的所有子节点，再构建下一个兄弟节点。
- 在读取 HTML 文档，构建 DOM 树的过程中，若遇到 script 标签，则 DOM 树的构建会暂停，直至脚本执行完毕。

### 2.根据 CSS 解析生成 CSS 规则树

- 解析 CSS 规则树时 js 执行将暂停，直至 CSS 规则树就绪。
- 浏览器在 CSS 规则树生成之前不会进行渲染。

### 3.结合 DOM 树和 CSS 规则树，生成渲染树

- DOM 树和 CSS 规则树全部准备好了以后，浏览器才会开始构建渲染树。
- 精简 CSS 并可以加快 CSS 规则树的构建，从而加快页面相应速度。

### 4.根据渲染树计算每一个节点的信息（布局）

- 布局：通过渲染树中渲染对象的信息，计算出每一个渲染对象的位置和尺寸
- 回流：在布局完成后，发现了某个部分发生了变化影响了布局，那就需要倒回去重新渲染。

### 5.根据计算好的信息绘制页面

- 绘制阶段，系统会遍历呈现树，并调用呈现器的“paint”方法，将呈现器的内容显示在屏幕上。
- 重绘：某个元素的背景颜色，文字颜色等，不影响元素周围或内部布局的属性，将只会引起浏览器的重绘。
- 回流：某个元素的尺寸发生了变化，则需重新计算渲染树，重新渲染。

### 六、断开连接

**当数据传送完毕，需要断开 tcp 连接，此时发起 tcp 四次挥手**。![图片](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsOupXl2B9Lic25rRBPogaVapPvPufZ4m9AjjYKyib2DPqcQ0qRQdaR1icxG34HmqtmNu9Q5WXMQc84gw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

- **发起方向被动方发送报文，Fin、Ack、Seq，表示已经没有数据传输了。并进入 FINWAIT1 状态**。(第一次挥手：由浏览器发起的，发送给服务器，我请求报文发送完了，你准备关闭吧)
- **被动方发送报文，Ack、Seq，表示同意关闭请求。此时主机发起方进入 FINWAIT2 状态**。(第二次挥手：由服务器发起的，告诉浏览器，我请求报文接受完了，我准备关闭了，你也准备吧)
- **被动方向发起方发送报文段，Fin、Ack、Seq，请求关闭连接。并进入 LAST_ACK 状态**。(第三次挥手：由服务器发起，告诉浏览器，我响应报文发送完了，你准备关闭吧)
- **发起方向被动方发送报文段，Ack、Seq。然后进入等待 TIME_WAIT 状态。被动方收到发起方的报文段以后关闭连接。发起方等待一定时间未收到回复，则正常关闭**。(第四次挥手：由浏览器发起，告诉服务器，我响应报文接受完了，我准备关闭了，你也准备吧)

#### 参考文章

 从输入页面地址到展示页面信息都发生了些什么？

  前端经典面试题: 从输入 URL 到页面加载发生了什么？

  TCP 的三次握手四次挥手

  访问 Web，tcp 传输全过程（三次握手、请求、数据传输、四次挥手）

  浏览器发送 http 请求过程分析

  谢希仁著《计算机网络》第四版

  图解 http

