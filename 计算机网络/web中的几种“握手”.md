## 1. 不止一种握手

在早期的网络传输中，也就存在`TCP`协议需要“握手”的过程，但早期的协议有一个缺陷：通信只能由客户端发起，做不到服务器主动向客户端推送信息。 ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/1718e16feeb3bc07~tplv-t2oaga2asx-watermark.awebp)

于是`WebSocket` 协议在 2008 年诞生，2011 年成为国际标准。所有浏览器都已经支持了。

而随着`SSL/TLS`的完善，存在已久的安全版网络协议：`HTTPS`也是迸发式发展。

最后前端领域的协议握手便成了三分天下：

1. `TCP`三次握手，归`HTTP`。
2. `TLS`握手，归`HTTPS`
3. `WebSocket`握手，基于`TCP`协议，都能用。

## 2. `TCP`三次握手的终极意义

在我之前的文章：[《「真香警告」重学 TCP/IP 协议 与三次握手 》](https://juejin.cn/post/6844903826747555847#heading-5)

也详细的讲述过`TCP`三次握手，但那时我未明确意识到其深刻含义。

就和大家一样，只在面试前会记得，过后即忘。

直到我看到《网络是怎样连接的》中的一段话：

> \*\*在实际的通信中，序号并不是从 1 开始的，而是需要用随机数计算出一个初始值，这是因为

如果序号都从 1 开始，通信过程就会非常容易预测，有人会利用这一点来发动攻击。\*\*

> \*\*但是如果初始值是随机的，那么对方就搞不清楚序号到底是从

多少开始计算的，因此需要在开始收发数据之前将初始值告知通信对象。\*\*

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/17191f9707864302~tplv-t2oaga2asx-watermark.awebp) 你品，你细品。三次握手不就是相互试探暗号，来确定是不是对的人吗？

### 2.1 知识补充：一个网络包的最大长度

计算每个网络包能容纳的数据长度，协议栈会根据一个叫作 `MTU`的参数来进行判断。

`MTU`表示一个网络包的最大长度，在以太网中一般是`1500`字节

**`MTU`是包含头部的总长度，因此需要从`MTU`减去头部的长度，然后得到的长度就是一个网络包中所能容纳的最大数据长度，这一长度叫作`MSS`。**

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/1718e41fba84d417~tplv-t2oaga2asx-watermark.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/1718e4a3dd3e16d2~tplv-t2oaga2asx-watermark.awebp)

由上两图可知，`MSS`值是`1460（1500-40）`字节，其中：

1. `TCP`固定头部`20`字节。
2. `IP`固定头部`20`字节。
3. `TCP`头部最长可以达到`60`字节。

## 3. `TLS`握手：`HTTPS`的核心

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/171913443ba4ec19~tplv-t2oaga2asx-watermark.awebp)

> `HTTPS` 其实是一个“非常简单”的协议，`RFC` 文档很小，只有短短的 7 页，里面规定了新的协议名“`https`”，默认端口号 443，至于其他的什么请求 - 应答模式、报文结构、请求方法、`URI`、头字段、连接管理等等都完全沿用 `HTTP`，没有任何新的东西。---- 《透视`HTTP`协议》

感兴趣的可以到这里看看：链接：[tools.ietf.org/html/rfc281…](https://link.juejin.cn?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc2818)

### 3.1 `TLS/SSL`究竟是啥？

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/1719134b3a7fbc68~tplv-t2oaga2asx-watermark.awebp)

很多人看到`TLS/SSL`这对词就开始蒙圈了。实际上，这两个东西是一个玩意儿：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/1719135d5152b0b0~tplv-t2oaga2asx-watermark.awebp)

`1999` 年改名：**`SSL 3 === TLS 1.0`**

目前运用最广泛的是`TLS 1.2`:

> `TLS` 由记录协议、握手协议、警告协议、变更密码规范协议、扩展协议等几个子协议组成，综合使用了对称加密、非对称加密、身份认证等许多密码学前沿技术。

由于`TLS/SSL` 协议位于应用层和传输层 TCP 协议之间。`TLS` 粗略的划分又可以分为 2 层：

1. 靠近应用层的握手协议 `TLS Handshaking Protocols`
2. 靠近 TCP 的记录层协议 `TLS Record Protocol`

这个篇幅展开来写就太多了，我们先关心下`TLS`握手吧。

### 3.2 `TLS`握手详解

**TLS 握手何时发生？：**

1. 每当用户通过`HTTPS`导航到网站并且浏览器首先开始查询网站的原始服务器时，就会进行`TLS`握手。
2. 每当其他任何通信使用`HTTPS`（包括`API`调用和`HTTPS`查询上的 DNS）时，也会发生`TLS`握手。
3. 通过 TCP 握手打开 TCP 连接后，会发生`TLS` 握手。

**TLS 握手期间会发生什么？**

在`TLS`握手过程中，客户端和服务器将共同执行以下操作：

- 指定将使用的 TLS 版本（TLS 1.0、1.2、1.3 等）
- 确定将使用哪些加密套件。
- 通过服务器的公钥和 SSL 证书颁发机构的数字签名来验证服务器的身份
- 握手完成后，生成会话密钥以使用对称加密

**加密套件决定握手方式：**：

> [摘自：《HTTPS 篇之 SSL 握手过程详解》](https://link.juejin.cn?target=https%3A%2F%2Frazeencheng.com%2Fpost%2Fssl-handshake-detail)

在`TLS`中有两种主要的握手类型：一种基于`RSA`，一种基于`Diffie-Hellman`。 这两种握手类型的主要区别在于主秘钥交换和认证上。

|          | 秘钥交换 | 身份验证 |
| -------- | -------- | -------- |
| RSA 握手 | RSA      | RSA      |
| DH 握手  | DH       | RSA/DSA  |

主流的握手类型，基本都是基于`RSA`，所以以下讲解都基于` RSA`版握手。

整个流程如下图所示： ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/171914a65c74d7b8~tplv-t2oaga2asx-watermark.awebp) 具体流程描述：

1. 客户端`hello`：客户端通过向服务器发送“问候”消息来发起握手。该消息将包括客户端支持的 TLS 版本，支持的加密套件以及称为“客户端随机”的随机字节字符串。
2. 服务器`hello`：为回复客户端`hello`消息，服务器发送一条消息，其中包含服务器的`SSL`证书，服务器选择的加密套件和“服务器随机数”，即服务器生成的另一个随机字节串。
3. 客户端发送公钥加密的预主密钥。
4. 服务器用自己的私钥解密加密的预主密钥。
   - 客户端`finished`：客户端发送“完成”消息，该消息已用会话密钥加密。
   - 服务器`finished`：服务器发送一条用会话密钥加密的“完成”消息。
5. 握手完成，后续通过主密钥加解密。

## 4. `WebSocket`握手

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/17191b816c90c262~tplv-t2oaga2asx-watermark.awebp)

`WebSocket`协议实现起来相对简单。它使用`HTTP`协议进行初始握手。成功握手之后，就建立了连接，`WebSocket`基本上使用原始 TCP 读取/写入数据。

《图解`HTTP`》一书中的图讲的比较清楚：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/17191b98130ee558~tplv-t2oaga2asx-watermark.awebp)

具体步骤表现是：

1. 客户端请求：

```
  GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

1. 服务端响应：

```
    HTTP/1.1 101
Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

### 4.1 `Websocket`全双工通信

`Websocket`协议解决了服务器与客户端全双工通信的问题。

**那什么是单工、半双工、全双工通信？**

| 类型   | 能力                               |
| ------ | ---------------------------------- |
| 单工   | 信息单向传送                       |
| 半双工 | 信息能双向传送，但不能同时双向传送 |
| 全双工 | 信息能够同时双向传送               |

### 4.2 `Websocket`和`Socket`区别

**可以把`WebSocket`想象成`HTTP`应用层)，`HTTP`和`Socket`什么关系，`WebSocket`和`Socket`就是什么关系。**

#### 1. **`WebSocket`与`HTTP`的关系**

相同点

1. 都是一样基于`TCP`的，都是可靠性传输协议。
2. 都是应用层协议。

不同点

1. `WebSocket`是双向通信协议，模拟`Socket`协议，可以双向发送或接受信息。`HTTP`是单向的。
2. `WebSocket`是需要握手进行建立连接的。

#### 2. **`Socket`是什么？**

`Socket`是应用层与`TCP/IP`协议族通信的中间软件抽象层，它是一组接口。

在设计模式中，`Socket`其实就是一个门面模式，它把复杂的`TCP/IP`协议族隐藏在`Socket`接口后面，对用户来说，一组简单的接口就是全部，让`Socket`去组织数据，以符合指定的协议。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/17191cb5e0ccc912~tplv-t2oaga2asx-watermark.awebp)

### 4.3 扩展知识：`Socket.IO`的七层降级

在`Golang`、`Java Spring`等框架中，`websocket`都有一套实现`API`。 ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/17191bd710411ade~tplv-t2oaga2asx-watermark.awebp)

`Socket.IO` 由两部分组成：

1. 一个服务端用于集成 (或挂载) 到 `Node.JS HTTP` 服务器： `socket.io`
2. 一个加载到浏览器中的客户端： `socket.io-client`

很多人以为`Socket.IO`只是`WebSocket`和`XHR`长轮询。

实际上，`Socket.io`有很多传输机制:

```
1. WebSockets
2. FlashSocket
3. XHR长轮询
4. XHR部分流：multipart/form-data
5. XHR轮询
6. JSONP轮询
7. iframe
```

得益于这么多种传输机制，`Socket.io`兼容性完全不用担心。

## 5. 扩展：`HTTPS` 与`HTTP` 核心区别

上面讲到 **`Socket`是什么？**，有一点我忘了讲：

`HTTPS` 与`HTTP` 核心区别在于两点：

1. 把 `HTTP` 下层的传输协议由 `TCP/IP` 换成了 `SSL/TLS`
2. 收发报文不再使用 `Socket API`，而是调用专门的安全接口。

具体区别：

1. `HTTPS` 协议需要到`CA`申请证书，一般免费证书很少，需要交费。
2. `HTTP`是超文本传输协议，信息是明文传输，`HTTPS` 则是具有安全性的 ssl 加密传输协议。
3. `HTTP`和`https`使用的是完全不同的连接方式，用的端口也不一样,前者是`80`,后者是`443`。
4. `HTTP`的连接很简单,是无状态的。`HTTPS`协议是由`SSL+HTTP`协议构建的可进行加密传输、身份认证的网络协议，比`HTTP`协议安全。

## 参考

[面试官问到三次握手，我甩出这张脑图，他服了！](https://juejin.cn/post/6844904132071948295#heading-2)
