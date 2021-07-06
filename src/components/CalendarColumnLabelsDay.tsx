import clsx from "clsx";
import React, { ReactElement, useEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";

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

  const columnLabelRef = useRef<List>(null);

  useEffect(() => {
    columnLabelRef.current?.scrollTo(positionX);
  }, [positionX, columnLabelRef]);

  const firstDayOfYear = new Date(`${year}-01-01`);

  return (
    <List
      className={clsx(classes.multigridColumnLabels, classes.multigridColumnLabelsDay)}
      layout="horizontal"
      height={STYLE_CONST.CALENDAR_ROW_HEIGHT}
      width={
        width -
        STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH -
        STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS
      }
      innerElementType={innerElementType}
      itemCount={daysInYear}
      itemData={firstDayOfYear}
      itemSize={STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      ref={columnLabelRef}
      // needs this local manual overwrite to work, css class gets overwritten
      style={{ overflow: "hidden" }}
    >
      {CalendarColumnLabelsDayCell}
    </List>
  );
};

export default CalendarColumnLabelsDay;
