import React, { ReactElement } from "react";
import clsx from "clsx";
import { FixedSizeList as List } from "react-window";

import useStyles, { STYLE_CONST } from "../styles";
import CalendarTableHeadCell from "./CalendarTableHeadCell";

import innerElementType from "./multigridInnerElementType";

interface CalendarTableHeadProps {
  year: number;
}

const CalendarTableHead = ({ year }: CalendarTableHeadProps): ReactElement => {
  const classes = useStyles();

  return (
    <List
      className={clsx(classes.multigridTableHead)}
      layout="horizontal"
      height={STYLE_CONST.CALENDAR_ROW_HEIGHT * 2}
      width={STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH}
      innerElementType={innerElementType}
      itemCount={1}
      itemData={year}
      itemSize={STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      // needs this local manual overwrite to work, css class gets overwritten
      style={{ overflow: "hidden" }}
    >
      {CalendarTableHeadCell}
    </List>
  );
};

export default CalendarTableHead;
