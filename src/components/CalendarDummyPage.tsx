import { Trans } from "@lingui/macro";
import { DatePicker } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../state";

const CalendarDummyPage = (): ReactElement => {
  const dispatch = useDispatch();
  const { updateLocalConfig } = bindActionCreators(actionCreators, dispatch);

  const [date, setDate] = React.useState(new Date());

  const handleChange = (newDate: Date | null): void => {
    if (newDate !== null) {
      updateLocalConfig({ settings: { yearToShow: newDate.getFullYear() } });
      setDate(newDate);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ padding: 4 }}>
        <Trans>No year to show selected.</Trans>
      </Typography>
      <DatePicker
        views={["year"]}
        value={date}
        onChange={handleChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
};

export default CalendarDummyPage;
