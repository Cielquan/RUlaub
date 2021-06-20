import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

import { actionCreators } from "../state";

const SideMenuHelpButton = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenu, openHelpPage } = bindActionCreators(actionCreators, dispatch);

  return (
    <ListItem
      key="Help"
      button
      onClick={() => {
        closeSideMenu();
        openHelpPage();
      }}
    >
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItem>
  );
};

export default SideMenuHelpButton;
