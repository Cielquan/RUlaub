import { combineReducers } from "redux";

import dbDataReducer, { initialState as dbDataInitState } from "./dbDataReducer";
import infoPageReducer, { initialState as infoPageInitState } from "./infoPageReducer";
import languageReducer, { initialState as languageInitState } from "./languageReducer";
import localConfigReducer, {
  initialState as localConfigInitState,
} from "./localConfigReducer";
import sideMenuReducer, { initialState as sideMenuInitState } from "./sideMenuReducer";
import themeReducer, { initialState as themeInitState } from "./themeReducer";

const rootReducer = combineReducers({
  dbData: dbDataReducer,
  infoPage: infoPageReducer,
  language: languageReducer,
  localConfig: localConfigReducer,
  sideMenu: sideMenuReducer,
  theme: themeReducer,
});

export type State = ReturnType<typeof rootReducer>;

export const initialState: State = {
  dbData: dbDataInitState,
  infoPage: infoPageInitState,
  language: languageInitState,
  localConfig: localConfigInitState,
  sideMenu: sideMenuInitState,
  theme: themeInitState,
};

export default rootReducer;
