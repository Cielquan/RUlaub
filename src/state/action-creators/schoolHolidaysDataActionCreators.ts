import { Dispatch } from "redux";

import { SchoolHolidaysDataActionType } from "../action-types";
import { SchoolHolidaysDataAction } from "../actions";
import { logError } from "../../backendAPI";
import { add, load, remove, update } from "../../backendAPI/schoolHolidaysData";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { NewSchoolHolidayData, SchoolHolidayDataPayload } from "../utils/types";

export const addSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataActionType.ADD,
  payload,
});

export const addSchoolHolidaysData =
  (payload: NewSchoolHolidayData[]) =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    try {
      const data = await add(payload);

      dispatch(addSchoolHolidaysDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const loadSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataActionType.LOAD,
  payload,
});

export const loadSchoolHolidaysData =
  () =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    try {
      const data = await load();

      dispatch(loadSchoolHolidaysDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const removeSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataActionType.REMOVE,
  payload,
});

export const removeSchoolHolidaysData =
  (payload: string[]) =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    try {
      const data = await remove(payload);

      dispatch(removeSchoolHolidaysDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const updateSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataActionType.UPDATE,
  payload,
});

export const updateSchoolHolidaysData =
  (payload: SchoolHolidayDataPayload[]) =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    try {
      const data = await update(payload);

      dispatch(updateSchoolHolidaysDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };
