import { Dispatch } from "redux";

import { CreateDBDialogActionType } from "../action-types";
import { CreateDBDialogAction } from "../actions";

export const openCreateDBDialogAction = (): CreateDBDialogAction => ({
  type: CreateDBDialogActionType.OPEN,
});

export const openCreateDBDialog =
  () =>
  (dispatch: Dispatch<CreateDBDialogAction>): void => {
    dispatch(openCreateDBDialogAction());
  };

export const closeCreateDBDialogAction = (): CreateDBDialogAction => ({
  type: CreateDBDialogActionType.CLOSE,
});

export const closeCreateDBDialog =
  () =>
  (dispatch: Dispatch<CreateDBDialogAction>): void => {
    dispatch(closeCreateDBDialogAction());
  };
