import Ajv from "ajv";
import { Dispatch } from "redux";

import { SchoolHolidaysDataActionType } from "../action-types";
import {
  SchoolHolidaysDataLoadAction,
  SchoolHolidaysDataUpdateAction,
} from "../actions";
// eslint-disable-next-line max-len
import SchoolHolidaysDataSchema from "../../schemas/schoolHolidaysData.schema.json";
import {
  SchoolHolidaysData,
  SchoolHolidayDataPayload,
} from "../utils/schoolHolidaysData";

import schoolHolidaysDataJSON from "../../dev_temp/test.schoolHolidaysData.json";

export const updateSchoolHolidaysDataAction = (
  payload: SchoolHolidayDataPayload
): SchoolHolidaysDataUpdateAction => ({
  type: SchoolHolidaysDataActionType.UPDATE,
  payload,
});

export const updateSchoolHolidaysData =
  (payload: SchoolHolidayDataPayload) =>
  (dispatch: Dispatch<SchoolHolidaysDataUpdateAction>): void => {
    dispatch(updateSchoolHolidaysDataAction(payload));
  };

export const loadSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataLoadAction => ({
  type: SchoolHolidaysDataActionType.LOAD,
  payload,
});

export const loadSchoolHolidaysData =
  () =>
  (dispatch: Dispatch<SchoolHolidaysDataLoadAction>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conf: any = schoolHolidaysDataJSON;

    const ajv = new Ajv();
    const validate = ajv.compile<SchoolHolidaysData>(SchoolHolidaysDataSchema);
    if (validate(conf)) {
      dispatch(loadSchoolHolidaysDataAction(conf));
    }
  };
