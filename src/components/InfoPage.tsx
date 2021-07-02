import React, { ReactElement } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";

import { actionCreators, State } from "../state";
import useStyles from "../styles";
import * as pjson from "../../package.json";

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: ReactElement },
    ref: React.Ref<unknown>
    // eslint-disable-next-line react/jsx-props-no-spreading
  ) => <Slide direction="up" ref={ref} {...props} />
);
Transition.defaultProps = {
  children: <></>,
};

const InfoPage = (): ReactElement => {
  const dispatch = useDispatch();
  const { closeInfoPage } = bindActionCreators(actionCreators, dispatch);
  const infoPageState = useSelector((state: State) => state.infoPage);

  const classes = useStyles();

  return (
    <Dialog
      open={infoPageState}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeInfoPage}
    >
      <DialogTitle>{`RUlaub v${pjson.version}`}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.helpPageText}>
          {"RUlaub is licensed under either 'Apache License 2.0' " +
            "or 'MIT License' at your option.\n\n" +
            "Source Code and Documentation are available at "}
          <Link
            href="https://github.com/Cielquan/RUlaub"
            target="_blank"
            rel="noreferrer"
          >
            github
          </Link>
          .
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeInfoPage} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoPage;
