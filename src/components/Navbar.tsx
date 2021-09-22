import { Menu as MenuIcon, Person as PersonIcon } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
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
        <List sx={{ paddingRight: 2 }}>
          <ListItem
            key="userName"
            button
            onClick={openSettingsDialog}
            sx={{
              border: "1px solid",
              borderColor: themeState === "dark" ? "primary.main" : "action.active",
              borderRadius: 2,
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={configState.user.name} />
          </ListItem>
        </List>
        <LanguageMenu />
        <DarkThemeSwitch />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
