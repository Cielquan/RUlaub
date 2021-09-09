import * as locales from "@mui/material/locale";
import { adaptV4Theme } from "@mui/material/styles";
import React, { ReactElement, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";

import { State } from "../state";
import useStyles from "../styles";
import createTheme from "../theme";
import { isLeapYear } from "../utils/dateUtils";

import CalendarBody from "./CalendarBody";
import CalendarColumnLabelsDay from "./CalendarColumnLabelsDay";
import CalendarColumnLabelsMonth from "./CalendarColumnLabelsMonth";
import CalendarDummyPage from "./CalendarDummyPage";
import CalendarRowLabelsUser from "./CalendarRowLabelsUser";
import CalendarTableHead from "./CalendarTableHead";

const Calendar = (): ReactElement => {
  const classes = useStyles();

  const themeState = useSelector((state: State) => state.theme);
  const langState = useSelector((state: State) => state.language);
  const localConfigState = useSelector((state: State) => state.localConfig);

  const theme = createTheme(themeState, locales[langState.importName]);
  const year = localConfigState.settings.yearToShow;

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleGridScroll = useCallback((e) => {
    setScrollX(e.scrollLeft);
    setScrollY(e.scrollTop);
  }, []);

  if (year === undefined) {
    return <CalendarDummyPage />;
  }

  const daysInYear = 365 + (isLeapYear(year) ? 1 : 0);

  return (
    <AutoSizer>
      {({ height, width }) => {
        // FAB is 7 spacing in diameter
        const trueHeight = height - Number(theme.spacing(7 + 1).slice(0, -2));
        return (
          <div className={classes.multigrid}>
            <CalendarTableHead year={year} />

            <CalendarColumnLabelsMonth width={width} positionX={scrollX} year={year} />

            <CalendarColumnLabelsDay
              width={width}
              positionX={scrollX}
              year={year}
              daysInYear={daysInYear}
            />

            <CalendarRowLabelsUser height={trueHeight} positionY={scrollY} />

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
