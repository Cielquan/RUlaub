import { UsersDataActionType } from "../action-types";
import { UsersDataAction } from "../actions";
import { usersDataInitState as initState } from "./initialStates";
import { removeUsersData, UsersData, updateUsersData } from "../utils/usersData";

const reducer = (state: UsersData = initState, action: UsersDataAction): UsersData => {
  switch (action.type) {
    case UsersDataActionType.LOAD:
      return action.payload;
    case UsersDataActionType.REMOVE:
      return removeUsersData(state, action.payload);
    case UsersDataActionType.UPDATE:
      return updateUsersData(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
