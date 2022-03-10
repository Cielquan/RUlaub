import { t } from "@lingui/macro";
import { Add as AddIcon } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { State, actionCreators } from "../state";
import { DBInitLoadState } from "../state/reducers/initialStates";

const StyledNewHolidayButton = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  right: theme.spacing(3),
}));

const NewHolidayButton = (): ReactElement => {
  const dispatch = useDispatch();
  const { openAddVacationDialog } = bindActionCreators(actionCreators, dispatch);
  const configState = useSelector((state: State) => state.config);
  const dbInitLoadState = useSelector((state: State) => state.dbInitLoad);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { databaseUri, yearToShow } = configState!.settings;
  const dbInitLoadOk = dbInitLoadState === DBInitLoadState.OK;

  const disabled: boolean = yearToShow === null || !databaseUri || !dbInitLoadOk;

  return (
    <StyledNewHolidayButton>
      <Tooltip arrow title={t`Add new Holiday`} disableHoverListener={disabled}>
        <span>
          <Fab disabled={disabled} color="primary" onClick={openAddVacationDialog}>
            <AddIcon />
          </Fab>
        </span>
      </Tooltip>
    </StyledNewHolidayButton>
  );
};

export default NewHolidayButton;
