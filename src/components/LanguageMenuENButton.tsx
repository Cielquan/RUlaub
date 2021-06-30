import React, { ReactElement } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

import Languages from "../languages";
import { actionCreators, State } from "../state";

import LanguageMenuButton from "./LanguageMenuButton";

interface LanguageMenuENButton {
  closeFn: () => void;
}

const LanguageMenuENButton = ({ closeFn }: LanguageMenuENButton): ReactElement => {
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
