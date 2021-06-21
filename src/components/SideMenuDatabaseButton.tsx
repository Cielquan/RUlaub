import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, List } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StorageIcon from "@material-ui/icons/Storage";

import { actionCreators, State } from "../state";

import SideMenuButton from "./SideMenuButton";
import SideMenuDatabaseCreateButton from "./SideMenuDatabaseCreateButton";
import SideMenuDatabaseModifyButton from "./SideMenuDatabaseModifyButton";

const SideMenuDatabaseButton = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenuDatabase, openSideMenuDatabase } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const sideMenuDatabaseState = useSelector((state: State) => state.sideMenuDatabase);

  return (
    <>
      <SideMenuButton
        key="Database"
        text="Database"
        icon={<StorageIcon />}
        onClick={sideMenuDatabaseState ? closeSideMenuDatabase : openSideMenuDatabase}
        foldIcon={sideMenuDatabaseState ? <ExpandLess /> : <ExpandMore />}
      />
      <Collapse in={sideMenuDatabaseState} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <SideMenuDatabaseCreateButton />
          <SideMenuDatabaseModifyButton />
        </List>
      </Collapse>
    </>
  );
};

export default SideMenuDatabaseButton;
