import { t } from "@lingui/macro";
import {
  BrightnessHigh as BrightnessHighIcon,
  BrightnessLow as BrightnessLowIcon,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";

const DarkThemeSwitch = (): ReactElement => {
  const dispatch = useDispatch();
  const { setTheme } = bindActionCreators(actionCreators, dispatch);

  const configState = useSelector((state: State) => state.config);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const themeState = configState!.settings.theme;

  return (
    <Tooltip
      arrow
      title={themeState === "dark" ? t`Activate Light Theme` : t`Activate Dark Theme`}
    >
      <IconButton
        data-testid="theme-switch"
        onClick={
          themeState === "dark" ? () => setTheme("light") : () => setTheme("dark")
        }
        size="large"
      >
        {themeState === "dark" ? <BrightnessHighIcon /> : <BrightnessLowIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkThemeSwitch;
