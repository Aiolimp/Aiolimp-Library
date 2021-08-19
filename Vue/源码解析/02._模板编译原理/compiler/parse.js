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
