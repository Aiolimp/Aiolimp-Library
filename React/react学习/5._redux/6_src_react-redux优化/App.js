import React from "react";
import Count from "./container/Count"

export default class App extends React.Component {
  render() {
    return (
      <div>
        {/*给容器组件传递store*/}
        <Count/>
      </div>
    )
  }
}