import { Trans } from "@lingui/macro";
import { Settings as SettingsIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import React, { forwardRef, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";

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

const SettingsDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeSettingsDialog, updateConfig } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const settingsDialogState = useSelector((state: State) => state.settingsDialog);
  const [name, setName] = useState<string>();

  const id = "settings-dialog";

  return (
    <Dialog
      aria-labelledby={id}
      data-testid={id}
      open={settingsDialogState}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeSettingsDialog}
    >
      <DialogTitle id={id} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Trans>Settings</Trans>
        </Box>
        <SettingsIcon />
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: "pre-wrap" }}>
          <Typography component="span">
            <Trans>
              Enter your name to have it be preselected when entering new vacation.
            </Trans>
          </Typography>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(event): void => {
            setName(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          data-testid={`${id}-btn-save`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeSettingsDialog();
            updateConfig({ user: { name } });
          }}
          autoFocus
        >
          <Trans>Save</Trans>
        </Button>
        <Button
          data-testid={`${id}-btn-cancel`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeSettingsDialog();
          }}
          autoFocus
        >
          <Trans>Cancel</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
SettingsDialog.defaultProps = {
  onClick: () => undefined,
};

export default SettingsDialog;
