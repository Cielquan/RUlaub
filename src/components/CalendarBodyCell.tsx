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
  const vacationsDataState = useSelector((state: State) => state.vacationsData);
  const calendarRowUserMapState = useSelector((state: State) => state.calendarRowUserMap);

  let userID: string | undefined;
  try {
    userID = calendarRowUserMapState[rowIndex.toString()].toString();
  } catch {
    userID = undefined;
  }

  const isVacation = (): boolean => {
    if (userID === undefined) return false;
    const vacations = vacationsDataState[userID];
    if (!vacations) return false;
    return (
      Object.values(vacations).filter(
        (vacation) =>
          vacation.start.yearDay <= columnIndex + 1 && vacation.end.yearDay >= columnIndex + 1
      ).length > 0
    );
  };

  return (
    <Box
      sx={{
        height: STYLE_CONST.CALENDAR_ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        padding: "0 0.2em",
        backgroundColor: isVacation() ? "secondary.light" : "background.default",
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
