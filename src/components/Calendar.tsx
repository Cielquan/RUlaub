import React, { useState, useEffect, useCallback } from "react";
import { FixedSizeList as List, FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import useStyles, { STYLE_CONST } from "../styles";

import MultigridCell from "./MultigridCell";
import CalendarColumnLabels from "./CalendarColumnLabels";
import CalendarGrid from "./CalendarGrid";
import CalendarRowLabels from "./CalendarRowLabels";
import innerElementType from "./multigridInnerElementType";

const Calendar = (): React.ReactElement => {
  const classes = useStyles();

  const rowLabelRef: React.RefObject<List> = React.createRef();
  const columnLabelRef: React.RefObject<List> = React.createRef();
  const gridRef: React.RefObject<Grid> = React.createRef();

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

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

  // const scroll = (): void => {
  //   gridRef.current?.scrollToItem({ columnIndex: 50, rowIndex: 50, align: "start" });
  // };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <div className={classes.multigrid}>
          <CalendarRowLabels
            height={height}
            scrollHandle={handleRowLabelScroll}
            ref={rowLabelRef}
          />

          <CalendarColumnLabels
            width={width}
            scrollHandle={handleColumnLabelScroll}
            ref={columnLabelRef}
          />

          <CalendarGrid
            width={width}
            height={height}
            scrollHandle={handleGridScroll}
            ref={gridRef}
          />
        </div>
      )}
    </AutoSizer>
  );
};

export default Calendar;
