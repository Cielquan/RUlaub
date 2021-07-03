import React, { ReactElement } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { t } from "@lingui/macro";

import { actionCreators } from "../state";
import useStyles from "../styles";

import SideMenuButton from "./SideMenuButton";

const SideMenuDatabaseCreateButton = (): ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenu } = bindActionCreators(actionCreators, dispatch);

  const classes = useStyles();

  return (
    <SideMenuButton
      key={t`Create new`}
      text={t`Create new`}
      icon={<AddIcon />}
      onClick={closeSideMenu}
      className={classes.sideMenuNestedButton}
    />
  );
};

export default SideMenuDatabaseCreateButton;
