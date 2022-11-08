import React, { Component } from 'react'
import {nanoid} from 'nanoid'

export default class Header extends Component {
  keyUp = (event) => {
    const { keyCode, target } = event;
    if (keyCode !== 13) return;
    if (target.value.trim() === '') {
      alert('输入不能为空11')
      return
    }
    const todoObj = {id:nanoid(),name:target.value,done:false}
    this.props.addTodo(todoObj);
    target.value = ''
  }
  render() {
    return (
      <div className="todo-header">
        <input onKeyUp={this.keyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
      </div>
    )
  }
}
