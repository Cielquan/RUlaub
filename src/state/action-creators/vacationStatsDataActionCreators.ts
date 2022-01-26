import { invoke } from "@tauri-apps/api/tauri";
import { Dispatch } from "redux";

import { VacationStatsDataActionType } from "../action-types";
import { VacationStatsDataAction } from "../actions";
import { VacationStatsDataSchema as VacationStatsData } from "../../backendAPI/types/vacationStatsData.schema";
import { validateVacationStatsData } from "../../backendAPI/validation";

export const loadVacationStatsDataAction = (
  payload: VacationStatsData
): VacationStatsDataAction => ({
  type: VacationStatsDataActionType.LOAD,
  payload,
});

export const loadVacationStatsData =
  () =>
  async (dispatch: Dispatch<VacationStatsDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("load_vacation_stats");
    } catch (err) {
      invoke("log_error", {
        target: "vacation-stats",
        message: `Loading of VacationStats data from database failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/vacationStatsDataActionCreators.ts-loadVacationStatsData",
      });
    }

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
