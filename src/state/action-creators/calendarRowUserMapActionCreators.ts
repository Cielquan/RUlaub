import { Dispatch } from "redux";
import { UsersDataSchema } from "../../types/usersData.schema";

import { CalendarRowUserMapActionType } from "../action-types";
import { CalendarRowUserMapAction } from "../actions";

export const updateCalendarRowUserMapAction = (
  payload: UsersDataSchema
): CalendarRowUserMapAction => ({
  type: CalendarRowUserMapActionType.UPDATE,
  payload,
});

export const updateCalendarRowUserMap =
  (payload: UsersDataSchema) =>
  (dispatch: Dispatch<CalendarRowUserMapAction>): void => {
    dispatch(updateCalendarRowUserMapAction(payload));
  };
