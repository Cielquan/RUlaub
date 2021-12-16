import { t } from "@lingui/macro";
import { Add as AddIcon } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";

const StyledNewHolidayButton = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  right: theme.spacing(3),
}));

const NewHolidayButton = (): ReactElement => {
  const dispatch = useDispatch();
  const { openAddVacationDialog } = bindActionCreators(actionCreators, dispatch);
  const configState = useSelector((state: State) => state.config);

  const disabled: boolean =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    configState!.settings.yearToShow === null || !configState!.settings.databaseUri;

  return (
    <StyledNewHolidayButton>
      <Tooltip arrow title={t`Add new Holiday`}>
        <Fab disabled={disabled} color="primary" onClick={openAddVacationDialog}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </StyledNewHolidayButton>
  );
};

export default NewHolidayButton;
