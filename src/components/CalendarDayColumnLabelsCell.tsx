import React, { CSSProperties, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import useStyles, { STYLE_CONST } from "../styles";
import { datePlusDays } from "../utils/dateutils";

interface CalendarDayColumnLabelsCellProps {
  index: number;
  data: Date;
  style: CSSProperties;
}

const CalendarDayColumnLabelsCell = ({
  index: columnIndex,
  data,
  style,
}: CalendarDayColumnLabelsCellProps): ReactElement => {
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
      <Typography
        className={classes.typographyGrow}
        variant="body1"
        align="center"
        noWrap
      >
        {datePlusDays(data, columnIndex).getDate()}
      </Typography>
    </div>
  );
};

export default CalendarDayColumnLabelsCell;
