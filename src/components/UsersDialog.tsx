import { t, Trans } from "@lingui/macro";
import { Group as GroupIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  Slide,
  Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import React, { forwardRef, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "../state";
import { UserDataPayload } from "../state/utils/usersData";
import { UserData } from "../types/usersData.schema";

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
  const { closeUsersDialog, removeUsersData, updateUsersData } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const usersDialogState = useSelector((state: State) => state.usersDialog);
  const usersDataState = useSelector((state: State) => state.usersData);

  interface updatedUsersQueue {
    [k: string]: UserData | undefined;
  }
  const [updatedUsers, setUpdatedUsers] = useState<updatedUsersQueue>({});

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

  const saveUpdatedUsers = (): void => {
    removeUsersData(
      Object.keys(updatedUsers).filter((userID) => updatedUsers[userID] === undefined)
    );

    updateUsersData(
      Object.keys(updatedUsers)
        .filter((userID) => updatedUsers[userID] !== undefined)
        .map((userID) => [userID, updatedUsers[userID]] as UserDataPayload)
    );
  };

  useEffect(() => {
    setUpdatedUsers({});
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
        <List sx={{ display: "flex", flexDirection: "column" }}>
          {Object.keys(usersDataState).map((userId) => {
            const user = usersDataState[userId];

            return (
              <UsersDialogEntry
                key={userId}
                id={userId}
                user={user}
                addUserToQueue={addUpdatedUser}
                removeUserFromQueue={removeUpdatedUser}
              />
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Tooltip arrow title={t`Save changes to database`}>
          <Button
            data-testid={`${id}-btn-save`}
            onClick={() => {
              if (typeof onClick === "function") onClick();
              saveUpdatedUsers();
              setUpdatedUsers({});
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
          <Trans>Cancel</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
UsersDialog.defaultProps = {
  onClick: () => undefined,
};

export default UsersDialog;
