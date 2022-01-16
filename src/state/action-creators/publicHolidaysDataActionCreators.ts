import { invoke } from "@tauri-apps/api/tauri";
import { Dispatch } from "redux";

import { PublicHolidaysDataActionType } from "../action-types";
import { PublicHolidaysDataAction } from "../actions";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
import {
  NewPublicHolidayData,
  PublicHolidayDataMap,
} from "../../backendAPI/types/helperTypes";
import { validatePublicHolidaysData } from "../../backendAPI/validation";

export const loadPublicHolidaysDataAction = (
  payload: PublicHolidaysData
): PublicHolidaysDataAction => ({
  type: PublicHolidaysDataActionType.LOAD,
  payload,
});

export const loadPublicHolidaysData =
  () =>
  async (dispatch: Dispatch<PublicHolidaysDataAction>): Promise<void> => {
    let data;
    let errorCount;
    try {
      // TODO:#i# snackbar with warning if error_count > 0
      [data, errorCount] = await invoke("load_public_holidays");
    } catch (err) {
      invoke("log_error", {
        target: "public-holidays",
        message: `Loading of PublicHolidays data from database failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/publicHolidaysDataActionCreators.ts-loadPublicHolidaysData",
      });
    }

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
  removedEntries?: string[];
}

export const updatePublicHolidaysData =
  ({ newEntries, updatedEntries, removedEntries }: UpdatePayload) =>
  async (dispatch: Dispatch<PublicHolidaysDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("update_public_holidays", {
        newEntries: newEntries ?? null,
        updatedEntries: updatedEntries ?? null,
        removedEntries: removedEntries ?? null,
      });
    } catch (err) {
      invoke("log_error", {
        target: "public-holidays",
        message: `Updating PublicHolidays data in database failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/publicHolidaysDataActionCreators.ts-updatePublicHolidaysData",
      });
    }

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
