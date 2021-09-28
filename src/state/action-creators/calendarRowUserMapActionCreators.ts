import { Dispatch } from "redux";
import { VacationDataSchema } from "../../types/vacationData.schema";

import { CalendarRowUserMapActionType } from "../action-types";
import { CalendarRowUserMapAction } from "../actions";

export const updateCalendarRowUserMapAction = (
  payload: VacationDataSchema
): CalendarRowUserMapAction => ({
  type: CalendarRowUserMapActionType.UPDATE,
  payload,
});

export const updateCalendarRowUserMap =
  (payload: VacationDataSchema) =>
  (dispatch: Dispatch<CalendarRowUserMapAction>): void => {
    dispatch(updateCalendarRowUserMapAction(payload));
  };
