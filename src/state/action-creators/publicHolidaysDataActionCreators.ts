import { Dispatch } from "redux";

import { PublicHolidaysDataActionType } from "../action-types";
import {
  PublicHolidaysDataAddAction,
  PublicHolidaysDataLoadAction,
  PublicHolidaysDataRemoveAction,
  PublicHolidaysDataUpdateAction,
} from "../actions";
import { logError } from "../../backendAPI";
import { add, load, remove } from "../../backendAPI/publicHolidaysData";
import {
  PublicHolidayData,
  PublicHolidaysDataSchema as PublicHolidaysData,
} from "../../backendAPI/types/publicHolidaysData.schema";
import { PublicHolidayDataPayload } from "../utils/publicHolidaysData";

export const addPublicHolidaysDataAction = (
  payload: PublicHolidaysData
): PublicHolidaysDataAddAction => ({
  type: PublicHolidaysDataActionType.ADD,
  payload,
});

export const addPublicHolidaysData =
  (payload: PublicHolidayData[]) =>
  async (dispatch: Dispatch<PublicHolidaysDataAddAction>): Promise<void> => {
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
): PublicHolidaysDataLoadAction => ({
  type: PublicHolidaysDataActionType.LOAD,
  payload,
});

export const loadPublicHolidaysData =
  () =>
  async (dispatch: Dispatch<PublicHolidaysDataLoadAction>): Promise<void> => {
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
): PublicHolidaysDataRemoveAction => ({
  type: PublicHolidaysDataActionType.REMOVE,
  payload,
});

export const removePublicHolidaysData =
  (payload: string[]) =>
  async (dispatch: Dispatch<PublicHolidaysDataRemoveAction>): Promise<void> => {
    try {
      const data = await remove(payload);

      dispatch(removePublicHolidaysDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const updatePublicHolidaysDataAction = (
  payload: PublicHolidayDataPayload[]
): PublicHolidaysDataUpdateAction => ({
  type: PublicHolidaysDataActionType.UPDATE,
  payload,
});

export const updatePublicHolidaysData =
  (payload: PublicHolidayDataPayload[]) =>
  (dispatch: Dispatch<PublicHolidaysDataUpdateAction>): void => {
    dispatch(updatePublicHolidaysDataAction(payload));
  };
