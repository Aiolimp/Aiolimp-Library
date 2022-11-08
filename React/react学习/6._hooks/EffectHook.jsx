import React from 'react'
import ReactDOM from 'react-dom'

// 类式组件
// export default class Demo extends React.Component {
//     state = { count: 0 }
//     componentDidMount() {
//         this.timer = setInterval(() => {
//             this.setState(state => ({ count: state.count + 1 }))
//         }, 1000);
//     }
//     unmount = () => {
//         ReactDOM.unmountComponentAtNode(document.getElementById('root'))
//     }
//     componentWillUnmount(){
//         clearInterval(this.timer)
//     }
//     render() {
//         return (
//             <div>
//                 <h2>总数：{this.state.count}</h2>
//                 <button onClick={this.unmount}>销毁</button>
//             </div>
//         )
//     }
// }

//函数式组件
export default function Demo() {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        let timer = setInterval(() => {
            setCount(count => count + 1)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    function unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }
    return (
        < div >
            <h2>总数：{count}</h2>
            <br />
            <button onClick={unmount}>销毁</button>
        </div >
    )
}

/*  (1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
    (2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
    (3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
    (4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount()  */