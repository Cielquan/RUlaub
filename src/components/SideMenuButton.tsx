import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { ReactElement } from "react";

import { SxStyle } from "../styles";

export type ButtonText = string;
export type ButtonListKey = string;
export type ButtonOnClick = () => void;
export type ButtonIcon = ReactElement;
export type ButtonSxStyle = SxStyle;

interface Props {
  text: ButtonText;
  listKey: ButtonListKey;
  onClick: ButtonOnClick;
  icon?: ButtonIcon;
  sxStyle?: ButtonSxStyle;
  foldIcon?: ReactElement;
}

const SideMenuButton = ({
  text,
  listKey,
  onClick,
  icon,
  sxStyle,
  foldIcon,
}: Props): ReactElement => (
  <ListItem key={listKey} button onClick={onClick} sx={sxStyle}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
    {foldIcon}
  </ListItem>
);
SideMenuButton.defaultProps = {
  icon: <></>,
  sxStyle: {},
  foldIcon: <></>,
};

export default SideMenuButton;
