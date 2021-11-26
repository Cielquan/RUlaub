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
type LeftButton = [ButtonIcon, ButtonOnClick, ButtonTooltip?];
type RightButton = [ButtonIcon, ButtonOnClick, ButtonTooltip?];

interface Props {
  mainButton: MainButton;
  rightButton: RightButton;
  leftButton?: LeftButton;
  mainButtonOnClick?: () => void;
}
export type DoubleButtonItemList = Array<Props>;

const SideMenuDoubleButton = ({
  mainButton,
  rightButton,
  leftButton,
  mainButtonOnClick,
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
      <ListItemButton onClick={mainButtonOnClick}>
        <ListItemIcon>{mainButton[1]}</ListItemIcon>
        <ListItemText primary={mainButton[0]} />
        {leftButton ? (
          wrapInTooltip(
            <IconButton onClick={leftButton[1]}>{leftButton[0]}</IconButton>,
            leftButton[2]
          )
        ) : (
          <></>
        )}
        {wrapInTooltip(
          <IconButton onClick={rightButton[1]}>{rightButton[0]}</IconButton>,
          rightButton[2]
        )}
      </ListItemButton>
    </ListItem>
  );
};
SideMenuDoubleButton.defaultProps = {
  leftButton: undefined,
  mainButtonOnClick: () => undefined,
};

export default SideMenuDoubleButton;
