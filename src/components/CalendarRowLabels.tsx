import React, { ReactElement, useEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";

import CalendarRowLabel from "./CalendarRowLabel";
import innerElementType from "./multigridInnerElementType";

interface CalendarRowLabelsProps {
  height: number;
  positionY: number;
  scrollHandle: (e: any) => void;
}

const CalendarRowLabels = ({
  height,
  positionY,
  scrollHandle,
}: CalendarRowLabelsProps): ReactElement => {
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
        STYLE_CONST.CALENDAR_ROW_HEIGHT -
        STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS
      }
      width={STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH}
      innerElementType={innerElementType}
      itemCount={ROWS}
      itemSize={STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      ref={rowLabelRef}
      onScroll={scrollHandle}
      style={{ overflow: "hidden" }} // need this manual overwrite to work
    >
      {CalendarRowLabel}
    </List>
  );
};

export default CalendarRowLabels;
