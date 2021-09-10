import { t } from "@lingui/macro";
import {
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  Create as CreateIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";
import { Divider, Drawer, IconButton, List } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";

import SideMenuButton, {
  ButtonIcon,
  ButtonListKey,
  ButtonOnClick,
  ButtonSxStyle,
  ButtonText,
} from "./SideMenuButton";
import SideMenuSectionButton, { SectionItemList } from "./SideMenuSectionButton";

const SideMenuHeader = styled("div")(({ theme }) => ({
  width: 240,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary to match toolbar height
  ...theme.mixins.toolbar,
}));

type SectionlessItemList = Array<
  [ButtonText, ButtonListKey, ButtonOnClick, ButtonIcon?, ButtonSxStyle?]
>;

interface Props {
  onClick?: () => void | null;
}

const SideMenu = ({ onClick }: Props): ReactElement => {
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
      <SideMenuHeader>
        <IconButton
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeSideMenu();
          }}
          size="large"
        >
          <ChevronLeftIcon />
        </IconButton>
      </SideMenuHeader>
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
            sxStyle={item[4]}
          />
        ))}
        <SideMenuSectionButton
          text={t`Database`}
          listKey={t`Database`}
          icon={<StorageIcon />}
          sectionItemList={DatabaseSectionItemList}
        />
      </List>
      <Box
        sx={{
          marginTop: "auto",
          marginBottom: 2,
        }}
      >
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
      </Box>
    </Drawer>
  );
};
SideMenu.defaultProps = {
  onClick: () => undefined,
};

export default SideMenu;
