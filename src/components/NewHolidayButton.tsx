import { t } from "@lingui/macro";
import { Fab, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { ReactElement } from "react";

import useStyles from "../styles";

const NewHolidayButton = (): ReactElement => {
  const classes = useStyles();

  return (
    <Tooltip arrow title={t`Add new Holiday`} className={classes.newHolidayButton}>
      <Fab data-testid="new-holiday-fab" color="primary">
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default NewHolidayButton;
