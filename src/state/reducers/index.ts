import { combineReducers } from "redux";

import configReducer from "./configReducer";
import infoPageReducer from "./infoPageReducer";
import {
  infoPageInitState,
  configInitState,
  schoolHolidaysDataInitState,
  sideMenuInitState,
  vacationDataInitState,
} from "./initialStates";
import schoolHolidaysDataReducer from "./schoolHolidaysDataReducer";
import sideMenuReducer from "./sideMenuReducer";
import vacationDataReducer from "./vacationDataReducer";

const rootReducer = combineReducers({
  config: configReducer,
  infoPage: infoPageReducer,
  schoolHolidaysData: schoolHolidaysDataReducer,
  sideMenu: sideMenuReducer,
  vacationData: vacationDataReducer,
});

export type State = ReturnType<typeof rootReducer>;

export const initialState: State = {
  config: configInitState,
  infoPage: infoPageInitState,
  schoolHolidaysData: schoolHolidaysDataInitState,
  sideMenu: sideMenuInitState,
  vacationData: vacationDataInitState,
};

export default rootReducer;
