import { t } from "@lingui/macro";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SettingsIcon from "@material-ui/icons/Settings";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";
import useStyles from "../styles";

import SideMenuDatabaseButton from "./SideMenuDatabaseButton";
import SideMenuInfoButton from "./SideMenuInfoButton";

const SideMenu = (): ReactElement => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { closeSideMenu } = bindActionCreators(actionCreators, dispatch);
  const sideMenuState = useSelector((state: State) => state.sideMenu);

  const itemList: Array<[string, ReactElement]> = [[t`Settings`, <SettingsIcon />]];

  return (
    <Drawer anchor="left" open={sideMenuState} onClose={closeSideMenu}>
      <div className={classes.sideMenuHeader}>
        <IconButton onClick={closeSideMenu}>
          <ChevronLeftIcon />
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
        <SideMenuDatabaseButton />
      </List>
      <div className={classes.infoButton}>
        <Divider />
        <List>
          <SideMenuInfoButton />
        </List>
      </div>
    </Drawer>
  );
};

export default SideMenu;
