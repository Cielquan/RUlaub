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
  ListItemText,
  TextField,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { UserDataPayload } from "../state/utils/usersData";
import { UserData, Workdays } from "../backendAPI/types/usersData.schema";
import { getWeekdayKeyList, getWeekdayNameDict } from "../utils/dateUtils";

import DialogDataEntry, {
  DBDialogEntryContentViewList as StyledViewList,
  DBDialogEntryContentViewListItem as StyledViewListItem,
  DBDialogEntryContentEditList as StyledEditList,
  DBDialogEntryContentEditListItem as StyledEditListItem,
  EntryStyle,
} from "./DialogDataEntry";

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
    <StyledViewList>
      <StyledViewListItem key={`${id}-view-name`}>
        <ListItemText primary={name} secondary={t`Name`} />
      </StyledViewListItem>
      <StyledViewListItem key={`${id}-view-vacDays`}>
        <ListItemText primary={vacDays} secondary={t`Vacation Days`} />
      </StyledViewListItem>
      <StyledViewListItem key={`${id}-view-workdays`}>
        <ListItemText
          primary={Object.keys(weekdays)
            .filter((weekday) => workdays[weekday as keyof Workdays])
            .map((weekday) => weekdays[weekday as keyof Workdays].slice(0, 2))
            .join(", ")}
          secondary={t`Workdays`}
        />
      </StyledViewListItem>
    </StyledViewList>
  );

  const ContentComponentEdit = (
    <StyledEditList>
      <StyledEditListItem key={`${id}-edit-name`} sx={{ width: "fit-content" }}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={t`Name`}
          type="text"
          variant="standard"
          value={nameForm}
          onChange={(event): void => {
            setNameForm(event.target.value);
          }}
        />
      </StyledEditListItem>
      <StyledEditListItem key={`${id}-edit-vacDays`} sx={{ width: "fit-content" }}>
        <TextField
          margin="dense"
          id="vacation-days"
          label={t`Vacation Days`}
          type="number"
          variant="standard"
          value={vacDaysForm}
          onChange={(event): void => {
            setVacDaysForm(Number(event.target.value));
          }}
        />
      </StyledEditListItem>
      <StyledEditListItem key={`${id}-edit-workdays`}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{t`Workdays`}</FormLabel>
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
      </StyledEditListItem>
    </StyledEditList>
  );

  const onClickSave = (): void => {
    setName(nameForm);
    setVacDays(vacDaysForm);
    setWorkdays(workdaysForm);
    setEditable(false);
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
    setNameForm(name);
    setVacDaysForm(vacDays);
    setWorkdaysForm(workdays);
    setEditable(false);
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
