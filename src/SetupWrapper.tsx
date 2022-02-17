import { invoke } from "@tauri-apps/api/tauri";
import { useSnackbar } from "notistack";
import React, { ReactElement, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import setupErrorEventListeners from "./backendAPI/eventListeners/errors";
import setupMenuEventListeners from "./backendAPI/eventListeners/menu";
import i18n from "./i18n";
import { useMountEffect } from "./hooks";
import { actionCreators, State } from "./state";

import App from "./App";

const SetupWrapper = (): ReactElement => {
  const dispatch = useDispatch();
  const {
    loadPublicHolidaysData,
    loadSchoolHolidaysData,
    loadSchoolHolidaysLink,
    loadUsersData,
    loadVacationsData,
    loadVacationStatsData,
    loadVacationTypesData,
  } = bindActionCreators(actionCreators, dispatch);

  const configState = useSelector((state: State) => state.config);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const langState = configState!.settings.language;

  const firstRenderRef = useRef(true);
  if (firstRenderRef.current) {
    firstRenderRef.current = false;
    i18n.activate(langState.locale);
  }

  useEffect(() => {
    i18n.activate(langState.locale);
  }, [langState.locale]);

  const snackbarHandles = useSnackbar();

  useMountEffect(() => {
    setupMenuEventListeners(dispatch, snackbarHandles);
    setupErrorEventListeners(snackbarHandles);

    if (typeof configState?.settings.databaseUri !== "string") {
      return;
    }

    loadSchoolHolidaysLink(snackbarHandles);
    loadVacationTypesData(snackbarHandles);

    if (typeof configState?.settings.yearToShow !== "number") {
      invoke("log_info", {
        target: "SetupWrapper",
        message:
          "year to show not set; only loading users and skip stats and marker data",
        location: "SetupWrapper.ts-SetupWrapper",
      });
      loadUsersData(snackbarHandles);
    } else {
      invoke("log_info", {
        target: "SetupWrapper",
        message:
          "Year to show set; loading vacations and stats, public and school holidays",
        location: "SetupWrapper.ts-SetupWrapper",
      });
      loadPublicHolidaysData(snackbarHandles);
      loadSchoolHolidaysData(snackbarHandles);
      loadVacationsData(snackbarHandles); // NOTE: also loads UsersData
      loadVacationStatsData(snackbarHandles);
    }
  });

  return <App />;
};

export default SetupWrapper;
