import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Translate as TranslateIcon,
} from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
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

  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const buttonStyle = {
    color: themeState === "dark" ? "primary.main" : "action.active",
    fill: themeState === "dark" ? "primary.main" : "action.active",
  };

  return (
    <>
      <ListItem
        key="lang-btn"
        aria-controls="language-button"
        aria-haspopup="true"
        sx={{
          padding: 0,
          marginRight: 2,
        }}
      >
        <ListItemButton
          onClick={handleClick}
          sx={{
            border: "1px solid",
            borderColor: themeState === "dark" ? "primary.main" : "action.active",
            borderRadius: 2,
          }}
        >
          <ListItemIcon>
            <TranslateIcon sx={buttonStyle} />
          </ListItemIcon>
          <ListItemText
            sx={{ ...buttonStyle, minWidth: 60 }}
            primary={langState.name}
          />
          <KeyboardArrowDownIcon sx={buttonStyle} />
        </ListItemButton>
      </ListItem>
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
