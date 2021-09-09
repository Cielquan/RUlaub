import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { CSSProperties, ReactElement } from "react";

import { STYLE_CONST } from "../styles";

interface Props {
  data: number;
  style: CSSProperties;
}

const CalendarTableHeadCell = ({ data, style }: Props): ReactElement => (
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
      // needs this local manual overwrite to work, css class gets overwritten
      width: "100%",
    }}
  >
    <Typography sx={{ flexGrow: 1 }} variant="h3" component="div" align="center">
      {data}
    </Typography>
  </Box>
);

export default CalendarTableHeadCell;
