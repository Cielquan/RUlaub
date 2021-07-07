import clsx from "clsx";
import React, { CSSProperties, ReactElement } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import useStyles, { STYLE_CONST } from "../styles";

type CalendarBodyCellProps = {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
};

const CalendarBodyCell = ({
  columnIndex,
  rowIndex,
  style,
}: CalendarBodyCellProps): ReactElement => {
  const classes = useStyles();

  const dbDataState = useSelector((state: State) => state.dbData);

  const isHoliday = (): boolean => {
    const { vacations } = dbDataState.users[rowIndex];
    for (const vacation of vacations) {
      if (vacation.startDay <= columnIndex + 1 && vacation.endDay >= columnIndex) {
        return true;
      }
    }
    return false;
  };

  return (
    <div
      className={clsx(classes.multigridCell, { [classes.holiday]: isHoliday() })}
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
