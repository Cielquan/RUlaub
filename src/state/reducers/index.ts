import { combineReducers } from "redux";

import dbDataReducer from "./dbDataReducer";
import infoPageReducer from "./infoPageReducer";
import languageReducer from "./languageReducer";
import localConfigReducer from "./localConfigReducer";
import sideMenuReducer from "./sideMenuReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  dbData: dbDataReducer,
  infoPage: infoPageReducer,
  language: languageReducer,
  localConfig: localConfigReducer,
  sideMenu: sideMenuReducer,
  theme: themeReducer,
});

export default rootReducer;
export type State = ReturnType<typeof rootReducer>;
