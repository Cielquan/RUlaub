import * as locales from "@mui/material/locale";
import { Box } from "@mui/system";
import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import { bindActionCreators } from "redux";

import { State, actionCreators } from "../state";
import createTheme from "../theme";
import { isLeapYear } from "../utils/dateUtils";
import CalendarBody from "./CalendarBody";
import CalendarColumnLabelsDay from "./CalendarColumnLabelsDay";
import CalendarColumnLabelsMonth from "./CalendarColumnLabelsMonth";
import CalendarRowLabelsUser from "./CalendarRowLabelsUser";
import CalendarStartPage from "./CalendarStartPage";
import CalendarTableHead from "./CalendarTableHead";

const today = new Date();

const Calendar = (): ReactElement => {
  const configState = useSelector((state: State) => state.config);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { theme: themeState, language: langState, yearToShow: year } = configState!.settings;

  const theme = createTheme(themeState, locales[langState.importName]);

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleGridScroll = useCallback((e) => {
    setScrollX(e.scrollLeft);
    setScrollY(e.scrollTop);
  }, []);

  const dispatch = useDispatch();
  const { openDownloadSchoolHolidaysDialog } = bindActionCreators(actionCreators, dispatch);
  const schoolHolidaysDataState = useSelector((state: State) => state.schoolHolidaysData);
  const schoolHolidaysLinkState = useSelector((state: State) => state.schoolHolidaysLink);

  // FIXME:#i# Fix bug "Max update deptch exceeded"
  // useMountDelayOrUpdateEffect(
  //   () => {
  //     if (today.getFullYear() !== year && configState.settings.yearChangeScrollBegin) {
  //       setScrollX(0);
  //     } else {
  //       const days = getDaysForDate(today);
  //       setScrollX((days - 3) * STYLE_CONST.CALENDAR_COLUMN_WIDTH_FULL);
  //     }
  //   },
  //   0,
  //   [year]
  // );

  if (year === null) return <CalendarStartPage />;

  if (schoolHolidaysDataState === {} && schoolHolidaysLinkState !== null)
    openDownloadSchoolHolidaysDialog(year);

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
              today={today}
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
              year={year}
              daysInYear={daysInYear}
            />
          </Box>
        );
      }}
    </AutoSizer>
  );
};

export default Calendar;
