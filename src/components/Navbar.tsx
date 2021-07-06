import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../state";
import useStyles from "../styles";

import DarkThemeSwitch from "./DarkThemeSwitch";
import LanguageMenu from "./LanguageMenu";

const Navbar = (): ReactElement => {
  const dispatch = useDispatch();
  const { openSideMenu } = bindActionCreators(actionCreators, dispatch);

  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          className={classes.sideMenuButton}
          edge="start"
          onClick={openSideMenu}
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
