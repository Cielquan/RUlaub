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
import { useSnackbar } from "notistack";
import React, { forwardRef, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { LogLevel } from "../backendAPI/types/configFile.schema";
import { useAsync } from "../hooks";
import { actionCreators, State } from "../state";

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
  const [nameForm, setNameForm] = useState(name);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [level, setLevel] = useState(settings.logLevel);
  const [levelForm, setLevelForm] = useState(level);
  const [offset, setOffset] = useState(settings.todayAutoscrollLeftOffset.toString());
  const [offsetForm, setOffsetForm] = useState(offset);
  const [scroll, setScroll] = useState(settings.yearChangeScrollBegin);
  const [scrollForm, setScrollForm] = useState(scroll);

  const [submittedOnce, setSubmittedOnce] = useState(false);

  type OffsetFormError = typeof OffsetFormError[keyof typeof OffsetFormError];
  const OffsetFormError = {
    NONE: "",
    EMPTY: t`An offset must be set.`,
    NAN: t`Offset must be a number.`,
    NEGATIV: t`Offset must be positiv.`,
  } as const;
  const [offsetFormError, setOffsetFormError] = useState<OffsetFormError>(
    OffsetFormError.NONE
  );

  const validateOffset = (value: string): boolean => {
    if (value === "") {
      setOffsetFormError(OffsetFormError.EMPTY);
      return false;
    }
    if (Number.isNaN(Number(value))) {
      setOffsetFormError(OffsetFormError.NAN);
      return false;
    }
    if (Number(value) < 0) {
      setOffsetFormError(OffsetFormError.NEGATIV);
      return false;
    }
    setOffsetFormError(OffsetFormError.NONE);
    return true;
  };

  useEffect(() => {
    setName(configState?.user?.name ?? "");
    setNameForm(configState?.user?.name ?? "");
    setLevel(settings.logLevel);
    setLevelForm(settings.logLevel);
    setShowAdvanced(false);
    setOffset(settings.todayAutoscrollLeftOffset.toString());
    setOffsetForm(settings.todayAutoscrollLeftOffset.toString());
    setOffsetFormError(OffsetFormError.NONE);
    setScroll(settings.yearChangeScrollBegin);
    setScrollForm(settings.yearChangeScrollBegin);
    setSubmittedOnce(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsDialogState]);

  const id = "settings-dialog";

  const snackbarHandles = useSnackbar();

  const { value: availableLogLevels } = useAsync(
    async (): Promise<LogLevel[]> => invoke("get_available_log_levels")
  );
  if (availableLogLevels === undefined) return <></>;

  const marks = availableLogLevels.map((lvl, index) => ({
    value: index,
    label: lvl.charAt(0).toUpperCase() + lvl.slice(1).toLowerCase(),
  }));

  const saveChanges = (): boolean => {
    if (offset !== offsetForm) {
      if (offsetFormError || !validateOffset(offsetForm)) return false;
      setOffset(offsetForm);
      setTodayAutoscrollLeftOffset(Number(offsetForm), snackbarHandles);
    }
    if (level !== levelForm) {
      setLevel(levelForm);
      setLogLevel(levelForm, snackbarHandles);
    }
    if (scroll !== scrollForm) {
      setScroll(scrollForm);
      setYearChangeScrollBegin(scrollForm, snackbarHandles);
    }
    if (name !== nameForm && nameForm !== undefined && nameForm !== null) {
      setName(nameForm);
      setUserName(nameForm, snackbarHandles);
    }
    return true;
  };

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
          value={nameForm}
          helperText={t`Enter your name to have it be
          preselected when entering new vacation.`}
          onChange={(event): void => {
            setNameForm(event.target.value);
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
                key={`log-level-slider-at-${availableLogLevels.indexOf(levelForm)}`}
                marks={marks}
                defaultValue={availableLogLevels.indexOf(levelForm)}
                min={0}
                max={marks.length - 1}
                onChangeCommitted={(event, newValue) => {
                  setLevelForm(availableLogLevels[newValue as number]);
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
            value={offsetForm}
            error={offsetFormError !== OffsetFormError.NONE}
            helperText={offsetFormError}
            onChange={(event) => {
              if (submittedOnce) validateOffset(event.target.value);
              setOffsetForm(event.target.value);
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
              label={t`On year switch, scroll to beginning
              of the year, if not current year.`}
              control={
                <Checkbox
                  checked={scrollForm}
                  onChange={(event) => setScrollForm(event.target.checked)}
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
            setSubmittedOnce(true);
            if (!saveChanges()) return;
            closeSettingsDialog();
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
