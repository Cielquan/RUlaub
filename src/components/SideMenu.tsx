import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { actionCreators, State } from "../state";
import useStyles from "../styles";

const SideMenu = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenu } = bindActionCreators(actionCreators, dispatch);
  const sideMenuState = useSelector((state: State) => state.sideMenuOpen);

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.sideMenu, {
        [classes.sideMenuOpen]: sideMenuState,
        [classes.sideMenuClose]: !sideMenuState,
      })}
      classes={{
        paper: clsx({
          [classes.sideMenuOpen]: sideMenuState,
          [classes.sideMenuClose]: !sideMenuState,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={closeSideMenu}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
