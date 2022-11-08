import CountUI from '../../component/Count'
import {createIncrementAction,createDecrementAction,createIncrementAsyncAction} from '../../redux/aciton'

import { connect } from 'react-redux'

/*
    1.mapStateToProps函数返回的是一个对象
    2.返回对象的key就作为传递给UI组件props的key，返回对象的value就作为传递给UI组件props的value，
    3.mapStateToProps用于传递状态
*/
const mapStateToProps = (state) => {
    return { count: state }
}
/*
    1.mapDispatchToProps函数返回的是一个对象
    2.返回对象的key就作为传递给UI组件props的key，返回对象的value就作为传递给UI组件props的value，
    3.mapDispatchToProps用于传递操作状态的方法
*/
const mapDispatchToProps = (dispatch) => {
    return {
        jia:number=> dispatch(createIncrementAction(number)),
        jian:number=> dispatch(createDecrementAction(number)),
        async:(number,time)=> dispatch(createIncrementAsyncAction(number,time)),
    }
}
//使用connect创建并暴露一个count容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
