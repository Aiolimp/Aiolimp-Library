import { legacy_createStore, applyMiddleware } from "redux";

import countReduser from './count_reduser';

//使用异步redux
import thunk from 'redux-thunk'

export default legacy_createStore(countReduser,applyMiddleware(thunk));