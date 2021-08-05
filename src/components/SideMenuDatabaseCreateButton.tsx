import { t } from "@lingui/macro";
import AddIcon from "@material-ui/icons/Add";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../state";
import useStyles from "../styles";

import SideMenuButton from "./SideMenuButton";

const SideMenuDatabaseCreateButton = (): ReactElement => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { closeSideMenu } = bindActionCreators(actionCreators, dispatch);

  return (
    <SideMenuButton
      listKey={t`Create new`}
      text={t`Create new`}
      icon={<AddIcon />}
      onClick={closeSideMenu}
      className={classes.sideMenuNestedButton}
    />
  );
};

export default SideMenuDatabaseCreateButton;
