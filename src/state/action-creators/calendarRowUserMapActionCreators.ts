import { Dispatch } from "redux";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";

import { CalendarRowUserMapActionType } from "../action-types";
import { CalendarRowUserMapAction } from "../actions";

export const updateCalendarRowUserMapAction = (
  payload: UsersData
): CalendarRowUserMapAction => ({
  type: CalendarRowUserMapActionType.UPDATE,
  payload,
});

export const updateCalendarRowUserMap =
  (payload: UsersData) =>
  (dispatch: Dispatch<CalendarRowUserMapAction>): void => {
    dispatch(updateCalendarRowUserMapAction(payload));
  };
