import { UsersDataActionType } from "../action-types";
import { UsersDataAction } from "../actions";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { usersDataInitState as initState } from "./initialStates";

const reducer = (state: UsersData = initState, action: UsersDataAction): UsersData => {
  switch (action.type) {
    case UsersDataActionType.ADD:
    case UsersDataActionType.LOAD:
    case UsersDataActionType.REMOVE:
    case UsersDataActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
