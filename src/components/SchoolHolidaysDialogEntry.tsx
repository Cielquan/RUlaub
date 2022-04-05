import { t } from "@lingui/macro";
import {
  Cancel as CancelIcon,
  Create as CreateIcon,
  DeleteForever as DeleteForeverIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import { List, ListItem, ListItemText, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  NewSchoolHolidayData,
  NewSchoolHolidayDataPayload,
  SchoolHolidayDataPayload,
} from "../backendAPI/types/helperTypes";
import { SchoolHolidayData } from "../backendAPI/types/schoolHolidaysData.schema";
import { State } from "../state";
import { getDaysForDate } from "../utils/dateUtils";
import DialogDataEntry, { EntryStyle, getStyles } from "./DialogDataEntry";

interface Props {
  id: string;
  schoolHoliday: SchoolHolidayData | NewSchoolHolidayData;
  addSchoolHolidayToQueue(
    e: SchoolHolidayDataPayload | [string, undefined] | NewSchoolHolidayDataPayload
  ): void;
  removeSchoolHolidayFromQueue(e: string): void;
  addEntryInProgress(): void;
  removeEntryInProgress(): void;
}

const SchoolHolidaysDialogEntry = ({
  id,
  schoolHoliday,
  addSchoolHolidayToQueue,
  removeSchoolHolidayFromQueue,
  addEntryInProgress,
  removeEntryInProgress,
}: Props): ReactElement => {
  const schoolHolidaysDialogState = useSelector((state: State) => state.schoolHolidaysDialog);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const langState = useSelector((state: State) => state.config!.settings.language);

  const [newEntry] = useState(Number(id) < 0);
  const [editable, setEditable] = useState(newEntry);
  const [toBeRemoved, setToBeRemoved] = useState(false);
  const [savedOnce, setSavedOnce] = useState(false);

  const [name, setName] = useState(schoolHoliday.name);
  const [startDate, setStartDate] = useState(schoolHoliday.start.date);
  const [endDate, setEndDate] = useState(schoolHoliday.end.date);

  const [nameForm, setNameForm] = useState(name);
  const [startDateForm, setStartDateForm] = useState<Date | null>(new Date(startDate));
  const [endDateForm, setEndDateForm] = useState<Date | null>(new Date(endDate));

  type NameFormError = typeof NameFormError[keyof typeof NameFormError];
  const NameFormError = {
    NONE: "",
    EMPTY: t`School Holiday must have a name.`,
  } as const;
  const [nameFormError, setNameFormError] = useState<NameFormError>(NameFormError.NONE);

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
  const [endDateFormError, setEndDateFormError] = useState<EndDateFormError>(EndDateFormError.NONE);

  const resetErrorStates = useCallback((): void => {
    setNameFormError(NameFormError.NONE);
    setStartDateFormError(StartDateFormError.NONE);
    setEndDateFormError(EndDateFormError.NONE);
  }, [NameFormError.NONE, StartDateFormError.NONE, EndDateFormError.NONE]);

  const validateName = (value: string): boolean => {
    if (value === "") {
      setNameFormError(NameFormError.EMPTY);
      return false;
    }
    setNameFormError(NameFormError.NONE);
    return true;
  };
  const validateStartDate = (value: Date | null, endDateToCompare = endDateForm): boolean => {
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
  const validateEndDate = (value: Date | null, startDateToCompare = startDateForm): boolean => {
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
    error = !validateName(nameForm) || error;
    error = !validateStartDate(startDateForm) || error;
    error = !validateEndDate(endDateForm) || error;
    return !error;
  };

  useEffect(() => {
    if (!schoolHolidaysDialogState) {
      setEditable(false);
      setToBeRemoved(false);
      setSavedOnce(false);

      setName(schoolHoliday.name);
      setStartDate(schoolHoliday.start.date);
      setEndDate(schoolHoliday.end.date);

      setNameForm(schoolHoliday.name);
      setStartDateForm(new Date(schoolHoliday.start.date));
      setEndDateForm(new Date(schoolHoliday.end.date));

      resetErrorStates();
    }
  }, [schoolHoliday, schoolHolidaysDialogState, resetErrorStates]);

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
        <ListItem key={`${id}-view-name`} sx={{ gridArea: "name" }}>
          <ListItemText primary={name} secondary={t`Name`} />
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
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={t`Name`}
          type="text"
          variant="outlined"
          value={nameForm}
          error={nameFormError !== NameFormError.NONE}
          helperText={nameFormError}
          onChange={(event): void => {
            validateName(event.target.value);
            setNameForm(event.target.value);
          }}
        />
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
      nameFormError !== NameFormError.NONE ||
      startDateFormError !== StartDateFormError.NONE ||
      endDateFormError !== EndDateFormError.NONE ||
      !validateForm()
    )
      return;
    setName(nameForm);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setStartDate(startDateForm!.toISOString().slice(0, 10));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setEndDate(endDateForm!.toISOString().slice(0, 10));
    setEditable(false);
    resetErrorStates();
    setSavedOnce(true);
    addSchoolHolidayToQueue([
      id,
      {
        ...schoolHoliday,
        name: nameForm,
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
    removeEntryInProgress();
  };
  const onClickEdit = (): void => {
    setNameForm(name);
    setStartDateForm(new Date(startDate));
    setEndDateForm(new Date(endDate));
    resetErrorStates();
    setEditable(true);
    addEntryInProgress();
  };
  const onClickCancel = (): void => {
    if (newEntry && !savedOnce) {
      removeSchoolHolidayFromQueue(id);
    } else {
      setNameForm(name);
      setStartDateForm(new Date(startDate));
      setEndDateForm(new Date(endDate));
      resetErrorStates();
      setEditable(false);
    }
    removeEntryInProgress();
  };
  const onClickDelete = (): void => {
    setToBeRemoved(true);
    if (newEntry) {
      removeSchoolHolidayFromQueue(id);
    } else {
      addSchoolHolidayToQueue([id, undefined]);
    }
  };
  const onClickCancelDelete = (): void => {
    setToBeRemoved(false);
    removeSchoolHolidayFromQueue(id);
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
        nameFormError !== NameFormError.NONE ||
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

export default SchoolHolidaysDialogEntry;
