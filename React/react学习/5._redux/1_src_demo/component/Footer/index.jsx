import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    const { todos } = this.props;
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" />
        </label>
        <span>
          <span>{
            // todos.map((todo) => {
            //   console.log(todo)
            //   const item = 0;
            //   if (todo.done === true) {
            //     item++;
            //   }
            //   return '已完成' + item
            // })
          }</span> / 全部{todos.length}
        </span>
        <button className="btn btn-danger">清除已完成任务</button>
      </div>
    )
  }
}
