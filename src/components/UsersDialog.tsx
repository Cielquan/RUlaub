import { t } from "@lingui/macro";
import { AddCircle as AddIcon, Group as GroupIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Slide,
  Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { ReactElement, forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { NewUserData, UserDataPayload } from "../backendAPI/types/helperTypes";
import { UserData } from "../backendAPI/types/usersData.schema";
import { useCounter } from "../hooks";
import { State, actionCreators } from "../state";
import UsersDialogEntry from "./UsersDialogEntry";

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

const UsersDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeUsersDialog, updateUsersData } = bindActionCreators(actionCreators, dispatch);
  const usersDialogState = useSelector((state: State) => state.usersDialog);
  const usersDataState = useSelector((state: State) => state.usersData);

  const {
    counter: inProgessCounter,
    increaseCounter: addEntryInProgress,
    decreaseCounter: removeEntryInProgress,
  } = useCounter();
  const [tmpID, setTmpID] = useState(-1);
  const getTmpID = (): string => {
    setTmpID(tmpID - 1);
    return tmpID.toString();
  };

  interface updatedUsersQueue {
    [k: string]: UserData | undefined;
  }
  const [updatedUsers, setUpdatedUsers] = useState<updatedUsersQueue>({});
  interface newUsersQueue {
    [k: string]: NewUserData;
  }
  const [newUsers, setNewUsers] = useState<newUsersQueue>({});

  const addUpdatedUser = ([id, userData]: UserDataPayload | [string, undefined]): void => {
    const rv = { ...updatedUsers };
    rv[id] = userData;
    setUpdatedUsers(rv);
  };
  const removeUpdatedUser = (id: string): void => {
    const rv = { ...updatedUsers };
    delete rv[id];
    setUpdatedUsers(rv);
  };

  const addNewUser = (): void => {
    const rv = { ...newUsers };
    rv[getTmpID()] = {
      name: "",
      workdays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
      availableVacationDays: 0,
    };
    setNewUsers(rv);
    addEntryInProgress();
  };
  const updateNewUser = ([id, userData]: UserDataPayload): void => {
    const rv = { ...newUsers };
    rv[id] = userData;
    setNewUsers(rv);
  };
  const removeNewUser = (id: string): void => {
    const rv = { ...newUsers };
    delete rv[id];
    setNewUsers(rv);
  };

  const snackbarHandles = useSnackbar();

  const saveChanges = (): void => {
    const newEntries = Object.keys(newUsers).length > 0 ? Object.values(newUsers) : undefined;

    const filteredEntriesToUpdate = Object.keys(updatedUsers)
      .filter((userID) => updatedUsers[userID] !== undefined)
      .map((userID) => [Number(userID), updatedUsers[userID]]);
    const entriesToUpdate = Object.fromEntries(filteredEntriesToUpdate);
    const updatedEntries = Object.keys(entriesToUpdate).length > 0 ? entriesToUpdate : undefined;

    const entriesToRemove = Object.keys(updatedUsers)
      .filter((userID) => updatedUsers[userID] === undefined)
      .map((id) => Number(id));
    const removedEntries = entriesToRemove.length > 0 ? entriesToRemove : undefined;

    updateUsersData({ newEntries, updatedEntries, removedEntries }, snackbarHandles);
  };

  useEffect(() => {
    setUpdatedUsers({});
    setNewUsers({});
  }, [usersDialogState]);

  const id = "users-dialog";

  const saveDisabled =
    inProgessCounter > 0 ||
    (Object.keys(updatedUsers).length === 0 && Object.keys(newUsers).length === 0);

  return (
    <Dialog
      aria-labelledby={id}
      data-testid={id}
      open={usersDialogState}
      TransitionComponent={Transition}
      PaperProps={{ sx: { maxWidth: "calc(100% - 64px)", minWidth: "35%" } }}
      keepMounted
      onClose={closeUsersDialog}
    >
      <DialogTitle id={id} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>{t`Users`}</Box>
        <GroupIcon />
      </DialogTitle>
      <DialogContent>
        <List sx={{ display: "flex", flexDirection: "column", paddingBottom: 0 }}>
          {Object.keys(usersDataState)
            .sort()
            .map((userId) => (
              <UsersDialogEntry
                key={userId}
                id={userId}
                user={usersDataState[userId]}
                addUserToQueue={addUpdatedUser}
                removeUserFromQueue={removeUpdatedUser}
                addEntryInProgress={addEntryInProgress}
                removeEntryInProgress={removeEntryInProgress}
              />
            ))}
          {Object.keys(newUsers)
            .sort()
            .map((userId) => (
              <UsersDialogEntry
                key={userId}
                id={userId}
                user={newUsers[userId]}
                addUserToQueue={updateNewUser}
                removeUserFromQueue={removeNewUser}
                addEntryInProgress={addEntryInProgress}
                removeEntryInProgress={removeEntryInProgress}
              />
            ))}
          <ListItem sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
            <IconButton onClick={addNewUser}>
              <AddIcon fontSize="large" />
            </IconButton>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Tooltip arrow title={t`Save changes to database`} disableHoverListener={saveDisabled}>
          <span>
            <Button
              data-testid={`${id}-btn-save`}
              disabled={saveDisabled}
              onClick={() => {
                if (typeof onClick === "function") onClick();
                saveChanges();
                setUpdatedUsers({});
                setNewUsers({});
                closeUsersDialog();
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
            closeUsersDialog();
          }}
        >
          {t`Discard`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
UsersDialog.defaultProps = {
  onClick: () => undefined,
};

export default UsersDialog;
