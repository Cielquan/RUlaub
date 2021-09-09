import { t } from "@lingui/macro";
import { Divider, Drawer, IconButton, List } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CreateIcon from "@mui/icons-material/Create";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";
import useStyles from "../styles";

import SideMenuButton, {
  ButtonText,
  ButtonListKey,
  ButtonOnClick,
  ButtonIcon,
  ButtonClassName,
} from "./SideMenuButton";
import SideMenuSectionButton, { SectionItemList } from "./SideMenuSectionButton";

type SectionlessItemList = Array<
  [ButtonText, ButtonListKey, ButtonOnClick, ButtonIcon?, ButtonClassName?]
>;

interface Props {
  onClick?: () => void | null;
}

const SideMenu = ({ onClick }: Props): ReactElement => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { closeSideMenu, openInfoPage } = bindActionCreators(actionCreators, dispatch);
  const sideMenuState = useSelector((state: State) => state.sideMenu);

  const sectionlessItemList: SectionlessItemList = [
    [t`Settings`, "Settings", closeSideMenu, <SettingsIcon />],
  ];

  const DatabaseSectionItemList: SectionItemList = [
    [t`Create new`, "DB-Create new", closeSideMenu, <AddIcon />],
    [t`Modify existing`, "DB-Modify existing", closeSideMenu, <CreateIcon />],
  ];

  return (
    <Drawer
      data-testid="side-menu"
      anchor="left"
      open={sideMenuState}
      onClose={closeSideMenu}
    >
      <div className={classes.sideMenuHeader}>
        <IconButton
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeSideMenu();
          }}
          size="large"
        >
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {sectionlessItemList.map((item) => (
          <SideMenuButton
            text={item[0]}
            key={item[1]}
            listKey={item[1]}
            onClick={() => {
              if (typeof onClick === "function") onClick();
              closeSideMenu();
              item[2]();
            }}
            icon={item[3]}
            className={item[4]}
          />
        ))}
        <SideMenuSectionButton
          text={t`Database`}
          listKey={t`Database`}
          icon={<StorageIcon />}
          sectionItemList={DatabaseSectionItemList}
        />
      </List>
      <div className={classes.infoButton}>
        <Divider />
        <List>
          <SideMenuButton
            listKey={t`Info`}
            text={t`Info`}
            icon={<InfoIcon />}
            onClick={() => {
              if (typeof onClick === "function") onClick();
              closeSideMenu();
              openInfoPage();
            }}
          />
        </List>
      </div>
    </Drawer>
  );
};
SideMenu.defaultProps = {
  onClick: () => undefined,
};

export default SideMenu;
