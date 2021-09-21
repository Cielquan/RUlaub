import * as locales from "@mui/material/locale";
import { Box } from "@mui/system";
import React, { ReactElement, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";

import { useMountDelayOrUpdateEffect } from "../hooks";
import { State } from "../state";
import { STYLE_CONST } from "../styles";
import createTheme from "../theme";
import { getDaysForDate, isLeapYear } from "../utils/dateUtils";

import CalendarBody from "./CalendarBody";
import CalendarColumnLabelsDay from "./CalendarColumnLabelsDay";
import CalendarColumnLabelsMonth from "./CalendarColumnLabelsMonth";
import CalendarStartPage from "./CalendarStartPage";
import CalendarRowLabelsUser from "./CalendarRowLabelsUser";
import CalendarTableHead from "./CalendarTableHead";

const today = new Date();

const Calendar = (): ReactElement => {
  const configState = useSelector((state: State) => state.config);
  const themeState = configState.settings.theme;
  const langState = configState.settings.language;

  const theme = createTheme(themeState, locales[langState.importName]);
  const year = configState.settings.yearToShow;

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleGridScroll = useCallback((e) => {
    setScrollX(e.scrollLeft);
    setScrollY(e.scrollTop);
  }, []);

  useMountDelayOrUpdateEffect(
    () => {
      if (today.getFullYear() !== year) return;
      const days = getDaysForDate(today);
      setScrollX((days - 3) * STYLE_CONST.CALENDAR_COLUMN_WIDTH_FULL);
    },
    0,
    [year]
  );

  if (year === undefined) {
    return <CalendarStartPage />;
  }

  const daysInYear = 365 + (isLeapYear(year) ? 1 : 0);

  return (
    <AutoSizer>
      {({ height, width }) => {
        // FAB is 7 spacing in diameter
        const trueHeight = height - Number(theme.spacing(7 + 1).slice(0, -2));
        return (
          <Box sx={{ position: "relative" }}>
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
          </Box>
        );
      }}
    </AutoSizer>
  );
};

export default Calendar;
