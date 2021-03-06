import { Trans } from "@lingui/macro";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Slide,
  Typography,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

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
  const classes = useStyles();

  const dispatch = useDispatch();
  const { closeInfoPage } = bindActionCreators(actionCreators, dispatch);
  const infoPageState = useSelector((state: State) => state.infoPage);

  const ghLink = (
    <Link href="https://github.com/Cielquan/RUlaub" target="_blank" rel="noreferrer">
      github
    </Link>
  );

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
          <Typography>
            <Trans>
              RUlaub is licensed under either &apos;Apache License 2.0&apos; or
              &apos;MIT License&apos; at your option.
            </Trans>
          </Typography>
          <Typography>
            <Trans>
              For the Source Code, Documentation and copies of the License files please
              see the github repository at: {ghLink}.
            </Trans>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeInfoPage} color="primary" autoFocus>
          <Trans>Close</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoPage;
