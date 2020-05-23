import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core/";

import Master from "./master/Index";
import Configuration from "./configuration/Index";
import Administrators from "./administrators/Index";
import Teachers from "./teachers/Index";
import Parents from "./parents/Index";
import Students from "./students/Index";
import ExtraActivity from "./extra-activity/Index";
import Notifications from "./modules/Notifications";
import Chat from "./dashboard/Chat";
import Downloads from "./dashboard/Downloads";
import Dashboard from "./dashboard/Index";

class Admin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Switch>
          <Route path="/admin/master/*" component={Master}></Route>
          <Route
            path="/admin/configuration/*"
            component={Configuration}
          ></Route>
          <Route
            path="/admin/administrators/"
            component={Administrators}
          ></Route>
          <Route path="/admin/teachers/*" component={Teachers}></Route>
          <Route path="/admin/parents/*" component={Parents}></Route>
          <Route path="/admin/students/" component={Students}></Route>
          <Route
            path="/admin/extra-activity/*"
            component={ExtraActivity}
          ></Route>
          <Route path="/admin/notifications" component={Notifications}></Route>
          <Route path="/admin/chat" component={Chat}></Route>
          <Route path="/admin/downloads" component={Downloads}></Route>
          <Route path="/admin/dashboard" component={Dashboard}></Route>
        </Switch>
      </Grid>
    );
  }
}

export default Admin;
