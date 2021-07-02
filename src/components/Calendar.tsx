import React, { ReactElement, useCallback, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";

import useStyles from "../styles";
import { isLeapYear } from "../utils/dateutils";

import CalendarColumnLabels from "./CalendarColumnLabels";
import CalendarGrid from "./CalendarGrid";
import CalendarRowLabels from "./CalendarRowLabels";

const YEAR = 2021;

const Calendar = (): ReactElement => {
  const classes = useStyles();

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

  const daysInYear = 365 + (isLeapYear(YEAR) ? 1 : 0);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <div className={classes.multigrid}>
          <CalendarRowLabels
            height={height}
            positionY={scrollY}
            scrollHandle={handleRowLabelScroll}
          />

          <CalendarColumnLabels
            width={width}
            positionX={scrollX}
            scrollHandle={handleColumnLabelScroll}
            year={YEAR}
            daysInYear={daysInYear}
          />

          <CalendarGrid
            width={width}
            height={height}
            positionX={scrollX}
            positionY={scrollY}
            scrollHandle={handleGridScroll}
            daysInYear={daysInYear}
          />
        </div>
      )}
    </AutoSizer>
  );
};

export default Calendar;
