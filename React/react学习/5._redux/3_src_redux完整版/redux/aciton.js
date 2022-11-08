// 同步action的值为一般的Object对象
export const createIncrementAction = data => ({ type: 'increment', data })
export const createDecrementAction = data => ({ type: 'increment', data })

// 异步action的值为函数，异步action中一般会调同步acition
export const createIncrementAsyncAction = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        }, time)
    }
}
