// 创建某一个节点的虚拟DOM
class Vnode {
    constructor(tag, data, key, children, text) {
        this.tag = tag
        this.data = data
        this.key = key
        this.children = children
        this.text = text
    }
}

// 创建元素节点虚拟DOM
function createElement(tag, data= {}, ...children) {
    const key = data.key
    return new Vnode(tag, data, key, children)
}

// 创建文本节点虚拟DOM
function createTextNode(text) {
    return new Vnode(undefined, undefined, undefined, undefined, text)
}

module.exports = {
    createElement,
    createTextNode
}
