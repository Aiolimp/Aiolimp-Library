function patch(oldVnode, vnode) {
    // 本节只讲初次渲染
    // 初次渲染时oldVnode就是el节点，以后非初次渲染时，oldVnode就是上一次的虚拟DOM

    // 判断oldVnode的类型
    const isRealElement = oldVnode.nodeType
    if (isRealElement) {
        // 初次渲染
        const oldElm = oldVnode
        const parentElm = oldElm.parentNode

        // 生成真实DOM对象
        const el = createElm(vnode)

        // 将生成的真实DOM。插入到el的下一个节点的前面
        // 也就是插到el的后面
        // 不直接appendChild是因为可能页面中有其他el同级节点，不能破坏顺序
        parentElm.insertBefore(el, oldElm.nextSibling)

        // 删除老el节点
        parentElm.removeChild(oldVnode)

        return el
    }
}

// 虚拟DOM生成真实DOM
function createElm(vnode) {
    const { tag, data, key, children, text } = vnode

    // 判断是元素节点还是文本节点
    if (typeof tag === 'string') {
        // 创建标签
        vnode.el = document.createElement(tag)

        // 解析虚拟DOM属性
        updateProperties(vnode)

        // 递归，将子节点也生成真实DOM
        children.forEach(child => {
            return vnode.el.appendChild(createElm(child))
        })
    } else {
        // 文本节点直接创建
        vnode.el = document.createTextNode(text)
    }

    return vnode.el
}

// 解析虚拟DOM的属性
function updateProperties(vnode) {
    const newProps = vnode.data || {}
    const el = vnode.el
    for(let key in newProps) {
        if (key === 'style') {
            // style的处理
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if (key === 'class') {
            // class的处理
            el.className = newProps.class
        } else {
            // 调用dom的setAttribute进行属性设置
            el.setAttribute(key, newProps[key])
        }
    }
}

module.exports = {
    patch
}
