import Ajv from "ajv";
import { Dispatch } from "redux";

import { SchoolHolidaysDataActionType } from "../action-types";
import { SchoolHolidaysDataAction } from "../actions";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SHolidayDataType } from "../../types/schoolHolidaysData.schema";
import SchoolHolidaysDataSchema from "../../schemas/schoolHolidaysData.schema.json";
import { SchoolHolidaysDataPayload } from "../utils/schoolHolidaysData";

import schoolHolidaysDataJSON from "../../dev_temp/test.schoolHolidaysData.json";

export const updateSchoolHolidaysDataAction = (
  payload: SchoolHolidaysDataPayload
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataActionType.UPDATE,
  payload,
});

export const updateSchoolHolidaysData =
  (payload: SchoolHolidaysDataPayload) =>
  (dispatch: Dispatch<SchoolHolidaysDataAction>): void => {
    dispatch(updateSchoolHolidaysDataAction(payload));
  };

export const loadSchoolHolidaysData =
  () =>
  (dispatch: Dispatch<SchoolHolidaysDataAction>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conf: any = schoolHolidaysDataJSON;

    const ajv = new Ajv();
    const validate = ajv.compile<SHolidayDataType>(SchoolHolidaysDataSchema);
    if (validate(conf)) {
      dispatch(updateSchoolHolidaysDataAction(conf));
    }
  };
