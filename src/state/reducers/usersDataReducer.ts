import { UsersDataActionType } from "../action-types";
import { UsersDataAction } from "../actions";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { usersDataInitState as initState } from "./initialStates";

const reducer = (state: UsersData = initState, action: UsersDataAction): UsersData => {
  switch (action.type) {
    case UsersDataActionType.ADD:
    case UsersDataActionType.ADD_VAC:
    case UsersDataActionType.LOAD:
    case UsersDataActionType.REMOVE:
    case UsersDataActionType.REMOVE_VAC:
    case UsersDataActionType.UPDATE:
    case UsersDataActionType.UPDATE_VAC:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
