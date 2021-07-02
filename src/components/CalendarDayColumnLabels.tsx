import React, { ReactElement, useEffect, useRef } from "react";
import clsx from "clsx";
import { FixedSizeList as List, ListOnScrollProps } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";

import CalendarDayColumnLabelsCell from "./CalendarDayColumnLabelsCell";
import innerElementType from "./multigridInnerElementType";

type CalendarDayColumnLabelsProps = {
  width: number;
  positionX: number;
  scrollHandle: (e: ListOnScrollProps) => void;
  year: number;
  daysInYear: number;
};

const CalendarDayColumnLabels = ({
  width,
  positionX,
  scrollHandle,
  year,
  daysInYear,
}: CalendarDayColumnLabelsProps): ReactElement => {
  const classes = useStyles();

  const columnLabelRef = useRef<List>(null);

  useEffect(() => {
    columnLabelRef.current?.scrollTo(positionX);
  }, [positionX, columnLabelRef]);

  const firstDayOfYear = new Date(`${year}-01-01`);

  return (
    <List
      className={clsx(classes.multigridColumnLabels, classes.multigridColumnSubLabels)}
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
      // needs this local manual overwrite to work, css class gets overwritten
      style={{ overflow: "hidden" }}
    >
      {CalendarDayColumnLabelsCell}
    </List>
  );
};

export default CalendarDayColumnLabels;
