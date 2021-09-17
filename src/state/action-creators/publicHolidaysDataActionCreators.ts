import { Dispatch } from "redux";

import { PublicHolidaysDataType } from "../action-types";
import { PublicHolidaysDataAction } from "../actions";
import { PublicHolidaysDataPayload } from "../utils/publicHolidaysData";

export const updatePublicHolidaysDataAction = (
  payload: PublicHolidaysDataPayload
): PublicHolidaysDataAction => ({
  type: PublicHolidaysDataType.UPDATE,
  payload,
});

export const updatePublicHolidaysData =
  (payload: PublicHolidaysDataPayload) =>
  (dispatch: Dispatch<PublicHolidaysDataAction>): void => {
    dispatch(updatePublicHolidaysDataAction(payload));
  };
