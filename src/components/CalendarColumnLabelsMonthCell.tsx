import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { CSSProperties, ReactElement } from "react";

import { STYLE_CONST } from "../styles";
import { getMonthNameList } from "../utils/dateUtils";

interface Props {
  index: number;
  style: CSSProperties;
}

const CalendarColumnLabelsMonthCell = ({
  index: columnIndex,
  style,
}: Props): ReactElement => {
  const monthNameList = getMonthNameList();

  return (
    <Box
      sx={{
        height: STYLE_CONST.CALENDAR_ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        padding: "0 0.2em",
        backgroundColor: "background.default",
      }}
      style={{
        ...style,
        left: Number(style.left) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        width: Number(style.width) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      <Typography
        sx={{ padding: "0 0.7em", flexGrow: 1 }}
        variant="h5"
        component="div"
        align="left"
      >
        {monthNameList[columnIndex]}
      </Typography>
      <Typography
        sx={{ padding: "0 0.7em", flexGrow: 1 }}
        variant="h5"
        component="div"
        align="center"
      >
        {monthNameList[columnIndex]}
      </Typography>
      <Typography
        sx={{ padding: "0 0.7em", flexGrow: 1 }}
        variant="h5"
        component="div"
        align="right"
      >
        {monthNameList[columnIndex]}
      </Typography>
    </Box>
  );
};

export default CalendarColumnLabelsMonthCell;
