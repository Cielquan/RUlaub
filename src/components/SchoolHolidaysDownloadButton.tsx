import { t } from "@lingui/macro";
import { Add as AddIcon } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { State, actionCreators } from "../state";
import { DBInitLoadState } from "../state/reducers/initialStates";

const StyledSchoolHolidaysDownloadButton = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  right: theme.spacing(13),
}));

const SchoolHolidaysDownloadButton = (): ReactElement => {
  const dispatch = useDispatch();
  const { downloadSchoolHolidaysDataFromLink } = bindActionCreators(actionCreators, dispatch);
  const configState = useSelector((state: State) => state.config);
  const dbInitLoadState = useSelector((state: State) => state.dbInitLoad);
  const schoolHolidaysLinkState = useSelector((state: State) => state.schoolHolidaysLink);

  const snackbarHandles = useSnackbar();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { databaseUri, yearToShow } = configState!.settings;
  const dbInitLoadOk = dbInitLoadState === DBInitLoadState.OK;

  const disabled: boolean =
    schoolHolidaysLinkState === null || yearToShow === null || !databaseUri || !dbInitLoadOk;

  const clickHandle = (): void => {
    if (yearToShow === null) return;
    downloadSchoolHolidaysDataFromLink(snackbarHandles, yearToShow);
  };

  return (
    <StyledSchoolHolidaysDownloadButton>
      <Tooltip
        arrow
        title={t`Load School Holidays for year: ${yearToShow ?? "None"}`}
        disableHoverListener={disabled}
      >
        <span>
          <Fab disabled={disabled} color="primary" onClick={clickHandle}>
            <AddIcon />
          </Fab>
        </span>
      </Tooltip>
    </StyledSchoolHolidaysDownloadButton>
  );
};

export default SchoolHolidaysDownloadButton;
