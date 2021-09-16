import { Box } from "@mui/system";
import React, { CSSProperties, ReactElement } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { STYLE_CONST } from "../styles";

interface Props {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
}

const CalendarBodyCell = ({ columnIndex, rowIndex, style }: Props): ReactElement => {
  const vacationDataState = useSelector((state: State) => state.vacationData);

  const isHoliday = (): boolean => {
    if (
      vacationDataState.users[rowIndex].vacations.filter(
        (vacation) =>
          vacation.startDay <= columnIndex + 1 && vacation.endDay >= columnIndex
      ).length > 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <Box
      sx={{
        height: STYLE_CONST.CALENDAR_ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        padding: "0 0.2em",
        backgroundColor: isHoliday() ? "secondary.light" : "background.default",
      }}
      style={{
        ...style,
        left: Number(style.left) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        top: Number(style.top) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        width: Number(style.width) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
        height: Number(style.height) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    />
  );
};

export default CalendarBodyCell;
