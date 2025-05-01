import { plural } from "@lingui/macro";
import { invoke } from "@tauri-apps/api/tauri";
import { ProviderContext } from "notistack";
import { Dispatch } from "redux";

import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import { VacationStatsDataSchema as VacationStatsData } from "../../backendAPI/types/vacationStatsData.schema";
import { validateVacationStatsData } from "../../backendAPI/validation";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";
import { VacationStatsDataActionType } from "../action-types";
import { VacationStatsDataAction } from "../actions";

export const loadVacationStatsDataAction = (
  payload: VacationStatsData
): VacationStatsDataAction => ({
  type: VacationStatsDataActionType.LOAD,
  payload,
});

export const loadVacationStatsData =
  (snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<VacationStatsDataAction>): Promise<void> => {
    let cmdReturn: {
      data: unknown;
      additionalInfo: {
        pubHolidayErrorCount: number;
        vacationErrorCount: number;
      };
    };
    try {
      cmdReturn = await invoke("load_vacation_stats");
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let showWarning = false;
    let warningMsg = "";
    const { pubHolidayErrorCount, vacationErrorCount } = cmdReturn.additionalInfo;

    if (pubHolidayErrorCount > 0) {
      warningMsg += plural(pubHolidayErrorCount, {
        one: "Got one error while loading public holiday data for vacation stats.",
        other: "Got # errors while loading public holiday data for vacation stats.",
      });
      showWarning = true;
    }

    if (vacationErrorCount > 0) {
      if (showWarning) warningMsg += "\n";
      warningMsg += plural(vacationErrorCount, {
        one: "Got one error while loading vacation data for vacation stats.",
        other: "Got # errors while loading vacation data for vacation stats.",
      });
      showWarning = true;
    }

    if (showWarning) snackbarHandles.enqueueSnackbar(warningMsg, { variant: "warning" });

    let validatedData: VacationStatsData;
    try {
      validatedData = await validateVacationStatsData(cmdReturn.data);
    } catch (err) {
      invoke("log_error", {
        target: "vacation-stats",
        message: "VacationStats data validation failed",
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/vacationStatsDataActionCreators.ts-loadVacationStatsData",
        errObjectString: JSON.stringify(err),
      });
      return;
    }

    dispatch(loadVacationStatsDataAction(validatedData));
  };
