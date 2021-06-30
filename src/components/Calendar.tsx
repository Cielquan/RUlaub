import React, {
  createRef,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FixedSizeList as List, FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import useStyles from "../styles";

import CalendarColumnLabels from "./CalendarColumnLabels";
import CalendarGrid from "./CalendarGrid";
import CalendarRowLabels from "./CalendarRowLabels";

const Calendar = (): ReactElement => {
  const classes = useStyles();

  const rowLabelRef = createRef<List>();
  const columnLabelRef = createRef<List>();
  const gridRef = createRef<Grid>();

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
