import { UsersDataActionType } from "../action-types";
import { UsersDataAction } from "../actions";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { usersDataInitState as initState } from "./initialStates";
import { updateUsersData } from "../utils/usersData";

const reducer = (state: UsersData = initState, action: UsersDataAction): UsersData => {
  switch (action.type) {
    case UsersDataActionType.ADD ||
      UsersDataActionType.LOAD ||
      UsersDataActionType.REMOVE:
      return action.payload;
    case UsersDataActionType.UPDATE:
      return updateUsersData(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
