import { t } from "@lingui/macro";
import {
  Cancel as CancelIcon,
  Create as CreateIcon,
  Delete as DeleteIcon,
  DeleteForever as DeleteForeverIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import {
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { VacationData } from "../backendAPI/types/vacationsData.schema";
import { State } from "../state";
import {
  NewVacationData,
  NewVacationDataPayload,
  VacationDataPayload,
} from "../backendAPI/types/helperTypes";
import { getDaysForDate } from "../utils/dateUtils";

import DialogDataEntry, { EntryStyle, getStyles } from "./DialogDataEntry";

interface Props {
  id: string;
  vacation: VacationData | NewVacationData;
  addVacationToQueue(
    e: VacationDataPayload | [string, undefined] | NewVacationDataPayload
  ): void;
  removeVacationFromQueue(e: string): void;
}

const VacationsDialogEntry = ({
  id,
  vacation,
  addVacationToQueue,
  removeVacationFromQueue,
}: Props): ReactElement => {
  const vacationsDialogState = useSelector((state: State) => state.vacationsDialog);
  const vacationTypesDataState = useSelector((state: State) => state.vacationTypesData);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const langState = useSelector((state: State) => state.config!.settings.language);

  const [newEntry] = useState(Number(id) < 0);
  const [editable, setEditable] = useState(newEntry);
  const [toBeRemoved, setToBeRemoved] = useState(false);
  const [savedOnce, setSavedOnce] = useState(false);

  const [typeID, setTypeID] = useState(vacation.typeId);
  const [startDate, setStartDate] = useState(vacation.start.date);
  const [endDate, setEndDate] = useState(vacation.end.date);

  const [typeIDForm, setTypeIDForm] = useState(typeID.toString());
  const [startDateForm, setStartDateForm] = useState<Date | null>(new Date(startDate));
  const [endDateForm, setEndDateForm] = useState<Date | null>(new Date(endDate));

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
    error = !validateTypeID(typeIDForm) || error;
    error = !validateStartDate(startDateForm) || error;
    error = !validateEndDate(endDateForm) || error;
    return !error;
  };

  useEffect(() => {
    if (!vacationsDialogState) {
      setEditable(false);
      setToBeRemoved(false);
      setSavedOnce(false);

      setTypeID(vacation.typeId);
      setStartDate(vacation.start.date);
      setEndDate(vacation.end.date);

      setTypeIDForm(vacation.typeId.toString());
      setStartDateForm(new Date(vacation.start.date));
      setEndDateForm(new Date(vacation.end.date));

      resetErrorStates();
    }
  }, [vacation, vacationsDialogState, resetErrorStates]);

  let entryStyle;
  if (toBeRemoved) {
    entryStyle = EntryStyle.REMOVED;
  } else if (newEntry) {
    entryStyle = EntryStyle.NEW;
  } else {
    entryStyle = EntryStyle.DEFAULT;
  }

  const ContentComponentView = (
    <>
      {Number(id) >= 0 && (
        <Box
          sx={{
            position: "absolute",
            left: -1,
            top: -1,
            paddingTop: "3px",
            paddingX: 1,
            color: "text.disabled",
            border: "1px solid",
            borderColor: getStyles(entryStyle).borderColor,
            borderTopLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          {id}
        </Box>
      )}
      <List
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto",
          gridTemplateAreas: `"name startDate endDate"`,
        }}
      >
        <ListItem key={`${id}-view-type`} sx={{ gridArea: "name" }}>
          <ListItemText
            primary={vacationTypesDataState[typeID.toString()]?.name ?? t`Error`}
            secondary={t`Type`}
          />
        </ListItem>
        <ListItem key={`${id}-view-start-date`} sx={{ gridArea: "startDate" }}>
          <ListItemText primary={startDate} secondary={t`Start Date`} />
        </ListItem>
        <ListItem key={`${id}-view-end-date`} sx={{ gridArea: "endDate" }}>
          <ListItemText primary={endDate} secondary={t`End Date`} />
        </ListItem>
      </List>
    </>
  );

  const ContentComponentEdit = (
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
            value={typeIDForm}
            label={t`Type`}
            onChange={(event: SelectChangeEvent) => {
              validateTypeID(event.target.value as string);
              setTypeIDForm(event.target.value as string);
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
              error={params.error || startDateFormError !== StartDateFormError.NONE}
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
  );

  const onClickSave = (): void => {
    if (
      typeIDFormError !== TypeIDFormError.NONE ||
      startDateFormError !== StartDateFormError.NONE ||
      endDateFormError !== EndDateFormError.NONE ||
      !validateForm()
    )
      return;
    setTypeID(Number(typeIDForm));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setStartDate(startDateForm!.toISOString().slice(0, 10));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setEndDate(endDateForm!.toISOString().slice(0, 10));
    setEditable(false);
    resetErrorStates();
    setSavedOnce(true);
    addVacationToQueue([
      id,
      {
        ...vacation,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        typeId: Number(typeIDForm!),
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
    ]);
  };
  const onClickEdit = (): void => {
    setTypeIDForm(typeID.toString());
    setStartDateForm(new Date(startDate));
    setEndDateForm(new Date(endDate));
    resetErrorStates();
    setEditable(true);
  };
  const onClickCancel = (): void => {
    if (newEntry && !savedOnce) {
      removeVacationFromQueue(id);
    } else {
      setTypeIDForm(typeID.toString());
      setStartDateForm(new Date(startDate));
      setEndDateForm(new Date(endDate));
      resetErrorStates();
      setEditable(false);
    }
  };
  const onClickDelete = (): void => {
    setToBeRemoved(true);
    if (newEntry) {
      removeVacationFromQueue(id);
    } else {
      addVacationToQueue([id, undefined]);
    }
  };
  const onClickCancelDelete = (): void => {
    setToBeRemoved(false);
    removeVacationFromQueue(id);
  };

  let rightButtonOnClick;
  let rightButtonTooltip;
  let rightButtonIcon;
  if (editable) {
    rightButtonOnClick = onClickCancel;
    rightButtonTooltip = t`Cancel`;
    rightButtonIcon = <CancelIcon />;
  } else if (toBeRemoved) {
    rightButtonOnClick = onClickCancelDelete;
    rightButtonTooltip = t`Cancel deletion of entry`;
    rightButtonIcon = <DeleteForeverIcon />;
  } else {
    rightButtonOnClick = onClickDelete;
    rightButtonTooltip = t`Delete entry`;
    rightButtonIcon = <DeleteIcon />;
  }

  return (
    <DialogDataEntry
      ContentComponent={editable ? ContentComponentEdit : ContentComponentView}
      leftButtonOnClick={editable ? onClickSave : onClickEdit}
      leftButtonTooltip={editable ? t`Save entry` : t`Edit entry`}
      leftButtonIcon={editable ? <SaveIcon /> : <CreateIcon />}
      leftButtonDisabled={
        toBeRemoved ||
        typeIDFormError !== TypeIDFormError.NONE ||
        startDateFormError !== StartDateFormError.NONE ||
        endDateFormError !== EndDateFormError.NONE
      }
      rightButtonOnClick={rightButtonOnClick}
      rightButtonTooltip={rightButtonTooltip}
      rightButtonIcon={rightButtonIcon}
      entryStyle={entryStyle}
    />
  );
};

export default VacationsDialogEntry;
