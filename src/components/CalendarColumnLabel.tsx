import React, { CSSProperties, ReactElement } from "react";

import useStyles, { STYLE_CONST } from "../styles";

interface CalendarColumnLabelProps {
  index: number;
  style: CSSProperties;
}

const CalendarColumnLabel = ({
  index: columnIndex,
  style,
}: CalendarColumnLabelProps): ReactElement => {
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

export default CalendarColumnLabel;
