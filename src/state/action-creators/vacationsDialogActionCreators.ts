import { Dispatch } from "redux";

import { VacationsDialogActionType } from "../action-types";
import { VacationsDialogAction } from "../actions";

export const openVacationsDialogAction = (): VacationsDialogAction => ({
  type: VacationsDialogActionType.OPEN,
});

export const openVacationsDialog =
  () =>
  (dispatch: Dispatch<VacationsDialogAction>): void => {
    dispatch(openVacationsDialogAction());
  };

export const closeVacationsDialogAction = (): VacationsDialogAction => ({
  type: VacationsDialogActionType.CLOSE,
});

export const closeVacationsDialog =
  () =>
  (dispatch: Dispatch<VacationsDialogAction>): void => {
    dispatch(closeVacationsDialogAction());
  };
