import { Trans } from "@lingui/macro";
import { Typography } from "@material-ui/core";
import React, { ReactElement } from "react";

const CalendarDummyPage = (): ReactElement => (
  <Typography align="center" variant="h4">
    <Trans>No year to show selected.</Trans>
  </Typography>
);

export default CalendarDummyPage;
