import { Dispatch } from "redux";

import { UsersDialogActionType } from "../action-types";
import { UsersDialogAction } from "../actions";

export const openUsersDialogAction = (): UsersDialogAction => ({
  type: UsersDialogActionType.OPEN,
});

export const openUsersDialog =
  () =>
  (dispatch: Dispatch<UsersDialogAction>): void => {
    dispatch(openUsersDialogAction());
  };

export const closeUsersDialogAction = (): UsersDialogAction => ({
  type: UsersDialogActionType.CLOSE,
});

export const closeUsersDialog =
  () =>
  (dispatch: Dispatch<UsersDialogAction>): void => {
    dispatch(closeUsersDialogAction());
  };
