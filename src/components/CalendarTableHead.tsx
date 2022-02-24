import { styled } from "@mui/material/styles";
import React, { ReactElement } from "react";
import { FixedSizeList as List } from "react-window";

import { STYLE_CONST } from "../styles";
import CalendarTableHeadCell from "./CalendarTableHeadCell";
import innerElementType from "./multigridInnerElementType";

const StyledList = styled("div")(() => ({
  // absolutely position the label and move it right by a col
  position: "absolute !important" as "absolute",
  top: 0,
  left: 0,
}));

interface Props {
  year: number;
}

const CalendarTableHead = ({ year }: Props): ReactElement => (
  <StyledList>
    <List
      layout="horizontal"
      height={STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL * 2}
      width={STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH}
      innerElementType={innerElementType}
      itemCount={1}
      itemData={year}
      itemSize={STYLE_CONST.CALENDAR_COLUMN_WIDTH_FULL}
      // needs this local manual overwrite to work, css class gets overwritten
      style={{ overflow: "hidden" }}
    >
      {CalendarTableHeadCell}
    </List>
  </StyledList>
);

export default CalendarTableHead;
