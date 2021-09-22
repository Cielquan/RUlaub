import { Person as PersonIcon } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";

const UserButton = (): ReactElement => {
  const dispatch = useDispatch();
  const { openSettingsDialog } = bindActionCreators(actionCreators, dispatch);
  const configState = useSelector((state: State) => state.config);
  const themeState = configState.settings.theme;

  return (
    <ListItem
      key="userName"
      sx={{
        padding: 0,
        marginRight: 2,
      }}
    >
      <ListItemButton
        onClick={openSettingsDialog}
        sx={{
          border: "1px solid",
          borderColor: themeState === "dark" ? "primary.main" : "action.active",
          borderRadius: 2,
        }}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText
          primary={configState.user.name}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default UserButton;
