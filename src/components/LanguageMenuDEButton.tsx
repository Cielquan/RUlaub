import React, { ReactElement } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

import Languages from "../i18n";
import { actionCreators, State } from "../state";

import LanguageMenuButton, { CloseFunction } from "./LanguageMenuButton";

const LanguageMenuDEButton = ({ closeFn }: CloseFunction): ReactElement => {
  const langState = useSelector((state: State) => state.language);
  const dispatch = useDispatch();
  const { useDE } = bindActionCreators(actionCreators, dispatch);

  return (
    <LanguageMenuButton
      text={Languages.german.name}
      selected={langState.locale === Languages.german.locale}
      onClick={() => {
        closeFn();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useDE();
      }}
    />
  );
};

export default LanguageMenuDEButton;
