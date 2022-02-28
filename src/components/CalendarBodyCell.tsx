import { Box } from "@mui/system";
import React, { CSSProperties, ReactElement } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { STYLE_CONST } from "../styles";

interface Props {
  columnIndex: number;
  rowIndex: number;
  data: number;
  style: CSSProperties;
}

const CalendarBodyCell = ({ columnIndex, rowIndex, data: year, style }: Props): ReactElement => {
  const vacationsDataState = useSelector((state: State) => state.vacationsData);
  const calendarRowUserMapState = useSelector((state: State) => state.calendarRowUserMap);
  const yearDay = columnIndex + 1;

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
      Object.values(vacations).filter((vacation) => {
        if (vacation.start.year > year) {
          return false;
        }
        if (vacation.start.year === year) {
          if (vacation.end.year > year) {
            return vacation.start.yearDay <= yearDay;
          }
          if (vacation.end.year === year) {
            return vacation.start.yearDay <= yearDay && vacation.end.yearDay >= yearDay;
          }
          return false; // end year before current year -> invlaid data
        }
        if (vacation.end.year > year) {
          return true;
        }
        if (vacation.end.year === year) {
          return vacation.end.yearDay >= yearDay;
        }
        return false;
      }).length > 0
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
