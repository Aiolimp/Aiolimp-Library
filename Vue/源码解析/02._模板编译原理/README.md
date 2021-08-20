## 模板编译原理

### 1.new一个Vue实例

```js
let vue = new Vue({
  render: h => h(App)
}).$mount('#app')

console.log(vue)
```

> 可能很多同学，平时都是使用vue-cli开发，vue-cli给我们配置的很齐全，所以我们可能会忽略了入口文件里Vue实例是怎么去new的，id为app的div标签是怎么渲染到页面的。

```js
// 此代码只是演示
let vue = new Vue({
    el: '#app',
    data() {
        return {
            a: 1,
            b: [1]
        }
    },
    render(h) {
        return h('div', { id: 'hhh' }, 'hello')
    },
    template: `<div id='hhh' style="aa:1;bb:2"><a>{{xxx}}{{ccc}}</a></div>`
}).$mount('#app')

console.log(vue)
```

> 举个例子，上面的代码，有el，有template，有render，有$mount，但是渲染只能是渲染一次，那么，这几个东西里谁有权力去渲染这一次呢，或者说，谁的权力最大呢

> 这是官网上的一张图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5c0b1c9401842ada94699ba6dd62973.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0Fpb2xpbXA=,size_16,color_FFFFFF,t_70)

> 通过上图，可以总结为以下几点：
>
> 1. 渲染到哪个根节点上：判断有无el属性，有的话直接获取el根节点，没有的话调用$mount去获取根节点
> 2. 渲染哪个模板：
>
> - 有render：这时候优先执行render函数，render优先级 > template
> - 无render：
>   - 有template：拿template去解析成render函数的所需的格式，并使用调用render函数渲染
>   - 无template：拿el根节点的outerHTML去解析成render函数的所需的格式，并使用调用render函数渲染
>
> 3.渲染的方式：无论什么情况，最后都统一是要使用render函数渲染

### 2.重点实现

1. $mount函数的实现
2. 解析template成`抽象语法树（AST）`
3. 将`抽象语法树（AST）`转成render渲染所需的格式

### 3.$mount函数

> `$mount`函数重点在于判断各属性的有无情况，还有记得返回Vue实例，便于后续访问实例

```js
// init.js

const { initState } = require('./state')
const { compileToFunctions } = require('./compiler/index.js')

function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this

        vm.$options = options

        initState(vm)

        if(vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }

    // 把$mount函数挂在Vue的原型上
    Vue.prototype.$mount = function(el) {
        // 使用vm变量获取Vue实例（也就是this）
        const vm = this
        // 获取vm上的$options
        // $options是在_init的时候就绑再vm上了
        const options = vm.$options

        // 获取传进来的dom
        el = document.querySelector(el)
        // el = {}

        // 如果options里没有render函数属性
        if (!options.render) {

            // 获取options里的template属性
            let template = options.template


            // 如果template属性也没有，但是dom获取到了
            if (!template && el) {
                // 那就把dom的outerHTML赋值给template属性
                template = el.outerHTML
            }

            // 如果有template属性有的话
            if (template) {
                // 那就把template传入compileToFunctions函数，生成一个render函数
                const render = compileToFunctions(template)
                // 把生成的render函数赋值到options的render属性上
                options.render = render
            }
        }

        // 记得return出Vue实例（也就是this）
        // 为了let vue = new Vue().$mount('#a')之后，能通过vue变量去访问这个Vue实例
        return this
    }
}

module.exports = {
    initMixin: initMixin
}
```

### 4.compileToFunctions函数

> `compileToFunctions`函数是`模板编译`的`入口函数`，包含`parse`和`generate`的执行，返回值是一个render函数

```js
// compiler/index.js

const { parse } = require('./parse.js')
const { generate } = require('./codegen.js')

function compileToFunctions (template) {

    // 把传进来的template传入parse函数中，并生成抽象语法树（AST）
    // 抽象语法数是一个描述dom结构的树结构，包括html，css，js代码
    // 使用变量ast接收AST
    let ast = parse(template)

    // 把上面生成的AST传入generate函数中
    // 生成一个render格式的函数代码
    // 格式大概是类似_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))
    // _c代表创建元素，_v代表创建文本，_s代表文Json.stringify--把对象解析成文本
    let code = generate(ast)


    // 使用with改变this指向，可以方便code里去获取this（也就是Vue实例）里的数据
    let renderFn = new Function(`with(this){return ${code}}`)

    // 返回这个生成的render函数
    return renderFn
}

module.exports = {
    compileToFunctions: compileToFunctions
}
```

### 5.parse函数（将template转为抽象语法树）

> - 首先需要各种规则匹配的正则表达式（开始标签，结束标签，花括号等）
> - createASTElement：将某一节点转为AST对象的函数
> - handleStartTag: 处理开始标签的函数
> - handleEndTag：处理结尾标签的函数
> - handleChars：处理文本节点的函数
> - parse：转AST的入口函数

```js
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; //匹配标签名 形如 abc-123
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //匹配特殊标签 形如 abc:234 前面的abc:可有可无
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配标签开始 形如 <abc-123 捕获里面的标签名
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束  >
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`, 'g'); // 匹配标签结尾 如 </abc-123> 捕获里面的标签名
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性  形如 id="app"

// 全局定义
// root：用来储存根节点
// currentParent：用来储存某个临时的节点
let root, currentParent
// 一个临时存节点的数组
let stack = []

// 元素节点的type是1
const ELEMENT_TYPE = 1
// 文本节点的type是3
const TEXT_TYPE = 3


// 把某一个节点转换成对应的AST的函数
function createASTElement(tagName, attrs) {
    return {
        tag: tagName, // 标签名
        type: ELEMENT_TYPE, // 节点类型
        children: [], // 子节点数组
        attrs, // 属性
        parent: null // 父节点
    }
}


function handleStartTag({ tagName, attrs }) {
    // 传进来的element改成AST对象形式
    const element = createASTElement(tagName, attrs)
    if (!root) {
        // 根节点只能有一个
        root = element
    }

    // 临时赋值给currentParent，也就是临时当一回爸爸
    currentParent = element
    stack.push(element)
}

// 处理结尾标签
function handleEndTag(tagName) {
    // 父子节点关系对应
    // 比如 <div> <span></span> </div>
    // 那么stack = [{ div对象 }, { span对象 }]

    // 那么element就是{ span对象 }
    const element = stack.pop()

    // currentParent是{ div对象 }
    currentParent = stack[stack.length - 1]

    if (currentParent) {
        element.parent = currentParent
        currentParent.children.push(element)
    }
}


// 处理文本节点的函数
function handleChars(text) {
    // 去除空格
    text = text.replace(/\s/g, '')
    if (text) {
        currentParent.children.push({
            type: TEXT_TYPE,
            text
        })
    }
}

function parse(html) {
    // 这里的html就是传进来的template字符串
    // 只要html还有长度就继续循环
    while (html) {

        // 获取字符'<'的位置
        const textEnd = html.indexOf('<')

        // 如果位置是0的话说明遇到开始或者结尾标签了
        // 例如<div>或者<div />
        if (textEnd === 0) {

            // 先使用解析开始标签的函数：parseStartTag进行解析
            const startTagMatch = parseStartTag()

            // 如果解析有返回值，说明是开始标签
            if (startTagMatch) {
                // 将解析结果传入，handleStartTag函数：将节点转AST的函数
                handleStartTag(startTagMatch)
                // 跳过本次循环步骤
                continue
            }

            // 如果上面的解析没有返回值，则“说明”可能是结尾标签
            // 这里着重说了是“可能”，因为也有可能是文本，例如 “<哈哈哈哈哈哈哈”，这段文本第一个也是<，但它不是开始也不是结尾标签
            // 所以要使用结尾标签的正则判断一下是不是结尾标签
            const endTagMatch = html.match(endTag)
            // 如果是结尾标签的话
            if (endTagMatch) {
                // 将解析长度传入，advance函数：推进html的函数，具体看下面advance函数的注释
                advance(endTagMatch[0].length)
                // 进行结尾标签的处理
                handleEndTag(endTagMatch[1])
                // 跳过本次循环步骤
                continue
            }
        }


        // 检测文本节点
        let text
        if (textEnd > 0) {
            // 截取这段text
            text = html.substring(0, textEnd)
        }
        if (text) {
            // 推进html字符串
            advance(text.length)
            // 对文本节点进行处理
            handleChars(text)
        }
    }

    // 解析开始标签的函数
    function parseStartTag() {

        // 通过正则匹配开始标签
        const start = html.match(startTagOpen)

        let match
        // 如果匹配成功
        if (start) {
            match = {
                tagName: start[1],
                attrs: []
            }


            advance(start[0].length)

            let end, attr
            // 只要不碰到>，且该标签还有属性，就会一直循环解析
            while (!(end = html.match(startTagClose)) &&
                (attr = html.match(attribute))) {

                // 推进html字符串
                advance(attr[0].length)
                attr = {
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                }
                match.attrs.push(attr)
            }
            if (end) {
                // 如果匹配到>，说明开始标签解析结束
                // html字符串推进1
                advance(1)
                // 返回解析出来的对象match
                return match
            }
        }
    }

    // 推进html字符串的函数
    // 例如<div>哈哈哈</div>
    // 匹配到了开始标签<div>，长度是5，那么html字符串就需要推进5，也就是html变成了  哈哈哈</div>
    function advance(n) {
        html = html.substring(n)
    }


    // 返回根节点
    return root
}

module.exports = {
    parse
}
```

### 6.generate（将AST转换成render函数格式的数据）

> - 匹配花括号{{xxx}}
> - 确保AST解析成render函数所需格式

```js
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //匹配花括号 {{  }} 捕获花括号里面的内容

function gen(node) {
    if (node.type === 1) {
        // 元素节点处理
        return generate(node)
    } else {
        // 文本节点处理
        const text = node.text

        // 检测是否有花括号{{}}
        if (!defaultTagRE.test(text)) {
            // 没有的话直接返回 _v，创建文本节点
            return `_v(${JSON.stringify(text)})`
        }


        // 每次赋值完要重置defaultTagRE.lastIndex
        // 因为正则规则加上全局g的话，lastIndex会逐步递增，具体可以百度查一查正则的全局g情况下的test方法执行后的lastIndex
        let lastIndex = (defaultTagRE.lastIndex = 0);
        const tokens = []
        let match, index

        while ((match = defaultTagRE.exec(text))) {
            // 文本里只要还存在{{}}就会一直正则匹配
            index = match.index
            if (index > lastIndex) {
                // 截取{{xxx}}中的文本xxx
                tokens.push(JSON.stringify(text.slice(lastIndex, index)))
            }

            tokens.push(`_s(${match[1].trim()})`)


            // 推进lastIndex
            lastIndex = index + match[0].length

        }

        // 匹配完{{}}了，但是还有剩余的文本，那就还是push进去
        if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }

        // return _v函数创建文本节点
        return `_v(${tokens.join('+')})`
    }

}


// 生成render函数格式的code的函数
function generate(el) {
    const children = getChildren(el)
    const code = `_c('${el.tag}',${el.attrs.length ? `${genProps(el.attrs)}` : "undefined"
        }${children ? `,${children}` : ""})`;;
    return code
}

// 处理attrs的函数
function genProps(attrs) {
    let str = ''
    for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i]

        if (attr.name === 'style') {
            const obj = {}

            attr.value.split(';').forEach(item => {
                const [key, value] = item.split(':')
                obj[key] = value
            })
            attr.value = obj
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0, str.length)}}`
}

// 获取子节点，进行gen的递归
function getChildren(el) {
    const children = el.children
    if (children && children.length) {
        return `${children.map(c => gen(c)).join(',')}`
    }
}

module.exports = {
    generate
}
```

### 7.流程图

![在这里插入图片描述](https://img-blog.csdnimg.cn/988a6db5b676436eb8e8e9abd8dbfc6a.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0Fpb2xpbXA=,size_16,color_FFFFFF,t_70)


