import { Dispatch } from "redux";

import { SchoolHolidaysDataActionType } from "../action-types";
import {
  SchoolHolidaysDataAddAction,
  SchoolHolidaysDataLoadAction,
  SchoolHolidaysDataRemoveAction,
  SchoolHolidaysDataUpdateAction,
} from "../actions";
import { load } from "../../backendAPI/schoolHolidaysData";
import {
  SchoolHolidayData,
  SchoolHolidaysDataSchema as SchoolHolidaysData,
} from "../../backendAPI/types/schoolHolidaysData.schema";
import { SchoolHolidayDataPayload } from "../utils/schoolHolidaysData";

export const addSchoolHolidaysDataAction = (
  payload: SchoolHolidayData[]
): SchoolHolidaysDataAddAction => ({
  type: SchoolHolidaysDataActionType.ADD,
  payload,
});

export const addSchoolHolidaysData =
  (payload: SchoolHolidayData[]) =>
  (dispatch: Dispatch<SchoolHolidaysDataAddAction>): void => {
    dispatch(addSchoolHolidaysDataAction(payload));
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
      console.error(error);
    }
  };

export const removeSchoolHolidaysDataAction = (
  payload: string[]
): SchoolHolidaysDataRemoveAction => ({
  type: SchoolHolidaysDataActionType.REMOVE,
  payload,
});

export const removeSchoolHolidaysData =
  (payload: string[]) =>
  (dispatch: Dispatch<SchoolHolidaysDataRemoveAction>): void => {
    dispatch(removeSchoolHolidaysDataAction(payload));
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
