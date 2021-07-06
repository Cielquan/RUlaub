import React, { ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FixedSizeGrid as Grid, GridOnScrollProps } from "react-window";

import { State } from "../state";
import useStyles, { STYLE_CONST } from "../styles";

import CalendarGridCell from "./CalendarGridCell";
import innerElementType from "./multigridInnerElementType";

type CalendarGridProps = {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  scrollHandle: (e: GridOnScrollProps) => void;
  daysInYear: number;
};

const CalendarGrid = ({
  width,
  height,
  positionX,
  positionY,
  scrollHandle,
  daysInYear,
}: CalendarGridProps): ReactElement => {
  const classes = useStyles();

  const dbDataState = useSelector((state: State) => state.dbData);

  const gridRef = useRef<Grid>(null);

  useEffect(() => {
    gridRef.current?.scrollTo({
      scrollLeft: positionX,
      scrollTop: positionY,
    });
  }, [positionY, positionX, gridRef]);

  return (
    <Grid
      className={classes.multigridMainGrid}
      height={height - STYLE_CONST.CALENDAR_ROW_HEIGHT * 2}
      width={width - STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH}
      innerElementType={innerElementType}
      columnCount={daysInYear}
      columnWidth={STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      rowCount={dbDataState.users.length}
      rowHeight={STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      ref={gridRef}
      onScroll={scrollHandle}
    >
      {CalendarGridCell}
    </Grid>
  );
};

export default CalendarGrid;
