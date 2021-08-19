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
