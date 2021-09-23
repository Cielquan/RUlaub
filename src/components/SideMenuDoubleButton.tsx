import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { ReactElement } from "react";

import {
  ButtonText,
  ButtonListKey,
  ButtonOnClick,
  ButtonIcon,
  ButtonSxStyle,
} from "./SideMenuButton";

export type FirstButtonIcon = ButtonIcon;
export type FirstButtonOnClick = ButtonOnClick;
export type FirstButtonTooltip = string;
export type SecondButtonIcon = ButtonIcon;
export type SecondButtonOnClick = ButtonOnClick;
export type SecondButtonTooltip = string;
export type DoubleButtonItemList = Array<
  [
    ButtonText,
    ButtonListKey,
    FirstButtonIcon,
    FirstButtonOnClick,
    SecondButtonIcon,
    SecondButtonOnClick,
    ButtonIcon?,
    FirstButtonTooltip?,
    SecondButtonTooltip?,
    ButtonSxStyle?
  ]
>;

interface Props {
  text: ButtonText;
  listKey: ButtonListKey;
  icon?: ButtonIcon;
  firstButtonIcon: ButtonIcon;
  firstButtonOnClick: ButtonOnClick;
  firstButtonTooltip?: string;
  secondButtonIcon: ButtonIcon;
  secondButtonOnClick: ButtonOnClick;
  secondButtonTooltip?: string;
  sxStyle?: ButtonSxStyle;
}

const SideMenuDoubleButton = ({
  text,
  listKey,
  icon,
  firstButtonIcon,
  firstButtonOnClick,
  firstButtonTooltip,
  secondButtonIcon,
  secondButtonOnClick,
  secondButtonTooltip,
  sxStyle,
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

  return (
    <ListItem key={listKey} sx={{ padding: 0, marginRight: 2, ...sxStyle }}>
      <ListItemButton onClick={secondButtonOnClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
        {wrapInTooltip(
          <IconButton onClick={firstButtonOnClick}>{firstButtonIcon}</IconButton>,
          firstButtonTooltip
        )}
        {wrapInTooltip(
          <IconButton onClick={secondButtonOnClick}>{secondButtonIcon}</IconButton>,
          secondButtonTooltip
        )}
      </ListItemButton>
    </ListItem>
  );
};
SideMenuDoubleButton.defaultProps = {
  icon: <></>,
  firstButtonTooltip: undefined,
  secondButtonTooltip: undefined,
  sxStyle: {},
};

export default SideMenuDoubleButton;
