import { Dispatch } from "redux";
import { AppInfoType } from "../action-types";
import { AppInfoAction } from "../actions";

export const changeAppInfoName =
  (newName: string) =>
  (dispatch: Dispatch<AppInfoAction>): void => {
    dispatch({
      type: AppInfoType.NAME,
      payload: newName,
    });
  };

export const changeAppInfoVersion =
  (newVersion: string) =>
  (dispatch: Dispatch<AppInfoAction>): void => {
    dispatch({
      type: AppInfoType.VERSION,
      payload: newVersion,
    });
  };

export const changeAppInfoInfoText =
  (newInfoText: string) =>
  (dispatch: Dispatch<AppInfoAction>): void => {
    dispatch({
      type: AppInfoType.INFO_TEXT,
      payload: newInfoText,
    });
  };
