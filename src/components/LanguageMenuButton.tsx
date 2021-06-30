import React, { ReactElement } from "react";
import { MenuItem } from "@material-ui/core";

interface LanguageMenuButtonProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const LanguageMenuButton = ({
  text,
  selected,
  onClick,
}: LanguageMenuButtonProps): ReactElement => (
  <MenuItem selected={selected} onClick={onClick}>
    {text}
  </MenuItem>
);

export default LanguageMenuButton;
