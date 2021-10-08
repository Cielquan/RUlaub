import { Dispatch } from "redux";

import { PublicHolidaysDataActionType } from "../action-types";
import {
  PublicHolidaysDataLoadAction,
  PublicHolidaysDataUpdateAction,
} from "../actions";
import { load } from "../../backendAPI/publicHolidaysData";
import {
  PublicHolidaysData,
  PublicHolidayDataPayload,
} from "../utils/publicHolidaysData";

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

export const updatePublicHolidaysDataAction = (
  payload: PublicHolidayDataPayload
): PublicHolidaysDataUpdateAction => ({
  type: PublicHolidaysDataActionType.UPDATE,
  payload,
});

export const updatePublicHolidaysData =
  (payload: PublicHolidayDataPayload) =>
  (dispatch: Dispatch<PublicHolidaysDataUpdateAction>): void => {
    dispatch(updatePublicHolidaysDataAction(payload));
  };
