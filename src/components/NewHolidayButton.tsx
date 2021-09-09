import { t } from "@lingui/macro";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { ReactElement } from "react";

import useStyles from "../styles";

const NewHolidayButton = (): ReactElement => {
  const classes = useStyles();

  return (
    <Tooltip arrow title={t`Add new Holiday`} className={classes.newHolidayButton}>
      <Fab color="primary">
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default NewHolidayButton;
