import { Trans, t } from "@lingui/macro";
import { Info as InfoIcon } from "@mui/icons-material";
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
import { Box } from "@mui/system";
import React, { ReactElement, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import * as pjson from "../../package.json";
import { State, actionCreators } from "../state";

const Transition = forwardRef(
  (
    props: TransitionProps & { children: ReactElement },
    ref: React.Ref<unknown>
    // eslint-disable-next-line react/jsx-props-no-spreading
  ) => <Slide direction="up" ref={ref} {...props} />
);

interface Props {
  onClick?(): void;
}

const AboutPage = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeAboutPage } = bindActionCreators(actionCreators, dispatch);
  const aboutPageState = useSelector((state: State) => state.aboutPage);

  const ghLink = (
    <Link href="https://github.com/Cielquan/RUlaub" target="_blank" rel="noreferrer">
      github
    </Link>
  );

  const id = "info-page";

  return (
    <Dialog
      aria-labelledby={id}
      data-testid={id}
      open={aboutPageState}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeAboutPage}
    >
      <DialogTitle id={id} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>{`RUlaub v${pjson.version}`}</Box>
        <InfoIcon />
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: "pre-wrap" }} component="span">
          <Typography gutterBottom>
            <Trans>
              RUlaub is licensed under either &apos;Apache License 2.0&apos; or &apos;MIT
              License&apos; at your option.
            </Trans>
          </Typography>
          <Typography>
            <Trans>
              For the Source Code, Documentation and copies of the License files please see the
              github repository at: {ghLink}.
            </Trans>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          data-testid={`${id}-btn`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeAboutPage();
          }}
          autoFocus
        >
          {t`Close`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
AboutPage.defaultProps = {
  onClick: () => undefined,
};

export default AboutPage;
