import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

interface SideMenuButtonProps {
  key: string;
  text: string;
  icon: React.ReactElement;
  onClick: () => void;
  foldIcon?: React.ReactElement;
  className?: string;
}

const SideMenuButton = ({
  key,
  text,
  icon,
  onClick,
  foldIcon,
  className,
}: SideMenuButtonProps): React.ReactElement => (
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
