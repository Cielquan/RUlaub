import { MenuItem } from "@material-ui/core";
import React, { forwardRef, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";

import { Language } from "../state/utils/i18n";
import { State } from "../state";
import { LanguageAction } from "../state/actions";

interface Props {
  language: Language;
  closeHandle: () => void;
  changeHandle: () => (dispatch: Dispatch<LanguageAction>) => void;
}

const LanguageMenuButton = forwardRef(
  (
    { language, closeHandle, changeHandle }: Props,
    ref: React.Ref<HTMLLIElement>
  ): ReactElement => {
    const langState = useSelector((state: State) => state.language);
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
