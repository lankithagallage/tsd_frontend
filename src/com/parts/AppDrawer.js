import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Collapse,
  ListSubheader,
} from "@material-ui/core";
import {
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  StarBorder as StarBorderIcon,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import { blue } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import SettingsInputAntennaIcon from "@material-ui/icons/SettingsInputAntenna";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Cookies from "js-cookie";
import { decrypt } from "./../../lib/global/helpers";
import adminmenu from "./../../data/admin-menu.json";
import teachermenu from "./../../data/teacher-menu.json";
import parentmenu from "./../../data/parent-menu.json";
import studentmenu from "./../../data/student-menu.json";

const styles = (theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: { width: window.drawerWidth, flexShrink: 0 },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: { display: "none" },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: { width: window.drawerWidth },
  content: { flexGrow: 1, padding: theme.spacing(3) },
  blue: { backgroundColor: blue },
  avetarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avetar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: theme.spacing(1),
  },
  nested: { paddingLeft: theme.spacing(4) },
});

class AppDrawer extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    FirstName: undefined,
    Email: undefined,
    FirstLetter: undefined,
    menu: [],
  };

  handleClick = (e) => {
    this.setState({ [e]: !this.state[e] });
  };

  componentDidMount() {
    var user = decrypt(Cookies.get("embose"));
    this.setState({
      FirstName: user.first_name,
      Email: user.email,
      FirstLetter: user.first_name.charAt(0).toUpperCase(),
    });

    var usetType = decrypt(Cookies.get("usuario"));
    switch (usetType) {
      case "admin":
        this.setState({ menu: adminmenu });
        break;
      case "teacher":
        this.setState({ menu: teachermenu });
        break;
      case "parent":
        this.setState({ menu: parentmenu });
        break;
      case "student":
        this.setState({ menu: studentmenu });
        break;
    }
  }

  render() {
    let path = window.location.pathname;
    console.log(path);
    const { classes } = this.props;

    const drawer = () => {
      return (
        <div>
          <Box className={classes.toolbar} p={1} mt={3} mb={3}>
            <Box className={classes.avetarContainer}>
              <Avatar className={classes.avetar}>
                {this.state.FirstLetter}
              </Avatar>
            </Box>
            <Typography p={0} align="center">
              <strong>{this.state.FirstName}</strong>
            </Typography>
            <Typography p={0} align="center" className={classes.primary}>
              <small>{this.state.Email}</small>
            </Typography>
          </Box>
          <Divider />

          {this.state.menu.map((list) => {
            return (
              <List
                className={classes.root}
                key={list.id}
                subheader={<ListSubheader>{list.title}</ListSubheader>}
              >
                {list.items.map((item) => {
                  return (
                    <div key={item.id}>
                      {item.subitems != null ? (
                        <div key={item.id}>
                          <ListItem
                            button
                            key={item.id}
                            onClick={this.handleClick.bind(this, item.name)}
                          >
                            <ListItemText primary={item.name} />
                            {this.state[item.name] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </ListItem>
                          <Collapse
                            key={list.items.id}
                            component="li"
                            in={this.state[item.name]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List disablePadding>
                              {item.subitems.map((sitem) => {
                                return (
                                  <ListItem
                                    button
                                    key={sitem.id}
                                    className={classes.nested}
                                    selected={sitem.path == path ? true : false}
                                    button
                                    component={Link}
                                    to={sitem.path ? sitem.path : "#"}
                                  >
                                    <ListItemText
                                      key={sitem.id}
                                      primary={sitem.name}
                                    />
                                  </ListItem>
                                );
                              })}
                            </List>
                          </Collapse>
                        </div>
                      ) : (
                        <ListItem
                          button
                          key={item.id}
                          button
                          component={Link}
                          to={item.path ? item.path : "#"}
                        >
                          <ListItemText primary={item.name} />
                        </ListItem>
                      )}
                    </div>
                  );
                })}
                <Divider key={list.id} absolute />
              </List>
            );
          })}
        </div>
      );
    };

    const nav = () => {
      return (
        <div>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={this.props.open}
              onClose={this.props.onClose}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{
                keepMounted: true /*Better open performance on mobile.*/,
              }}
            >
              {drawer()}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              {drawer()}
            </Drawer>
          </Hidden>
        </div>
      );
    };
    return (
      <div className={classes.root}>
        <nav className={classes.drawer}>{nav()}</nav>
      </div>
    );
  }
}

AppDrawer.propTypes = {
  container: PropTypes.any,
};

export default withStyles(styles)(AppDrawer);
