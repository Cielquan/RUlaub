import { t } from "@lingui/macro";
import { Download as DownloadIcon } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { State, actionCreators } from "../state";
import { DBInitLoadState } from "../state/reducers/initialStates";
import { PositionWrapperType } from "./CalendarWrapper";

interface Props {
  PositionWrapper: PositionWrapperType;
}

const SchoolHolidaysDownloadButton = ({ PositionWrapper }: Props): ReactElement => {
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
    yearToShow === null || !databaseUri || !dbInitLoadOk || schoolHolidaysLinkState === null;

  const clickHandle = (): void => {
    if (yearToShow === null) return;
    downloadSchoolHolidaysDataFromLink(snackbarHandles, yearToShow);
  };

  return (
    <PositionWrapper>
      <Tooltip
        arrow
        title={t`Load School Holidays for year: ${yearToShow ?? "None"}`}
        disableHoverListener={disabled}
      >
        <span>
          <Fab disabled={disabled} color="primary" onClick={clickHandle}>
            <DownloadIcon />
          </Fab>
        </span>
      </Tooltip>
    </PositionWrapper>
  );
};

export default SchoolHolidaysDownloadButton;
