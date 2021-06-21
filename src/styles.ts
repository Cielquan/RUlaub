import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
}));

export default useStyles;
