import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import stort from './redux/store'

ReactDOM.render(<App/>, document.getElementById('root'))
stort.subscribe(() => {
    ReactDOM.render(<App/>, document.getElementById('root'))
})
