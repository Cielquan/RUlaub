import { t } from "@lingui/macro";
import { Today as TodayIcon } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { STYLE_CONST } from "../styles";
import { getDaysForDate } from "../utils/dateUtils";
import { PositionWrapperType } from "./CalendarWrapper";

const today = new Date();

interface Props {
  setScrollX: React.Dispatch<React.SetStateAction<number>>;
  PositionWrapper: PositionWrapperType;
}

const ScrollTodayButton = ({ setScrollX, PositionWrapper }: Props): ReactElement => {
  const configState = useSelector((state: State) => state.config);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { yearToShow } = configState!.settings;

  const disabled: boolean = yearToShow === null || today.getFullYear() !== yearToShow;

  const clickHandle = (): void => {
    const days = getDaysForDate(today);
    setScrollX((days - 3) * STYLE_CONST.CALENDAR_COLUMN_WIDTH_FULL);
  };

  return (
    <PositionWrapper>
      <Tooltip arrow title={t`Scroll to today`} disableHoverListener={disabled}>
        <span>
          <Fab disabled={disabled} color="primary" onClick={clickHandle}>
            <TodayIcon />
          </Fab>
        </span>
      </Tooltip>
    </PositionWrapper>
  );
};

export default ScrollTodayButton;
