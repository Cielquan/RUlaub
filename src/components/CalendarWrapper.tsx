import { StyledComponent } from "@emotion/styled";
import { Theme, styled } from "@mui/material/styles";
import { MUIStyledCommonProps } from "@mui/system";
import { useState } from "react";

import Calendar from "./Calendar";
import NewHolidayButton from "./NewHolidayButton";
import SchoolHolidaysDownloadButton from "./SchoolHolidaysDownloadButton";
import ScrollTodayButton from "./ScrollTodayButton";

export type PositionWrapperType = StyledComponent<
  MUIStyledCommonProps<Theme>,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>;

const createPositionWrapper = (right: number): PositionWrapperType => {
  const comp = styled("div")(({ theme }) => ({
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(right),
  }));
  return comp;
};

const CalendarWrapper = (): React.ReactElement => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  return (
    <>
      <Calendar
        scrollX={scrollX}
        setScrollX={setScrollX}
        scrollY={scrollY}
        setScrollY={setScrollY}
      />
      <NewHolidayButton PositionWrapper={createPositionWrapper(3)} />
      <ScrollTodayButton setScrollX={setScrollX} PositionWrapper={createPositionWrapper(13)} />
      <SchoolHolidaysDownloadButton PositionWrapper={createPositionWrapper(23)} />
    </>
  );
};

export default CalendarWrapper;
