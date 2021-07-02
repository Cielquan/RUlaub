import React, { ReactElement, useEffect, useRef } from "react";
import { FixedSizeList as List, ListOnScrollProps } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";

import CalendarUserRowLabelsCell from "./CalendarUserRowLabelsCell";
import innerElementType from "./multigridInnerElementType";

type CalendarUserRowLabelsProps = {
  height: number;
  positionY: number;
  scrollHandle: (e: ListOnScrollProps) => void;
};

const CalendarUserRowLabels = ({
  height,
  positionY,
  scrollHandle,
}: CalendarUserRowLabelsProps): ReactElement => {
  const classes = useStyles();

  const rowLabelRef = useRef<List>(null);

  useEffect(() => {
    rowLabelRef.current?.scrollTo(positionY);
  }, [positionY, rowLabelRef]);

  const ROWS = 100;

  return (
    <List
      className={classes.multigridRowLabels}
      height={
        height -
        STYLE_CONST.CALENDAR_ROW_HEIGHT * 2 -
        STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS
      }
      width={STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH}
      innerElementType={innerElementType}
      itemCount={ROWS}
      itemSize={STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      ref={rowLabelRef}
      onScroll={scrollHandle}
      // needs this local manual overwrite to work, css class gets overwritten
      style={{ overflow: "hidden" }}
    >
      {CalendarUserRowLabelsCell}
    </List>
  );
};

export default CalendarUserRowLabels;
