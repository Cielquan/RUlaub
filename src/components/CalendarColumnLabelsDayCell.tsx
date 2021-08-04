import { Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { CSSProperties, ReactElement } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import useStyles, { STYLE_CONST } from "../styles";
import { datePlusDays, sameDay } from "../utils/dateUtils";

const today = new Date();

interface Props {
  columnIndex: number;
  rowIndex: number;
  data: Date;
  style: CSSProperties;
}

const CalendarColumnLabelsDayCell = ({
  columnIndex,
  rowIndex,
  data,
  style,
}: Props): ReactElement => {
  const classes = useStyles();

  const { locale } = useSelector((state: State) => state.language);

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
      <Typography
        className={classes.typographyGrow}
        variant={rowIndex % 2 ? "body2" : "body1"}
        align="center"
      >
        {rowIndex % 2
          ? date.toLocaleString(locale, { weekday: "short" }).slice(0, 2)
          : date.getDate()}
      </Typography>
    </div>
  );
};

export default CalendarColumnLabelsDayCell;
