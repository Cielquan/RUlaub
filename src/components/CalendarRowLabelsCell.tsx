import React, { CSSProperties, ReactElement } from "react";
import { Typography } from "@material-ui/core";

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
      <Typography variant="body1" noWrap>
        some long row with index {rowIndex}
      </Typography>
    </div>
  );
};

export default CalendarRowLabelsCell;
