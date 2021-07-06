import { Button, Menu, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import TranslateIcon from "@material-ui/icons/Translate";
import React, { MouseEvent, ReactElement, useState } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";

import LanguageMenuDEButton from "./LanguageMenuDEButton";
import LanguageMenuENButton from "./LanguageMenuENButton";

const LanguageMenu = (): ReactElement => {
  const langState = useSelector((state: State) => state.language);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="language-button"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <TranslateIcon />
        <Typography>{langState.name}</Typography>
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="language-button"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <LanguageMenuDEButton closeFn={handleClose} />
        <LanguageMenuENButton closeFn={handleClose} />
      </Menu>
    </>
  );
};

export default LanguageMenu;
