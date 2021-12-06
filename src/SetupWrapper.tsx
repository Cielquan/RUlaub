import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import setupMenuEventListeners from "./backendAPI/eventListeners/menu";
import i18n from "./i18n";
import { useMountEffect } from "./hooks";
import { actionCreators, State } from "./state";

import App from "./App";

const SetupWrapper = (): ReactElement => {
  const dispatch = useDispatch();
  const {
    loadConfig,
    loadPublicHolidaysData,
    loadSchoolHolidaysData,
    loadUsersData,
    loadVacationTypesData,
  } = bindActionCreators(actionCreators, dispatch);

  const configState = useSelector((state: State) => state.config);
  const langState = configState.settings.language;

  useEffect(() => {
    i18n.activate(langState.locale);
  }, [langState.locale]);

  useMountEffect(() => {
    loadConfig();
    loadPublicHolidaysData();
    loadSchoolHolidaysData();
    loadUsersData();
    loadVacationTypesData();
    setupMenuEventListeners(dispatch);
  });

  return <App />;
};

export default SetupWrapper;
