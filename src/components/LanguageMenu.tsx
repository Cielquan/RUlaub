import { Button, Menu, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import TranslateIcon from "@material-ui/icons/Translate";
import React, { MouseEvent, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import Languages from "../i18n";
import { actionCreators, State } from "../state";
import LanguageMenuButton from "./LanguageMenuButton";

const LanguageMenu = (): ReactElement => {
  const dispatch = useDispatch();
  const { useDE, useEN } = bindActionCreators(actionCreators, dispatch);
  const langState = useSelector((state: State) => state.language);

  const languages = [
    { changeHandle: useDE, lang: Languages.german },
    { changeHandle: useEN, lang: Languages.english },
  ];

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
