import React, { CSSProperties, ReactElement } from "react";
import clsx from "clsx";

import useStyles, { STYLE_CONST } from "../styles";
import { datePlusDays } from "../utils/dateutils";

interface CalendarColumnLabelsCellProps {
  index: number;
  data: Date;
  style: CSSProperties;
}

const CalendarColumnLabelsCell = ({
  index: columnIndex,
  data,
  style,
}: CalendarColumnLabelsCellProps): ReactElement => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.multigridCell, classes.multigridCenterContent)}
      style={{
        ...style,
        left: Number(style.left) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        width: Number(style.width) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      {datePlusDays(data, columnIndex).getDate()}
    </div>
  );
};

export default CalendarColumnLabelsCell;
