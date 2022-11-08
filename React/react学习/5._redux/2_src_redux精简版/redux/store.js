import { legacy_createStore } from "redux";

import countReduser from './count_reduser';

export default legacy_createStore(countReduser);