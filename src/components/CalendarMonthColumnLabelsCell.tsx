import { useLingui } from "@lingui/react";
import { Typography } from "@material-ui/core";
import React, { CSSProperties, ReactElement } from "react";

import useStyles, { STYLE_CONST } from "../styles";
import { getMonthNameList } from "../utils/dateutils";

type CalendarMonthColumnLabelsCellProps = {
  index: number;
  style: CSSProperties;
};

const CalendarMonthColumnLabelsCell = ({
  index: columnIndex,
  style,
}: CalendarMonthColumnLabelsCellProps): ReactElement => {
  const classes = useStyles();

  const { i18n } = useLingui();

  const monthNameList = getMonthNameList(i18n);

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
        variant="h5"
        component="div"
        align="left"
      >
        {monthNameList[columnIndex]}
      </Typography>
      <Typography
        className={classes.typographyGrow}
        variant="h5"
        component="div"
        align="center"
      >
        {monthNameList[columnIndex]}
      </Typography>
      <Typography
        className={classes.typographyGrow}
        variant="h5"
        component="div"
        align="right"
      >
        {monthNameList[columnIndex]}
      </Typography>
    </div>
  );
};

export default CalendarMonthColumnLabelsCell;
