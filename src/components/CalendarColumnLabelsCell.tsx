import React, { CSSProperties, ReactElement } from "react";

import useStyles, { STYLE_CONST } from "../styles";

interface CalendarColumnLabelsCellProps {
  index: number;
  style: CSSProperties;
}

const CalendarColumnLabelsCell = ({
  index: columnIndex,
  style,
}: CalendarColumnLabelsCellProps): ReactElement => {
  const classes = useStyles();

  return (
    <div
      className={classes.multigridCell}
      style={{
        ...style,
        left: Number(style.left) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        width: Number(style.width) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      c {columnIndex}
    </div>
  );
};

export default CalendarColumnLabelsCell;
