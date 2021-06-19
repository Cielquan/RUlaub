import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import { BrightnessLow, BrightnessHigh } from "@material-ui/icons";

import { actionCreators, State } from "../state";

const DarkThemeSwitch = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { useDarkTheme, useLightTheme } = bindActionCreators(actionCreators, dispatch);
  const darkState = useSelector((state: State) => state.darkTheme);

  return (
    <>
      <IconButton onClick={darkState ? useLightTheme : useDarkTheme}>
        {darkState ? <BrightnessLow /> : <BrightnessHigh />}
      </IconButton>
    </>
  );
};

export default DarkThemeSwitch;
