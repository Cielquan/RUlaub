import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";

import { actionCreators, State } from "../state";
import useStyles from "../styles";

// TODO:#i# How to fix eslint errors?
// https://material-ui.com/components/dialogs/#transitions
const Transition = React.forwardRef(
  (
    /* eslint-disable react/require-default-props, @typescript-eslint/no-explicit-any */
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    /* eslint-enable */
    ref: React.Ref<unknown>
    // eslint-disable-next-line react/jsx-props-no-spreading
  ) => <Slide direction="up" ref={ref} {...props} />
);

const InfoPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { closeInfoPage } = bindActionCreators(actionCreators, dispatch);
  const infoPageState = useSelector((state: State) => state.infoPage);
  const appInfoState = useSelector((state: State) => state.appInfo);

  const classes = useStyles();

  return (
    <Dialog
      open={infoPageState}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeInfoPage}
    >
      <DialogTitle>{appInfoState.name}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.helpPageText}>
          {appInfoState.infoText}
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
