
![redux原理图](https://img-blog.csdnimg.cn/9b5a366558df4949965ef52c3493ee74.png)


![react-redux原理图](https://img-blog.csdnimg.cn/e7d0c13c5dce4385b4af0d70357c5059.png)

## 1.求和案例_redux精简版
## 2.求和案例_redux完整版
## 3.求和案例_redux异步action版
## 4.求和案例_redux-redux基本使用
        (1).
            1).UI组件：不能使用任何redux的API，只负责页面的呈现、交互等
            2).容器组件：负责和redux通信，将结果交给UI组件
        (2).如何创建一个容器组件-----靠react-redux的connect函数
            connect(mapStateToProps,mapDispatchToProps)(UI组件)
            --mapStateToProps：映射状态，返回值是一个对象
            --mapDispatchToProps映射操作状态的方法，返回值是一个对象
        (3).容器组件中的store是靠props传入的，而不是直接引用
## 5.求和案例_redux-redux优化
        (1).容器组件和UI组件整个到一个文件
        (2).无需给自己容器组建传递store，给<App/>包裹一个<Provider store={store}>即可
        (3).使用了react-redux后，也不用自己检测redux中的状态变化了，容器组建可以自动完成
        (4).mapDispatchToProps也可以简写成一个对象
        (5).一个组件要和redux'打交道'要经过哪几步？：
            (1).定义好UI组件 --不暴露
            (2).引入connect生成一个容器组件，并暴露，写法如下：
                connect(
                    state => ({key:value}),
                    {key:xxxxxAction}
                )(UI组件)
            (3).再UI组件中通过this.props.xxxx读取和操作状态
## 6.求和案例_redux-redux数据共享版
        (1).定义一个Person组件和Count组件通过redux数据共享
        (2).为Person组件编写：reducer、action和constant常量
        (3).重点：Person的reducer和Count的reducer要使用combineReducers合并，合并后的总状态是一个对象
        (4).交给store的是总reducer，最后取得时候要用state对应的状态取到位。
