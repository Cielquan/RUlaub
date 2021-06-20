import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StorageIcon from "@material-ui/icons/Storage";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";

import { actionCreators, State } from "../state";
import useStyles from "../styles";

const SideMenuDatabaseButton = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { closeSideMenuDatabase, openSideMenuDatabase, closeSideMenu } =
    bindActionCreators(actionCreators, dispatch);
  const sideMenuDatabaseState = useSelector((state: State) => state.sideMenuDatabase);

  const classes = useStyles();

  const itemList: Array<[string, JSX.Element, () => (dispatch: Dispatch) => void]> = [
    ["Create new", <AddIcon />, closeSideMenu],
    ["Change existing", <CreateIcon />, closeSideMenu],
  ];

  return (
    <>
      <ListItem
        button
        onClick={sideMenuDatabaseState ? closeSideMenuDatabase : openSideMenuDatabase}
      >
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="Database" />
        {sideMenuDatabaseState ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={sideMenuDatabaseState} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {itemList.map((item) => (
            <ListItem
              key={item[0]}
              button
              className={classes.sideMenuNestedButton}
              onClick={item[2]}
            >
              <ListItemIcon>{item[1]}</ListItemIcon>
              <ListItemText primary={item[0]} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SideMenuDatabaseButton;
