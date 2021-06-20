import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

import { actionCreators } from "../state";

const SideMenuInfoButton = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenu, openInfoPage } = bindActionCreators(actionCreators, dispatch);

  return (
    <ListItem
      key="Info"
      button
      onClick={() => {
        closeSideMenu();
        openInfoPage();
      }}
    >
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Info" />
    </ListItem>
  );
};

export default SideMenuInfoButton;
