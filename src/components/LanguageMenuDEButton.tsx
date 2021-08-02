import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import Languages from "../i18n";
import { actionCreators, State } from "../state";

import LanguageMenuButton, { CloseFunction } from "./LanguageMenuButton";

const LanguageMenuDEButton = ({ closeFn }: CloseFunction): ReactElement => {
  const dispatch = useDispatch();
  const { useDE } = bindActionCreators(actionCreators, dispatch);
  const langState = useSelector((state: State) => state.language);
  const active = langState.locale === Languages.german.locale;

  return (
    <LanguageMenuButton
      text={Languages.german.name}
      selected={active}
      onClick={active ? closeFn : useDE}
    />
  );
};

export default LanguageMenuDEButton;
