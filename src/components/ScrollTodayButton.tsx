import { t } from "@lingui/macro";
import { Today as TodayIcon } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { STYLE_CONST } from "../styles";
import { getDaysForDate } from "../utils/dateUtils";

const today = new Date();

const StyledScrollTodayButton = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  right: theme.spacing(23),
}));

interface Props {
  setScrollX: React.Dispatch<React.SetStateAction<number>>;
}

const ScrollTodayButton = ({ setScrollX }: Props): ReactElement => {
  const configState = useSelector((state: State) => state.config);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { yearToShow } = configState!.settings;

  const disabled: boolean = yearToShow === null || today.getFullYear() !== yearToShow;

  const clickHandle = (): void => {
    const days = getDaysForDate(today);
    setScrollX((days - 3) * STYLE_CONST.CALENDAR_COLUMN_WIDTH_FULL);
  };

  return (
    <StyledScrollTodayButton>
      <Tooltip arrow title={t`Scroll to today`} disableHoverListener={disabled}>
        <span>
          <Fab disabled={disabled} color="primary" onClick={clickHandle}>
            <TodayIcon />
          </Fab>
        </span>
      </Tooltip>
    </StyledScrollTodayButton>
  );
};

export default ScrollTodayButton;
