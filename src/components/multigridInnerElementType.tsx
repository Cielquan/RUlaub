import { styled } from "@mui/material/styles";
import React, { CSSProperties, forwardRef, LegacyRef, ReactElement } from "react";

import { STYLE_CONST } from "../styles";

const StyledElement = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

interface Props {
  style: CSSProperties;
  children?: ReactElement;
}

const innerElementType = forwardRef(
  (
    { style, ...rest }: Props,
    ref: LegacyRef<HTMLDivElement> | undefined
  ): ReactElement => (
    <StyledElement
      ref={ref}
      style={{
        ...style,
        paddingLeft: STYLE_CONST.CALENDAR_GUTTER_SIZE,
        paddingTop: STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
);
innerElementType.defaultProps = {
  children: <></>,
};

export default innerElementType;
