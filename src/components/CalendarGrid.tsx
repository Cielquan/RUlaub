import React, { ReactElement, useEffect, useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";

import CalendarGridCell from "./CalendarGridCell";
import innerElementType from "./multigridInnerElementType";

interface CalendarGridProps {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  scrollHandle: (e: any) => void;
  daysInYear: number;
}

const CalendarGrid = ({
  width,
  height,
  positionX,
  positionY,
  scrollHandle,
  daysInYear,
}: CalendarGridProps): ReactElement => {
  const classes = useStyles();

  const gridRef = useRef<Grid>(null);

  useEffect(() => {
    gridRef.current?.scrollTo({
      scrollLeft: positionX,
      scrollTop: positionY,
    });
  }, [positionY, positionX, gridRef]);

  const ROWS = 100;

  return (
    <Grid
      className={classes.multigridMainGrid}
      height={height - STYLE_CONST.CALENDAR_ROW_HEIGHT}
      width={width - STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH}
      innerElementType={innerElementType}
      columnCount={daysInYear}
      columnWidth={STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      rowCount={ROWS}
      rowHeight={STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      ref={gridRef}
      onScroll={scrollHandle}
    >
      {CalendarGridCell}
    </Grid>
  );
};

export default CalendarGrid;
