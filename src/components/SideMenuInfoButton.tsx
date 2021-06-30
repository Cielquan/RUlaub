import React, { ReactElement } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import InfoIcon from "@material-ui/icons/Info";

import { actionCreators } from "../state";

import SideMenuButton from "./SideMenuButton";

const SideMenuInfoButton = (): ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenu, openInfoPage } = bindActionCreators(actionCreators, dispatch);

  return (
    <SideMenuButton
      key="Info"
      text="Info"
      icon={<InfoIcon />}
      onClick={() => {
        closeSideMenu();
        openInfoPage();
      }}
    />
  );
};

export default SideMenuInfoButton;
