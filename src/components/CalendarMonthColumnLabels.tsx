import React, { ReactElement, useEffect, useRef } from "react";
import { VariableSizeList as List, ListOnScrollProps } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";
import { getDaysInMonth } from "../utils/dateutils";

import CalendarMonthColumnLabelsCell from "./CalendarMonthColumnLabelsCell";
import innerElementType from "./multigridInnerElementType";

type CalendarMonthColumnLabelsProps = {
  width: number;
  positionX: number;
  scrollHandle: (e: ListOnScrollProps) => void;
  year: number;
};

const CalendarMonthColumnLabels = ({
  width,
  positionX,
  scrollHandle,
  year,
}: CalendarMonthColumnLabelsProps): ReactElement => {
  const classes = useStyles();

  const columnLabelRef = useRef<List>(null);

  useEffect(() => {
    columnLabelRef.current?.scrollTo(positionX);
  }, [positionX, columnLabelRef]);

  const getMonthWidth = (index: number): number =>
    getDaysInMonth(index + 1, year) *
    (STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE);

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
      itemCount={12}
      itemSize={getMonthWidth}
      ref={columnLabelRef}
      onScroll={scrollHandle}
      // needs this local manual overwrite to work, css class gets overwritten
      style={{ overflow: "hidden" }}
    >
      {CalendarMonthColumnLabelsCell}
    </List>
  );
};

export default CalendarMonthColumnLabels;
