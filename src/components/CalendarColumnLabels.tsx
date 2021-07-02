import React, { ReactElement, useEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";

import CalendarColumnLabelsCell from "./CalendarColumnLabelsCell";
import innerElementType from "./multigridInnerElementType";

interface CalendarColumnLabelsProps {
  width: number;
  positionX: number;
  scrollHandle: (e: any) => void;
  year: number;
  daysInYear: number;
}

const CalendarColumnLabels = ({
  width,
  positionX,
  scrollHandle,
  year,
  daysInYear,
}: CalendarColumnLabelsProps): ReactElement => {
  const classes = useStyles();

  const columnLabelRef = useRef<List>(null);

  useEffect(() => {
    columnLabelRef.current?.scrollTo(positionX);
  }, [positionX, columnLabelRef]);

  const firstDayOfYear = new Date(`${year}-01-01`);

  return (
    <List
      className={classes.multigridColumnLabels}
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
      onScroll={scrollHandle}
      style={{ overflow: "hidden" }} // need this manual overwrite to work
    >
      {CalendarColumnLabelsCell}
    </List>
  );
};

export default CalendarColumnLabels;
