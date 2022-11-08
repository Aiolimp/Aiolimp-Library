import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";

import countReduser from './redusers/count';

import personReduse from './redusers/person';

import thunk from 'redux-thunk'
//多个reduser使用combineReducers，参数为对象的形式
const reduser = combineReducers({
    he: countReduser,
    rens: personReduse
})

export default createStore(reduser, applyMiddleware(thunk));