import { Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { CSSProperties, ReactElement } from "react";

import useStyles, { STYLE_CONST } from "../styles";
import { datePlusDays, sameDay } from "../utils/dateutils";

const today = new Date();

type CalendarColumnLabelsDayNumberCellProps = {
  index: number;
  data: Date;
  style: CSSProperties;
};

const CalendarColumnLabelsDayNumberCell = ({
  index: columnIndex,
  data,
  style,
}: CalendarColumnLabelsDayNumberCellProps): ReactElement => {
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

export default CalendarColumnLabelsDayNumberCell;
