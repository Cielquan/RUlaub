import { Dispatch } from "redux";

import { PublicHolidaysDataActionType } from "../action-types";
import {
  PublicHolidaysDataAddAction,
  PublicHolidaysDataLoadAction,
  PublicHolidaysDataRemoveAction,
  PublicHolidaysDataUpdateAction,
} from "../actions";
import { load } from "../../backendAPI/publicHolidaysData";
import {
  PublicHolidayData,
  PublicHolidaysDataSchema as PublicHolidaysData,
} from "../../backendAPI/types/publicHolidaysData.schema";
import { PublicHolidayDataPayload } from "../utils/publicHolidaysData";

export const addPublicHolidaysDataAction = (
  payload: PublicHolidayData[]
): PublicHolidaysDataAddAction => ({
  type: PublicHolidaysDataActionType.ADD,
  payload,
});

export const addPublicHolidaysData =
  (payload: PublicHolidayData[]) =>
  (dispatch: Dispatch<PublicHolidaysDataAddAction>): void => {
    dispatch(addPublicHolidaysDataAction(payload));
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
      console.error(error);
    }
  };

export const removePublicHolidaysDataAction = (
  payload: string[]
): PublicHolidaysDataRemoveAction => ({
  type: PublicHolidaysDataActionType.REMOVE,
  payload,
});

export const removePublicHolidaysData =
  (payload: string[]) =>
  (dispatch: Dispatch<PublicHolidaysDataRemoveAction>): void => {
    dispatch(removePublicHolidaysDataAction(payload));
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
