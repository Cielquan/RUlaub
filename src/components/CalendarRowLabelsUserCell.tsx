import { Typography } from "@mui/material";
import React, { CSSProperties, ReactElement } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import useStyles, { STYLE_CONST } from "../styles";

interface Props {
  index: number;
  style: CSSProperties;
}

const CalendarRowLabelsUserCell = ({ index: rowIndex, style }: Props): ReactElement => {
  const classes = useStyles();

  const dbDataState = useSelector((state: State) => state.dbData);

  return (
    <div
      className={classes.multigridCell}
      style={{
        ...style,
        top: Number(style.top) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        height: Number(style.height) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      <Typography className={classes.multigridRowLabelsUser} variant="body1" noWrap>
        {dbDataState.users[rowIndex].name}
      </Typography>
    </div>
  );
};

export default CalendarRowLabelsUserCell;
