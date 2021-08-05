import { t } from "@lingui/macro";
import { Collapse, List } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StorageIcon from "@material-ui/icons/Storage";
import React, { ReactElement, useState } from "react";

import SideMenuButton from "./SideMenuButton";
import SideMenuDatabaseCreateButton from "./SideMenuDatabaseCreateButton";
import SideMenuDatabaseModifyButton from "./SideMenuDatabaseModifyButton";

const SideMenuDatabaseButton = (): ReactElement => {
  const [sideMenuDatabaseState, setSideMenuDatabaseState] = useState<boolean>(false);
  const closeSideMenuDatabase = (): void => setSideMenuDatabaseState(false);
  const openSideMenuDatabase = (): void => setSideMenuDatabaseState(true);

  return (
    <>
      <SideMenuButton
        listKey={t`Database`}
        text={t`Database`}
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
