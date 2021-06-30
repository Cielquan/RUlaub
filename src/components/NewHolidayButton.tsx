import React from "react";
import { Fab, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import useStyles from "../styles";

const NewHolidayButton = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Tooltip arrow title="Add new Holiday" className={classes.newHolidayButton}>
      <Fab color="primary">
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default NewHolidayButton;
