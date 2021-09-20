import { Dispatch } from "redux";

import { PublicHolidaysDataActionType } from "../action-types";
import { PublicHolidaysDataAction } from "../actions";
import { PublicHolidaysDataPayload } from "../utils/publicHolidaysData";

export const updatePublicHolidaysDataAction = (
  payload: PublicHolidaysDataPayload
): PublicHolidaysDataAction => ({
  type: PublicHolidaysDataActionType.UPDATE,
  payload,
});

export const updatePublicHolidaysData =
  (payload: PublicHolidaysDataPayload) =>
  (dispatch: Dispatch<PublicHolidaysDataAction>): void => {
    dispatch(updatePublicHolidaysDataAction(payload));
  };
