import React from "react";
import { useSelector } from "react-redux";
import { Button, Menu, MenuItem, Typography } from "@material-ui/core";
import TranslateIcon from "@material-ui/icons/Translate";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import Languages from "../languages";
import { State } from "../state";

const LanguageButton = (): React.ReactElement => {
  const langState = useSelector((state: State) => state.language);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
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
        {Object.keys(Languages).map((lang) => (
          <MenuItem
            selected={langState.locale === Languages[lang].locale}
            onClick={handleClose}
          >
            {Languages[lang].name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageButton;
