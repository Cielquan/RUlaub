import React, { ReactElement, useEffect, useRef } from "react";
import { VariableSizeList as List } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";
import { getDaysInMonth } from "../utils/dateUtils";

import CalendarColumnLabelsMonthCell from "./CalendarColumnLabelsMonthCell";
import innerElementType from "./multigridInnerElementType";

type Props = {
  width: number;
  positionX: number;
  year: number;
};

const CalendarColumnLabelsMonth = ({ width, positionX, year }: Props): ReactElement => {
  const classes = useStyles();

  const columnLabelRef = useRef<List>(null);

  useEffect(() => {
    columnLabelRef.current?.scrollTo(positionX);
  }, [positionX, columnLabelRef]);

  const getMonthWidth = (index: number): number =>
    getDaysInMonth(index + 1, year) * STYLE_CONST.CALENDAR_COLUMN_WIDTH_FULL;

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
      itemCount={12}
      itemSize={getMonthWidth}
      ref={columnLabelRef}
      // needs this local manual overwrite to work, css class gets overwritten
      style={{ overflow: "hidden" }}
    >
      {CalendarColumnLabelsMonthCell}
    </List>
  );
};

export default CalendarColumnLabelsMonth;
