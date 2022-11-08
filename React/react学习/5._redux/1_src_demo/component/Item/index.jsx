import React, { Component } from 'react'

export default class Item extends Component {
  state = { mouse: false }
  onMouseChange = (flag) => {
    return () => {
      this.setState({ mouse: flag })
    }
  }
  delete(id) {
    return () => {
      this.props.deleteTodo(id)
    }
  }
  change(){

  }
  render() {
    const { id, name, done } = this.props;
    const { mouse } = this.state
    return (
      <li style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.onMouseChange(true)} onMouseLeave={this.onMouseChange(false)}>
        <label>
          <input type="checkbox" onChange={this.change()} defaultChecked={done} />
          <span>{name}</span>
        </label>
        <button onClick={this.delete(id)} className="btn btn-danger" style={{ display: mouse ? 'block' : 'none' }}>删除</button>
      </li>
    )
  }
}
