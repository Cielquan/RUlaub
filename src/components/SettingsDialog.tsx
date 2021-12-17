import { t } from "@lingui/macro";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Slide,
  Slider,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import { invoke } from "@tauri-apps/api";
import React, { forwardRef, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { LogLevel } from "../backendAPI/types/configFile.schema";
import { useAsync } from "../hooks";
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
  const {
    closeSettingsDialog,
    setLogLevel,
    setTodayAutoscrollLeftOffset,
    setUserName,
    setYearChangeScrollBegin,
  } = bindActionCreators(actionCreators, dispatch);
  const settingsDialogState = useSelector((state: State) => state.settingsDialog);
  const configState = useSelector((state: State) => state.config);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { settings } = configState!;

  const [name, setName] = useState(configState?.user?.name ?? null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [level, setLevel] = useState(settings.logLevel);
  const [offset, setOffset] = useState(settings.todayAutoscrollLeftOffset.toString());
  const [offsetError, setOffsetError] = useState(false);
  const [scroll, setScroll] = useState(settings.yearChangeScrollBegin);

  useEffect(() => {
    setName(configState?.user?.name ?? "");
    setLevel(settings.logLevel);
    setShowAdvanced(false);
    setOffset(settings.todayAutoscrollLeftOffset.toString());
    setOffsetError(false);
    setScroll(settings.yearChangeScrollBegin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsDialogState]);

  const id = "settings-dialog";

  const { value: availableLogLevels } = useAsync(
    async (): Promise<LogLevel[]> => invoke("get_available_log_levels")
  );
  if (availableLogLevels === undefined) return <></>;

  const marks = availableLogLevels.map((lvl, index) => ({
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
        <Box sx={{ flexGrow: 1 }}>{t`Settings`}</Box>
        <SettingsIcon />
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={t`Name`}
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          // eslint-disable-next-line max-len
          helperText={t`Enter your name to have it be preselected when entering new vacation.`}
          onChange={(event): void => {
            setName(event.target.value);
          }}
          sx={{ marginY: 1 }}
        />
        <Box
          sx={{
            marginY: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "&::before, &::after": {
              content: "''",
              borderBottom: "solid 2px",
              borderColor: "primary.main",
              flexGrow: 1,
              marginX: 1,
            },
          }}
        >
          <Button
            onClick={() => setShowAdvanced(!showAdvanced)}
            endIcon={showAdvanced ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          >
            {t`Advanced Settings`}
          </Button>
        </Box>
        <Collapse in={showAdvanced}>
          <FormControl
            component="fieldset"
            fullWidth
            sx={{
              marginY: 1,
              padding: 1,
              border: 1,
              borderRadius: 1,
              borderColor: "action.disabled",
              "&:hover": {
                borderColor: "action.active",
              },
            }}
          >
            <FormLabel component="legend" sx={{ paddingX: 1, fontSize: "0.75em" }}>
              {t`Logging Level`}
            </FormLabel>
            <Box sx={{ width: "90%", marginX: "5%" }}>
              <Slider
                key={`log-level-slider-at-${availableLogLevels.indexOf(level)}`}
                marks={marks}
                defaultValue={availableLogLevels.indexOf(level)}
                min={0}
                max={marks.length - 1}
                onChangeCommitted={(event, newValue) => {
                  setLevel(availableLogLevels[newValue as number]);
                }}
              />
            </Box>
          </FormControl>
          <TextField
            margin="dense"
            id="offset"
            label={t`Left side offset on auto scroll to today.`}
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]+" }}
            fullWidth
            variant="outlined"
            value={offset}
            error={offsetError}
            helperText={offsetError ? t`Only positive numbers are permitted.` : ""}
            onChange={(event) => {
              const newValue = event.target.value;
              setOffsetError(
                newValue === "" ||
                  Number.isNaN(Number(newValue)) ||
                  Number(newValue) < 0
              );
              setOffset(newValue);
            }}
            sx={{ marginY: 1 }}
          />
          <FormControl
            component="fieldset"
            fullWidth
            sx={{
              marginY: 1,
              padding: 1,
              border: 1,
              borderRadius: 1,
              borderColor: "action.disabled",
              "&:hover": {
                borderColor: "action.active",
              },
            }}
          >
            <FormControlLabel
              // eslint-disable-next-line max-len
              label={t`On year switch, scroll to beginning of the year, if not current year.`}
              control={
                <Checkbox
                  checked={scroll}
                  onChange={(event) => setScroll(event.target.checked)}
                />
              }
            />
          </FormControl>
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button
          data-testid={`${id}-btn-save`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeSettingsDialog();
            setLogLevel(level);
            setTodayAutoscrollLeftOffset(
              offsetError ? settings.todayAutoscrollLeftOffset : Number(offset)
            );
            if (name !== undefined && name !== null) setUserName(name);
            setYearChangeScrollBegin(scroll);
          }}
          autoFocus
        >
          {t`Save`}
        </Button>
        <Button
          data-testid={`${id}-btn-cancel`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeSettingsDialog();
          }}
          autoFocus
        >
          {t`Discard`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
SettingsDialog.defaultProps = {
  onClick: () => undefined,
};

export default SettingsDialog;
