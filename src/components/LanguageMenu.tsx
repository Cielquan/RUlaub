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
import { invoke } from "@tauri-apps/api/tauri";
import { useSnackbar } from "notistack";
import React, { MouseEvent, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import {
  LanguageData,
  SupportedLanguages,
} from "../backendAPI/types/configFile.schema";
import { useAsync } from "../hooks";
import { actionCreators, State } from "../state";

import LanguageMenuButton from "./LanguageMenuButton";

const LanguageMenu = (): ReactElement => {
  const dispatch = useDispatch();
  const { setLanguage } = bindActionCreators(actionCreators, dispatch);
  const configState = useSelector((state: State) => state.config);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const themeState = configState!.settings.theme;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const langState = configState!.settings.language;

  const { value: availableLanguages } = useAsync(
    async (): Promise<{ [key: string]: LanguageData }> =>
      invoke("get_available_languages")
  );

  const snackbarHandles = useSnackbar();

  const languages = Object.keys(availableLanguages ?? {}).map((locale) => ({
    changeHandle: () => setLanguage(locale as SupportedLanguages, snackbarHandles),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    lang: availableLanguages![locale],
  }));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const buttonColor = themeState === "dark" ? "primary.main" : "action.active";

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
            borderColor: buttonColor,
            borderRadius: 2,
          }}
        >
          <ListItemIcon>
            <TranslateIcon sx={{ color: buttonColor }} />
          </ListItemIcon>
          <ListItemText
            sx={{ color: buttonColor, minWidth: 60 }}
            primary={langState.name}
          />
          <KeyboardArrowDownIcon sx={{ color: buttonColor }} />
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
