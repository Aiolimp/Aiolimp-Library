import { legacy_createStore,applyMiddleware } from "redux";

import countReduser from './count_reduser';

import thunk from 'redux-thunk'

export default legacy_createStore(countReduser,applyMiddleware(thunk));