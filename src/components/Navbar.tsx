import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "../styles";

const Navbar = ({ title }: { title: string }): React.ReactElement => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} edge="start">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.navbarTitle} variant="h6" align="center">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
