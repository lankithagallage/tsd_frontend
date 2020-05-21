import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core/";

class Student extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Router>
          <Switch></Switch>
        </Router>
      </Grid>
    );
  }
}

export default Student;
