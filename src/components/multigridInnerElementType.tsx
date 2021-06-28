import React, { CSSProperties, forwardRef, LegacyRef } from "react";

import useStyles, { STYLE_CONST } from "../styles";

interface innerElementTypeProps {
  style: CSSProperties;
  children?: React.ReactNode;
}

const innerElementType = forwardRef(
  (
    { style, ...rest }: innerElementTypeProps,
    ref: LegacyRef<HTMLDivElement> | undefined
  ): React.ReactElement => {
    const classes = useStyles();

    return (
      <div
        ref={ref}
        className={classes.multigridBackground}
        style={{
          ...style,
          paddingLeft: STYLE_CONST.CALENDAR_GUTTER_SIZE,
          paddingTop: STYLE_CONST.CALENDAR_GUTTER_SIZE,
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    );
  }
);

innerElementType.defaultProps = {
  children: <></>,
};

export default innerElementType;