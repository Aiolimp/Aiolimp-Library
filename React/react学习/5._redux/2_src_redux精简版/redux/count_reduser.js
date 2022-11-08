const count = 0;
export default function countReduser(preState = count, action) {
    const { type, data } = action;
    console.log(preState,data)
    switch (type) {
        case 'increment':
            return preState + data;
        case 'decrement':
            return preState - data;
        default:
            return preState;
    }
}