import React, { useState, useEffect, useCallback } from "react";
import { FixedSizeList as List, FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import useStyles, { STYLE_CONST } from "../styles";

import MultigridCell from "./MultigridCell";
import MultigridColumnLabel from "./MultigridColumnLabel";
import MultigridRowLabel from "./MultigridRowLabel";
import innerElementType from "./multigridInnerElementType";

const Calendar = (): React.ReactElement => {
  const classes = useStyles();

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const rowLabelRef: React.RefObject<List> = React.createRef();
  const columnLabelRef: React.RefObject<List> = React.createRef();
  const gridRef: React.RefObject<Grid> = React.createRef();

  const handleGridScroll = useCallback((e) => {
    setScrollX(e.scrollLeft);
    setScrollY(e.scrollTop);
  }, []);

  const handleRowLabelScroll = useCallback((e) => {
    setScrollY(e.scrollOffset);
  }, []);

  const handleColumnLabelScroll = useCallback((e) => {
    setScrollX(e.scrollOffset);
  }, []);

  useEffect(() => {
    rowLabelRef.current?.scrollTo(scrollY);
    columnLabelRef.current?.scrollTo(scrollX);
    gridRef.current?.scrollTo({
      scrollLeft: scrollX,
      scrollTop: scrollY,
    });
  }, [scrollY, scrollX, rowLabelRef, columnLabelRef, gridRef]);

  const COLUMNS = 100;
  const ROWS = 100;

  // const scroll = (): void => {
  //   gridRef.current?.scrollToItem({ columnIndex: 50, rowIndex: 50, align: "start" });
  // };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <div className={classes.multigrid}>
          <List
            className={classes.multigridRowLabels}
            height={
              height -
              STYLE_CONST.CALENDAR_ROW_HEIGHT -
              STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS
            }
            width={STYLE_CONST.CALENDAR_COLUMN_WIDTH}
            innerElementType={innerElementType}
            itemCount={ROWS}
            itemSize={
              STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE
            }
            ref={rowLabelRef}
            onScroll={handleRowLabelScroll}
            style={{ overflow: "hidden" }} // need this manual overwrite to work
          >
            {MultigridRowLabel}
          </List>

          <List
            className={classes.multigridColumnLabels}
            layout="horizontal"
            height={STYLE_CONST.CALENDAR_ROW_HEIGHT}
            width={
              width -
              STYLE_CONST.CALENDAR_COLUMN_WIDTH -
              STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS
            }
            innerElementType={innerElementType}
            itemCount={COLUMNS}
            itemSize={
              STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE
            }
            ref={columnLabelRef}
            onScroll={handleColumnLabelScroll}
            style={{ overflow: "hidden" }} // need this manual overwrite to work
          >
            {MultigridColumnLabel}
          </List>

          <Grid
            className={classes.multigridMainGrid}
            height={height - STYLE_CONST.CALENDAR_ROW_HEIGHT}
            width={width - STYLE_CONST.CALENDAR_COLUMN_WIDTH}
            innerElementType={innerElementType}
            columnCount={COLUMNS}
            columnWidth={
              STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE
            }
            rowCount={ROWS}
            rowHeight={
              STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE
            }
            ref={gridRef}
            onScroll={handleGridScroll}
          >
            {MultigridCell}
          </Grid>
        </div>
      )}
    </AutoSizer>
  );
};

export default Calendar;
