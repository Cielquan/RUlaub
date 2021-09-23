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

import SideMenuButton, {
  ButtonIcon,
  ButtonListKey,
  ButtonOnClick,
  ButtonSxStyle,
  ButtonText,
} from "./SideMenuButton";
import SideMenuDoubleButton, { DoubleButtonItemList } from "./SideMenuDoubleButton";

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
  const { closeSideMenu, openInfoPage, openSettingsDialog } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const sideMenuState = useSelector((state: State) => state.sideMenu);

  const createSectionlessItems = (itemList: SectionlessItemList): ReactElement[] =>
    itemList.map((item) => (
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
    ));

  const createDoubleButtons = (itemList: DoubleButtonItemList): ReactElement[] =>
    itemList.map((item) => (
      <React.Fragment key={item[1]}>
        <SideMenuDoubleButton
          text={item[0]}
          listKey={item[1]}
          icon={item[6]}
          firstButtonIcon={item[2]}
          firstButtonOnClick={() => {
            if (typeof onClick === "function") onClick();
            closeSideMenu();
            item[3]();
          }}
          firstButtonTooltip={item[7]}
          secondButtonIcon={item[4]}
          secondButtonOnClick={() => {
            if (typeof onClick === "function") onClick();
            closeSideMenu();
            item[5]();
          }}
          secondButtonTooltip={item[8]}
          sxStyle={item[9]}
        />
        <Divider />
      </React.Fragment>
    ));

  const sectionlessItemList: SectionlessItemList = [
    [t`Settings`, "Settings", openSettingsDialog, <SettingsIcon />],
  ];

  const doubleButtonItemList: DoubleButtonItemList = [
    [
      t`Database`,
      "Database",
      <AddIcon />,
      () => undefined,
      <FolderIcon />,
      () => undefined,
      <StorageIcon />,
      t`Create`,
      t`Select`,
    ],
    [
      t`Users`,
      "Users",
      <AddIcon />,
      () => undefined,
      <CreateIcon />,
      () => undefined,
      <GroupIcon />,
      t`Create`,
      t`Edit`,
    ],
    [
      t`Public Holidays`,
      "Public Holidays",
      <AddIcon />,
      () => undefined,
      <CreateIcon />,
      () => undefined,
      <EventBusyIcon />,
      t`Create`,
      t`Edit`,
    ],
    [
      t`School Holidays`,
      "School Holidays",
      <AddIcon />,
      () => undefined,
      <CreateIcon />,
      () => undefined,
      <DateRangeIcon />,
      t`Create`,
      t`Edit`,
    ],
    [
      t`Vacation types`,
      "Vacation types",
      <AddIcon />,
      () => undefined,
      <CreateIcon />,
      () => undefined,
      <EventNoteIcon />,
      t`Create`,
      t`Edit`,
    ],
    [
      t`Vacation`,
      "Vacation",
      <AddIcon />,
      () => undefined,
      <CreateIcon />,
      () => undefined,
      <FlightIcon />,
      t`Create`,
      t`Edit`,
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
      <List sx={{ paddingTop: 0 }}>
        {createSectionlessItems(sectionlessItemList)}
        {createDoubleButtons(doubleButtonItemList)}
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
