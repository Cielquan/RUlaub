import { Dispatch } from "redux";

import { VacationTypesDialogActionType } from "../action-types";
import { VacationTypesDialogAction } from "../actions";

export const openVacationTypesDialogAction = (): VacationTypesDialogAction => ({
  type: VacationTypesDialogActionType.OPEN,
});

export const openVacationTypesDialog =
  () =>
  (dispatch: Dispatch<VacationTypesDialogAction>): void => {
    dispatch(openVacationTypesDialogAction());
  };

export const closeVacationTypesDialogAction = (): VacationTypesDialogAction => ({
  type: VacationTypesDialogActionType.CLOSE,
});

export const closeVacationTypesDialog =
  () =>
  (dispatch: Dispatch<VacationTypesDialogAction>): void => {
    dispatch(closeVacationTypesDialogAction());
  };
