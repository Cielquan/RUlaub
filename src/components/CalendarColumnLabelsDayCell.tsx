import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { CSSProperties, ReactElement } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { STYLE_CONST } from "../styles";
import { datePlusDays, sameDay } from "../utils/dateUtils";

const today = new Date();

interface Props {
  columnIndex: number;
  rowIndex: number;
  data: Date;
  style: CSSProperties;
}

const CalendarColumnLabelsDayCell = ({
  columnIndex,
  rowIndex,
  data,
  style,
}: Props): ReactElement => {
  const { locale } = useSelector((state: State) => state.config.settings.language);

  const date = datePlusDays(data, columnIndex);

  return (
    <Box
      sx={{
        height: STYLE_CONST.CALENDAR_ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        padding: "0 0.2em",
        backgroundColor: sameDay(date, today) ? "secondary.main" : "background.default",
        color: sameDay(date, today) ? "secondary.contrastText" : "text.primary",
      }}
      style={{
        ...style,
        left: Number(style.left) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        top: Number(style.top) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        width: Number(style.width) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
        height: Number(style.height) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      <Typography
        sx={{ flexGrow: 1 }}
        variant={rowIndex % 2 ? "body2" : "body1"}
        align="center"
      >
        {rowIndex % 2
          ? date.toLocaleString(locale, { weekday: "short" }).slice(0, 2)
          : date.getDate()}
      </Typography>
    </Box>
  );
};

export default CalendarColumnLabelsDayCell;
