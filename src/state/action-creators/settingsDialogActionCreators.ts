import { Dispatch } from "redux";

import { SettingsDialogActionType } from "../action-types";
import { SettingsDialogAction } from "../actions";

export const openSettingsDialogAction = (): SettingsDialogAction => ({
  type: SettingsDialogActionType.OPEN,
});

export const openSettingsDialog =
  () =>
  (dispatch: Dispatch<SettingsDialogAction>): void => {
    dispatch(openSettingsDialogAction());
  };

export const closeSettingsDialogAction = (): SettingsDialogAction => ({
  type: SettingsDialogActionType.CLOSE,
});

export const closeSettingsDialog =
  () =>
  (dispatch: Dispatch<SettingsDialogAction>): void => {
    dispatch(closeSettingsDialogAction());
  };
