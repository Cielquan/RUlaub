import { CalendarRowUserMapActionType } from "../action-types";
import { CalendarRowUserMapAction } from "../actions";
import { CalendarRowUserMap, calendarRowUserMapInitState as initState } from "./initialStates";

const reducer = (
  state: CalendarRowUserMap = initState,
  action: CalendarRowUserMapAction
): CalendarRowUserMap => {
  switch (action.type) {
    case CalendarRowUserMapActionType.UPDATE: {
      const newState: CalendarRowUserMap = {};
      Object.keys(action.payload).forEach((userId, idx) => {
        newState[idx.toString()] = Number(userId);
      });
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
