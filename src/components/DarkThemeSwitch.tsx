import { t } from "@lingui/macro";
import { IconButton, Tooltip } from "@material-ui/core";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";

const DarkThemeSwitch = (): ReactElement => {
  const dispatch = useDispatch();
  const { useDarkTheme, useLightTheme } = bindActionCreators(actionCreators, dispatch);
  const themeState = useSelector((state: State) => state.theme);

  return (
    <Tooltip
      arrow
      title={themeState === "dark" ? t`Activate Light Theme` : t`Activate Dark Theme`}
    >
      <IconButton onClick={themeState === "dark" ? useLightTheme : useDarkTheme}>
        {themeState === "dark" ? <BrightnessHighIcon /> : <BrightnessLowIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkThemeSwitch;
