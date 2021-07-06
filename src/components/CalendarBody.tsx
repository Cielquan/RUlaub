import React, { ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FixedSizeGrid as Grid, GridOnScrollProps } from "react-window";

import { State } from "../state";
import useStyles, { STYLE_CONST } from "../styles";

import CalendarBodyCell from "./CalendarBodyCell";
import innerElementType from "./multigridInnerElementType";

type CalendarBodyProps = {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  scrollHandle: (e: GridOnScrollProps) => void;
  daysInYear: number;
};

const CalendarBody = ({
  width,
  height,
  positionX,
  positionY,
  scrollHandle,
  daysInYear,
}: CalendarBodyProps): ReactElement => {
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
      {CalendarBodyCell}
    </Grid>
  );
};

export default CalendarBody;
