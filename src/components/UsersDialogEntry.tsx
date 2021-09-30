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
import { UserData, Workdays } from "../types/usersData.schema";
import { getWeekdayKeyList, getWeekdayNameDict } from "../utils/dateUtils";

import DialogDataEntry, {
  DBDialogEntryContentList as StyledList,
  DBDialogEntryContentListItem as StyledListItem,
  EntryStyle,
} from "./DialogDataEntry";

interface Props {
  id: string;
  user: UserData;
  addUserToUpdateQueue(e: UserDataPayload | [string, undefined]): void;
  removeUserFromUpdateQueue(e: string): void;
}

const UsersDialogEntry = ({
  id,
  user,
  addUserToUpdateQueue,
  removeUserFromUpdateQueue,
}: Props): ReactElement => {
  const usersDialogState = useSelector((state: State) => state.usersDialog);

  const [editable, setEditable] = useState(false);
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
    <StyledList>
      <StyledListItem key={`${id}-view-name`}>
        <ListItemText primary={name} secondary={t`Name`} />
      </StyledListItem>
      <StyledListItem key={`${id}-view-vacDays`}>
        <ListItemText primary={vacDays} secondary={t`Vacation Days`} />
      </StyledListItem>
      <StyledListItem key={`${id}-view-workdays`}>
        <ListItemText
          primary={Object.keys(weekdays)
            .filter((weekday) => workdays[weekday as keyof Workdays])
            .map((weekday) => weekdays[weekday as keyof Workdays].slice(0, 2))
            .join(", ")}
          secondary={t`Workdays`}
        />
      </StyledListItem>
    </StyledList>
  );

  const ContentComponentEdit = (
    <StyledList>
      <StyledListItem key={`${id}-edit-name`}>
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
      </StyledListItem>
      <StyledListItem key={`${id}-edit-vacDays`}>
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
      </StyledListItem>
      <StyledListItem key={`${id}-edit-workdays`}>
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
      </StyledListItem>
    </StyledList>
  );

  const onClickSave = (): void => {
    setName(nameForm);
    setVacDays(vacDaysForm);
    setWorkdays(workdaysForm);
    setEditable(false);
    addUserToUpdateQueue([
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
    addUserToUpdateQueue([id, undefined]);
  };
  const onClickCancelDelete = (): void => {
    setToBeRemoved(false);
    removeUserFromUpdateQueue(id);
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
      leftButtonDisabled={toBeRemoved}
      rightButtonOnClick={rightButtonOnClick}
      rightButtonTooltip={rightButtonTooltip}
      rightButtonIcon={rightButtonIcon}
      entryStyle={toBeRemoved ? EntryStyle.REMOVED : EntryStyle.DEFAULT}
    />
  );
};

export default UsersDialogEntry;
