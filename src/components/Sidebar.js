import React from "react";
import { withStyles, withTheme } from "@material-ui/styles";
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { navigate } from "gatsby-link";

const drawerWidth = 240;

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
});

class Sidebar extends React.Component {
  drawerItems = [
    {
      title: "Root",
      path: "/",
    },
    {
      title: "Gallery",
      path: "/gallery",
    },
    {
      title: "Shop",
      path: "/shop",
    },
  ];

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { open } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={this.props.toggle}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.props.toggle}>
            <Close />
          </IconButton>
        </div>
        <Divider />
        <List>
          {this.drawerItems.map((item, index) => (
            <ListItem
              button
              key={item.title}
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Sidebar);
