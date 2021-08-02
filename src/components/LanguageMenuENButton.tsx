import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import Languages from "../i18n";
import { actionCreators, State } from "../state";

import LanguageMenuButton, { CloseFunction } from "./LanguageMenuButton";

const LanguageMenuENButton = ({ closeFn }: CloseFunction): ReactElement => {
  const dispatch = useDispatch();
  const { useEN } = bindActionCreators(actionCreators, dispatch);
  const langState = useSelector((state: State) => state.language);
  const active = langState.locale === Languages.english.locale;

  return (
    <LanguageMenuButton
      text={Languages.english.name}
      selected={active}
      onClick={active ? closeFn : useEN}
    />
  );
};

export default LanguageMenuENButton;
