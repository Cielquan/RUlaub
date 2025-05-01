import { Trans, t } from "@lingui/macro";
import { Download as DownloadIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { ReactElement, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { State, actionCreators } from "../state";
import { downloadSchoolHolidaysDialogIsOpen } from "../state/reducers/initialStates";

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

const DownloadSchoolHolidaysDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeDownloadSchoolHolidaysDialog, downloadSchoolHolidaysDataFromLink } =
    bindActionCreators(actionCreators, dispatch);
  const downloadSchoolHolidaysDialogState = useSelector(
    (state: State) => state.downloadSchoolHolidaysDialog
  );
  const schoolHolidaysLinkState = useSelector((state: State) => state.schoolHolidaysLink);

  const snackbarHandles = useSnackbar();

  const id = "download-school-holidays-dialog";

  return (
    <Dialog
      aria-labelledby={id}
      data-testid={id}
      open={downloadSchoolHolidaysDialogState.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDownloadSchoolHolidaysDialog}
    >
      <DialogTitle id={id} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Trans>Download school holidays?</Trans>
        </Box>
        <DownloadIcon />
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: "pre-wrap" }} component="span">
          <Typography gutterBottom>
            <Trans>
              No school holiday data found in the database. Do you want to download school holiday
              data from the set link?
            </Trans>
          </Typography>
          <Typography>
            <Trans>Link: {schoolHolidaysLinkState}</Trans>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeDownloadSchoolHolidaysDialog();
            if (downloadSchoolHolidaysDialogIsOpen(downloadSchoolHolidaysDialogState))
              downloadSchoolHolidaysDataFromLink(
                snackbarHandles,
                downloadSchoolHolidaysDialogState.year
              );
          }}
          autoFocus
        >
          {t`Yes`}
        </Button>
        <Button
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeDownloadSchoolHolidaysDialog();
          }}
          autoFocus
        >
          {t`No`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
DownloadSchoolHolidaysDialog.defaultProps = {
  onClick: () => undefined,
};

export default DownloadSchoolHolidaysDialog;
