import { DatePicker } from "@mui/lab";
import { Button, Popover, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
  const { updateLocalConfig } = bindActionCreators(actionCreators, dispatch);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleChange = (newDate: Date | null): void => {
    if (newDate !== null) {
      updateLocalConfig({ settings: { yearToShow: newDate.getFullYear() } });
      handleClose();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        <DatePicker
          views={["year"]}
          value={new Date().setFullYear(data)}
          onChange={handleChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />
      </Popover>
    </Box>
  );
};

export default CalendarTableHeadCell;
