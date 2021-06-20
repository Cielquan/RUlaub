import { combineReducers } from "redux";
import infoPageReducer from "./infoPageReducer";
import sideMenuReducer from "./sideMenuReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  darkTheme: themeReducer,
  infoPage: infoPageReducer,
  sideMenu: sideMenuReducer,
});

export default rootReducer;
export type State = ReturnType<typeof rootReducer>;
