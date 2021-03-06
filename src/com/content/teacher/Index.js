import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core/";
import Dashboard from "./dashboard/Index";

import MarkAttendance from "./attendance/Mark";
import ViewAttendance from "./attendance/View";

import EnterMarks from "./marks/Enter";
import ViewMarks from "./marks/View";

import UploadHomework from "./homework/Upload";
import ViewHomework from "./homework/View";

class Teacher extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Route
          path="/teacher/attendance-mark"
          component={MarkAttendance}
        ></Route>
        <Route
          path="/teacher/attendance-view"
          component={ViewAttendance}
        ></Route>

        <Route path="/teacher/marks-view" component={ViewMarks}></Route>
        <Route path="/teacher/marks-enter" component={EnterMarks}></Route>

        <Route path="/teacher/homework-view" component={ViewHomework}></Route>
        <Route
          path="/teacher/homework-upload"
          component={UploadHomework}
        ></Route>

        <Route path="/teacher/chat-view" component={Dashboard}></Route>
        <Route path="/teacher/chat-new" component={Dashboard}></Route>

        <Route path="/teacher/dashboard" component={Dashboard}></Route>
      </Grid>
    );
  }
}

export default Teacher;
