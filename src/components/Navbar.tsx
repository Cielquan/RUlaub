import { Menu as MenuIcon, Person as PersonIcon } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";

import DarkThemeSwitch from "./DarkThemeSwitch";
import LanguageMenu from "./LanguageMenu";

const Navbar = (): ReactElement => {
  const dispatch = useDispatch();
  const { openSideMenu, openSettingsDialog } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const configState = useSelector((state: State) => state.config);
  const themeState = configState.settings.theme;

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          sx={{ marginRight: 2 }}
          edge="start"
          onClick={openSideMenu}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 1 }} variant="h6" align="left" noWrap>
          RUlaub
        </Typography>
        <List sx={{ display: "flex", flexDirection: "row" }}>
          <ListItem
            key="userName"
            sx={{
              padding: 0,
              marginRight: 2,
            }}
          >
            <ListItemButton
              onClick={openSettingsDialog}
              sx={{
                border: "1px solid",
                borderColor: themeState === "dark" ? "primary.main" : "action.active",
                borderRadius: 2,
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary={configState.user.name}
                primaryTypographyProps={{ noWrap: true }}
              />
            </ListItemButton>
          </ListItem>
          <LanguageMenu />
        </List>
        <DarkThemeSwitch />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
