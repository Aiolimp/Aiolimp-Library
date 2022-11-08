import { legacy_createStore as createStore,applyMiddleware } from "redux";

import countReduser from './count_reduser';

import thunk from 'redux-thunk'

export default createStore(countReduser,applyMiddleware(thunk));