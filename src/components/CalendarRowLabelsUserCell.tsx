import { t } from "@lingui/macro";
import { Create as CreateIcon } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { CSSProperties, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { State, actionCreators } from "../state";
import { STYLE_CONST } from "../styles";

interface Props {
  index: number;
  style: CSSProperties;
}

const CalendarRowLabelsUserCell = ({ index: rowIndex, style }: Props): ReactElement => {
  const configState = useSelector((state: State) => state.config);
  const usersDataState = useSelector((state: State) => state.usersData);
  const calendarRowUserMapState = useSelector((state: State) => state.calendarRowUserMap);

  const dispatch = useDispatch();
  const { openUsersDialog } = bindActionCreators(actionCreators, dispatch);

  let userID;
  try {
    userID = calendarRowUserMapState[rowIndex.toString()].toString();
  } catch {
    userID = undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const disabled = !configState!.settings.databaseUri;

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
        top: Number(style.top) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        height: Number(style.height) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      {userID === undefined ? (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Tooltip arrow title={t`Edit Users`} disableHoverListener={disabled}>
            <span>
              <IconButton disabled={disabled} onClick={openUsersDialog}>
                <CreateIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      ) : (
        <Typography sx={{ padding: "0 0.3em" }} variant="body1" noWrap>
          {usersDataState[userID]?.name}
        </Typography>
      )}
    </Box>
  );
};

export default CalendarRowLabelsUserCell;
