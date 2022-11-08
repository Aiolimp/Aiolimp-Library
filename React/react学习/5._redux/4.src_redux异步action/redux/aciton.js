// 同步action返回一般Object对象
export const createIncrementAction = data => ({ type: 'increment', data })
export const createDecrementAction = data => ({ type: 'increment', data })
//异步action的值为一个函数，异步action中一般会调用同步action
export const createIncrementAsyncAction = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        }, time)
    }
}
