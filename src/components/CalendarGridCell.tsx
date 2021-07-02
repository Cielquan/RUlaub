import React, { CSSProperties, ReactElement } from "react";

import useStyles, { STYLE_CONST } from "../styles";

interface CalendarGridCellProps {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
}

const CalendarGridCell = ({
  columnIndex,
  rowIndex,
  style,
}: CalendarGridCellProps): ReactElement => {
  const classes = useStyles();

  return (
    <div
      className={classes.multigridCell}
      style={{
        ...style,
        left: Number(style.left) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        top: Number(style.top) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        width: Number(style.width) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
        height: Number(style.height) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      {`r${rowIndex}, c${columnIndex}`}
    </div>
  );
};

export default CalendarGridCell;
