import React, { Component } from "react";
import { Route } from "react-router-dom";

import Classes from "./Classes";
import Manage from "./Manage";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Route exact path="/admin/students/classes" component={Classes}></Route>
        <Route exact path="/admin/students/manage" component={Manage}></Route>
      </div>
    );
  }
}
