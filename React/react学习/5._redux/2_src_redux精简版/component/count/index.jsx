import React, { Component } from 'react'
import store from '../../redux/store'
// import store from '../../redux/store'

export default class Count extends Component {
  increment = () => {
    const { value } = this.selectNumber;
    store.dispatch({ type: 'increment', data: value * 1 })
  }
  decrement = () => {
    const { value } = this.selectNumber;
    store.dispatch({ type: 'decrement', data: value * 1 })
  }
  incrementIfodd = () => {
    const { value } = this.selectNumber;
    const count = store.getState();
    if (count % 2 !== 0) {
      store.dispatch({ type: 'increment', data: value * 1 })
    }
  }
  incrementSycn = () => {
    const { value } = this.selectNumber;
    setTimeout(() => {
      store.dispatch({ type: 'increment', data: value * 1 })
    }, 2200)

  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({})
    })
  }
  render() {
    return (
      <div>
        <h1>总数为：{store.getState()}</h1>
        <select ref={c => this.selectNumber = c}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfodd}>给奇数加一</button>&nbsp;
        <button onClick={this.incrementSycn}>异步添加</button>&nbsp;
      </div>
    )
  }
}
