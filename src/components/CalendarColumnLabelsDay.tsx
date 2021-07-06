import clsx from "clsx";
import React, { ReactElement, useEffect, useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";

import CalendarColumnLabelsDayCell from "./CalendarColumnLabelsDayCell";
import innerElementType from "./multigridInnerElementType";

type CalendarColumnLabelsDayProps = {
  width: number;
  positionX: number;
  year: number;
  daysInYear: number;
};

const CalendarColumnLabelsDay = ({
  width,
  positionX,
  year,
  daysInYear,
}: CalendarColumnLabelsDayProps): ReactElement => {
  const classes = useStyles();

  const columnLabelRef = useRef<Grid>(null);

  useEffect(() => {
    columnLabelRef.current?.scrollTo({
      scrollLeft: positionX,
      scrollTop: 0,
    });
  }, [positionX, columnLabelRef]);

  const firstDayOfYear = new Date(`${year}-01-01`);

  return (
    <Grid
      className={clsx(classes.multigridColumnLabels, classes.multigridColumnLabelsDay)}
      height={STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL * 2}
      width={
        width -
        STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH -
        STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS
      }
      innerElementType={innerElementType}
      columnCount={daysInYear}
      columnWidth={STYLE_CONST.CALENDAR_COLUMN_WIDTH_FULL}
      rowCount={2}
      rowHeight={STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL}
      itemData={firstDayOfYear}
      ref={columnLabelRef}
      // needs this local manual overwrite to work, css class gets overwritten
      style={{ overflow: "hidden" }}
    >
      {CalendarColumnLabelsDayCell}
    </Grid>
  );
};

export default CalendarColumnLabelsDay;
