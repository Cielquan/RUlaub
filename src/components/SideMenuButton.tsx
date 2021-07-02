import React, { ReactElement } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

type SideMenuButtonProps = {
  key: string;
  text: string;
  icon: ReactElement;
  onClick: () => void;
  foldIcon?: ReactElement;
  className?: string;
};

const SideMenuButton = ({
  key,
  text,
  icon,
  onClick,
  foldIcon,
  className,
}: SideMenuButtonProps): ReactElement => (
  <ListItem key={key} button onClick={onClick} className={className}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
    {foldIcon}
  </ListItem>
);

SideMenuButton.defaultProps = {
  foldIcon: <></>,
  className: "",
};

export default SideMenuButton;
