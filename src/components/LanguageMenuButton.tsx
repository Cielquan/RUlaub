import { MenuItem } from "@material-ui/core";
import React, { ReactElement } from "react";

export type CloseFunction = {
  closeFn: () => void;
};

type Props = {
  text: string;
  selected: boolean;
  onClick: () => void;
};

const LanguageMenuButton = ({ text, selected, onClick }: Props): ReactElement => (
  <MenuItem selected={selected} onClick={onClick}>
    {text}
  </MenuItem>
);

export default LanguageMenuButton;
