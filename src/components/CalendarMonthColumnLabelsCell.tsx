import React, { CSSProperties, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import useStyles, { STYLE_CONST } from "../styles";

interface CalendarMonthColumnLabelsCellProps {
  index: number;
  style: CSSProperties;
}

const CalendarMonthColumnLabelsCell = ({
  index: columnIndex,
  style,
}: CalendarMonthColumnLabelsCellProps): ReactElement => {
  const classes = useStyles();

  const zeroPad = (num: number, places: number): string =>
    String(num).padStart(places, "0");
  const monthDate = new Date(`2000-${zeroPad(columnIndex + 1, 2)}-01`);

  return (
    <div
      className={classes.multigridCell}
      style={{
        ...style,
        left: Number(style.left) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        width: Number(style.width) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      <Typography className={classes.typographyGrow} variant="h5" align="left" noWrap>
        {monthDate.toLocaleString("default", { month: "long" })}
      </Typography>
      <Typography className={classes.typographyGrow} variant="h5" align="center" noWrap>
        {monthDate.toLocaleString("default", { month: "long" })}
      </Typography>
      <Typography className={classes.typographyGrow} variant="h5" align="right" noWrap>
        {monthDate.toLocaleString("default", { month: "long" })}
      </Typography>
    </div>
  );
};

export default CalendarMonthColumnLabelsCell;
