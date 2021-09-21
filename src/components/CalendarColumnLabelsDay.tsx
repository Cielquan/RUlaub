import { styled } from "@mui/material/styles";
import React, { ReactElement, useEffect, useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";

import { STYLE_CONST } from "../styles";

import CalendarColumnLabelsDayCell from "./CalendarColumnLabelsDayCell";
import innerElementType from "./multigridInnerElementType";

const StyledGrid = styled("div")(({ theme }) => ({
  // absolutely position the label and move it right by a col
  position: "absolute !important" as "absolute",
  left: STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH,
  borderLeft: `1px solid ${theme.palette.text.primary}`,
  top: STYLE_CONST.CALENDAR_ROW_HEIGHT,
}));

interface Props {
  width: number;
  positionX: number;
  today: Date;
  year: number;
  daysInYear: number;
}

const CalendarColumnLabelsDay = ({
  width,
  positionX,
  today,
  year,
  daysInYear,
}: Props): ReactElement => {
  const columnLabelRef = useRef<Grid>(null);

  useEffect(() => {
    columnLabelRef.current?.scrollTo({
      scrollLeft: positionX,
      scrollTop: 0,
    });
  }, [positionX, columnLabelRef]);

  const firstDayOfYear = new Date(`${year}-01-01`);

  return (
    <StyledGrid>
      <Grid
        height={STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL * 2}
        width={width - STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH}
        innerElementType={innerElementType}
        columnCount={daysInYear}
        columnWidth={STYLE_CONST.CALENDAR_COLUMN_WIDTH_FULL}
        rowCount={2}
        rowHeight={STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL}
        itemData={[firstDayOfYear, today]}
        ref={columnLabelRef}
        // needs this local manual overwrite to work, css class gets overwritten
        style={{ overflow: "hidden" }}
      >
        {CalendarColumnLabelsDayCell}
      </Grid>
    </StyledGrid>
  );
};

export default CalendarColumnLabelsDay;
