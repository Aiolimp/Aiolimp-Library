import React from 'react'

// 类式组件
/* export default class Demo extends React.Component {
    state = { count: 0 }
    add = () => {
        const {count} = this.state;
        this.setState({ count: count + 1 })
    }
    render() {
        return (
            <div>
                <h2>总数：{this.state.count}</h2>
                <br />
                <button onClick={this.add}>加一</button>
            </div>

        )
    }
}
 */
//函数式组件
export default function Demo() {

    /*  参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数 */
    const [count, setCount] = React.useState(0);

    function add() {
        /* setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值 */
        setCount(count => count + 1)
    }
    return (
        < div >
            <h2>总数：{count}</h2>
            <br />
            <button onClick={add}>加一</button>
        </div >
    )
}