import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { ReactElement } from "react";

import { ButtonText, ButtonOnClick, ButtonIcon, ButtonSxStyle } from "./SideMenuButton";

type ButtonTooltip = string;
type MainButton = [ButtonText, ButtonIcon, ButtonSxStyle?];
type FirstButton = [ButtonIcon, ButtonOnClick, ButtonTooltip?];
type SecondButton = [ButtonIcon, ButtonOnClick, ButtonTooltip?];
export type DoubleButtonItemList = Array<[MainButton, SecondButton, FirstButton?]>;

interface Props {
  mainButton: MainButton;
  secondButton: SecondButton;
  firstButton?: FirstButton;
}

const SideMenuDoubleButton = ({
  mainButton,
  secondButton,
  firstButton,
}: Props): ReactElement => {
  const wrapInTooltip = (
    component: ReactElement,
    tooltip: string | undefined
  ): ReactElement => {
    if (!tooltip) return component;
    return (
      <Tooltip arrow title={tooltip}>
        {component}
      </Tooltip>
    );
  };
  const sxStyle = mainButton[2] ?? {};

  return (
    <ListItem sx={{ padding: 0, marginRight: 2, ...sxStyle }}>
      <ListItemButton onClick={secondButton[1]}>
        <ListItemIcon>{mainButton[1]}</ListItemIcon>
        <ListItemText primary={mainButton[0]} />
        {firstButton ? (
          wrapInTooltip(
            <IconButton onClick={firstButton[1]}>{firstButton[0]}</IconButton>,
            firstButton[2]
          )
        ) : (
          <></>
        )}
        {wrapInTooltip(
          <IconButton onClick={secondButton[1]}>{secondButton[0]}</IconButton>,
          secondButton[2]
        )}
      </ListItemButton>
    </ListItem>
  );
};
SideMenuDoubleButton.defaultProps = {
  firstButton: undefined,
};

export default SideMenuDoubleButton;
