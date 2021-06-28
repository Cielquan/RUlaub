import React, { CSSProperties } from "react";

import useStyles, { STYLE_CONST } from "../styles";

interface MultigridRowLabelProps {
  index: number;
  style: CSSProperties;
}

const MultigridRowLabel = ({
  index: rowIndex,
  style,
}: MultigridRowLabelProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <div
      className={classes.multigridCell}
      style={{
        ...style,
        top: Number(style.top) + STYLE_CONST.CALENDAR_GUTTER_SIZE,
        height: Number(style.height) - STYLE_CONST.CALENDAR_GUTTER_SIZE,
      }}
    >
      r {rowIndex}
    </div>
  );
};

export default MultigridRowLabel;
