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
  ButtonOnClick,
  ButtonSxStyle,
  ButtonText,
} from "./SideMenuButton";
import SideMenuDoubleButton, { DoubleButtonItemList } from "./SideMenuDoubleButton";

const SideMenuHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(1, 2),

  // necessary to match toolbar height
  ...theme.mixins.toolbar,
}));

type SectionlessItemList = Array<
  [ButtonText, ButtonOnClick, ButtonIcon?, ButtonSxStyle?]
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
      <React.Fragment key={item[0]}>
        <SideMenuButton
          text={item[0]}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeSideMenu();
            item[1]();
          }}
          icon={item[2]}
          sxStyle={item[3]}
        />
        <Divider />
      </React.Fragment>
    ));

  const createDoubleButtons = (itemList: DoubleButtonItemList): ReactElement[] =>
    itemList.map((item) => (
      <React.Fragment key={item[0]}>
        <SideMenuDoubleButton
          text={item[0]}
          icon={item[5]}
          firstButtonIcon={item[1]}
          firstButtonOnClick={() => {
            if (typeof onClick === "function") onClick();
            closeSideMenu();
            item[2]();
          }}
          firstButtonTooltip={item[6]}
          secondButtonIcon={item[3]}
          secondButtonOnClick={() => {
            if (typeof onClick === "function") onClick();
            closeSideMenu();
            item[4]();
          }}
          secondButtonTooltip={item[7]}
          sxStyle={item[8]}
        />
        <Divider />
      </React.Fragment>
    ));

  const sectionlessItemList: SectionlessItemList = [
    [t`Settings`, openSettingsDialog, <SettingsIcon />],
  ];

  const doubleButtonItemList: DoubleButtonItemList = [
    [
      t`Database`,
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
          key="Info"
          text={t`Info`}
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
