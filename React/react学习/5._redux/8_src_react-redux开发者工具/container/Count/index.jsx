import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/actions/count'
import { connect } from 'react-redux'
import React, { Component } from 'react'

class Count extends Component {
  increment = () => {
    const { value } = this.selectNumber;
    this.props.jia(value * 1)
  }
  decrement = () => {
    const { value } = this.selectNumber;
    this.props.jian(value * 1)
  }
  incrementIfodd = () => {
    const { value } = this.selectNumber;
    if (this.props.count % 2 !== 0) {
      this.props.jia(value * 1)
    }
  }
  incrementSycn = () => {
    const { value } = this.selectNumber;
    this.props.async(value * 1, 2000)
  }
  render() {
    return (
      <div>
        <h1>count组件,下面人的个数为{this.props.renshu}</h1>
        <h2>总数为:{this.props.count}</h2>
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


//使用connect创建并暴露一个count容器组件
export default connect(
  state => ({ count: state.he, renshu: state.rens.length }),
  {
    jia: createIncrementAction,
    jian: createDecrementAction,
    async: createIncrementAsyncAction,
  })(Count);
