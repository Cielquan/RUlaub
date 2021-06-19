import React from "react";
import clsx from "clsx";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import { actionCreators, State } from "../state";
import useStyles from "../styles";

import DarkThemeSwitch from "./DarkThemeSwitch";

const Navbar = ({ title }: { title: string }): React.ReactElement => {
  const dispatch = useDispatch();
  const { openSideMenu, closeSideMenu } = bindActionCreators(actionCreators, dispatch);
  const sideMenuState = useSelector((state: State) => state.sideMenuOpen);

  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: sideMenuState,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={sideMenuState ? closeSideMenu : openSideMenu}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: sideMenuState,
          })}
        >
          <Menu />
        </IconButton>
        <Typography className={classes.navbarTitle} variant="h6" align="center" noWrap>
          {title}
        </Typography>
        <DarkThemeSwitch />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
