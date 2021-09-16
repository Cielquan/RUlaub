import { Dispatch } from "redux";

import { VacationDataType } from "../action-types";
import { VacationDataAction } from "../actions";
import { VacationDataPayload } from "../utils/vacationData";

export const updateVacationDataAction = (
  payload: VacationDataPayload
): VacationDataAction => ({
  type: VacationDataType.UPDATE,
  payload,
});

export const updateVacationData =
  (payload: VacationDataPayload) =>
  (dispatch: Dispatch<VacationDataAction>): void => {
    dispatch(updateVacationDataAction(payload));
  };
