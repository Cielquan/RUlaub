import React from "react";
import { FixedSizeList as List } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";

import MultigridRowLabel from "./MultigridRowLabel";
import innerElementType from "./multigridInnerElementType";

interface CalendarRowLabelsProps {
  height: number;
  scrollHandle: (e: any) => void;
  ref: React.RefObject<List>;
}

const CalendarRowLabels = ({
  height,
  scrollHandle,
  ref,
}: CalendarRowLabelsProps): React.ReactElement => {
  const classes = useStyles();

  const ROWS = 100;

  return (
    <List
      className={classes.multigridRowLabels}
      height={
        height -
        STYLE_CONST.CALENDAR_ROW_HEIGHT -
        STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS
      }
      width={STYLE_CONST.CALENDAR_COLUMN_WIDTH}
      innerElementType={innerElementType}
      itemCount={ROWS}
      itemSize={STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      ref={ref}
      onScroll={scrollHandle}
      style={{ overflow: "hidden" }} // need this manual overwrite to work
    >
      {MultigridRowLabel}
    </List>
  );
};

export default CalendarRowLabels;
