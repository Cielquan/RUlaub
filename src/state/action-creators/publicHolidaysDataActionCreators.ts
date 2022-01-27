import { t } from "@lingui/macro";
import { invoke } from "@tauri-apps/api/tauri";
import { ProviderContext } from "notistack";
import { Dispatch } from "redux";

import { PublicHolidaysDataActionType } from "../action-types";
import { PublicHolidaysDataAction } from "../actions";
import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import {
  NewPublicHolidayData,
  PublicHolidayDataMap,
} from "../../backendAPI/types/helperTypes";
import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
import { validatePublicHolidaysData } from "../../backendAPI/validation";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";

export const loadPublicHolidaysDataAction = (
  payload: PublicHolidaysData
): PublicHolidaysDataAction => ({
  type: PublicHolidaysDataActionType.LOAD,
  payload,
});

export const loadPublicHolidaysData =
  (snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<PublicHolidaysDataAction>): Promise<void> => {
    let data: unknown;
    let errorCount: number;
    try {
      [data, errorCount] = await invoke("load_public_holidays");
    } catch (err) {
      enqueuePersistendErrSnackbar(
        getErrorCatalogueMsg(err as string),
        snackbarHandles
      );
      return;
    }

    if (errorCount > 0)
      snackbarHandles.enqueueSnackbar(
        t`Got ${errorCount} errors while loading public holiday data.`,
        { variant: "warning" }
      );

    let validatedData: PublicHolidaysData;
    try {
      validatedData = await validatePublicHolidaysData(data);
    } catch (err) {
      invoke("log_error", {
        target: "public-holidays",
        message: `PublicHolidays data validation failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/publicHolidaysDataActionCreators.ts-loadPublicHolidaysData",
      });
      return;
    }

    dispatch(loadPublicHolidaysDataAction(validatedData));
  };

export const updatePublicHolidaysDataAction = (
  payload: PublicHolidaysData
): PublicHolidaysDataAction => ({
  type: PublicHolidaysDataActionType.UPDATE,
  payload,
});

interface UpdatePayload {
  newEntries?: NewPublicHolidayData[];
  updatedEntries?: PublicHolidayDataMap;
  removedEntries?: number[];
}

export const updatePublicHolidaysData =
  (
    { newEntries, updatedEntries, removedEntries }: UpdatePayload,
    snackbarHandles: ProviderContext
  ) =>
  async (dispatch: Dispatch<PublicHolidaysDataAction>): Promise<void> => {
    let data: unknown;
    let errorCount: number;
    try {
      [data, errorCount] = await invoke("update_public_holidays", {
        newEntries: newEntries ?? null,
        updatedEntries: updatedEntries ?? null,
        removedEntries: removedEntries ?? null,
      });
    } catch (err) {
      enqueuePersistendErrSnackbar(
        getErrorCatalogueMsg(err as string),
        snackbarHandles
      );
      return;
    }

    if (errorCount > 0)
      snackbarHandles.enqueueSnackbar(
        t`Got ${errorCount} errors while loading public holiday data.`,
        { variant: "warning" }
      );

    let validatedData: PublicHolidaysData;
    try {
      validatedData = await validatePublicHolidaysData(data);
    } catch (err) {
      invoke("log_error", {
        target: "public-holidays",
        message: `PublicHolidays data validation failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/publicHolidaysDataActionCreators.ts-updatePublicHolidaysData",
      });
      return;
    }

    dispatch(updatePublicHolidaysDataAction(validatedData));
  };
