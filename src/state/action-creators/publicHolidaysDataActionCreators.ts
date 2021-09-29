import Ajv from "ajv";
import { Dispatch } from "redux";

import { PublicHolidaysDataActionType } from "../action-types";
import {
  PublicHolidaysDataLoadAction,
  PublicHolidaysDataUpdateAction,
} from "../actions";
// eslint-disable-next-line max-len
import PublicHolidaysDataSchema from "../../schemas/publicHolidaysData.schema.json";
import {
  PublicHolidaysData,
  PublicHolidayDataPayload,
} from "../utils/publicHolidaysData";

import publicHolidaysDataJSON from "../../dev_temp/test.publicHolidaysData.json";

export const updatePublicHolidaysDataAction = (
  payload: PublicHolidayDataPayload
): PublicHolidaysDataUpdateAction => ({
  type: PublicHolidaysDataActionType.UPDATE,
  payload,
});

export const updatePublicHolidaysData =
  (payload: PublicHolidayDataPayload) =>
  (dispatch: Dispatch<PublicHolidaysDataUpdateAction>): void => {
    dispatch(updatePublicHolidaysDataAction(payload));
  };

export const loadPublicHolidaysDataAction = (
  payload: PublicHolidaysData
): PublicHolidaysDataLoadAction => ({
  type: PublicHolidaysDataActionType.LOAD,
  payload,
});

export const loadPublicHolidaysData =
  () =>
  (dispatch: Dispatch<PublicHolidaysDataLoadAction>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conf: any = publicHolidaysDataJSON;

    const ajv = new Ajv();
    const validate = ajv.compile<PublicHolidaysData>(PublicHolidaysDataSchema);
    if (validate(conf)) {
      dispatch(loadPublicHolidaysDataAction(conf));
    }
  };
