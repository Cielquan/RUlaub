import { t } from "@lingui/macro";
import { invoke } from "@tauri-apps/api/tauri";
import { ProviderContext } from "notistack";
import { Dispatch } from "redux";

import { VacationStatsDataActionType } from "../action-types";
import { VacationStatsDataAction } from "../actions";
import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import { VacationStatsDataSchema as VacationStatsData } from "../../backendAPI/types/vacationStatsData.schema";
import { validateVacationStatsData } from "../../backendAPI/validation";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";

export const loadVacationStatsDataAction = (
  payload: VacationStatsData
): VacationStatsDataAction => ({
  type: VacationStatsDataActionType.LOAD,
  payload,
});

export const loadVacationStatsData =
  (snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<VacationStatsDataAction>): Promise<void> => {
    let data: unknown;
    let pubHoliErrorCount: number;
    let vacErrorCount: number;
    try {
      [data, pubHoliErrorCount, vacErrorCount] = await invoke("load_vacation_stats");
    } catch (err) {
      enqueuePersistendErrSnackbar(
        getErrorCatalogueMsg(err as string),
        snackbarHandles
      );
      return;
    }

    if (pubHoliErrorCount > 0)
      snackbarHandles.enqueueSnackbar(
        t`Got ${pubHoliErrorCount} errors while loading
        public holiday data for vacation stats.`,
        { variant: "warning" }
      );

    if (vacErrorCount > 0)
      snackbarHandles.enqueueSnackbar(
        t`Got ${vacErrorCount} errors while loading vacation data for vacation stats.`,
        { variant: "warning" }
      );

    let validatedData: VacationStatsData;
    try {
      validatedData = await validateVacationStatsData(data);
    } catch (err) {
      invoke("log_error", {
        target: "vacation-stats",
        message: `VacationStats data validation failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/vacationStatsDataActionCreators.ts-loadVacationStatsData",
      });
      return;
    }

    dispatch(loadVacationStatsDataAction(validatedData));
  };
