import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { actionCreators } from "../state";
import useStyles from "../styles";

import DarkThemeSwitch from "./DarkThemeSwitch";

const Navbar = ({ title }: { title: string }): React.ReactElement => {
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
        <Typography className={classes.navbarTitle} variant="h6" align="center" noWrap>
          {title}
        </Typography>
        <DarkThemeSwitch />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
