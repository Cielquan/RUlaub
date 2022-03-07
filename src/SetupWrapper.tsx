import { invoke } from "@tauri-apps/api/tauri";
import { useSnackbar } from "notistack";
import React, { ReactElement, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import App from "./App";
import setupErrorEventListeners from "./backendAPI/eventListeners/errors";
import { useMountEffect } from "./hooks";
import i18n from "./i18n";
import { State, actionCreators } from "./state";

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

  const publicHolidaysDataLoadingDepth = useSelector(
    (state: State) => state.publicHolidaysDataLoadingDepth
  );
  const schoolHolidaysDataLoadingDepth = useSelector(
    (state: State) => state.schoolHolidaysDataLoadingDepth
  );
  const vacationsDataLoadingDepth = useSelector((state: State) => state.vacationsDataLoadingDepth);

  useMountEffect(() => {
    setupErrorEventListeners(snackbarHandles);

    if (typeof configState?.settings.databaseUri !== "string") {
      return;
    }

    loadSchoolHolidaysLink(snackbarHandles);
    loadVacationTypesData(snackbarHandles);

    if (typeof configState?.settings.yearToShow !== "number") {
      invoke("log_info", {
        target: "SetupWrapper",
        message: "year to show not set; only loading users and skip stats and marker data",
        location: "SetupWrapper.ts-SetupWrapper",
      });
      loadUsersData(snackbarHandles);
    } else {
      invoke("log_info", {
        target: "SetupWrapper",
        message: "Year to show set; loading vacations and stats, public and school holidays",
        location: "SetupWrapper.ts-SetupWrapper",
      });
      loadPublicHolidaysData(snackbarHandles, publicHolidaysDataLoadingDepth);
      loadSchoolHolidaysData(snackbarHandles, schoolHolidaysDataLoadingDepth);
      loadUsersData(snackbarHandles);
      loadVacationsData(snackbarHandles, vacationsDataLoadingDepth);
      loadVacationStatsData(snackbarHandles);
    }
  });

  return <App />;
};

export default SetupWrapper;
