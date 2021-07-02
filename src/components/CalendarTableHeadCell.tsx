import React, { CSSProperties, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import useStyles from "../styles";

interface CalendarTableHeadCellProps {
  data: number;
  style: CSSProperties;
}

const CalendarTableHeadCell = ({
  data,
  style,
}: CalendarTableHeadCellProps): ReactElement => {
  const classes = useStyles();

  return (
    <div
      className={classes.multigridCell}
      style={{
        ...style,
        // needs this local manual overwrite to work, css class gets overwritten
        width: "100%",
      }}
    >
      <Typography
        className={classes.typographyGrow}
        variant="h3"
        component="div"
        align="center"
        noWrap
      >
        {data}
      </Typography>
    </div>
  );
};

export default CalendarTableHeadCell;
