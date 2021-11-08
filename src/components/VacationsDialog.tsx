import { t } from "@lingui/macro";
import { AddCircle as AddIcon, Group as GroupIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slide,
  Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import React, { forwardRef, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { VacationData } from "../backendAPI/types/usersData.schema";
import { actionCreators, State } from "../state";
import { NewVacationData, VacationDataPayload } from "../state/utils/types";
import { getDaysForDate } from "../utils/dateUtils";
import { getUserIdByName } from "../utils/userUtils";

import VacationsDialogEntry from "./VacationsDialogEntry";

const today = new Date();

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

const VacationsDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const {
    addVacationsData,
    closeVacationsDialog,
    removeVacationsData,
    updateVacationsData,
  } = bindActionCreators(actionCreators, dispatch);
  const configState = useSelector((state: State) => state.config);
  const usersDataState = useSelector((state: State) => state.usersData);
  const vacationsDialogState = useSelector((state: State) => state.vacationsDialog);

  const [currentUserID, setCurrentUserID] = useState("");

  const [tmpID, setTmpID] = useState(-1);
  const getTmpID = (): string => {
    setTmpID(tmpID - 1);
    return tmpID.toString();
  };

  interface updatedVacationsQueue {
    [k: string]: VacationData | undefined;
  }
  const [updatedVacations, setUpdatedVacations] = useState<updatedVacationsQueue>({});
  interface newVacationsQueue {
    [k: string]: NewVacationData;
  }
  const [newVacations, setNewVacations] = useState<newVacationsQueue>({});

  const addUpdatedVacation = ([id, vacationData]:
    | VacationDataPayload
    | [string, undefined]): void => {
    const rv = { ...updatedVacations };
    rv[id] = vacationData;
    setUpdatedVacations(rv);
  };
  const removeUpdatedVacation = (id: string): void => {
    const rv = { ...updatedVacations };
    delete rv[id];
    setUpdatedVacations(rv);
  };

  const addNewVacation = (): void => {
    const rv = { ...newVacations };
    rv[getTmpID()] = {
      typeId: 0,
      start: {
        date: today.toISOString().slice(0, 10),
        yearDay: getDaysForDate(today),
        year: today.getFullYear(),
      },
      end: {
        date: today.toISOString().slice(0, 10),
        yearDay: getDaysForDate(today),
        year: today.getFullYear(),
      },
    };
    setNewVacations(rv);
  };
  const updateNewVacation = ([id, vacationData]: VacationDataPayload): void => {
    const rv = { ...newVacations };
    rv[id] = vacationData;
    setNewVacations(rv);
  };
  const removeNewVacation = (id: string): void => {
    const rv = { ...newVacations };
    delete rv[id];
    setNewVacations(rv);
  };

  const saveChanges = (): void => {
    if (Object.keys(updatedVacations).length > 0)
      removeVacationsData(
        Object.keys(updatedVacations).filter(
          (vacationID) => updatedVacations[vacationID] === undefined
        )
      );

    if (Object.keys(updatedVacations).length > 0)
      updateVacationsData(
        Object.keys(updatedVacations)
          .filter((vacationID) => updatedVacations[vacationID] !== undefined)
          .map(
            (vacationID) =>
              [vacationID, updatedVacations[vacationID]] as VacationDataPayload
          )
      );

    if (Object.keys(newVacations)) addVacationsData(Object.values(newVacations));
  };

  useEffect(() => {
    setCurrentUserID(
      getUserIdByName(usersDataState, configState.user.name ?? "") ?? ""
    );
  }, [configState.user.name, usersDataState, vacationsDialogState]);

  useEffect(() => {
    setUpdatedVacations({});
    setNewVacations({});
  }, [vacationsDialogState]);

  const id = "vacations-dialog";

  return (
    <Dialog
      aria-labelledby={id}
      data-testid={id}
      open={vacationsDialogState}
      TransitionComponent={Transition}
      PaperProps={{ sx: { maxWidth: "calc(100% - 64px)", minWidth: "35%" } }}
      keepMounted
      onClose={closeVacationsDialog}
    >
      <DialogTitle id={id} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>{t`Vacations`}</Box>
        <GroupIcon />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t`Please select a user to show their vacations.`}
        </DialogContentText>
        <Box sx={{ paddingY: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="user-select-label">{t`User`}</InputLabel>
            <Select
              labelId="user-select-label"
              id="user-select"
              value={currentUserID}
              label={t`User`}
              onChange={(event: SelectChangeEvent) =>
                setCurrentUserID(event.target.value as string)
              }
            >
              {Object.keys(usersDataState).map((userID) => (
                <MenuItem key={userID} value={userID}>
                  {usersDataState[userID].name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {currentUserID === "" ? (
          <></>
        ) : (
          <>
            <Divider />
            <List sx={{ display: "flex", flexDirection: "column", paddingBottom: 0 }}>
              {Object.keys(usersDataState[currentUserID].vacations)
                .map((vacationId): [string, number] => [
                  vacationId,
                  usersDataState[currentUserID].vacations[vacationId].start.yearDay,
                ])
                .sort((a, b) => a[1] - b[1])
                .map(([vacationId]) => (
                  <VacationsDialogEntry
                    key={vacationId}
                    id={vacationId}
                    vacation={usersDataState[currentUserID].vacations[vacationId]}
                    addVacationToQueue={addUpdatedVacation}
                    removeVacationFromQueue={removeUpdatedVacation}
                  />
                ))}
              {Object.keys(newVacations)
                .sort()
                .map((vacationId) => (
                  <VacationsDialogEntry
                    key={vacationId}
                    id={vacationId}
                    vacation={newVacations[vacationId]}
                    addVacationToQueue={updateNewVacation}
                    removeVacationFromQueue={removeNewVacation}
                  />
                ))}
              <ListItem sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
                <IconButton onClick={addNewVacation}>
                  <AddIcon fontSize="large" />
                </IconButton>
              </ListItem>
            </List>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Tooltip arrow title={t`Save changes to database`}>
          <Button
            data-testid={`${id}-btn-save`}
            onClick={() => {
              if (typeof onClick === "function") onClick();
              saveChanges();
              setUpdatedVacations({});
              setNewVacations({});
              closeVacationsDialog();
            }}
          >
            {t`Save`}
          </Button>
        </Tooltip>
        <Button
          data-testid={`${id}-btn-cancel`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeVacationsDialog();
          }}
        >
          {t`Discard`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
VacationsDialog.defaultProps = {
  onClick: () => undefined,
};

export default VacationsDialog;
