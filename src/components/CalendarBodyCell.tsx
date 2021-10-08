import { Box } from "@mui/system";
import React, { CSSProperties, ReactElement } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { STYLE_CONST } from "../styles";
import { UsersDataSchema } from "../backendAPI/types/usersData.schema";

interface Props {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
}

const CalendarBodyCell = ({ columnIndex, rowIndex, style }: Props): ReactElement => {
  const calendarRowUserMapState = useSelector(
    (state: State) => state.calendarRowUserMap
  );
  const userID = calendarRowUserMapState[
    rowIndex.toString()
  ].toString() as keyof UsersDataSchema;

  const usersDataState = useSelector((state: State) => state.usersData);

  const isVacation = (): boolean => {
    const vacations = usersDataState[userID]?.vacations;
    if (!vacations) return false;
    return (
      vacations.filter(
        (vacation) =>
          vacation.startYearDay <= columnIndex + 1 &&
          vacation.endYearDay >= columnIndex + 1
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
