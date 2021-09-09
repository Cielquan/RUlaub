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
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { forwardRef, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";

import * as pjson from "../../package.json";

const Transition = forwardRef(
  (
    props: TransitionProps & { children?: ReactElement },
    ref: React.Ref<unknown>
    // eslint-disable-next-line react/jsx-props-no-spreading
  ) => <Slide direction="up" ref={ref} {...props} />
);
Transition.defaultProps = {
  children: <></>,
};

interface Props {
  onClick?: () => void;
}

const InfoPage = ({ onClick }: Props): ReactElement => {
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
      data-testid="info-page"
      open={infoPageState}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeInfoPage}
    >
      <DialogTitle>{`RUlaub v${pjson.version}`}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: "pre-wrap" }}>
          <Typography component="span">
            <Trans>
              RUlaub is licensed under either &apos;Apache License 2.0&apos; or
              &apos;MIT License&apos; at your option.
            </Trans>
          </Typography>
          <Typography component="span">
            <Trans>
              For the Source Code, Documentation and copies of the License files please
              see the github repository at: {ghLink}.
            </Trans>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          data-testid="info-page-btn"
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeInfoPage();
          }}
          autoFocus
        >
          <Trans>Close</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
InfoPage.defaultProps = {
  onClick: () => undefined,
};

export default InfoPage;
