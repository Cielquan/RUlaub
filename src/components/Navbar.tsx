import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { actionCreators, State } from "../state";
import useStyles from "../styles";

import DarkThemeSwitch from "./DarkThemeSwitch";
import LanguageButton from "./LanguageButton";

const Navbar = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { openSideMenu } = bindActionCreators(actionCreators, dispatch);
  const appInfoState = useSelector((state: State) => state.appInfo);

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
        <Typography className={classes.navbarTitle} variant="h6" align="center" noWrap>
          {appInfoState.name}
        </Typography>
        <LanguageButton />
        <DarkThemeSwitch />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
