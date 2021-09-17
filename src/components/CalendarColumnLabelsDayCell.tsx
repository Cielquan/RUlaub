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

  let backgroundColor;
  let color;
  if (sameDay(date, today)) {
    backgroundColor = "primary.light";
    color = "primary.contrastText";
  } else if (date.getDay() === 6 || date.getDay() === 0) {
    backgroundColor = "secondary.dark";
    color = "secondary.contrastText";
  } else {
    backgroundColor = "background.default";
    color = "text.primary";
  }

  return (
    <Box
      sx={{
        height: STYLE_CONST.CALENDAR_ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        padding: "0 0.2em",
        backgroundColor,
        color,
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
