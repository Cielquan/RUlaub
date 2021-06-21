import { AppInfoType } from "../action-types";
import { AppInfoAction } from "../actions";
import * as pjson from "../../../package.json";

const initialState = {
  name: "RUlaub",
  version: pjson.version,
  infoText: `RUlaub is licensed under either 'Apache License 2.0' or 'MIT License' at
your option.

Source Code and Documentation are available at: https://github.com/Cielquan/RUlaub`,
};

interface AppInfo {
  name: string;
  version: string;
  infoText: string;
}

const reducer = (state: AppInfo = initialState, action: AppInfoAction): AppInfo => {
  const newState = state;

  switch (action.type) {
    case AppInfoType.NAME:
      newState.name = action.payload;
      return newState;
    case AppInfoType.VERSION:
      newState.version = action.payload;
      return newState;
    case AppInfoType.INFO_TEXT:
      newState.infoText = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
