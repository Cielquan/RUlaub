import { invoke } from "@tauri-apps/api/tauri";
import { ProviderContext } from "notistack";
import { Dispatch } from "redux";

import { SchoolHolidaysLinkActionType } from "../action-types";
import { SchoolHolidaysLinkAction } from "../actions";
import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";

export const updateSchoolHolidaysLinkAction = (
  payload: string | null
): SchoolHolidaysLinkAction => ({
  type: SchoolHolidaysLinkActionType.UPDATE,
  payload,
});

export const loadSchoolHolidaysLink =
  (snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<SchoolHolidaysLinkAction>): Promise<void> => {
    let data;
    try {
      data = await invoke<string | null>("get_school_holidays_link");
    } catch (err) {
      invoke("log_error", {
        target: "school-holidays-link",
        message: `Loading of SchoolHolidaysLink from database failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/schoolHolidaysLinkActionCreators.ts-loadSchoolHolidaysLink",
      });
      enqueuePersistendErrSnackbar(
        getErrorCatalogueMsg(err as string),
        snackbarHandles
      );
      return;
    }

    dispatch(updateSchoolHolidaysLinkAction(data));
  };

export const updateSchoolHolidaysLink =
  (link: string | null, snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<SchoolHolidaysLinkAction>): Promise<void> => {
    let data;
    try {
      data = await invoke<string | null>("update_school_holidays_link", { link });
    } catch (err) {
      invoke("log_error", {
        target: "school-holidays-link",
        message: `Updating SchoolHolidaysLink in database failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/schoolHolidaysLinkActionCreators.ts-updateSchoolHolidaysLink",
      });
      enqueuePersistendErrSnackbar(
        getErrorCatalogueMsg(err as string),
        snackbarHandles
      );
      return;
    }

    dispatch(updateSchoolHolidaysLinkAction(data));
  };
