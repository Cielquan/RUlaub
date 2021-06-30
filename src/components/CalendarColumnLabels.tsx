import React, { RefObject } from "react";
import { FixedSizeList as List } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";

import MultigridColumnLabel from "./MultigridColumnLabel";
import innerElementType from "./multigridInnerElementType";

interface CalendarColumnLabelsProps {
  width: number;
  scrollHandle: (e: any) => void;
  ref: RefObject<List>;
}

const CalendarColumnLabels = ({
  width,
  scrollHandle,
  ref,
}: CalendarColumnLabelsProps): JSX.Element => {
  const classes = useStyles();

  const COLUMNS = 100;

  return (
    <List
      className={classes.multigridColumnLabels}
      layout="horizontal"
      height={STYLE_CONST.CALENDAR_ROW_HEIGHT}
      width={
        width -
        STYLE_CONST.CALENDAR_COLUMN_WIDTH -
        STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS
      }
      innerElementType={innerElementType}
      itemCount={COLUMNS}
      itemSize={STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      ref={ref}
      onScroll={scrollHandle}
      style={{ overflow: "hidden" }} // need this manual overwrite to work
    >
      {MultigridColumnLabel}
    </List>
  );
};

export default CalendarColumnLabels;
