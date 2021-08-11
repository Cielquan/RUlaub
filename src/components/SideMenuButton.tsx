import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { ReactElement } from "react";

export type ButtonText = string;
export type ButtonListKey = string;
export type ButtonOnClick = () => void;
export type ButtonIcon = ReactElement;
export type ButtonClassName = string;

interface Props {
  text: ButtonText;
  listKey: ButtonListKey;
  onClick: ButtonOnClick;
  icon?: ButtonIcon;
  className?: ButtonClassName;
  foldIcon?: ReactElement;
}

const SideMenuButton = ({
  text,
  listKey,
  onClick,
  icon,
  className,
  foldIcon,
}: Props): ReactElement => (
  <ListItem key={listKey} button onClick={onClick} className={className}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
    {foldIcon}
  </ListItem>
);
SideMenuButton.defaultProps = {
  icon: <></>,
  className: "",
  foldIcon: <></>,
};

export default SideMenuButton;
