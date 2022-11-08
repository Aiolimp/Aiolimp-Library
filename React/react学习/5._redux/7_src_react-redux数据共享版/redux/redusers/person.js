import {ADD_PERSON} from '../constant'

const person = [{ id: '001', name: '张三', age: 18 }]
export default function personReduse(personState = person, action) {
    const { type, data } = action;
    switch (type) {
        case ADD_PERSON:
            return [data, ...personState];
        default:
            return personState;
    }
}