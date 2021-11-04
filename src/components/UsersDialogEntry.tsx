import { t } from "@lingui/macro";
import {
  Cancel as CancelIcon,
  Create as CreateIcon,
  Delete as DeleteIcon,
  DeleteForever as DeleteForeverIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { UserData, Workdays } from "../backendAPI/types/usersData.schema";
import { State } from "../state";
import { NewUserData, NewUserDataPayload, UserDataPayload } from "../state/utils/types";
import { getWeekdayKeyList, getWeekdayNameDict } from "../utils/dateUtils";

import DialogDataEntry, { EntryStyle } from "./DialogDataEntry";

interface Props {
  id: string;
  user: UserData | NewUserData;
  addUserToQueue(e: UserDataPayload | [string, undefined] | NewUserDataPayload): void;
  removeUserFromQueue(e: string): void;
}

const UsersDialogEntry = ({
  id,
  user,
  addUserToQueue,
  removeUserFromQueue,
}: Props): ReactElement => {
  const usersDialogState = useSelector((state: State) => state.usersDialog);

  const [newEntry] = useState(Number(id) < 0);
  const [editable, setEditable] = useState(newEntry);
  const [toBeRemoved, setToBeRemoved] = useState(false);
  const [savedOnce, setSavedOnce] = useState(false);

  const [name, setName] = useState(user.name);
  const [vacDays, setVacDays] = useState(user.availableVacationDays);
  const [workdays, setWorkdays] = useState(user.workdays);

  const [nameForm, setNameForm] = useState(name);
  const [vacDaysForm, setVacDaysForm] = useState(vacDays.toString());
  const [workdaysForm, setWorkdaysForm] = useState(workdays);

  const setWorkdayForm = (day: keyof Workdays, newValue: boolean): void => {
    const rv = { ...workdaysForm };
    rv[day] = newValue;
    setWorkdaysForm(rv);
  };

  type NameFormError = typeof NameFormError[keyof typeof NameFormError];
  const NameFormError = {
    NONE: "",
    EMPTY: t`User must have a name.`,
  } as const;
  const [nameFormError, setNameFormError] = useState<NameFormError>(NameFormError.NONE);

  type VacDaysFormError = typeof VacDaysFormError[keyof typeof VacDaysFormError];
  const VacDaysFormError = {
    NONE: "",
    EMPTY: t`User must a number of Vacation days.`,
    INVALID: t`Only positive whole numbers are permitted.`,
  } as const;
  const [vacDaysFormError, setVacDaysFormError] = useState<VacDaysFormError>(
    VacDaysFormError.NONE
  );

  type WorkdaysFormError = typeof WorkdaysFormError[keyof typeof WorkdaysFormError];
  const WorkdaysFormError = {
    NONE: "",
    EMPTY: t`At least one workday must be selected.`,
  } as const;
  const [workdaysFormError, setWorkdaysFormError] = useState<WorkdaysFormError>(
    WorkdaysFormError.NONE
  );

  const resetErrorStates = useCallback((): void => {
    setNameFormError(NameFormError.NONE);
    setVacDaysFormError(VacDaysFormError.NONE);
    setWorkdaysFormError(WorkdaysFormError.NONE);
  }, [NameFormError.NONE, VacDaysFormError.NONE, WorkdaysFormError.NONE]);

  const validateName = (value: string): boolean => {
    if (value === "") {
      setNameFormError(NameFormError.EMPTY);
      return false;
    }
    setNameFormError(NameFormError.NONE);
    return true;
  };
  const validateVacDays = (value: string): boolean => {
    if (value === "") {
      setVacDaysFormError(VacDaysFormError.EMPTY);
      return false;
    }
    if (!Number.isInteger(Number(value)) || Number(value) < 0) {
      setVacDaysFormError(VacDaysFormError.INVALID);
      return false;
    }
    setVacDaysFormError(VacDaysFormError.NONE);
    return true;
  };
  interface validateWorkdaysParam {
    day?: keyof Workdays;
    value?: boolean;
  }
  const validateWorkdays = (param?: validateWorkdaysParam): boolean => {
    if (
      Object.keys(workdaysForm).filter((workday) => {
        if (param !== undefined && (workday as keyof Workdays) === param.day)
          return param.value;
        return workdaysForm[workday as keyof Workdays];
      }).length === 0
    ) {
      setWorkdaysFormError(WorkdaysFormError.EMPTY);
      return false;
    }
    setWorkdaysFormError(WorkdaysFormError.NONE);
    return true;
  };

  const validateForm = (): boolean => {
    let error = false;
    error = !validateName(nameForm) || error;
    error = !validateVacDays(vacDaysForm) || error;
    error = !validateWorkdays() || error;
    return !error;
  };

  useEffect(() => {
    if (!usersDialogState) {
      setEditable(false);
      setToBeRemoved(false);
      setSavedOnce(false);

      setName(user.name);
      setVacDays(user.availableVacationDays);
      setWorkdays(user.workdays);

      setNameForm(user.name);
      setVacDaysForm(user.availableVacationDays.toString());
      setWorkdaysForm(user.workdays);

      resetErrorStates();
    }
  }, [resetErrorStates, user, usersDialogState]);

  const weekdays = getWeekdayNameDict();
  const weekdayKeys = getWeekdayKeyList();

  const ContentComponentView = (
    <List
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gridTemplateRows: "auto",
        gridTemplateAreas: `"name days workdays"`,
      }}
    >
      <ListItem key={`${id}-view-name`} sx={{ gridArea: "name" }}>
        <ListItemText primary={name} secondary={t`Name`} />
      </ListItem>
      <ListItem key={`${id}-view-vacDays`} sx={{ gridArea: "days" }}>
        <ListItemText primary={vacDays} secondary={t`Vacation Days`} />
      </ListItem>
      <ListItem key={`${id}-view-workdays`} sx={{ gridArea: "workdays" }}>
        <ListItemText
          primary={Object.keys(weekdays)
            .filter((weekday) => workdays[weekday as keyof Workdays])
            .map((weekday) => weekdays[weekday as keyof Workdays].slice(0, 2))
            .join(", ")}
          secondary={t`Workdays`}
        />
      </ListItem>
    </List>
  );

  const ContentComponentEdit = (
    <List
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto",
        gridTemplateAreas: `"name days"
        "workdays workdays"`,
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
      <ListItem key={`${id}-edit-vacDays`} sx={{ gridArea: "days" }}>
        <TextField
          margin="dense"
          id="vacation-days"
          label={t`Vacation Days`}
          type="text"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]+" }}
          variant="outlined"
          value={vacDaysForm}
          error={vacDaysFormError !== VacDaysFormError.NONE}
          helperText={vacDaysFormError}
          onChange={(event) => {
            validateVacDays(event.target.value);
            setVacDaysForm(event.target.value);
          }}
        />
      </ListItem>
      <ListItem key={`${id}-edit-workdays`} sx={{ gridArea: "workdays" }}>
        <FormControl
          component="fieldset"
          error={workdaysFormError !== WorkdaysFormError.NONE}
          sx={{
            marginY: 1,
            padding: 1,
            border: 1,
            borderRadius: 1,
            borderColor:
              workdaysFormError !== WorkdaysFormError.NONE
                ? "error.main"
                : "action.disabled",
            "&:hover": {
              borderColor:
                workdaysFormError !== WorkdaysFormError.NONE
                  ? "error.main"
                  : "action.active",
            },
          }}
        >
          <FormLabel component="legend" sx={{ paddingX: 1, fontSize: "0.75em" }}>
            {t`Workdays`}
          </FormLabel>
          <FormHelperText error={workdaysFormError !== WorkdaysFormError.NONE}>
            {workdaysFormError}
          </FormHelperText>
          <FormGroup aria-label="position" row>
            {weekdayKeys.map((day) => (
              <FormControlLabel
                key={`${id}-edit-workdays-${day}`}
                label={weekdays[day].slice(0, 2)}
                labelPlacement="bottom"
                control={<Checkbox />}
                checked={workdaysForm[day]}
                onChange={(event): void => {
                  const target = event.target as HTMLInputElement;
                  validateWorkdays({ day, value: target.checked });
                  setWorkdayForm(day, target.checked);
                }}
                sx={{ margin: 0 }}
              />
            ))}
          </FormGroup>
        </FormControl>
      </ListItem>
    </List>
  );

  const onClickSave = (): void => {
    if (
      nameFormError !== NameFormError.NONE ||
      vacDaysFormError !== VacDaysFormError.NONE ||
      workdaysFormError !== WorkdaysFormError.NONE ||
      !validateForm()
    )
      return;
    setName(nameForm);
    setVacDays(Number(vacDaysForm));
    setWorkdays(workdaysForm);
    setEditable(false);
    resetErrorStates();
    setSavedOnce(true);
    addUserToQueue([
      id,
      {
        ...user,
        name: nameForm,
        workdays: workdaysForm,
        availableVacationDays: Number(vacDaysForm),
      },
    ]);
  };
  const onClickEdit = (): void => {
    setNameForm(name);
    setVacDaysForm(vacDays.toString());
    setWorkdaysForm(workdays);
    resetErrorStates();
    setEditable(true);
  };
  const onClickCancel = (): void => {
    if (newEntry && !savedOnce) {
      removeUserFromQueue(id);
    } else {
      setNameForm(name);
      setVacDaysForm(vacDays.toString());
      setWorkdaysForm(workdays);
      resetErrorStates();
      setEditable(false);
    }
  };
  const onClickDelete = (): void => {
    setToBeRemoved(true);
    if (newEntry) {
      removeUserFromQueue(id);
    } else {
      addUserToQueue([id, undefined]);
    }
  };
  const onClickCancelDelete = (): void => {
    setToBeRemoved(false);
    removeUserFromQueue(id);
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

  let entryStyle;
  if (toBeRemoved) {
    entryStyle = EntryStyle.REMOVED;
  } else if (newEntry) {
    entryStyle = EntryStyle.NEW;
  } else {
    entryStyle = EntryStyle.DEFAULT;
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
        vacDaysFormError !== VacDaysFormError.NONE ||
        workdaysFormError !== WorkdaysFormError.NONE
      }
      rightButtonOnClick={rightButtonOnClick}
      rightButtonTooltip={rightButtonTooltip}
      rightButtonIcon={rightButtonIcon}
      entryStyle={entryStyle}
    />
  );
};

export default UsersDialogEntry;
