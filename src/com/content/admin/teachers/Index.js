import React, { Component } from "react";
import { Route } from "react-router-dom";
import Grades from "./Grades";
import Institutes from "./Institutes";
import QualificationSpeciality from "./QualificationSpeciality";
import Qualification from "./Qualification";
import Manage from "./Manage";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Route exact path="/admin/teachers/grades" component={Grades}></Route>
        <Route
          exact
          path="/admin/teachers/institutes"
          component={Institutes}
        ></Route>
        <Route
          exact
          path="/admin/teachers/speciality"
          component={QualificationSpeciality}
        ></Route>
        <Route
          exact
          path="/admin/teachers/qualification"
          component={Qualification}
        ></Route>
        <Route exact path="/admin/teachers/manage" component={Manage}></Route>
      </div>
    );
  }
}
