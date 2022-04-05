import { IconButton, ListItem, ListItemSecondaryAction, Tooltip, useTheme } from "@mui/material";
import { Box, Theme } from "@mui/system";
import React, { ReactElement } from "react";

export enum EntryStyle {
  DEFAULT,
  HIDDEN,
  NEW,
  REMOVED,
}

interface Styles {
  borderColor: string;
  background: { backgroundColor?: string; opacity?: number };
  contentStyle: { color?: string };
}
export const getStyles = (entryStyle: EntryStyle | undefined, theme: Theme): Styles => {
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
    case EntryStyle.NEW:
      entryStyles.borderColor = "success.dark";
      entryStyles.background = { backgroundColor: `${theme.palette.success.light}30` };
      entryStyles.contentStyle = { color: "text.primary" };
      break;
    case EntryStyle.REMOVED:
      entryStyles.borderColor = "error.dark";
      entryStyles.background = { backgroundColor: `${theme.palette.error.light}30` };
      entryStyles.contentStyle = { color: "text.primary" };
      break;
    default:
      break;
  }
  return entryStyles;
};

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
  const theme = useTheme();
  const entryStyles = getStyles(entryStyle, theme);

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
      <Box sx={{ ...entryStyles.contentStyle, width: "100%" }}>{ContentComponent}</Box>
      <ListItemSecondaryAction>
        <Tooltip arrow title={leftButtonTooltip}>
          <span>
            <IconButton onClick={leftButtonOnClick} disabled={leftButtonDisabled}>
              {leftButtonIcon}
            </IconButton>
          </span>
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
