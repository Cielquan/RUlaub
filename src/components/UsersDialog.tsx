import { t, Trans } from "@lingui/macro";
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
import React, { forwardRef, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { UserData } from "../backendAPI/types/usersData.schema";
import { actionCreators, State } from "../state";
import { NewUserData, UserDataPayload } from "../state/utils/types";

import UsersDialogEntry from "./UsersDialogEntry";

const Transition = forwardRef(
  (
    props: TransitionProps & { children?: ReactElement },
    ref: React.Ref<unknown>
    // eslint-disable-next-line react/jsx-props-no-spreading
  ) => <Slide direction="up" ref={ref} {...props} />
);
Transition.defaultProps = {
  children: <></>,
};

interface Props {
  onClick?(): void;
}

const UsersDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { addUsersData, closeUsersDialog, removeUsersData, updateUsersData } =
    bindActionCreators(actionCreators, dispatch);
  const usersDialogState = useSelector((state: State) => state.usersDialog);
  const usersDataState = useSelector((state: State) => state.usersData);

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

  const addUpdatedUser = ([id, userData]:
    | UserDataPayload
    | [string, undefined]): void => {
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

  const saveChanges = (): void => {
    removeUsersData(
      Object.keys(updatedUsers).filter((userID) => updatedUsers[userID] === undefined)
    );

    updateUsersData(
      Object.keys(updatedUsers)
        .filter((userID) => updatedUsers[userID] !== undefined)
        .map((userID) => [userID, updatedUsers[userID]] as UserDataPayload)
    );

    addUsersData(Object.values(newUsers));
  };

  useEffect(() => {
    setUpdatedUsers({});
    setNewUsers({});
  }, [usersDialogState]);

  const id = "users-dialog";

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
        <Box sx={{ flexGrow: 1 }}>
          <Trans>Users</Trans>
        </Box>
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
        <Tooltip arrow title={t`Save changes to database`}>
          <Button
            data-testid={`${id}-btn-save`}
            onClick={() => {
              if (typeof onClick === "function") onClick();
              saveChanges();
              setUpdatedUsers({});
              setNewUsers({});
              closeUsersDialog();
            }}
          >
            <Trans>Save</Trans>
          </Button>
        </Tooltip>
        <Button
          data-testid={`${id}-btn-cancel`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeUsersDialog();
          }}
        >
          <Trans>Discard</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
UsersDialog.defaultProps = {
  onClick: () => undefined,
};

export default UsersDialog;
