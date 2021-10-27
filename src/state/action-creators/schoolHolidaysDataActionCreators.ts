import { Dispatch } from "redux";

import { SchoolHolidaysDataActionType } from "../action-types";
import {
  SchoolHolidaysDataAddAction,
  SchoolHolidaysDataLoadAction,
  SchoolHolidaysDataRemoveAction,
  SchoolHolidaysDataUpdateAction,
} from "../actions";
import { logError } from "../../backendAPI";
import { add, load, remove } from "../../backendAPI/schoolHolidaysData";
import {
  SchoolHolidayData,
  SchoolHolidaysDataSchema as SchoolHolidaysData,
} from "../../backendAPI/types/schoolHolidaysData.schema";
import { SchoolHolidayDataPayload } from "../utils/schoolHolidaysData";

export const addSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataAddAction => ({
  type: SchoolHolidaysDataActionType.ADD,
  payload,
});

export const addSchoolHolidaysData =
  (payload: SchoolHolidayData[]) =>
  async (dispatch: Dispatch<SchoolHolidaysDataAddAction>): Promise<void> => {
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
): SchoolHolidaysDataLoadAction => ({
  type: SchoolHolidaysDataActionType.LOAD,
  payload,
});

export const loadSchoolHolidaysData =
  () =>
  async (dispatch: Dispatch<SchoolHolidaysDataLoadAction>): Promise<void> => {
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
): SchoolHolidaysDataRemoveAction => ({
  type: SchoolHolidaysDataActionType.REMOVE,
  payload,
});

export const removeSchoolHolidaysData =
  (payload: string[]) =>
  async (dispatch: Dispatch<SchoolHolidaysDataRemoveAction>): Promise<void> => {
    try {
      const data = await remove(payload);

      dispatch(removeSchoolHolidaysDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const updateSchoolHolidaysDataAction = (
  payload: SchoolHolidayDataPayload[]
): SchoolHolidaysDataUpdateAction => ({
  type: SchoolHolidaysDataActionType.UPDATE,
  payload,
});

export const updateSchoolHolidaysData =
  (payload: SchoolHolidayDataPayload[]) =>
  (dispatch: Dispatch<SchoolHolidaysDataUpdateAction>): void => {
    dispatch(updateSchoolHolidaysDataAction(payload));
  };
