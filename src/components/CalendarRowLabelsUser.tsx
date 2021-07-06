import React, { ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";

import { State } from "../state";
import useStyles, { STYLE_CONST } from "../styles";

import CalendarRowLabelsUserCell from "./CalendarRowLabelsUserCell";
import innerElementType from "./multigridInnerElementType";

type CalendarRowLabelsUserProps = {
  height: number;
  positionY: number;
};

const CalendarRowLabelsUser = ({
  height,
  positionY,
}: CalendarRowLabelsUserProps): ReactElement => {
  const classes = useStyles();

  const dbDataState = useSelector((state: State) => state.dbData);

  const rowLabelRef = useRef<List>(null);

  useEffect(() => {
    rowLabelRef.current?.scrollTo(positionY);
  }, [positionY, rowLabelRef]);

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
      itemCount={dbDataState.users.length}
      itemSize={STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE}
      ref={rowLabelRef}
      // needs this local manual overwrite to work, css class gets overwritten
      style={{ overflow: "hidden" }}
    >
      {CalendarRowLabelsUserCell}
    </List>
  );
};

export default CalendarRowLabelsUser;
