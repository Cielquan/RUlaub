import { combineReducers } from "redux";

import configReducer from "./configReducer";
import dbDataReducer from "./dbDataReducer";
import infoPageReducer from "./infoPageReducer";
import {
  dbDataInitState,
  infoPageInitState,
  configInitState,
  sideMenuInitState,
} from "./initialStates";
import sideMenuReducer from "./sideMenuReducer";

const rootReducer = combineReducers({
  config: configReducer,
  dbData: dbDataReducer,
  infoPage: infoPageReducer,
  sideMenu: sideMenuReducer,
});

export type State = ReturnType<typeof rootReducer>;

export const initialState: State = {
  config: configInitState,
  dbData: dbDataInitState,
  infoPage: infoPageInitState,
  sideMenu: sideMenuInitState,
};

export default rootReducer;
