import { styled } from "@mui/material/styles";
import React, { ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FixedSizeGrid as Grid, GridOnScrollProps } from "react-window";

import { State } from "../state";
import { STYLE_CONST } from "../styles";

import CalendarBodyCell from "./CalendarBodyCell";
import innerElementType from "./multigridInnerElementType";

const StyledGrid = styled("div")(({ theme }) => ({
  // absolutely position the label and move it down by a row and right by a col
  position: "absolute !important" as "absolute",
  top: STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL * 2,
  left: STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH,
  borderTop: `1px solid ${theme.palette.text.primary}`,
  borderLeft: `1px solid ${theme.palette.text.primary}`,
}));

interface Props {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  scrollHandle: (e: GridOnScrollProps) => void;
  daysInYear: number;
}

const CalendarBody = ({
  width,
  height,
  positionX,
  positionY,
  scrollHandle,
  daysInYear,
}: Props): ReactElement => {
  const vacationDataState = useSelector((state: State) => state.vacationData);

  const gridRef = useRef<Grid>(null);

  useEffect(() => {
    gridRef.current?.scrollTo({
      scrollLeft: positionX,
      scrollTop: positionY,
    });
  }, [positionY, positionX, gridRef]);

  return (
    <StyledGrid>
      <Grid
        height={
          height -
          STYLE_CONST.CALENDAR_ROW_HEIGHT -
          STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL * 2
        }
        width={width - STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH}
        innerElementType={innerElementType}
        columnCount={daysInYear}
        columnWidth={STYLE_CONST.CALENDAR_COLUMN_WIDTH_FULL}
        rowCount={vacationDataState.length}
        rowHeight={STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL}
        ref={gridRef}
        onScroll={scrollHandle}
      >
        {CalendarBodyCell}
      </Grid>
    </StyledGrid>
  );
};

export default CalendarBody;
