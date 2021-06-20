import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";

import { actionCreators, State } from "../state";

const DarkThemeSwitch = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { useDarkTheme, useLightTheme } = bindActionCreators(actionCreators, dispatch);
  const darkState = useSelector((state: State) => state.darkTheme);

  return (
    <Tooltip arrow title={darkState ? "Activate Light Theme" : "Activate Dark Theme"}>
      <IconButton onClick={darkState ? useLightTheme : useDarkTheme}>
        {darkState ? <BrightnessHighIcon /> : <BrightnessLowIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkThemeSwitch;
