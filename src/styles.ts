import { makeStyles } from "@material-ui/core/styles";

export const STYLE_CONST = {
  CALENDAR_COLUMN_WIDTH: 35,
  CALENDAR_ROW_HEIGHT: 35,
  CALENDAR_COLUMN_WIDTH_FULL: 32 + 2, // incl. gutter size
  CALENDAR_ROW_HEIGHT_FULL: 35 + 2, // incl. gutter size
  CALENDAR_GUTTER_SIZE: 2,
  CALENDAR_ROW_LABEL_WIDTH: 250,
  CALENDAR_SCROLLBAR_THINCKNESS: 6,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: `${theme.mixins.toolbar.minHeight}px`,
    "@media (min-width:0px) and (orientation: landscape)": {
      marginTop: `calc(${theme.mixins.toolbar.minHeight}px - 6px)`,
    },
    "@media (min-width:600px)": {
      marginTop: `calc(${theme.mixins.toolbar.minHeight}px + 8px)`,
    },
  },
  infoButton: {
    marginTop: "auto",
    marginBottom: theme.spacing(2),
  },
  navbarSpacer: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  typographyGrow: {
    flexGrow: 1,
  },
  sideMenuButton: {
    marginRight: theme.spacing(2),
  },
  sideMenuHeader: {
    width: 240,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary to match toolbar height
    ...theme.mixins.toolbar,
  },
  sideMenuNestedButton: {
    paddingLeft: theme.spacing(4),
  },
  helpPageText: {
    whiteSpace: "pre-wrap",
  },
  newHolidayButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  multigrid: {
    position: "relative",
  },
  multigridBackground: {
    backgroundColor: theme.palette.background.paper,
  },
  multigridTableHead: {
    // absolutely position the label and move it right by a col
    position: "absolute !important" as "absolute",
    top: 0,
    left: 0,
  },
  multigridTableHeadCell: {
    width: "100%",
  },
  multigridRowLabels: {
    // absolutely position the label and move it down by a row
    position: "absolute !important" as "absolute",
    top: STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL * 2,
    borderTop: `1px solid ${theme.palette.text.primary}`,
  },
  multigridRowLabelsUser: {
    padding: "0 0.3em",
  },
  multigridColumnLabels: {
    // absolutely position the label and move it right by a col
    position: "absolute !important" as "absolute",
    left: STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH,
    borderLeft: `1px solid ${theme.palette.text.primary}`,
  },
  multigridColumnLabelsDay: {
    top: STYLE_CONST.CALENDAR_ROW_HEIGHT,
  },
  multigridColumnLabelsMonth: {
    padding: "0 0.7em",
  },
  multigridMainGrid: {
    // absolutely position the label and move it down by a row and right by a col
    position: "absolute !important" as "absolute",
    top: STYLE_CONST.CALENDAR_ROW_HEIGHT + STYLE_CONST.CALENDAR_ROW_HEIGHT_FULL * 2,
    left: STYLE_CONST.CALENDAR_ROW_LABEL_WIDTH,
    borderTop: `1px solid ${theme.palette.text.primary}`,
    borderLeft: `1px solid ${theme.palette.text.primary}`,
    "&::-webkit-scrollbar": {
      width: STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS,
      height: STYLE_CONST.CALENDAR_SCROLLBAR_THINCKNESS,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.text.primary,
    },
  },
  multigridCell: {
    height: STYLE_CONST.CALENDAR_ROW_HEIGHT,
    display: "flex",
    alignItems: "center",
    padding: "0 0.2em",
    backgroundColor: theme.palette.background.default,
  },
  currentDate: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
  holiday: {
    backgroundColor: theme.palette.secondary.light,
  },
}));

export default useStyles;
