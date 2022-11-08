import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))
// react-redux不用检测
// stort.subscribe(() => {
//     ReactDOM.render(<App/>, document.getElementById('root'))
// })
