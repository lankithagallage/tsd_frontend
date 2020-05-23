import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core/";
import Dashboard from "./dashboard/Index";

class Parent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Router>
          <Switch>
            <Route path="/parent/dashboard" component={Dashboard}></Route>
          </Switch>
        </Router>
      </Grid>
    );
  }
}

export default Parent;
