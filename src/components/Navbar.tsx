import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../state";

import DarkThemeSwitch from "./DarkThemeSwitch";
import LanguageMenu from "./LanguageMenu";

const Navbar = (): ReactElement => {
  const dispatch = useDispatch();
  const { openSideMenu } = bindActionCreators(actionCreators, dispatch);

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
        <LanguageMenu />
        <DarkThemeSwitch />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
