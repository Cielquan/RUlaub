import { UsersDataActionType } from "../action-types";
import { UsersDataAction } from "../actions";
import { usersDataInitState as initState } from "./initialStates";
import { UsersData, updateUsersData } from "../utils/usersData";

const reducer = (state: UsersData = initState, action: UsersDataAction): UsersData => {
  switch (action.type) {
    case UsersDataActionType.UPDATE:
      return updateUsersData(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
