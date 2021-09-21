import Ajv from "ajv";
import { Dispatch } from "redux";

import { PublicHolidaysDataActionType } from "../action-types";
import { PublicHolidaysDataAction } from "../actions";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as SHolidayDataType } from "../../types/publicHolidaysData.schema";
import PublicHolidaysDataSchema from "../../schemas/publicHolidaysData.schema.json";
import { PublicHolidaysDataPayload } from "../utils/publicHolidaysData";

import publicHolidaysDataJSON from "../../dev_temp/test.publicHolidaysData.json";

export const updatePublicHolidaysDataAction = (
  payload: PublicHolidaysDataPayload
): PublicHolidaysDataAction => ({
  type: PublicHolidaysDataActionType.UPDATE,
  payload,
});

export const updatePublicHolidaysData =
  (payload: PublicHolidaysDataPayload) =>
  (dispatch: Dispatch<PublicHolidaysDataAction>): void => {
    dispatch(updatePublicHolidaysDataAction(payload));
  };

export const loadPublicHolidaysData =
  () =>
  (dispatch: Dispatch<PublicHolidaysDataAction>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conf: any = publicHolidaysDataJSON;

    const ajv = new Ajv();
    const validate = ajv.compile<SHolidayDataType>(PublicHolidaysDataSchema);
    if (validate(conf)) {
      dispatch(updatePublicHolidaysDataAction(conf));
    }
  };
