import { Dispatch } from "redux";

import { DownloadSchoolHolidaysDialogActionType } from "../action-types";
import {
  DownloadSchoolHolidaysDialogCloseAction,
  DownloadSchoolHolidaysDialogOpenAction,
} from "../actions";

export const openDownloadSchoolHolidaysDialogAction = (
  payload: number
): DownloadSchoolHolidaysDialogOpenAction => ({
  type: DownloadSchoolHolidaysDialogActionType.OPEN,
  payload,
});

export const openDownloadSchoolHolidaysDialog =
  (payload: number) =>
  (dispatch: Dispatch<DownloadSchoolHolidaysDialogOpenAction>): void => {
    dispatch(openDownloadSchoolHolidaysDialogAction(payload));
  };

export const closeDownloadSchoolHolidaysDialogAction =
  (): DownloadSchoolHolidaysDialogCloseAction => ({
    type: DownloadSchoolHolidaysDialogActionType.CLOSE,
  });

export const closeDownloadSchoolHolidaysDialog =
  () =>
  (dispatch: Dispatch<DownloadSchoolHolidaysDialogCloseAction>): void => {
    dispatch(closeDownloadSchoolHolidaysDialogAction());
  };
