// // Grid gutters: https://codesandbox.io/s/2w8wmlm89p?file=/index.js
// // Grid sync scroll:
// // eslint-disable-next-line max-len
// // https://codesandbox.io/s/scroll-synced-multigrids-h2g26?from-embed=&file=/src/index.js
import React, {
  CSSProperties,
  forwardRef,
  LegacyRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { FixedSizeList as List, FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
// import { Button } from "@material-ui/core";

import useStyles, { STYLE_CONST } from "../styles";

import MultigridCell from "./MultigridCell";
import MultigridColumnLabel from "./MultigridColumnLabel";
import MultigridRowLabel from "./MultigridRowLabel";

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

const Calendar = (): React.ReactElement => {
  const classes = useStyles();

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const rowLabelRef: React.RefObject<List> = React.createRef();
  const columnLabelRef: React.RefObject<List> = React.createRef();
  const gridRef: React.RefObject<Grid> = React.createRef();

  // NOTE: they are wrapped in `useCallback` for performance reasons
  const handleGridScroll = useCallback((e) => {
    // from the official docs:
    // > scrollUpdateWasRequested is a boolean.
    // > This value is true if the scroll was caused by scrollTo() or scrollToItem(),
    // > And false if it was the result of a user interaction in the browser.
    //
    // so we want to ignore events that were from `scrollTo`
    if (e.scrollUpdateWasRequested) return;

    setScrollX(e.scrollLeft);
    setScrollY(e.scrollTop);
  }, []);

  const handleRowLabelScroll = useCallback((e) => {
    // see comment above
    if (e.scrollUpdateWasRequested) return;

    setScrollY(e.scrollOffset);
  }, []);

  const handleColumnLabelScroll = useCallback((e) => {
    // see comment above
    if (e.scrollUpdateWasRequested) return;

    setScrollX(e.scrollOffset);
  }, []);

  // last, but not least, add an effect to watch for changes in `scrollX` or `scrollY`.
  // if there is a change, then call `scrollTo`
  useEffect(() => {
    rowLabelRef.current?.scrollTo(scrollY);
    columnLabelRef.current?.scrollTo(scrollX);
    gridRef.current?.scrollTo({
      scrollLeft: scrollX,
      scrollTop: scrollY,
    });
  }, [scrollY, scrollX, rowLabelRef, columnLabelRef, gridRef]);

  const COLUMNS = 100;
  const ROWS = 100;

  // const scroll = (): void => {
  //   gridRef.current?.scrollToItem({ columnIndex: 0, rowIndex: 0 });
  // };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <div className={classes.multigrid}>
          <List
            className={classes.multigridRowLabels}
            height={
              height -
              STYLE_CONST.CALENDAR_ROW_HEIGHT -
              STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS
            }
            width={STYLE_CONST.CALENDAR_COLUMN_WIDTH}
            innerElementType={innerElementType}
            itemCount={ROWS}
            itemSize={
              STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE
            }
            ref={rowLabelRef}
            onScroll={handleRowLabelScroll}
            style={{ overflow: "hidden" }} // need this manual overwrite to work
          >
            {MultigridRowLabel}
          </List>

          <List
            className={classes.multigridColumnLabels}
            layout="horizontal"
            height={STYLE_CONST.CALENDAR_ROW_HEIGHT}
            width={
              width -
              STYLE_CONST.CALENDAR_COLUMN_WIDTH -
              STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS
            }
            innerElementType={innerElementType}
            itemCount={COLUMNS}
            itemSize={
              STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE
            }
            ref={columnLabelRef}
            onScroll={handleColumnLabelScroll}
            style={{ overflow: "hidden" }} // need this manual overwrite to work
          >
            {MultigridColumnLabel}
          </List>

          <Grid
            className={classes.multigridMainGrid}
            height={height - STYLE_CONST.CALENDAR_ROW_HEIGHT}
            width={width - STYLE_CONST.CALENDAR_COLUMN_WIDTH}
            innerElementType={innerElementType}
            columnCount={COLUMNS}
            columnWidth={
              STYLE_CONST.CALENDAR_COLUMN_WIDTH + STYLE_CONST.CALENDAR_GUTTER_SIZE
            }
            rowCount={ROWS}
            rowHeight={
              STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_GUTTER_SIZE
            }
            ref={gridRef}
            onScroll={handleGridScroll}
          >
            {MultigridCell}
          </Grid>
        </div>
      )}
    </AutoSizer>
  );
};

export default Calendar;
