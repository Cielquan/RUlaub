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

const HelpPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { closeHelpPage } = bindActionCreators(actionCreators, dispatch);
  const helpPageState = useSelector((state: State) => state.helpPage);

  return (
    <Dialog
      open={helpPageState}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeHelpPage}
    >
      <DialogTitle>RUlaub</DialogTitle>
      <DialogContent>
        <DialogContentText>Some Info abound RUlaub.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHelpPage} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpPage;
