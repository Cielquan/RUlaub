import { combineReducers } from "redux";
import sideMenuReducer from "./sideMenuReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  darkTheme: themeReducer,
  sideMenu: sideMenuReducer,
});

export default rootReducer;
export type State = ReturnType<typeof rootReducer>;
