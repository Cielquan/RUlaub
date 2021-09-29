import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import React, { ReactElement } from "react";

export const DBDialogEntryContentListItem = styled(ListItem)(() => ({
  width: "fit-content",
}));

export const DBDialogEntryContentList = styled(List)(() => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
}));

export enum EntryStyle {
  DEFAULT,
  HIDDEN,
  REMOVED,
}

interface Props {
  ContentComponent: ReactElement;
  leftButtonOnClick(): void;
  leftButtonTooltip: string;
  leftButtonIcon: ReactElement;
  leftButtonDisabled: boolean;
  rightButtonOnClick(): void;
  rightButtonTooltip: string;
  rightButtonIcon: ReactElement;
  entryStyle?: EntryStyle;
}

const DialogDataEntry = ({
  ContentComponent,
  leftButtonOnClick,
  leftButtonTooltip,
  leftButtonIcon,
  leftButtonDisabled,
  rightButtonOnClick,
  rightButtonTooltip,
  rightButtonIcon,
  entryStyle,
}: Props): ReactElement => {
  const entryStyles = {
    borderColor: "primary.main",
    background: {},
    contentStyle: {},
  };

  switch (entryStyle) {
    case EntryStyle.DEFAULT:
      break;
    case EntryStyle.HIDDEN:
      entryStyles.borderColor = "action.disabled";
      entryStyles.background = { opacity: 0.7 };
      entryStyles.contentStyle = { color: "text.disabled" };
      break;
    case EntryStyle.REMOVED:
      entryStyles.borderColor = "error.dark";
      entryStyles.background = { backgroundColor: "error.light", opacity: 0.5 };
      entryStyles.contentStyle = { color: "error.contrastText" };
      break;
    default:
      break;
  }

  return (
    <ListItem
      sx={{
        marginTop: 0.5,
        marginBottom: 0.5,
        border: "1px solid",
        borderColor: entryStyles.borderColor,
        borderRadius: 2,
        paddingRight: 14,
        ...entryStyles.background,
      }}
    >
      <Box sx={entryStyles.contentStyle}>{ContentComponent}</Box>
      <ListItemSecondaryAction>
        <Tooltip arrow title={leftButtonTooltip}>
          <IconButton onClick={leftButtonOnClick} disabled={leftButtonDisabled}>
            {leftButtonIcon}
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={rightButtonTooltip}>
          <IconButton onClick={rightButtonOnClick}>{rightButtonIcon}</IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
DialogDataEntry.defaultProps = {
  entryStyle: EntryStyle.DEFAULT,
};

export default DialogDataEntry;
