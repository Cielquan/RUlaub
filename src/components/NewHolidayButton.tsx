import { t } from "@lingui/macro";
import { Fab, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import React, { ReactElement } from "react";

const StyledNewHolidayButton = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  right: theme.spacing(3),
}));

const NewHolidayButton = (): ReactElement => (
  <StyledNewHolidayButton>
    <Tooltip arrow title={t`Add new Holiday`}>
      <Fab color="primary">
        <AddIcon />
      </Fab>
    </Tooltip>
  </StyledNewHolidayButton>
);

export default NewHolidayButton;
