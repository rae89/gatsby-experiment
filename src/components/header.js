import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Hidden,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import Sidebar from "./Sidebar";

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({
      open: !this.state.open,
    });
  }
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Non Fungible Tokens
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar open={this.state.open} toggle={this.toggleDrawer} />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
