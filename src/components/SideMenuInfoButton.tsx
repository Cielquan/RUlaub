import { t } from "@lingui/macro";
import InfoIcon from "@material-ui/icons/Info";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../state";

import SideMenuButton from "./SideMenuButton";

const SideMenuInfoButton = (): ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenu, openInfoPage } = bindActionCreators(actionCreators, dispatch);

  return (
    <SideMenuButton
      listKey={t`Info`}
      text={t`Info`}
      icon={<InfoIcon />}
      onClick={() => {
        closeSideMenu();
        openInfoPage();
      }}
    />
  );
};

export default SideMenuInfoButton;
