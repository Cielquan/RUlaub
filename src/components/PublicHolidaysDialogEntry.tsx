import { t } from "@lingui/macro";
import {
  Cancel as CancelIcon,
  Create as CreateIcon,
  Delete as DeleteIcon,
  DeleteForever as DeleteForeverIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { PublicHolidayData } from "../backendAPI/types/publicHolidaysData.schema";
import { State } from "../state";
import {
  NewPublicHolidayData,
  NewPublicHolidayDataPayload,
  PublicHolidayDataPayload,
} from "../backendAPI/types/helperTypes";

import DialogDataEntry, { EntryStyle, getStyles } from "./DialogDataEntry";

interface Props {
  id: string;
  publicHoliday: PublicHolidayData | NewPublicHolidayData;
  addPublicHolidayToQueue(
    e: PublicHolidayDataPayload | [string, undefined] | NewPublicHolidayDataPayload
  ): void;
  removePublicHolidayFromQueue(e: string): void;
}

const PublicHolidaysDialogEntry = ({
  id,
  publicHoliday,
  addPublicHolidayToQueue,
  removePublicHolidayFromQueue,
}: Props): ReactElement => {
  const publicHolidaysDialogState = useSelector(
    (state: State) => state.publicHolidaysDialog
  );

  const [newEntry] = useState(Number(id) < 0);
  const [editable, setEditable] = useState(newEntry);
  const [toBeRemoved, setToBeRemoved] = useState(false);
  const [savedOnce, setSavedOnce] = useState(false);

  const [name, setName] = useState(publicHoliday.name);
  const [year, setYear] = useState(publicHoliday.year);
  const [yearlessDate, setYearlessDate] = useState(publicHoliday.yearlessDate);
  const [easterSundayOffset, setEasterSundayOffset] = useState(
    publicHoliday.easterSundayOffset
  );

  const [nameForm, setNameForm] = useState(name);
  const [yearForm, setYearForm] = useState((year ?? "").toString());
  const [yearlessDateForm, setYearlessDateForm] = useState(yearlessDate ?? "");
  const [easterSundayOffsetForm, setEasterSundayOffsetForm] = useState(
    (easterSundayOffset ?? "").toString()
  );
  enum DateType {
    YEARLESSDATE = "yearlessDate",
    OFFSET = "offset",
  }
  const [dateTypeForm, setDateTypeForm] = useState(DateType.YEARLESSDATE);

  type NameFormError = typeof NameFormError[keyof typeof NameFormError];
  const NameFormError = {
    NONE: "",
    EMPTY: t`Public Holiday must have a name.`,
  } as const;
  const [nameFormError, setNameFormError] = useState<NameFormError>(NameFormError.NONE);

  type YearFormError = typeof YearFormError[keyof typeof YearFormError];
  const YearFormError = {
    NONE: "",
    INVALID: t`Only positive whole numbers are permitted.`,
  } as const;
  const [yearFormError, setYearFormError] = useState<YearFormError>(YearFormError.NONE);

  type YearlessDateFormError =
    typeof YearlessDateFormError[keyof typeof YearlessDateFormError];
  const YearlessDateFormError = {
    NONE: "",
    EMPTY: t`A date must be entered.`,
    FORMAT: t`Invalid Format. Please use format: Day-Month e.g. 31-01`,
    INVALID: t`Invalid Date. Please enter date in format: Day-Month e.g. 31-01`,
  } as const;
  const [yearlessDateFormError, setYearlessDateFormError] =
    useState<YearlessDateFormError>(YearlessDateFormError.NONE);

  type EasterSundayOffsetFormError =
    typeof EasterSundayOffsetFormError[keyof typeof EasterSundayOffsetFormError];
  const EasterSundayOffsetFormError = {
    NONE: "",
    EMPTY: t`An offset must be entered.`,
    INVALID: t`Only positive whole numbers are permitted.`,
  } as const;
  const [easterSundayOffsetFormError, setEasterSundayOffsetFormError] =
    useState<EasterSundayOffsetFormError>(EasterSundayOffsetFormError.NONE);

  const resetErrorStates = useCallback((): void => {
    setNameFormError(NameFormError.NONE);
    setYearFormError(YearFormError.NONE);
    setYearlessDateFormError(YearlessDateFormError.NONE);
    setEasterSundayOffsetFormError(EasterSundayOffsetFormError.NONE);
  }, [
    EasterSundayOffsetFormError.NONE,
    NameFormError.NONE,
    YearFormError.NONE,
    YearlessDateFormError.NONE,
  ]);

  const validateName = (value: string): boolean => {
    if (value === "") {
      setNameFormError(NameFormError.EMPTY);
      return false;
    }
    setNameFormError(NameFormError.NONE);
    return true;
  };
  const validateYear = (value: string): boolean => {
    if (value === "") {
      setYearFormError(YearFormError.NONE);
      return true;
    }
    if (!Number.isInteger(Number(value)) || Number(value) < 0) {
      setYearFormError(YearFormError.INVALID);
      return false;
    }
    setYearFormError(YearFormError.NONE);
    return true;
  };
  const validateYearlessDate = (value: string, onChangeTrigger = true): boolean => {
    if (onChangeTrigger && yearlessDateFormError === YearlessDateFormError.NONE) {
      return false;
    }
    if (value === "") {
      setYearlessDateFormError(YearlessDateFormError.EMPTY);
      return false;
    }
    if (value.length !== 5 || value.slice(2, 3) !== "-") {
      setYearlessDateFormError(YearlessDateFormError.FORMAT);
      return false;
    }
    const testYear = yearForm && !yearFormError ? Number(yearForm) : 2000;
    const testDate = `${testYear}-${value.slice(3)}-${value.slice(0, 2)}`;
    if (
      Number.isNaN(Date.parse(testDate)) ||
      new Date(testDate).toISOString().slice(0, 10) !== testDate
    ) {
      setYearlessDateFormError(YearlessDateFormError.INVALID);
      return false;
    }
    setYearlessDateFormError(YearlessDateFormError.NONE);
    return true;
  };
  const validateEasterSundayOffset = (value: string): boolean => {
    if (value === "") {
      setEasterSundayOffsetFormError(EasterSundayOffsetFormError.EMPTY);
      return false;
    }
    if (!Number.isInteger(Number(value))) {
      setEasterSundayOffsetFormError(EasterSundayOffsetFormError.INVALID);
      return false;
    }
    setEasterSundayOffsetFormError(EasterSundayOffsetFormError.NONE);
    return true;
  };

  const validateForm = (): boolean => {
    let error = false;
    error = !validateName(nameForm) || error;
    error = !validateYear(yearForm) || error;
    if (dateTypeForm === DateType.YEARLESSDATE) {
      error = !validateYearlessDate(yearlessDateForm, false) || error;
    } else {
      error = !validateEasterSundayOffset(easterSundayOffsetForm) || error;
    }
    return !error;
  };

  useEffect(() => {
    if (!publicHolidaysDialogState) {
      setEditable(false);
      setToBeRemoved(false);
      setSavedOnce(false);

      setName(publicHoliday.name);
      setYear(publicHoliday.year);
      setYearlessDate(publicHoliday.yearlessDate);
      setEasterSundayOffset(publicHoliday.easterSundayOffset);

      setNameForm(publicHoliday.name);
      setYearForm((publicHoliday.year ?? "").toString());
      setYearlessDateForm(publicHoliday.yearlessDate ?? "");
      setEasterSundayOffsetForm((publicHoliday.easterSundayOffset ?? "").toString());

      resetErrorStates();
    }
  }, [publicHoliday, publicHolidaysDialogState, resetErrorStates]);

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
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "auto",
          gridTemplateAreas: `"name date year"`,
        }}
      >
        <ListItem key={`${id}-view-name`} sx={{ gridArea: "name" }}>
          <ListItemText primary={name} secondary={t`Name`} />
        </ListItem>
        <ListItem key={`${id}-view-date`} sx={{ gridArea: "date" }}>
          <ListItemText
            primary={yearlessDate || easterSundayOffset}
            secondary={yearlessDate ? t`Day-Month` : t`Easter Sunday Offset`}
          />
        </ListItem>
        <ListItem key={`${id}-view-year`} sx={{ gridArea: "year" }}>
          <ListItemText primary={year || t`Every`} secondary={t`Year`} />
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
        gridTemplateAreas: `"name date year"`,
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
      <ListItem key={`${id}-edit-date`} sx={{ gridArea: "date" }}>
        <FormControl
          component="fieldset"
          error={
            (dateTypeForm === DateType.YEARLESSDATE &&
              yearlessDateFormError !== YearlessDateFormError.NONE) ||
            (dateTypeForm === DateType.OFFSET &&
              easterSundayOffsetFormError !== EasterSundayOffsetFormError.NONE)
          }
          sx={{
            marginY: 1,
            padding: 1,
            border: 1,
            borderRadius: 1,
            borderColor:
              (dateTypeForm === DateType.YEARLESSDATE && yearlessDateFormError) ||
              (dateTypeForm === DateType.OFFSET && easterSundayOffsetFormError)
                ? "error.main"
                : "action.disabled",
            "&:hover": {
              borderColor:
                (dateTypeForm === DateType.YEARLESSDATE && yearlessDateFormError) ||
                (dateTypeForm === DateType.OFFSET && easterSundayOffsetFormError)
                  ? "error.main"
                  : "action.active",
            },
          }}
        >
          <FormLabel component="legend" sx={{ paddingX: 1, fontSize: "0.75em" }}>
            {t`Date`}
          </FormLabel>
          <FormHelperText
            error={
              dateTypeForm === DateType.YEARLESSDATE
                ? yearlessDateFormError !== YearlessDateFormError.NONE
                : easterSundayOffsetFormError !== EasterSundayOffsetFormError.NONE
            }
          >
            {dateTypeForm === DateType.YEARLESSDATE
              ? yearlessDateFormError
              : easterSundayOffsetFormError}
          </FormHelperText>
          <FormGroup row>
            <FormControl component="fieldset">
              <RadioGroup
                row
                name="date-type-switch"
                value={dateTypeForm}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setDateTypeForm((event.target as HTMLInputElement).value as DateType)
                }
              >
                <FormControlLabel
                  value={DateType.YEARLESSDATE}
                  control={<Radio />}
                  label={t`Day-Month`}
                />
                <FormControlLabel
                  value={DateType.OFFSET}
                  control={<Radio />}
                  label={t`Easter Sunday Offset`}
                />
              </RadioGroup>
            </FormControl>
            {dateTypeForm === DateType.YEARLESSDATE ? (
              <TextField
                margin="dense"
                id="yearless-date"
                label={t`Day-Month`}
                type="text"
                variant="outlined"
                value={yearlessDateForm}
                error={yearlessDateFormError !== YearlessDateFormError.NONE}
                helperText={yearlessDateFormError}
                onChange={(event) => {
                  validateYearlessDate(event.target.value);
                  setYearlessDateForm(event.target.value);
                }}
              />
            ) : (
              <TextField
                margin="dense"
                id="offset"
                label={t`Easter Sunday Offset`}
                type="text"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]+" }}
                variant="outlined"
                value={easterSundayOffsetForm}
                error={easterSundayOffsetFormError !== EasterSundayOffsetFormError.NONE}
                helperText={easterSundayOffsetFormError}
                onChange={(event) => {
                  validateEasterSundayOffset(event.target.value);
                  setEasterSundayOffsetForm(event.target.value);
                }}
              />
            )}
          </FormGroup>
        </FormControl>
      </ListItem>
      <ListItem key={`${id}-edit-year`} sx={{ gridArea: "year" }}>
        <TextField
          margin="dense"
          id="year"
          label={t`Year`}
          type="text"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]+" }}
          variant="outlined"
          value={yearForm}
          error={yearFormError !== YearFormError.NONE}
          helperText={yearFormError}
          onChange={(event) => {
            validateYear(event.target.value);
            setYearForm(event.target.value);
          }}
        />
      </ListItem>
    </List>
  );

  const onClickSave = (): void => {
    if (
      nameFormError !== NameFormError.NONE ||
      yearFormError !== YearFormError.NONE ||
      (dateTypeForm === DateType.YEARLESSDATE &&
        yearlessDateFormError !== YearlessDateFormError.NONE) ||
      (dateTypeForm === DateType.OFFSET &&
        easterSundayOffsetFormError !== EasterSundayOffsetFormError.NONE) ||
      !validateForm()
    )
      return;
    setName(nameForm);
    setYear(Number(yearForm));
    if (dateTypeForm === DateType.YEARLESSDATE) {
      setYearlessDate(yearlessDate);
    } else {
      setEasterSundayOffset(Number(easterSundayOffset));
    }
    setEditable(false);
    resetErrorStates();
    setSavedOnce(true);
    addPublicHolidayToQueue([
      id,
      {
        ...publicHoliday,
        name: nameForm,
        year: yearForm ? Number(yearForm) : undefined,
        yearlessDate:
          dateTypeForm === DateType.YEARLESSDATE ? yearlessDateForm : undefined,
        easterSundayOffset:
          dateTypeForm === DateType.OFFSET ? Number(easterSundayOffsetForm) : undefined,
      },
    ]);
  };
  const onClickEdit = (): void => {
    setNameForm(name);
    setYearForm((year ?? "").toString());
    setYearlessDateForm(yearlessDate ?? "");
    setEasterSundayOffsetForm((easterSundayOffset ?? "").toString());
    resetErrorStates();
    setEditable(true);
  };
  const onClickCancel = (): void => {
    if (newEntry && !savedOnce) {
      removePublicHolidayFromQueue(id);
    } else {
      setNameForm(name);
      setYearForm((year ?? "").toString());
      setYearlessDateForm(yearlessDate ?? "");
      setEasterSundayOffsetForm((easterSundayOffset ?? "").toString());
      resetErrorStates();
      setEditable(false);
    }
  };
  const onClickDelete = (): void => {
    setToBeRemoved(true);
    if (newEntry) {
      removePublicHolidayFromQueue(id);
    } else {
      addPublicHolidayToQueue([id, undefined]);
    }
  };
  const onClickCancelDelete = (): void => {
    setToBeRemoved(false);
    removePublicHolidayFromQueue(id);
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
        yearFormError !== YearFormError.NONE ||
        (dateTypeForm === DateType.YEARLESSDATE &&
          yearlessDateFormError !== YearlessDateFormError.NONE) ||
        (dateTypeForm === DateType.OFFSET &&
          easterSundayOffsetFormError !== EasterSundayOffsetFormError.NONE)
      }
      rightButtonOnClick={rightButtonOnClick}
      rightButtonTooltip={rightButtonTooltip}
      rightButtonIcon={rightButtonIcon}
      entryStyle={entryStyle}
    />
  );
};

export default PublicHolidaysDialogEntry;
