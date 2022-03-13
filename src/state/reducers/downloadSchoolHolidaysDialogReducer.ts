import { DownloadSchoolHolidaysDialogActionType } from "../action-types";
import { DownloadSchoolHolidaysDialogAction } from "../actions";
import {
  DownloadSchoolHolidaysDialogState,
  downloadSchoolHolidaysDialogInitState as initState,
} from "./initialStates";

function reducer(
  state: DownloadSchoolHolidaysDialogState = initState,
  action: DownloadSchoolHolidaysDialogAction
): DownloadSchoolHolidaysDialogState {
  switch (action.type) {
    case DownloadSchoolHolidaysDialogActionType.OPEN:
      return { open: true, year: action.payload };
    case DownloadSchoolHolidaysDialogActionType.CLOSE:
      return { open: false };
    default:
      return state;
  }
}

export default reducer;
