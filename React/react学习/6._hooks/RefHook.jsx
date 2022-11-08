import React from 'react'

// 类式组件
/* export default class Demo extends React.Component {
    myRef = React.createRef();
    show = () => {
        console.log(this.myRef)
        alert(this.myRef.current.value)
    }
    render() {
        return (
            <div>
                <input ref={this.myRef}></input>
                <button onClick={this.show}>展示</button>
            </div>
        )
    }
} */

//函数式组件
export default function Demo() {
    const myRef = React.useRef()
    function show() {
        alert(myRef.current.value)
    }
    return (
        <div>
            <input ref={myRef}></input>
            <button onClick={show}>展示</button>
        </div>
    )
}

/*  (1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
    (2). 语法: const refContainer = useRef()
    (3). 作用:保存标签对象,功能与React.createRef()一样 */
