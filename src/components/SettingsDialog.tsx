import { t, Trans } from "@lingui/macro";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Slide,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import React, { forwardRef, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { LogLevel } from "../backendAPI/types/configFile.schema";
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
  onClick?(): void;
}

const SettingsDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeSettingsDialog, updateConfig } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const settingsDialogState = useSelector((state: State) => state.settingsDialog);
  const configState = useSelector((state: State) => state.config);
  const [name, setName] = useState(configState.user.name);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [level, setLevel] = useState<LogLevel>(configState.settings.logLevel);

  useEffect(() => {
    setName(configState.user.name);
    setLevel(configState.settings.logLevel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsDialogState]);

  const id = "settings-dialog";

  const logLevels: LogLevel[] = ["ERROR", "WARNING", "INFO", "DEBUG", "TRACE"];
  const marks = logLevels.map((lvl, index) => ({
    value: index,
    label: lvl.charAt(0).toUpperCase() + lvl.slice(1).toLowerCase(),
  }));

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
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
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
          label={t`Name`}
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(event): void => {
            setName(event.target.value);
          }}
        />
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => setShowAdvanced(!showAdvanced)}
          endIcon={showAdvanced ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        >
          {t`Advanced Settings`}
        </Button>
        <Collapse in={showAdvanced}>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <Typography
              id="log-level-slider-label"
              gutterBottom
              sx={{ color: "text.secondary" }}
            >
              {t`Logging Level`}
            </Typography>
            <Box sx={{ width: "90%", marginX: "5%" }}>
              <Slider
                key={`log-level-slider-at-${logLevels.indexOf(level)}`}
                aria-labelledby="log-level-slider-label"
                marks={marks}
                defaultValue={logLevels.indexOf(level)}
                min={0}
                max={marks.length - 1}
                onChangeCommitted={(event, newValue) => {
                  setLevel(logLevels[newValue as number]);
                }}
              />
            </Box>
          </FormControl>
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button
          data-testid={`${id}-btn-save`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeSettingsDialog();
            updateConfig({ user: { name }, settings: { logLevel: level } });
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
