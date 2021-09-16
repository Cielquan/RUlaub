import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Translate as TranslateIcon,
} from "@mui/icons-material";
import { Button, Menu, Typography } from "@mui/material";
import React, { MouseEvent, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";
import Languages from "../state/utils/i18n";

import LanguageMenuButton from "./LanguageMenuButton";

const LanguageMenu = (): ReactElement => {
  const dispatch = useDispatch();
  const { activateDE, activateEN } = bindActionCreators(actionCreators, dispatch);
  const configState = useSelector((state: State) => state.config);
  const themeState = configState.settings.theme;
  const langState = configState.settings.language;

  const languages = [
    { changeHandle: activateDE, lang: Languages.german },
    { changeHandle: activateEN, lang: Languages.english },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const buttonStyle = {
    // NOTE: in light theme Navbar is 'primary.main' like the button
    color: "rgba(0, 0, 0, 0.54)",
    fill: "rgba(0, 0, 0, 0.54)",
  };

  return (
    <>
      <Button
        aria-controls="language-button"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <TranslateIcon sx={themeState === "dark" ? {} : buttonStyle} />
        <Typography sx={themeState === "dark" ? {} : buttonStyle}>
          {langState.name}
        </Typography>
        <KeyboardArrowDownIcon sx={themeState === "dark" ? {} : buttonStyle} />
      </Button>
      <Menu
        data-testid="lang-menu"
        id="language-button"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClick={handleClose}
        onClose={handleClose}
      >
        {languages.map((lang) => (
          <LanguageMenuButton
            key={lang.lang.locale}
            closeHandle={handleClose}
            changeHandle={lang.changeHandle}
            language={lang.lang}
          />
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenu;
