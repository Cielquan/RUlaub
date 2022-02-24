import { styled } from "@mui/material/styles";
import React, { ReactElement, useEffect, useRef } from "react";
import { VariableSizeList as List } from "react-window";

import { STYLE_CONST } from "../styles";
import { getDaysInMonth } from "../utils/dateUtils";
import CalendarColumnLabelsMonthCell from "./CalendarColumnLabelsMonthCell";
import innerElementType from "./multigridInnerElementType";

const StyledList = styled("div")(({ theme }) => ({
  // absolutely position the label and move it right by a col
  position: "absolute !important" as "absolute",
  left: STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH,
  borderLeft: `1px solid ${theme.palette.text.primary}`,
}));

interface Props {
  width: number;
  positionX: number;
  year: number;
}

const CalendarColumnLabelsMonth = ({ width, positionX, year }: Props): ReactElement => {
  const columnLabelRef = useRef<List>(null);

  useEffect(() => {
    columnLabelRef.current?.scrollTo(positionX);
  }, [positionX, columnLabelRef]);

  const getMonthWidth = (index: number): number =>
    getDaysInMonth(index + 1, year) * STYLE_CONST.CALENDAR_COLUMN_WIDTH_FULL;

  return (
    <StyledList>
      <List
        layout="horizontal"
        height={STYLE_CONST.CALENDAR_ROW_HEIGHT}
        width={width - STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH}
        innerElementType={innerElementType}
        itemCount={12}
        itemSize={getMonthWidth}
        ref={columnLabelRef}
        // needs this local manual overwrite to work, css class gets overwritten
        style={{ overflow: "hidden" }}
      >
        {CalendarColumnLabelsMonthCell}
      </List>
    </StyledList>
  );
};

export default CalendarColumnLabelsMonth;
