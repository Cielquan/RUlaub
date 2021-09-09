import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";
import { CSSSelectorObject, SxProps, SystemStyleObject } from "@mui/system";

export const STYLE_CONST = {
  CALENDAR_COLUMN_WIDTH: 35,
  CALENDAR_ROW_HEIGHT: 35,
  CALENDAR_COLUMN_WIDTH_FULL: 32 + 2, // incl. gutter size
  CALENDAR_ROW_HEIGHT_FULL: 35 + 2, // incl. gutter size
  CALENDAR_GUTTER_SIZE: 2,
  CALENDAR_ROW_LABEL_WIDTH: 250,
  CALENDAR_SCROLLBAR_THINCKNESS: 6,
};

export type SxStyle =
  | SxProps<Theme>
  | CSSSelectorObject<Theme>
  | SystemStyleObject<Theme>;

const useStyles = makeStyles((theme) => ({
  // NOTE: react-window component
  multigridTableHead: {
    // absolutely position the label and move it right by a col
    position: "absolute !important" as "absolute",
    top: 0,
    left: 0,
  },
  // NOTE: react-window component
  multigridRowLabels: {
    // absolutely position the label and move it down by a row
    position: "absolute !important" as "absolute",
    top: STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL * 2,
    borderTop: `1px solid ${theme.palette.text.primary}`,
  },
  // NOTE: react-window component and in conjunction with other styles
  multigridColumnLabels: {
    // absolutely position the label and move it right by a col
    position: "absolute !important" as "absolute",
    left: STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH,
    borderLeft: `1px solid ${theme.palette.text.primary}`,
  },
  // NOTE: react-window component and in conjunction with other styles
  multigridColumnLabelsDay: {
    top: STYLE_CONST.CALENDAR_ROW_HEIGHT,
  },
  // NOTE: react-window component
  multigridMainGrid: {
    // absolutely position the label and move it down by a row and right by a col
    position: "absolute !important" as "absolute",
    top: STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL * 2,
    left: STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH,
    borderTop: `1px solid ${theme.palette.text.primary}`,
    borderLeft: `1px solid ${theme.palette.text.primary}`,
    "&::-webkit-scrollbar": {
      width: STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS,
      height: STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.text.primary,
    },
  },
}));

export default useStyles;
