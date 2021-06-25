import { makeStyles } from "@material-ui/core/styles";

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
  navbarTitle: {
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
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));

export default useStyles;
