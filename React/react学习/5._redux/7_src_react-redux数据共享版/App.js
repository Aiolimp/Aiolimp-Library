import React from "react";
import Count from "./container/Count"
import Person from "./container/Person"


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Count/>
        <Person/>
      </div>
    )
  }
}