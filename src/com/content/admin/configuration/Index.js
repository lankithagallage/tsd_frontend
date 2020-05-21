import React, { Component } from "react";
import { Route } from "react-router-dom";
import Organization from "./Organization";
import Section from "./Section";
import Classes from "./Classes";
import Subject from "./Subject";
import MGrade from "./MGrade";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Route
          exact
          path="/admin/configuration/organization"
          component={Organization}
        ></Route>
        <Route
          exact
          path="/admin/configuration/section"
          component={Section}
        ></Route>
        <Route
          exact
          path="/admin/configuration/classes"
          component={Classes}
        ></Route>
        <Route
          exact
          path="/admin/configuration/marking-grades"
          component={MGrade}
        ></Route>
        <Route
          exact
          path="/admin/configuration/subjects"
          component={Subject}
        ></Route>
      </div>
    );
  }
}
