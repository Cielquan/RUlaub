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
