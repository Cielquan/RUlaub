import { Dispatch } from "redux";

import { AddVacationDialogActionType } from "../action-types";
import { AddVacationDialogAction } from "../actions";

export const openAddVacationDialogAction = (): AddVacationDialogAction => ({
  type: AddVacationDialogActionType.OPEN,
});

export const openAddVacationDialog =
  () =>
  (dispatch: Dispatch<AddVacationDialogAction>): void => {
    dispatch(openAddVacationDialogAction());
  };

export const closeAddVacationDialogAction = (): AddVacationDialogAction => ({
  type: AddVacationDialogActionType.CLOSE,
});

export const closeAddVacationDialog =
  () =>
  (dispatch: Dispatch<AddVacationDialogAction>): void => {
    dispatch(closeAddVacationDialogAction());
  };
