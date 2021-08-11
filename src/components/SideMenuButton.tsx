import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { ReactElement } from "react";

interface Props {
  text: string;
  listKey: string;
  onClick: () => void;
  icon?: ReactElement;
  className?: string;
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
