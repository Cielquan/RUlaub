import React, { CSSProperties, ReactElement } from "react";

import useStyles, { STYLE_CONST } from "../styles";

interface CalendarRowLabelsCellProps {
  index: number;
  style: CSSProperties;
}

const CalendarRowLabelsCell = ({
  index: rowIndex,
  style,
}: CalendarRowLabelsCellProps): ReactElement => {
  const classes = useStyles();

  return (
    <div
      className={classes.multigridCell}
      style={{
        ...style,
        top: Number(style.top) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        height: Number(style.height) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      r {rowIndex}
    </div>
  );
};

export default CalendarRowLabelsCell;
