import { styled } from "@mui/material/styles";
import React, { ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";

import { State } from "../state";
import { STYLE_CONST } from "../styles";

import CalendarRowLabelsUserCell from "./CalendarRowLabelsUserCell";
import innerElementType from "./multigridInnerElementType";

const StyledList = styled("div")(({ theme }) => ({
  // absolutely position the label and move it down by a row
  position: "absolute !important" as "absolute",
  top: STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL * 2,
  borderTop: `1px solid ${theme.palette.text.primary}`,
}));

interface Props {
  height: number;
  positionY: number;
}

const CalendarRowLabelsUser = ({ height, positionY }: Props): ReactElement => {
  const vacationDataState = useSelector((state: State) => state.vacationData);

  const rowLabelRef = useRef<List>(null);

  useEffect(() => {
    rowLabelRef.current?.scrollTo(positionY);
  }, [positionY, rowLabelRef]);

  return (
    <StyledList>
      <List
        height={
          height -
          STYLE_CONST.CALENDAR_ROW_HEIGHT -
          STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL * 2
        }
        width={STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH}
        innerElementType={innerElementType}
        itemCount={vacationDataState.length}
        itemSize={STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL}
        ref={rowLabelRef}
        // needs this local manual overwrite to work, css class gets overwritten
        style={{ overflow: "hidden" }}
      >
        {CalendarRowLabelsUserCell}
      </List>
    </StyledList>
  );
};

export default CalendarRowLabelsUser;
