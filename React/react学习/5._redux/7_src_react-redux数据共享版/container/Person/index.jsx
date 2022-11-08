import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import { addPersonAction } from '../../redux/actions/person'

class Person extends Component {
    addPerson = () => {
        const name = this.name.value;
        const age = this.age.value;
        const personObj = { id: nanoid(), name, age }
        this.props.addRen(personObj);
        this.name.value = '';
        this.age.value = '';
    }
    render() {
        return (
            <div>
                {/* {从容器中取数据通过props} */}
                <h1>person组件,上方数字为{this.props.num}</h1>
                <input ref={c => this.name = c}></input>
                <input ref={c => this.age = c}></input>
                <button onClick={this.addPerson}>添加</button>
                <ul>
                    {
                        this.props.yiduiren.map(item=>{
                            return <li key={item.id}>{item.name}----{item.age}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default connect(
    state => ({ yiduiren: state.rens,num:state.he }), // 映射状态
    {
        addRen: addPersonAction // 映射操作状态的方法
    }
)(Person)
