import { Dispatch } from "redux";

import { SchoolHolidaysDialogActionType } from "../action-types";
import { SchoolHolidaysDialogAction } from "../actions";

export const openSchoolHolidaysDialogAction = (): SchoolHolidaysDialogAction => ({
  type: SchoolHolidaysDialogActionType.OPEN,
});

export const openSchoolHolidaysDialog =
  () =>
  (dispatch: Dispatch<SchoolHolidaysDialogAction>): void => {
    dispatch(openSchoolHolidaysDialogAction());
  };

export const closeSchoolHolidaysDialogAction = (): SchoolHolidaysDialogAction => ({
  type: SchoolHolidaysDialogActionType.CLOSE,
});

export const closeSchoolHolidaysDialog =
  () =>
  (dispatch: Dispatch<SchoolHolidaysDialogAction>): void => {
    dispatch(closeSchoolHolidaysDialogAction());
  };
