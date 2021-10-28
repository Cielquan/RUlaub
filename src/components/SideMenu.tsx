import { t } from "@lingui/macro";
import {
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  Create as CreateIcon,
  DateRange as DateRangeIcon,
  EventBusy as EventBusyIcon,
  EventNote as EventNoteIcon,
  Flight as FlightIcon,
  Folder as FolderIcon,
  Group as GroupIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";
import { Divider, Drawer, IconButton, List } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";

import SideMenuButton from "./SideMenuButton";
import SideMenuDoubleButton, { DoubleButtonItemList } from "./SideMenuDoubleButton";

const SideMenuHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(1, 2),

  // necessary to match toolbar height
  ...theme.mixins.toolbar,
}));

interface Props {
  onClick?(): void;
}

const SideMenu = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenu, openInfoPage, openSettingsDialog, openUsersDialog } =
    bindActionCreators(actionCreators, dispatch);
  const sideMenuState = useSelector((state: State) => state.sideMenu);

  const wrapOnClick =
    (fn: () => void): (() => void) =>
    () => {
      if (typeof onClick === "function") onClick();
      closeSideMenu();
      fn();
    };

  const createDoubleButtons = (itemList: DoubleButtonItemList): ReactElement[] =>
    itemList.map((item) => (
      <React.Fragment key={item[0][0]}>
        <SideMenuDoubleButton
          mainButton={item[0]}
          secondButton={[item[1][0], wrapOnClick(item[1][1]), item[1][2]]}
          firstButton={
            item[2] ? [item[2][0], wrapOnClick(item[2][1]), item[2][2]] : undefined
          }
        />
        <Divider />
      </React.Fragment>
    ));

  const doubleButtonItemList: DoubleButtonItemList = [
    [
      [t`Database`, <StorageIcon />],
      [<FolderIcon />, () => undefined, t`Select`],
      [<AddIcon />, () => undefined, t`Create`],
    ],
    [
      [t`Users`, <GroupIcon />],
      [<CreateIcon />, openUsersDialog, t`Edit`],
    ],
    [
      [t`Public Holidays`, <EventBusyIcon />],
      [<CreateIcon />, () => undefined, t`Edit`],
      [<AddIcon />, () => undefined, t`Create`],
    ],
    [
      [t`School Holidays`, <DateRangeIcon />],
      [<CreateIcon />, () => undefined, t`Edit`],
      [<AddIcon />, () => undefined, t`Create`],
    ],
    [
      [t`Vacation types`, <EventNoteIcon />],
      [<CreateIcon />, () => undefined, t`Edit`],
      [<AddIcon />, () => undefined, t`Create`],
    ],
    [
      [t`Vacation`, <FlightIcon />],
      [<CreateIcon />, () => undefined, t`Edit`],
      [<AddIcon />, () => undefined, t`Create`],
    ],
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
      <List sx={{ paddingTop: 0 }}>{createDoubleButtons(doubleButtonItemList)}</List>
      <List
        sx={{
          marginTop: "auto",
          marginBottom: 2,
        }}
      >
        <Divider />
        <SideMenuButton
          key="Settings"
          text={t`Settings`}
          icon={<SettingsIcon />}
          onClick={wrapOnClick(openSettingsDialog)}
        />
        <Divider />
        <SideMenuButton
          key="Info"
          text={t`Info`}
          icon={<InfoIcon />}
          onClick={wrapOnClick(openInfoPage)}
        />
      </List>
    </Drawer>
  );
};
SideMenu.defaultProps = {
  onClick: () => undefined,
};

export default SideMenu;
