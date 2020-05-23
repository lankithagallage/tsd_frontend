import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import Admin from "../content/admin/Index";
import Teacher from "../content/teacher/Index";
import Parent from "../content/parent/Index";
import Student from "../content/student/Index";
import Dashboard from "../content/dashboard/Index";

let drawerWidth = 250;
let appbarHeight = 60;

const styles = (theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      position: "relative",
      paddingTop: 20,
    },
    padding: 20,
    paddingTop: appbarHeight + 20,
    top: 0,
    left: "auto",
    right: 0,
  },
});

class Body extends Component {
  constructor(props) {
    super(props);
    drawerWidth = this.props.drawerWidth;
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.container}>
        <Route exact path="/admin/*" component={Admin}></Route>
        <Route exact path="/teacher/*" component={Teacher}></Route>
        <Route exact path="/parent/*" component={Parent}></Route>
        <Route exact path="/student/*" component={Student}></Route>
        <Route exact path="/" component={Dashboard}></Route>
      </Grid>
    );
  }
}

export default withStyles(styles)(Body);
