import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { ChevronLeft, ChevronRight, Help, Settings } from "@material-ui/icons";

import { actionCreators, State } from "../state";
import useStyles from "../styles";

const SideMenu = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenu } = bindActionCreators(actionCreators, dispatch);
  const sideMenuState = useSelector((state: State) => state.sideMenuOpen);

  const classes = useStyles();
  const theme = useTheme();

  const itemList: Array<[string, JSX.Element]> = [["Settings", <Settings />]];

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
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {itemList.map((item) => (
          <ListItem button key={item[0]}>
            <ListItemIcon>{item[1]}</ListItemIcon>
            <ListItemText primary={item[0]} />
          </ListItem>
        ))}
      </List>
      <div className={classes.bottom}>
        <Divider />
        <List>
          <ListItem button key="Help">
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default SideMenu;
