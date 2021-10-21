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
  const [vacDaysForm, setVacDaysForm] = useState(vacDays);
  const [workdaysForm, setWorkdaysForm] = useState(workdays);

  const [savedOnce, setSavedOnce] = useState(false);

  const setWorkdayForm = (day: keyof Workdays, newValue: boolean): void => {
    const rv = { ...workdaysForm };
    rv[day] = newValue;
    setWorkdaysForm(rv);
  };

  useEffect(() => {
    setName(user.name);
    setVacDays(user.userStats.availableVacationDays);
    setWorkdays(user.workdays);
    setNameForm(user.name);
    setVacDaysForm(user.userStats.availableVacationDays);
    setWorkdaysForm(user.workdays);
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
          onChange={(event): void => {
            setNameForm(event.target.value);
          }}
        />
      </ListItem>
      <ListItem key={`${id}-edit-vacDays`} sx={{ gridArea: "days" }}>
        <TextField
          margin="dense"
          id="vacation-days"
          label={t`Vacation Days`}
          type="number"
          variant="outlined"
          value={vacDaysForm}
          onChange={(event): void => {
            setVacDaysForm(Number(event.target.value));
          }}
        />
      </ListItem>
      <ListItem key={`${id}-edit-workdays`} sx={{ gridArea: "workdays" }}>
        <FormControl
          component="fieldset"
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
            {t`Workdays`}
          </FormLabel>
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
    setName(nameForm);
    setVacDays(vacDaysForm);
    setWorkdays(workdaysForm);
    setEditable(false);
    setSavedOnce(true);
    addUserToQueue([
      id,
      {
        ...user,
        name: nameForm,
        workdays: workdaysForm,
        userStats: { ...user.userStats, availableVacationDays: vacDaysForm },
      },
    ]);
  };
  const onClickEdit = (): void => {
    setNameForm(name);
    setVacDaysForm(vacDays);
    setWorkdaysForm(workdays);
    setEditable(true);
  };
  const onClickCancel = (): void => {
    if (newEntry && !savedOnce) {
      removeUserFromQueue(id);
    } else {
      setNameForm(name);
      setVacDaysForm(vacDays);
      setWorkdaysForm(workdays);
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
      leftButtonDisabled={toBeRemoved}
      rightButtonOnClick={rightButtonOnClick}
      rightButtonTooltip={rightButtonTooltip}
      rightButtonIcon={rightButtonIcon}
      entryStyle={entryStyle}
    />
  );
};

export default UsersDialogEntry;
