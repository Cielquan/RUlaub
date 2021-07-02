import React, { CSSProperties, ReactElement } from "react";
import { Typography } from "@material-ui/core";

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
      className={classes.multigridCell}
      style={{
        ...style,
        left: Number(style.left) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        width: Number(style.width) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      <Typography variant="body1" align="center" noWrap>
        {datePlusDays(data, columnIndex).getDate()}
      </Typography>
    </div>
  );
};

export default CalendarColumnLabelsCell;
