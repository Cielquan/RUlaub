import { t } from "@lingui/macro";
import {
  Add as AddIcon,
  Build as BuildIcon,
  ChevronLeft as ChevronLeftIcon,
  Create as CreateIcon,
  Flight as FlightIcon,
  Folder as FolderIcon,
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

  const VacationSectionItemList: SectionItemList = [
    [t`Create new`, "Vac-Create new", closeSideMenu, <AddIcon />],
    [t`Edit existing`, "Vac-Edit existing", closeSideMenu, <CreateIcon />],
  ];

  const DatabaseSectionItemList: SectionItemList = [
    [t`Create new`, "DB-Create new", closeSideMenu, <AddIcon />],
    [t`Select existing`, "DB-Select existing", closeSideMenu, <FolderIcon />],
    [t`Modify selected`, "DB-Modify selected", closeSideMenu, <BuildIcon />],
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
        >
          <ChevronLeftIcon />
        </IconButton>
      </SideMenuHeader>
      <Divider />
      <List sx={{ paddingTop: 0 }}>
        {sectionlessItemList.map((item) => (
          <React.Fragment key={item[1]}>
            <SideMenuButton
              text={item[0]}
              listKey={item[1]}
              onClick={() => {
                if (typeof onClick === "function") onClick();
                closeSideMenu();
                item[2]();
              }}
              icon={item[3]}
              sxStyle={item[4]}
            />
            <Divider />
          </React.Fragment>
        ))}
        <SideMenuSectionButton
          text={t`Vacation`}
          listKey="Vacation"
          icon={<FlightIcon />}
          sectionItemList={VacationSectionItemList}
        />
        <Divider />
        <SideMenuSectionButton
          text={t`Database`}
          listKey="Database"
          icon={<StorageIcon />}
          sectionItemList={DatabaseSectionItemList}
        />
      </List>
      <List
        sx={{
          marginTop: "auto",
          marginBottom: 2,
        }}
      >
        <Divider />
        <SideMenuButton
          text={t`Info`}
          listKey="Info"
          icon={<InfoIcon />}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeSideMenu();
            openInfoPage();
          }}
        />
      </List>
    </Drawer>
  );
};
SideMenu.defaultProps = {
  onClick: () => undefined,
};

export default SideMenu;
