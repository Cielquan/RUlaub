import { Dispatch } from "redux";

import { VacationDialogActionType } from "../action-types";
import { VacationDialogAction } from "../actions";

export const openVacationDialogAction = (): VacationDialogAction => ({
  type: VacationDialogActionType.OPEN,
});

export const openVacationDialog =
  () =>
  (dispatch: Dispatch<VacationDialogAction>): void => {
    dispatch(openVacationDialogAction());
  };

export const closeVacationDialogAction = (): VacationDialogAction => ({
  type: VacationDialogActionType.CLOSE,
});

export const closeVacationDialog =
  () =>
  (dispatch: Dispatch<VacationDialogAction>): void => {
    dispatch(closeVacationDialogAction());
  };
