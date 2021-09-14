import { Theme } from "@mui/material/styles";
import { CSSSelectorObject, SxProps, SystemStyleObject } from "@mui/system";

export const STYLE_CONST = {
  CALENDAR_COLUMN_WIDTH: 32,
  CALENDAR_ROW_HEIGHT: 35,
  CALENDAR_GUTTER_SIZE: 2,
  CALENDAR_COLUMN_WIDTH_FULL: 0, // incl. gutter size
  CALENDAR_ROW_HEIGHT_FULL: 0, // incl. gutter size
  CALENDAR_ROW_LABEL_WIDTH: 250,
};

STYLE_CONST.CALENDAR_COLUMN_WIDTH_FULL =
  STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE;

STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL =
  STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE;

export type SxStyle =
  | SxProps<Theme>
  | CSSSelectorObject<Theme>
  | SystemStyleObject<Theme>;
