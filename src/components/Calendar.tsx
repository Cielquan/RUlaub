import { Theme } from "@material-ui/core";
import React, { ReactElement, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";

import { State } from "../state";
import useStyles from "../styles";
import { isLeapYear } from "../utils/dateutils";

import CalendarColumnLabelsDay from "./CalendarColumnLabelsDay";
import CalendarBody from "./CalendarBody";
import CalendarColumnLabelsMonth from "./CalendarColumnLabelsMonth";
import CalendarTableHead from "./CalendarTableHead";
import CalendarRowLabelsUser from "./CalendarRowLabelsUser";

type CalendarProps = {
  theme: Theme;
};

const Calendar = ({ theme }: CalendarProps): ReactElement => {
  const classes = useStyles();

  const localConfigState = useSelector((state: State) => state.localConfig);
  const year = localConfigState.settings.yearToShow;

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

  const daysInYear = 365 + (isLeapYear(year) ? 1 : 0);

  return (
    <AutoSizer>
      {({ height, width }) => {
        // FAB is 7 spacing in diameter
        const trueHeight = height - theme.spacing(7 + 1);
        return (
          <div className={classes.multigrid}>
            <CalendarTableHead year={year} />

            <CalendarColumnLabelsMonth
              width={width}
              positionX={scrollX}
              scrollHandle={handleColumnLabelScroll}
              year={year}
            />

            <CalendarColumnLabelsDay
              width={width}
              positionX={scrollX}
              scrollHandle={handleColumnLabelScroll}
              year={year}
              daysInYear={daysInYear}
            />

            <CalendarRowLabelsUser
              height={trueHeight}
              positionY={scrollY}
              scrollHandle={handleRowLabelScroll}
            />

            <CalendarBody
              width={width}
              height={trueHeight}
              positionX={scrollX}
              positionY={scrollY}
              scrollHandle={handleGridScroll}
              daysInYear={daysInYear}
            />
          </div>
        );
      }}
    </AutoSizer>
  );
};

export default Calendar;
