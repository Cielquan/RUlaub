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
  const {
    closeSideMenu,
    createNewDB,
    openAboutPage,
    openPublicHolidaysDialog,
    openSchoolHolidaysDialog,
    openSettingsDialog,
    openUsersDialog,
    openVacationsDialog,
    openVacationTypesDialog,
    selectDB,
  } = bindActionCreators(actionCreators, dispatch);
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
      <React.Fragment key={item.mainButton[0]}>
        <SideMenuDoubleButton
          mainButton={item.mainButton}
          mainButtonOnClick={
            item.mainButtonOnClick ? wrapOnClick(item.mainButtonOnClick) : undefined
          }
          rightButton={[
            item.rightButton[0],
            wrapOnClick(item.rightButton[1]),
            item.rightButton[2],
          ]}
          leftButton={
            item.leftButton
              ? [
                  item.leftButton[0],
                  wrapOnClick(item.leftButton[1]),
                  item.leftButton[2],
                ]
              : undefined
          }
        />
        <Divider />
      </React.Fragment>
    ));

  const doubleButtonItemList: DoubleButtonItemList = [
    {
      mainButton: [t`Database`, <StorageIcon />],
      rightButton: [<FolderIcon />, selectDB, t`Select`],
      leftButton: [<AddIcon />, createNewDB, t`Create`],
    },
    {
      mainButton: [t`Users`, <GroupIcon />],
      mainButtonOnClick: openUsersDialog,
      rightButton: [<CreateIcon />, openUsersDialog, t`Edit`],
    },
    {
      mainButton: [t`Public Holidays`, <EventBusyIcon />],
      mainButtonOnClick: openPublicHolidaysDialog,
      rightButton: [<CreateIcon />, openPublicHolidaysDialog, t`Edit`],
    },
    {
      mainButton: [t`School Holidays`, <DateRangeIcon />],
      mainButtonOnClick: openSchoolHolidaysDialog,
      rightButton: [<CreateIcon />, openSchoolHolidaysDialog, t`Edit`],
    },
    {
      mainButton: [t`Vacation Types`, <EventNoteIcon />],
      mainButtonOnClick: openVacationTypesDialog,
      rightButton: [<CreateIcon />, openVacationTypesDialog, t`Edit`],
    },
    {
      mainButton: [t`Vacation`, <FlightIcon />],
      mainButtonOnClick: openVacationsDialog,
      rightButton: [<CreateIcon />, openVacationsDialog, t`Edit`],
      leftButton: [<AddIcon />, () => undefined, t`Create`],
    },
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
          key="About"
          text={t`About`}
          icon={<InfoIcon />}
          onClick={wrapOnClick(openAboutPage)}
        />
      </List>
    </Drawer>
  );
};
SideMenu.defaultProps = {
  onClick: () => undefined,
};

export default SideMenu;
