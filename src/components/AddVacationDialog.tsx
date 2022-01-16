import { t } from "@lingui/macro";
import { Flight as FlightIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slide,
  TextField,
  Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import React, {
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";
import { getDaysForDate } from "../utils/dateUtils";
import { getUserIdByName } from "../utils/userUtils";

const today = new Date();
const todayIso = today.toISOString().slice(0, 10);

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

const AddVacationDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeAddVacationDialog, updateVacationsData } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const configState = useSelector((state: State) => state.config);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const langState = configState!.settings.language;
  const usersDataState = useSelector((state: State) => state.usersData);
  const vacationTypesDataState = useSelector((state: State) => state.vacationTypesData);
  const addVacationDialogState = useSelector((state: State) => state.addVacationDialog);

  const [currentUserID, setCurrentUserID] = useState(
    getUserIdByName(usersDataState, configState?.user?.name ?? "") ?? ""
  );
  useEffect(() => {
    setCurrentUserID(
      getUserIdByName(usersDataState, configState?.user?.name ?? "") ?? ""
    );
  }, [configState?.user?.name, usersDataState, addVacationDialogState]);

  const [typeIdForm, setTypeIdForm] = useState<string>("");
  const [startDateForm, setStartDateForm] = useState<Date | null>(new Date(todayIso));
  const [endDateForm, setEndDateForm] = useState<Date | null>(new Date(todayIso));

  const resetFieldStates = useCallback((): void => {
    setTypeIdForm("");
    setStartDateForm(new Date(todayIso));
    setEndDateForm(new Date(todayIso));
  }, []);

  type TypeIDFormError = typeof TypeIDFormError[keyof typeof TypeIDFormError];
  const TypeIDFormError = {
    NONE: "",
    EMPTY: t`Vacation must have a type.`,
  } as const;
  const [typeIDFormError, setTypeIDFormError] = useState<TypeIDFormError>(
    TypeIDFormError.NONE
  );

  type StartDateFormError = typeof StartDateFormError[keyof typeof StartDateFormError];
  const StartDateFormError = {
    NONE: "",
    EMPTY: t`A start date must be selected.`,
    BIGGER: t`Start date cannot be bigger than end date.`,
  } as const;
  const [startDateFormError, setStartDateFormError] = useState<StartDateFormError>(
    StartDateFormError.NONE
  );

  type EndDateFormError = typeof EndDateFormError[keyof typeof EndDateFormError];
  const EndDateFormError = {
    NONE: "",
    EMPTY: t`An end date must be selected.`,
    SMALLER: t`End date cannot be smaller than start date.`,
  } as const;
  const [endDateFormError, setEndDateFormError] = useState<EndDateFormError>(
    EndDateFormError.NONE
  );

  const resetErrorStates = useCallback((): void => {
    setTypeIDFormError(TypeIDFormError.NONE);
    setStartDateFormError(StartDateFormError.NONE);
    setEndDateFormError(EndDateFormError.NONE);
  }, [TypeIDFormError.NONE, StartDateFormError.NONE, EndDateFormError.NONE]);

  const validateTypeID = (value: string): boolean => {
    if (value === "") {
      setTypeIDFormError(TypeIDFormError.EMPTY);
      return false;
    }
    setTypeIDFormError(TypeIDFormError.NONE);
    return true;
  };
  const validateStartDate = (
    value: Date | null,
    endDateToCompare = endDateForm
  ): boolean => {
    if (value === null) {
      setStartDateFormError(StartDateFormError.EMPTY);
      return false;
    }
    if (endDateToCompare !== null && value > endDateToCompare) {
      setStartDateFormError(StartDateFormError.BIGGER);
      return false;
    }
    setStartDateFormError(StartDateFormError.NONE);
    return true;
  };
  const validateEndDate = (
    value: Date | null,
    startDateToCompare = startDateForm
  ): boolean => {
    if (value === null) {
      setEndDateFormError(EndDateFormError.EMPTY);
      return false;
    }
    if (startDateToCompare !== null && value < startDateToCompare) {
      setEndDateFormError(EndDateFormError.SMALLER);
      return false;
    }

    setEndDateFormError(EndDateFormError.NONE);
    return true;
  };

  const validateForm = (): boolean => {
    let error = false;
    error = !validateTypeID(typeIdForm) || error;
    error = !validateStartDate(startDateForm) || error;
    error = !validateEndDate(endDateForm) || error;
    return !error;
  };

  useEffect(() => {
    if (!addVacationDialogState) {
      resetFieldStates();
      resetErrorStates();
    }
  }, [addVacationDialogState, resetErrorStates, resetFieldStates]);

  const onClickSave = (): void => {
    if (
      typeIDFormError !== TypeIDFormError.NONE ||
      startDateFormError !== StartDateFormError.NONE ||
      endDateFormError !== EndDateFormError.NONE ||
      !validateForm()
    )
      return;
    resetErrorStates();

    updateVacationsData({
      newEntries: [
        currentUserID,
        [
          {
            typeId: Number(typeIdForm),
            start: {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              date: startDateForm!.toISOString().slice(0, 10),
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              yearDay: getDaysForDate(startDateForm!),
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              year: startDateForm!.getFullYear(),
            },
            end: {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              date: endDateForm!.toISOString().slice(0, 10),
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              yearDay: getDaysForDate(endDateForm!),
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              year: endDateForm!.getFullYear(),
            },
          },
        ],
      ],
    });
    closeAddVacationDialog();
  };

  const onClickCancel = (): void => {
    resetFieldStates();
    resetErrorStates();
    closeAddVacationDialog();
  };

  const id = "add-vacations-dialog";

  const saveDisabled = currentUserID === "";

  return (
    <Dialog
      aria-labelledby={id}
      data-testid={id}
      open={addVacationDialogState}
      TransitionComponent={Transition}
      PaperProps={{ sx: { maxWidth: "calc(100% - 64px)", minWidth: "35%" } }}
      keepMounted
      onClose={closeAddVacationDialog}
    >
      <DialogTitle id={id} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>{t`Add Vacation`}</Box>
        <FlightIcon />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t`Please select the user to add a vacation to.`}
        </DialogContentText>
        <Box sx={{ paddingY: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="user-select-label">{t`User`}</InputLabel>
            <Select
              labelId="user-select-label"
              id="user-select"
              value={currentUserID}
              label={t`User`}
              onChange={(event: SelectChangeEvent) =>
                setCurrentUserID(event.target.value as string)
              }
            >
              {Object.keys(usersDataState).map((userID) => (
                <MenuItem key={userID} value={userID}>
                  {usersDataState[userID].name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {currentUserID === "" ? (
          <></>
        ) : (
          <>
            <Divider />
            <List
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridTemplateRows: "auto",
                gridTemplateAreas: `"name startDate endDate"`,
              }}
            >
              <ListItem key={`${id}-edit-name`} sx={{ gridArea: "name" }}>
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">{t`Type`}</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={typeIdForm}
                    label={t`Type`}
                    onChange={(event: SelectChangeEvent) => {
                      validateTypeID(event.target.value as string);
                      setTypeIdForm(event.target.value as string);
                    }}
                  >
                    {Object.keys(vacationTypesDataState).map((vacTypeID) => (
                      <MenuItem key={vacTypeID} value={vacTypeID}>
                        {vacationTypesDataState[vacTypeID].name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem key={`${id}-edit-start-date`} sx={{ gridArea: "startDate" }}>
                <DatePicker
                  label={t`Start Date`}
                  mask={langState.dateMask}
                  value={startDateForm}
                  onChange={(newValue) => {
                    validateStartDate(newValue);
                    setStartDateForm(newValue);
                    validateEndDate(endDateForm, newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...params}
                      error={
                        params.error || startDateFormError !== StartDateFormError.NONE
                      }
                      helperText={params.helperText || startDateFormError}
                    />
                  )}
                />
              </ListItem>
              <ListItem key={`${id}-edit-end-date`} sx={{ gridArea: "endDate" }}>
                <DatePicker
                  label={t`End Date`}
                  mask={langState.dateMask}
                  value={endDateForm}
                  onChange={(newValue) => {
                    validateEndDate(newValue);
                    setEndDateForm(newValue);
                    validateStartDate(startDateForm, newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...params}
                      error={params.error || endDateFormError !== EndDateFormError.NONE}
                      helperText={params.helperText || endDateFormError}
                    />
                  )}
                />
              </ListItem>
            </List>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Tooltip arrow title={t`Save`} disableHoverListener={saveDisabled}>
          <span>
            <Button
              data-testid={`${id}-btn-save`}
              disabled={saveDisabled}
              onClick={() => {
                if (typeof onClick === "function") onClick();
                onClickSave();
              }}
            >
              {t`Save`}
            </Button>
          </span>
        </Tooltip>
        <Button
          data-testid={`${id}-btn-cancel`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            onClickCancel();
          }}
        >
          {t`Discard`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
AddVacationDialog.defaultProps = {
  onClick: () => undefined,
};

export default AddVacationDialog;
