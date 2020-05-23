import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, useTheme, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
} from "@material-ui/core";
import {
  AccountCircle,
  MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Menu as MenuIcon,
  SettingsPowerRounded as LogoutIcon,
} from "@material-ui/icons";
import { NavLink, Link } from "react-router-dom";

import AppDrawer from "./AppDrawer";
import NotificationPanel from "./NotificationPanel";

import Cookies from "js-cookie";
import { decrypt } from "./../../lib/global/helpers";

const drawerWidth = 250;
const notificationWidth = 350;

/**user styles**/
const styles = (theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      position: "relative",
    },
    position: "fixed",
    top: 0,
    left: "auto",
    right: 0,
  },
  grow: { flexGrow: 1 },
  menuButton: {
    [theme.breakpoints.up("sm")]: { display: "none" },
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
    [theme.breakpoints.up("sm")]: { display: "block" },
    color: "#999999",
    lineHeight: "60px",
    textDecoration: "none",
  },
  link: { textDecoration: "none" },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: { display: "flex" },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: { display: "none" },
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.menuId = "primary-search-account-menu";
    this.mobileMenuId = "primary-search-account-menu-mobile";

    window.drawerWidth = drawerWidth;
    window.notificationWidth = notificationWidth;
  }

  /*user menu open*/
  state = {
    mobileDrOpen: false,
    mobileNtOpen: false,
    isMenuOpen: false,
    isMobileMenuOpen: false,
    FirstName: undefined,
    LastName: undefined,
    usetType: undefined,
  };

  /**mobile menu open*/
  handleMobileMenuOpen = () => {
    this.setState({ isMobileMenuOpen: true });
  };

  /**mobile menu close*/
  handleMobileMenuClose = () => {
    this.setState({ isMobileMenuOpen: false });
  };

  /**menu open */
  handleMenuOpen = () => {
    console.log(122332);
    this.setState({ isMenuOpen: true });
  };

  /**menu close */
  handleMenuClose = () => {
    this.setState({ isMenuOpen: false });
    this.handleMobileMenuClose();
  };

  /**drawer Toggle */
  handleDrawerToggle = () => {
    this.setState({ mobileDrOpen: !this.state.mobileDrOpen });
  };

  /**notification panel Toggle */
  handleNotificationToggle = () => {
    this.setState({ mobileNtOpen: !this.state.mobileNtOpen });
    this.handleMenuClose();
  };

  componentDidMount() {
    var user = decrypt(Cookies.get("embose"));
    this.setState({
      FirstName: user.first_name,
      LastName: user.last_name,
    });
    var usetType = decrypt(Cookies.get("usuario"));
    this.setState({
      usetType: usetType,
    });
  }

  render() {
    const { classes } = this.props;

    const renderMenu = () => {
      return (
        <Menu
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={this.menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem>
            <NavLink
              className={classes.link}
              onClick={this.handleMenuClose}
              to="/account"
            >
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              Profile
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className={classes.link} to="/logout">
              <IconButton
                aria-label="logout current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
              Logout
            </NavLink>
          </MenuItem>
        </Menu>
      );
    };

    const renderMobileMenu = () => {
      return (
        <Menu
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={this.mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
        >
          <MenuItem onClick={this.handleNotificationToggle}>
            <IconButton
              aria-label="notifications"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <NotificationsIcon />
            </IconButton>
            Notifications
          </MenuItem>
          <MenuItem onClick={this.handleMobileMenuClose}>
            <NavLink className={classes.link} to="/account">
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              Profile
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className={classes.link} to="/logout">
              <IconButton
                aria-label="logout current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
              Logout
            </NavLink>
          </MenuItem>
        </Menu>
      );
    };

    return (
      <div>
        <AppDrawer
          width={drawerWidth}
          open={this.state.mobileDrOpen}
          onClose={this.handleDrawerToggle}
        />
        <AppBar className={classes.appBar}>
          <div class="navbar navbar-expand-md header-menu-one bg-light">
            <div class="d-md-none mobile-nav-bar">
              <button
                class="navbar-toggler pulse-animation"
                type="button"
                data-toggle="collapse"
                data-target="#mobile-navbar"
                aria-expanded="false"
              >
                <i class="far fa-arrow-alt-circle-down"></i>
              </button>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                class="navbar-toggler sidebar-toggle-mobile"
                onClick={this.handleDrawerToggle}
              >
                <i class="fas fa-bars"></i>
              </IconButton>

              <Link
                to="/"
                className={classes.title + " " + "pacifico"}
                style={{ float: "right" }}
                variant="h6"
                noWrap
              >
                Shilpa
              </Link>
            </div>
            <div
              class="header-main-menu collapse navbar-collapse"
              id="mobile-navbar"
            >
              <ul class="navbar-nav">
                <li class="navbar-item header-search-bar">
                  <div class="input-group stylish-input-group">
                    <span class="input-group-addon">
                      <Link
                        to="/"
                        className={classes.title + " " + "pacifico"}
                        variant="h6"
                        noWrap
                      >
                        Shilpa
                      </Link>
                    </span>
                  </div>
                </li>
              </ul>
              <ul class="navbar-nav">
                <li class="navbar-item dropdown header-admin">
                  <a
                    class="navbar-nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div class="admin-title">
                      <h5 class="item-title">
                        {this.state.FirstName + " " + this.state.LastName}
                      </h5>
                      <span>{this.state.usetType}</span>
                    </div>
                    <div class="admin-img">
                      <img src="inc/img/figure/admin.jpg" alt="Admin" />
                    </div>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <div class="item-header">
                      <h6 class="item-title">
                        {this.state.FirstName + " " + this.state.LastName}
                      </h6>
                    </div>
                    <div class="item-content">
                      <ul class="settings-list">
                        <li>
                          <a href="#">
                            <i class="flaticon-user"></i>My Profile
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="flaticon-list"></i>Task
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="flaticon-chat-comment-oval-speech-bubble-with-text-lines"></i>
                            Message
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="flaticon-gear-loading"></i>Account
                            Settings
                          </a>
                        </li>
                        <li>
                          <NavLink className={classes.link} to="/logout">
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li class="navbar-item dropdown header-message">
                  <a
                    class="navbar-nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="far fa-envelope"></i>
                    <div class="item-title d-md-none text-16 mg-l-10">
                      No Messages
                    </div>
                    <span>0</span>
                  </a>

                  <div class="dropdown-menu dropdown-menu-right">
                    <div class="item-header">
                      <h6 class="item-title">No Messages</h6>
                    </div>
                    <div class="item-content"></div>
                  </div>
                </li>
                <li class="navbar-item dropdown header-notification">
                  <a
                    class="navbar-nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="far fa-bell"></i>
                    <div class="item-title d-md-none text-16 mg-l-10">
                      No Notifications
                    </div>
                    <span>0</span>
                  </a>

                  <div class="dropdown-menu dropdown-menu-right">
                    <div class="item-header">
                      <h6 class="item-title">No Notifiacations</h6>
                    </div>
                    <div class="item-content"></div>
                  </div>
                </li>

                <li class="navbar-item dropdown header-notification">
                  <NavLink className="navbar-nav-link" to="/logout">
                    <i class="fas fa-power-off"></i>
                    <div class="item-title d-md-none text-16 mg-l-10">
                      Logout
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </AppBar>
        <NotificationPanel
          width={notificationWidth}
          open={this.state.mobileNtOpen}
          onClose={this.handleNotificationToggle}
        />
      </div>
    );
  }
}

Header.propTypes = {
  container: PropTypes.any,
};

export default withStyles(styles)(Header);
