import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../state";
import useStyles from "../styles";

import DarkThemeSwitch from "./DarkThemeSwitch";
import LanguageMenu from "./LanguageMenu";

const Navbar = (): ReactElement => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { openSideMenu } = bindActionCreators(actionCreators, dispatch);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          className={classes.sideMenuButton}
          edge="start"
          onClick={openSideMenu}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.typographyGrow} variant="h6" align="left" noWrap>
          RUlaub
        </Typography>
        <LanguageMenu />
        <DarkThemeSwitch />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
