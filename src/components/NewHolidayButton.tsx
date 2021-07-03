import React, { ReactElement } from "react";
import { Fab, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { t } from "@lingui/macro";

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
