import { INCREMENT, DECREMENT } from '../constant'

const count = 0;
export default function countReduser(preState = count, action) {
    const { type, data } = action;
    switch (type) {
        case INCREMENT:
            return preState + data;
        case DECREMENT:
            return preState - data;
        default:
            return preState;
    }
}