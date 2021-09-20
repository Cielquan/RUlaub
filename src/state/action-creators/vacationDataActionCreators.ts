import Ajv from "ajv";
import { Dispatch } from "redux";

import { VacationDataActionType } from "../action-types";
import { VacationDataAction } from "../actions";
import { VacationDataSchema as VacDataType } from "../../types/vacationData.schema";
import VacationDataSchema from "../../schemas/vacationData.schema.json";
import { VacationDataPayload } from "../utils/vacationData";

import dbDataJSON from "../../dev_temp/test.db.json";

export const updateVacationDataAction = (
  payload: VacationDataPayload
): VacationDataAction => ({
  type: VacationDataActionType.UPDATE,
  payload,
});

export const updateVacationData =
  (payload: VacationDataPayload) =>
  (dispatch: Dispatch<VacationDataAction>): void => {
    dispatch(updateVacationDataAction(payload));
  };

export const loadVacationData =
  () =>
  (dispatch: Dispatch<VacationDataAction>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conf: any = dbDataJSON;

    const ajv = new Ajv();
    const validate = ajv.compile<VacDataType>(VacationDataSchema);
    if (validate(conf)) {
      dispatch(updateVacationDataAction(conf));
    }
  };
