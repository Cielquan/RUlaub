import React, { ReactElement, useEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";

import CalendarColumnLabel from "./CalendarColumnLabel";
import innerElementType from "./multigridInnerElementType";

interface CalendarColumnLabelsProps {
  width: number;
  positionX: number;
  scrollHandle: (e: any) => void;
}

const CalendarColumnLabels = ({
  width,
  positionX,
  scrollHandle,
}: CalendarColumnLabelsProps): ReactElement => {
  const classes = useStyles();

  const columnLabelRef = useRef<List>(null);

  useEffect(() => {
    columnLabelRef.current?.scrollTo(positionX);
  }, [positionX, columnLabelRef]);

  const COLUMNS = 100;

  return (
    <List
      className={classes.multigridColumnLabels}
      layout="horizontal"
      height={STYLE_CONST.CALENDAR_ROW_HEIGHT}
      width={
        width -
        STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH -
        STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS
      }
      innerElementType={innerElementType}
      itemCount={COLUMNS}
      itemSize={STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      ref={columnLabelRef}
      onScroll={scrollHandle}
      style={{ overflow: "hidden" }} // need this manual overwrite to work
    >
      {CalendarColumnLabel}
    </List>
  );
};

export default CalendarColumnLabels;
