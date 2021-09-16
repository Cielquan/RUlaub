import { MenuItem } from "@mui/material";
import React, { forwardRef, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";

import { State } from "../state";
import { ConfigAction } from "../state/actions";
import { Language } from "../state/utils/i18n";

interface Props {
  language: Language;
  closeHandle: () => void;
  changeHandle: () => (dispatch: Dispatch<ConfigAction>) => void;
}

const LanguageMenuButton = forwardRef(
  (
    { language, closeHandle, changeHandle }: Props,
    ref: React.Ref<HTMLLIElement>
  ): ReactElement => {
    const configState = useSelector((state: State) => state.config);
    const langState = configState.settings.language;
    const active = langState.locale === language.locale;

    return (
      <MenuItem
        ref={ref}
        selected={active}
        onClick={active ? closeHandle : changeHandle}
      >
        {language.name}
      </MenuItem>
    );
  }
);

export default LanguageMenuButton;
