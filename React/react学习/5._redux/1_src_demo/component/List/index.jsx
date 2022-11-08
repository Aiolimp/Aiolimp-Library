import React, { Component } from 'react'
import Item from '../Item'
export default class List extends Component {
  render() {
    const { todos,deleteTodo,changeTodo } = this.props;
    return (
      <div>
        <ul className="todo-main">
          {
            todos.map((todo) => {
              return <Item key={todo.id} {...todo} deleteTodo={deleteTodo} changeTodo={changeTodo}></Item>
            })
          }
        </ul>
      </div>
    )
  }
}
