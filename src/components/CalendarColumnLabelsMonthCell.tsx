import { useLingui } from "@lingui/react";
import { Typography } from "@mui/material";
import clsx from "clsx";
import React, { CSSProperties, ReactElement } from "react";

import useStyles, { STYLE_CONST } from "../styles";
import { getMonthNameList } from "../utils/dateUtils";

interface Props {
  index: number;
  style: CSSProperties;
}

const CalendarColumnLabelsMonthCell = ({
  index: columnIndex,
  style,
}: Props): ReactElement => {
  const classes = useStyles();

  const { i18n } = useLingui();

  const monthNameList = getMonthNameList(i18n);

  return (
    <div
      className={clsx(classes.multigridCell)}
      style={{
        ...style,
        left: Number(style.left) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        width: Number(style.width) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      <Typography
        className={clsx(classes.multigridColumnLabelsMonth, classes.typographyGrow)}
        variant="h5"
        component="div"
        align="left"
      >
        {monthNameList[columnIndex]}
      </Typography>
      <Typography
        className={clsx(classes.multigridColumnLabelsMonth, classes.typographyGrow)}
        variant="h5"
        component="div"
        align="center"
      >
        {monthNameList[columnIndex]}
      </Typography>
      <Typography
        className={clsx(classes.multigridColumnLabelsMonth, classes.typographyGrow)}
        variant="h5"
        component="div"
        align="right"
      >
        {monthNameList[columnIndex]}
      </Typography>
    </div>
  );
};

export default CalendarColumnLabelsMonthCell;
