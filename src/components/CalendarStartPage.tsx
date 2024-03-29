import { t } from "@lingui/macro";
import { StaticDatePicker } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../state";

const CalendarStartPage = (): ReactElement => {
  const dispatch = useDispatch();
  const { setYearToShow } = bindActionCreators(actionCreators, dispatch);

  const [date, setDate] = React.useState<Date>();

  const snackbarHandles = useSnackbar();

  const handleChange = (newDate: Date | null): void => {
    if (newDate !== null) {
      setYearToShow(newDate.getFullYear(), snackbarHandles);
      setDate(newDate);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ paddingTop: 4, paddingBottom: 8 }}>
        {t`No year to show selected. Please select one below:`}
      </Typography>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        views={["year"]}
        value={date}
        allowSameDateSelection
        autoFocus
        onChange={handleChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
};

export default CalendarStartPage;
