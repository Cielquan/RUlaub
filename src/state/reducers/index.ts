import { combineReducers } from "redux";

import configReducer from "./configReducer";
import infoPageReducer from "./infoPageReducer";
import {
  vacationDataInitState,
  infoPageInitState,
  configInitState,
  sideMenuInitState,
} from "./initialStates";
import sideMenuReducer from "./sideMenuReducer";
import vacationDataReducer from "./vacationDataReducer";

const rootReducer = combineReducers({
  config: configReducer,
  infoPage: infoPageReducer,
  sideMenu: sideMenuReducer,
  vacationData: vacationDataReducer,
});

export type State = ReturnType<typeof rootReducer>;

export const initialState: State = {
  config: configInitState,
  infoPage: infoPageInitState,
  sideMenu: sideMenuInitState,
  vacationData: vacationDataInitState,
};

export default rootReducer;
