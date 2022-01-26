import { t } from "@lingui/macro";
import { StaticDatePicker } from "@mui/lab";
import { Button, Popover, TextField, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { CSSProperties, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../state";
import { STYLE_CONST } from "../styles";

interface Props {
  data: number;
  style: CSSProperties;
}

const CalendarTableHeadCell = ({ data, style }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { setYearToShow } = bindActionCreators(actionCreators, dispatch);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const snackbarHandles = useSnackbar();

  const handleChange = (newDate: Date | null): void => {
    if (newDate !== null) {
      setYearToShow(newDate.getFullYear(), snackbarHandles);
      handleClose();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "yearpicker-popover" : undefined;

  return (
    <Box
      sx={{
        height: STYLE_CONST.CALENDAR_ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        padding: "0 0.2em",
        backgroundColor: "background.default",
      }}
      style={{
        ...style,
        // needs this local manual overwrite to work, css class gets overwritten
        width: "100%",
      }}
    >
      <Tooltip arrow placement="top" title={t`Change displayed year.`}>
        <Button
          aria-describedby={id}
          variant="text"
          fullWidth
          sx={{ height: "100%" }}
          onClick={handleClick}
        >
          <Typography sx={{ flexGrow: 1 }} variant="h3" component="div" align="center">
            {data}
          </Typography>
        </Button>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ border: 2, borderRadius: 0 }}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            views={["year"]}
            value={new Date(`${data}-01-01`)}
            allowSameDateSelection
            autoFocus
            onChange={handleChange}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default CalendarTableHeadCell;
