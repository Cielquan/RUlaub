import * as locales from "@mui/material/locale";
import { Box } from "@mui/system";
import React, { ReactElement, useCallback, useEffect } from "react";
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

interface Props {
  scrollX: number;
  setScrollX: React.Dispatch<React.SetStateAction<number>>;
  scrollY: number;
  setScrollY: React.Dispatch<React.SetStateAction<number>>;
}

const Calendar = ({ scrollX, setScrollX, scrollY, setScrollY }: Props): ReactElement => {
  const configState = useSelector((state: State) => state.config);
  const {
    theme: themeState,
    language: langState,
    yearChangeScrollBegin,
    yearToShow: year,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = configState!.settings;

  const theme = createTheme(themeState, locales[langState.importName]);

  const handleGridScroll = useCallback(
    (e) => {
      setScrollX(e.scrollLeft);
      setScrollY(e.scrollTop);
    },
    [setScrollX, setScrollY]
  );

  const dispatch = useDispatch();
  const { openDownloadSchoolHolidaysDialog } = bindActionCreators(actionCreators, dispatch);
  const schoolHolidaysDataState = useSelector((state: State) => state.schoolHolidaysData);
  const schoolHolidaysLinkState = useSelector((state: State) => state.schoolHolidaysLink);

  useEffect(() => {
    if (yearChangeScrollBegin) {
      setScrollX(0);
    }
  }, [setScrollX, year, yearChangeScrollBegin]);

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
