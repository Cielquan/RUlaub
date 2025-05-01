import { invoke } from "@tauri-apps/api/tauri";
import { ProviderContext } from "notistack";
import { Dispatch } from "redux";

import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";
import { SchoolHolidaysLinkActionType } from "../action-types";
import { SchoolHolidaysLinkAction } from "../actions";

export const updateSchoolHolidaysLinkAction = (
  payload: string | null
): SchoolHolidaysLinkAction => ({
  type: SchoolHolidaysLinkActionType.UPDATE,
  payload,
});

export const loadSchoolHolidaysLink =
  (snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<SchoolHolidaysLinkAction>): Promise<void> => {
    let cmdReturn: { data: string | null };
    try {
      cmdReturn = await invoke("get_school_holidays_link");
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    dispatch(updateSchoolHolidaysLinkAction(cmdReturn.data));
  };

export const updateSchoolHolidaysLink =
  (link: string | null, snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<SchoolHolidaysLinkAction>): Promise<void> => {
    let cmdReturn: { data: string | null };
    try {
      cmdReturn = await invoke("update_school_holidays_link", { link });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    dispatch(updateSchoolHolidaysLinkAction(cmdReturn.data));
  };
