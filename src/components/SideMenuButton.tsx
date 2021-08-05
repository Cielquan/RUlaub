import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { ReactElement } from "react";

interface Props {
  key: string;
  text: string;
  icon?: ReactElement;
  onClick: () => void;
  foldIcon?: ReactElement;
  className?: string;
}

const SideMenuButton = ({
  key,
  text,
  icon,
  onClick,
  foldIcon,
  className,
}: Props): ReactElement => (
  <ListItem key={key} button onClick={onClick} className={className}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
    {foldIcon}
  </ListItem>
);
SideMenuButton.defaultProps = {
  icon: <></>,
  foldIcon: <></>,
  className: "",
};

export default SideMenuButton;
