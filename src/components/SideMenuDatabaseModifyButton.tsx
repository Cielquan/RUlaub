import React, { ReactElement } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import CreateIcon from "@material-ui/icons/Create";
import { t } from "@lingui/macro";

import { actionCreators } from "../state";
import useStyles from "../styles";

import SideMenuButton from "./SideMenuButton";

const SideMenuDatabaseModifyButton = (): ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenu } = bindActionCreators(actionCreators, dispatch);

  const classes = useStyles();

  return (
    <SideMenuButton
      key={t`Modify existing`}
      text={t`Modify existing`}
      icon={<CreateIcon />}
      onClick={closeSideMenu}
      className={classes.sideMenuNestedButton}
    />
  );
};

export default SideMenuDatabaseModifyButton;
