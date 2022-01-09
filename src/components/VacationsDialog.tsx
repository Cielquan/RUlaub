import { t } from "@lingui/macro";
import { AddCircle as AddIcon, Flight as FlightIcon } from "@mui/icons-material";
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

// eslint-disable-next-line max-len
import { VacationData } from "../backendAPI/types/vacationsData.schema";
import { actionCreators, State } from "../state";
import { NewVacationData, VacationDataPayload } from "../backendAPI/types/helperTypes";
import { getDaysForDate } from "../utils/dateUtils";
import { getUserIdByName } from "../utils/userUtils";

import VacationsDialogEntry from "./VacationsDialogEntry";

const today = new Date();

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

const VacationsDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeVacationsDialog, updateVacationsData } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const configState = useSelector((state: State) => state.config);
  const usersDataState = useSelector((state: State) => state.usersData);
  const vacationsDataState = useSelector((state: State) => state.vacationsData);
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
    const newEntries =
      Object.keys(newVacations).length > 0 ? Object.values(newVacations) : undefined;

    const entriesToUpdate = Object.keys(updatedVacations)
      .filter((vacationID) => updatedVacations[vacationID] !== undefined)
      .map(
        (vacationID) =>
          [vacationID, updatedVacations[vacationID]] as VacationDataPayload
      );
    const updatedEntries = entriesToUpdate.length > 0 ? entriesToUpdate : undefined;

    const entriesToRemove = Object.keys(updatedVacations).filter(
      (vacationID) => updatedVacations[vacationID] === undefined
    );
    const removedEntries = entriesToRemove.length > 0 ? entriesToRemove : undefined;

    updateVacationsData({ newEntries, updatedEntries, removedEntries });
  };

  useEffect(() => {
    setCurrentUserID(
      getUserIdByName(usersDataState, configState?.user?.name ?? "") ?? ""
    );
  }, [configState?.user?.name, usersDataState, vacationsDialogState]);

  useEffect(() => {
    setUpdatedVacations({});
    setNewVacations({});
  }, [vacationsDialogState]);

  const id = "vacations-dialog";

  const saveDisabled =
    Object.keys(updatedVacations).length === 0 &&
    Object.keys(newVacations).length === 0;

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
        <FlightIcon />
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
              {Object.keys(vacationsDataState[currentUserID])
                .map((vacationId): [string, number] => [
                  vacationId,
                  vacationsDataState[currentUserID][vacationId].start.yearDay,
                ])
                .sort((a, b) => a[1] - b[1])
                .map(([vacationId]) => (
                  <VacationsDialogEntry
                    key={vacationId}
                    id={vacationId}
                    vacation={vacationsDataState[currentUserID][vacationId]}
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
        <Tooltip
          arrow
          title={t`Save changes to database`}
          disableHoverListener={saveDisabled}
        >
          <span>
            <Button
              data-testid={`${id}-btn-save`}
              disabled={saveDisabled}
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
          </span>
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
