import { Dispatch } from "redux";

import { PublicHolidaysDialogActionType } from "../action-types";
import { PublicHolidaysDialogAction } from "../actions";

export const openPublicHolidaysDialogAction = (): PublicHolidaysDialogAction => ({
  type: PublicHolidaysDialogActionType.OPEN,
});

export const openPublicHolidaysDialog =
  () =>
  (dispatch: Dispatch<PublicHolidaysDialogAction>): void => {
    dispatch(openPublicHolidaysDialogAction());
  };

export const closePublicHolidaysDialogAction = (): PublicHolidaysDialogAction => ({
  type: PublicHolidaysDialogActionType.CLOSE,
});

export const closePublicHolidaysDialog =
  () =>
  (dispatch: Dispatch<PublicHolidaysDialogAction>): void => {
    dispatch(closePublicHolidaysDialogAction());
  };
