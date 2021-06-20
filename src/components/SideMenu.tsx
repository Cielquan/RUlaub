import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
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
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";

import { actionCreators, State } from "../state";
import useStyles from "../styles";

const SideMenu = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenu } = bindActionCreators(actionCreators, dispatch);
  const sideMenuState = useSelector((state: State) => state.sideMenu);

  const classes = useStyles();

  const itemList: Array<[string, JSX.Element]> = [["Settings", <SettingsIcon />]];

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
      </List>
      <div className={classes.bottom}>
        <Divider />
        <List>
          <ListItem button key="Help">
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default SideMenu;
