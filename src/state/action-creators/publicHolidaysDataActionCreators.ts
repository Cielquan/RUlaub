import { Dispatch } from "redux";

import { PublicHolidaysDataActionType } from "../action-types";
import { PublicHolidaysDataAction } from "../actions";
import { logError } from "../../backendAPI";
import { add, load, remove, update } from "../../backendAPI/publicHolidaysData";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
import {
  NewPublicHolidayData,
  PublicHolidayDataPayload,
} from "../utils/publicHolidaysData";

export const addPublicHolidaysDataAction = (
  payload: PublicHolidaysData
): PublicHolidaysDataAction => ({
  type: PublicHolidaysDataActionType.ADD,
  payload,
});

export const addPublicHolidaysData =
  (payload: NewPublicHolidayData[]) =>
  async (dispatch: Dispatch<PublicHolidaysDataAction>): Promise<void> => {
    try {
      const data = await add(payload);

      dispatch(addPublicHolidaysDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const loadPublicHolidaysDataAction = (
  payload: PublicHolidaysData
): PublicHolidaysDataAction => ({
  type: PublicHolidaysDataActionType.LOAD,
  payload,
});

export const loadPublicHolidaysData =
  () =>
  async (dispatch: Dispatch<PublicHolidaysDataAction>): Promise<void> => {
    try {
      const data = await load();

      dispatch(loadPublicHolidaysDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const removePublicHolidaysDataAction = (
  payload: PublicHolidaysData
): PublicHolidaysDataAction => ({
  type: PublicHolidaysDataActionType.REMOVE,
  payload,
});

export const removePublicHolidaysData =
  (payload: string[]) =>
  async (dispatch: Dispatch<PublicHolidaysDataAction>): Promise<void> => {
    try {
      const data = await remove(payload);

      dispatch(removePublicHolidaysDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const updatePublicHolidaysDataAction = (
  payload: PublicHolidaysData
): PublicHolidaysDataAction => ({
  type: PublicHolidaysDataActionType.UPDATE,
  payload,
});

export const updatePublicHolidaysData =
  (payload: PublicHolidayDataPayload[]) =>
  async (dispatch: Dispatch<PublicHolidaysDataAction>): Promise<void> => {
    try {
      const data = await update(payload);

      dispatch(updatePublicHolidaysDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };
