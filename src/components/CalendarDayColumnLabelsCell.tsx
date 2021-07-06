import { Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { CSSProperties, ReactElement } from "react";

import useStyles, { STYLE_CONST } from "../styles";
import { datePlusDays, sameDay } from "../utils/dateutils";

const today = new Date();

type CalendarDayColumnLabelsCellProps = {
  index: number;
  data: Date;
  style: CSSProperties;
};

const CalendarDayColumnLabelsCell = ({
  index: columnIndex,
  data,
  style,
}: CalendarDayColumnLabelsCellProps): ReactElement => {
  const classes = useStyles();

  const date = datePlusDays(data, columnIndex);

  return (
    <div
      className={clsx(
        classes.multigridCell,
        sameDay(date, today) ? classes.currentDate : {}
      )}
      style={{
        ...style,
        left: Number(style.left) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        top: Number(style.top) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        width: Number(style.width) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
        height: Number(style.height) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      <Typography className={classes.typographyGrow} variant="body1" align="center">
        {date.getDate()}
      </Typography>
    </div>
  );
};

export default CalendarDayColumnLabelsCell;
