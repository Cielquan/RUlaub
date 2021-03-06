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
