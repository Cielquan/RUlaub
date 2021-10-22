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
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { UserDataPayload } from "../state/utils/usersData";
import { UserData, Workdays } from "../backendAPI/types/usersData.schema";
import { getWeekdayKeyList, getWeekdayNameDict } from "../utils/dateUtils";

import DialogDataEntry, { EntryStyle } from "./DialogDataEntry";

interface Props {
  id: string;
  user: UserData;
  addUserToQueue(e: UserDataPayload | [string, undefined]): void;
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

  const [name, setName] = useState(user.name);
  const [vacDays, setVacDays] = useState(user.userStats.availableVacationDays);
  const [workdays, setWorkdays] = useState(user.workdays);

  const [nameForm, setNameForm] = useState(name);
  const [nameFormError, setNameFormError] = useState(false);
  const [vacDaysForm, setVacDaysForm] = useState(vacDays.toString());
  const [vacDaysFormError, setVacDaysFormError] = useState(false);
  const [workdaysForm, setWorkdaysForm] = useState(workdays);
  const [workdaysFormError, setWorkdaysFormError] = useState(false);

  const [savedOnce, setSavedOnce] = useState(false);

  const setWorkdayForm = (day: keyof Workdays, newValue: boolean): void => {
    const rv = { ...workdaysForm };
    rv[day] = newValue;
    setWorkdaysForm(rv);
  };

  const validateName = (value: string): boolean => {
    const error = value === "";
    setNameFormError(error);
    return !error;
  };
  const validateVacDays = (value: string): boolean => {
    const error = value === "" || Number.isNaN(Number(value)) || Number(value) < 0;
    setVacDaysFormError(error);
    return !error;
  };
  interface validateWorkdaysParam {
    day?: keyof Workdays;
    value?: boolean;
  }
  const validateWorkdays = (param?: validateWorkdaysParam): boolean => {
    const error =
      Object.keys(workdaysForm).filter((workday) => {
        if (param !== undefined && (workday as keyof Workdays) === param.day)
          return param.value;
        return workdaysForm[workday as keyof Workdays];
      }).length === 0;
    setWorkdaysFormError(error);
    return !error;
  };

  const validateForm = (): boolean => {
    let error = false;
    error = !validateName(nameForm) || error;
    error = !validateVacDays(vacDaysForm) || error;
    error = !validateWorkdays() || error;
    return !error;
  };

  useEffect(() => {
    setName(user.name);
    setVacDays(user.userStats.availableVacationDays);
    setWorkdays(user.workdays);
    setNameForm(user.name);
    setNameFormError(false);
    setVacDaysForm(user.userStats.availableVacationDays.toString());
    setVacDaysFormError(false);
    setWorkdaysForm(user.workdays);
    setWorkdaysFormError(false);
    setToBeRemoved(false);
  }, [user, usersDialogState]);

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
          error={nameFormError}
          helperText={nameFormError ? t`User must have a name.` : ""}
          onChange={(event): void => {
            const newValue = event.target.value;
            setNameFormError(!validateName(newValue));
            setNameForm(newValue);
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
          error={vacDaysFormError}
          helperText={vacDaysFormError ? t`Only positive numbers are permitted.` : ""}
          onChange={(event) => {
            const newValue = event.target.value;
            setVacDaysFormError(!validateVacDays(newValue));
            setVacDaysForm(newValue);
          }}
        />
      </ListItem>
      <ListItem key={`${id}-edit-workdays`} sx={{ gridArea: "workdays" }}>
        <FormControl
          component="fieldset"
          error={workdaysFormError}
          sx={{
            marginY: 1,
            padding: 1,
            border: 1,
            borderRadius: 1,
            borderColor: workdaysFormError ? "error.main" : "action.disabled",
            "&:hover": {
              borderColor: workdaysFormError ? "error.main" : "action.active",
            },
          }}
        >
          <FormLabel component="legend" sx={{ paddingX: 1, fontSize: "0.75em" }}>
            {t`Workdays`}
          </FormLabel>
          <FormHelperText error={workdaysFormError}>
            {workdaysFormError ? t`At least one workday must be selected.` : ""}
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
                  setWorkdaysFormError(
                    !validateWorkdays({ day, value: target.checked })
                  );
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
    if (nameFormError || vacDaysFormError || workdaysFormError || !validateForm())
      return;
    setName(nameForm);
    setVacDays(Number(vacDaysForm));
    setWorkdays(workdaysForm);
    setEditable(false);
    setSavedOnce(true);
    addUserToQueue([
      id,
      {
        ...user,
        name: nameForm,
        workdays: workdaysForm,
        userStats: { ...user.userStats, availableVacationDays: Number(vacDaysForm) },
      },
    ]);
  };
  const onClickEdit = (): void => {
    setNameForm(name);
    setVacDaysForm(vacDays.toString());
    setWorkdaysForm(workdays);
    setEditable(true);
  };
  const onClickCancel = (): void => {
    if (newEntry && !savedOnce) {
      removeUserFromQueue(id);
    } else {
      setNameForm(name);
      setNameFormError(false);
      setVacDaysForm(vacDays.toString());
      setVacDaysFormError(false);
      setWorkdaysForm(workdays);
      setWorkdaysFormError(false);
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
        toBeRemoved || nameFormError || vacDaysFormError || workdaysFormError
      }
      rightButtonOnClick={rightButtonOnClick}
      rightButtonTooltip={rightButtonTooltip}
      rightButtonIcon={rightButtonIcon}
      entryStyle={entryStyle}
    />
  );
};

export default UsersDialogEntry;
