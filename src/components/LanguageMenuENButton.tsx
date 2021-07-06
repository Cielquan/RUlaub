import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import Languages from "../i18n";
import { actionCreators, State } from "../state";

import LanguageMenuButton, { CloseFunction } from "./LanguageMenuButton";

const LanguageMenuENButton = ({ closeFn }: CloseFunction): ReactElement => {
  const langState = useSelector((state: State) => state.language);
  const dispatch = useDispatch();
  const { useEN } = bindActionCreators(actionCreators, dispatch);

  return (
    <LanguageMenuButton
      text={Languages.english.name}
      selected={langState.locale === Languages.english.locale}
      onClick={() => {
        closeFn();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEN();
      }}
    />
  );
};

export default LanguageMenuENButton;
