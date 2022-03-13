import { plural, t } from "@lingui/macro";
import { invoke } from "@tauri-apps/api/tauri";
import { ProviderContext } from "notistack";
import { Dispatch } from "redux";

import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import { NewSchoolHolidayData, SchoolHolidayDataMap } from "../../backendAPI/types/helperTypes";
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { validateSchoolHolidaysData } from "../../backendAPI/validation";
import { createSnackbarCloseAction, enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";
import { SchoolHolidaysDataActionType } from "../action-types";
import { SchoolHolidaysDataAction } from "../actions";
import { LoadingDepth } from "../reducers/initialStates";

export const loadSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataActionType.LOAD,
  payload,
});

export const loadSchoolHolidaysData =
  (snackbarHandles: ProviderContext, loadingDepth: LoadingDepth = "CurrentYear") =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    let cmdReturn: { data: unknown };
    try {
      cmdReturn = await invoke("load_school_holidays", {
        filterCurrentYear: loadingDepth === "CurrentYear",
      });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let validatedData: SchoolHolidaysData;
    try {
      validatedData = await validateSchoolHolidaysData(cmdReturn.data);
    } catch (err) {
      invoke("log_error", {
        target: "school-holidays",
        message: "SchoolHolidays data validation failed",
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/schoolHolidaysDataActionCreators.ts-loadSchoolHolidaysData",
        errObjectString: JSON.stringify(err),
      });
      return;
    }

    dispatch(loadSchoolHolidaysDataAction(validatedData));
  };

export const downloadSchoolHolidaysDataFromLink =
  (snackbarHandles: ProviderContext, year: number) =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    let cmdReturn: {
      data: unknown;
      additionalInfo: {
        errorCount: number;
        inDbCount: number;
        doubleCount: number;
      };
    };
    try {
      cmdReturn = await invoke("download_school_holidays_from_link", { year });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let showWarning = false;
    let warningMsg = "";
    const { errorCount, inDbCount, doubleCount } = cmdReturn.additionalInfo;

    if (errorCount > 0) {
      warningMsg += plural(errorCount, {
        one: "Got one error from downloaded school holiday data.",
        other: "Got # errors from downloaded school holiday data.",
      });
      showWarning = true;
    }

    if (inDbCount > 0) {
      if (showWarning) warningMsg += "\n";
      warningMsg += plural(inDbCount, {
        one: "One downloaded school holiday data set is already in the database.",
        other: "# downloaded school holiday data sets are already in the database.",
      });
      showWarning = true;
    }

    if (doubleCount > 0) {
      if (showWarning) warningMsg += "\n";
      warningMsg += plural(doubleCount, {
        one: "Got one double data set from downloaded school holiday data.",
        other: "Got # double data sets from downloaded school holiday data.",
      });
      showWarning = true;
    }

    if (showWarning) snackbarHandles.enqueueSnackbar(warningMsg, { variant: "warning" });

    let validatedData: SchoolHolidaysData;
    try {
      validatedData = await validateSchoolHolidaysData(cmdReturn.data);
    } catch (err) {
      invoke("log_error", {
        target: "school-holidays",
        message: "SchoolHolidays data validation failed",
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/schoolHolidaysDataActionCreators.ts-loadSchoolHolidaysData",
        errObjectString: JSON.stringify(err),
      });
      return;
    }

    const msg = t`Successfully downloaded school holidays for year: ${year}`;
    snackbarHandles.enqueueSnackbar(msg, {
      variant: "success",
      persist: false,
      action: createSnackbarCloseAction(snackbarHandles.closeSnackbar),
    });

    dispatch(loadSchoolHolidaysDataAction(validatedData));
  };

export const updateSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataActionType.UPDATE,
  payload,
});

interface UpdatePayload {
  newEntries?: NewSchoolHolidayData[];
  updatedEntries?: SchoolHolidayDataMap;
  removedEntries?: number[];
}

export const updateSchoolHolidaysData =
  (
    { newEntries, updatedEntries, removedEntries }: UpdatePayload,
    snackbarHandles: ProviderContext,
    loadingDepth: LoadingDepth = "CurrentYear"
  ) =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    let cmdReturn: { data: unknown };
    try {
      cmdReturn = await invoke("update_school_holidays", {
        newEntries: newEntries ?? null,
        updatedEntries: updatedEntries ?? null,
        removedEntries: removedEntries ?? null,
        filterCurrentYear: loadingDepth === "CurrentYear",
      });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let validatedData: SchoolHolidaysData;
    try {
      validatedData = await validateSchoolHolidaysData(cmdReturn.data);
    } catch (err) {
      invoke("log_error", {
        target: "school-holidays",
        message: "SchoolHolidays data validation failed",
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/schoolHolidaysDataActionCreators.ts-updateSchoolHolidaysData",
        errObjectString: JSON.stringify(err),
      });
      return;
    }

    dispatch(updateSchoolHolidaysDataAction(validatedData));
  };
