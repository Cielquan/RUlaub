import { Typography } from "@material-ui/core";
import React, { CSSProperties, ReactElement } from "react";

import useStyles from "../styles";

type Props = {
  data: number;
  style: CSSProperties;
};

const CalendarTableHeadCell = ({ data, style }: Props): ReactElement => {
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
      >
        {data}
      </Typography>
    </div>
  );
};

export default CalendarTableHeadCell;
