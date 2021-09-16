import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { CSSProperties, ReactElement } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { STYLE_CONST } from "../styles";

interface Props {
  index: number;
  style: CSSProperties;
}

const CalendarRowLabelsUserCell = ({ index: rowIndex, style }: Props): ReactElement => {
  const vacationDataState = useSelector((state: State) => state.vacationData);

  return (
    <Box
      sx={{
        height: STYLE_CONST.CALENDAR_ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        padding: "0 0.2em",
        backgroundColor: "background.default",
      }}
      style={{
        ...style,
        top: Number(style.top) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        height: Number(style.height) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      <Typography sx={{ padding: "0 0.3em" }} variant="body1" noWrap>
        {vacationDataState.users[rowIndex].name}
      </Typography>
    </Box>
  );
};

export default CalendarRowLabelsUserCell;
