import React, { Component } from "react";
import { Route } from "react-router-dom";
import AccessLevel from "./AccessLevel";
import MaritialStatus from "./MaritialStatus";
import Titles from "./Titles";
import UserTypes from "./UserTypes";

export default class index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("menu clicked");
    return (
      <div>
        <Route
          path="/admin/master/access-levels"
          component={AccessLevel}
        ></Route>
        <Route
          path="/admin/master/maritial-status"
          component={MaritialStatus}
        ></Route>
        <Route path="/admin/master/titles" component={Titles}></Route>
        <Route path="/admin/master/user-types" component={UserTypes}></Route>
      </div>
    );
  }
}
