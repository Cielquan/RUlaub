import React from "react";
import { FixedSizeGrid as Grid } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";

import MultigridCell from "./MultigridCell";
import innerElementType from "./multigridInnerElementType";

interface CalendarGridProps {
  width: number;
  height: number;
  scrollHandle: (e: any) => void;
  ref: React.RefObject<Grid>;
}

const CalendarGrid = ({
  width,
  height,
  scrollHandle,
  ref,
}: CalendarGridProps): React.ReactElement => {
  const classes = useStyles();

  const COLUMNS = 100;
  const ROWS = 100;

  return (
    <Grid
      className={classes.multigridMainGrid}
      height={height - STYLE_CONST.CALENDAR_ROW_HEIGHT}
      width={width - STYLE_CONST.CALENDAR_COLUMN_WIDTH}
      innerElementType={innerElementType}
      columnCount={COLUMNS}
      columnWidth={STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      rowCount={ROWS}
      rowHeight={STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      ref={ref}
      onScroll={scrollHandle}
    >
      {MultigridCell}
    </Grid>
  );
};

export default CalendarGrid;
