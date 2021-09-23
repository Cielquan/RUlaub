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

  const sectionlessItemList: SectionlessItemList = [
    [t`Settings`, "Settings", openSettingsDialog, <SettingsIcon />],
  ];

  const DatabaseSectionItemList: SectionItemList = [
    [t`Create`, "DB-Create", () => undefined, <AddIcon />],
    [t`Select`, "DB-Select", () => undefined, <FolderIcon />],
  ];

  const UsersSectionItemList: SectionItemList = [
    [t`Create`, "Users-Create", () => undefined, <AddIcon />],
    [t`Edit`, "Users-Edit", () => undefined, <CreateIcon />],
  ];

  const PublicHolidaysSectionItemList: SectionItemList = [
    [t`Create`, "Pub-Holidays-Create", () => undefined, <AddIcon />],
    [t`Edit`, "Pub-Holidays-Edit", () => undefined, <CreateIcon />],
  ];

  const SchoolHolidaysSectionItemList: SectionItemList = [
    [t`Create`, "School-Holidays-Create", () => undefined, <AddIcon />],
    [t`Edit`, "School-Holidays-Edit", () => undefined, <CreateIcon />],
  ];

  const VacationTypesSectionItemList: SectionItemList = [
    [t`Create`, "Vac-Types-Create", () => undefined, <CreateIcon />],
    [t`Edit`, "Vac-Types-Edit", () => undefined, <CreateIcon />],
  ];

  const VacationSectionItemList: SectionItemList = [
    [t`Create`, "Vac-Create", () => undefined, <AddIcon />],
    [t`Edit`, "Vac-Edit", () => undefined, <CreateIcon />],
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
        <SideMenuSectionButton
          text={t`Database`}
          listKey="Database"
          icon={<StorageIcon />}
          sectionItemList={DatabaseSectionItemList}
        />
        <Divider />
        <SideMenuSectionButton
          text={t`Users`}
          listKey="users"
          icon={<GroupIcon />}
          sectionItemList={UsersSectionItemList}
        />
        <Divider />
        <SideMenuSectionButton
          text={t`Public Holidays`}
          listKey="Public Holidays"
          icon={<EventBusyIcon />}
          sectionItemList={PublicHolidaysSectionItemList}
        />
        <Divider />
        <SideMenuSectionButton
          text={t`School Holidays`}
          listKey="School Holidays"
          icon={<DateRangeIcon />}
          sectionItemList={SchoolHolidaysSectionItemList}
        />
        <Divider />
        <SideMenuSectionButton
          text={t`Vacation types`}
          listKey="Vacation types"
          icon={<EventNoteIcon />}
          sectionItemList={VacationTypesSectionItemList}
        />
        <Divider />
        <SideMenuSectionButton
          text={t`Vacation`}
          listKey="Vacation"
          icon={<FlightIcon />}
          sectionItemList={VacationSectionItemList}
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
