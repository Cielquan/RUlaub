import { t } from "@lingui/macro";
import { AddCircle as AddIcon, EventNote as EventNoteIcon } from "@mui/icons-material";
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

import { NewVacationTypeData, VacationTypeDataPayload } from "../backendAPI/types/helperTypes";
import { VacationTypeData } from "../backendAPI/types/vacationTypesData.schema";
import { useCounter } from "../hooks";
import { State, actionCreators } from "../state";
import VacationTypesDialogEntry from "./VacationTypesDialogEntry";

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

const VacationTypesDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeVacationTypesDialog, updateVacationTypesData } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const vacationTypesDialogState = useSelector((state: State) => state.vacationTypesDialog);
  const vacationTypesDataState = useSelector((state: State) => state.vacationTypesData);

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

  interface updatedVacationTypesQueue {
    [k: string]: VacationTypeData;
  }
  const [updatedVacationTypes, setUpdatedVacationTypes] = useState<updatedVacationTypesQueue>({});
  interface newVacationTypesQueue {
    [k: string]: NewVacationTypeData;
  }
  const [newVacationTypes, setNewVacationTypes] = useState<newVacationTypesQueue>({});

  const addUpdatedVacationType = ([id, vacationTypeData]: VacationTypeDataPayload): void => {
    const rv = { ...updatedVacationTypes };
    rv[id] = vacationTypeData;
    setUpdatedVacationTypes(rv);
  };

  const addNewVacationType = (): void => {
    const rv = { ...newVacationTypes };
    rv[getTmpID()] = {
      name: "",
      charge: true,
      colorDark: "",
      colorLight: "",
      active: true,
    };
    setNewVacationTypes(rv);
    addEntryInProgress();
  };
  const updateNewVacationType = ([id, vacationTypeData]: VacationTypeDataPayload): void => {
    const rv = { ...newVacationTypes };
    rv[id] = vacationTypeData;
    setNewVacationTypes(rv);
  };
  const removeNewVacationType = (id: string): void => {
    const rv = { ...newVacationTypes };
    delete rv[id];
    setNewVacationTypes(rv);
  };

  const snackbarHandles = useSnackbar();

  const saveChanges = (): void => {
    const newEntries =
      Object.keys(newVacationTypes).length > 0 ? Object.values(newVacationTypes) : undefined;

    const filteredEntriesToUpdate = Object.keys(updatedVacationTypes).map((vacationTypeID) => [
      Number(vacationTypeID),
      updatedVacationTypes[vacationTypeID],
    ]);
    const entriesToUpdate = Object.fromEntries(filteredEntriesToUpdate);
    const updatedEntries = Object.keys(entriesToUpdate).length > 0 ? entriesToUpdate : undefined;

    updateVacationTypesData({ newEntries, updatedEntries }, snackbarHandles);
  };

  useEffect(() => {
    setUpdatedVacationTypes({});
    setNewVacationTypes({});
  }, [vacationTypesDialogState]);

  const id = "vacationTypes-dialog";

  const saveDisabled =
    inProgessCounter > 0 ||
    (Object.keys(updatedVacationTypes).length === 0 && Object.keys(newVacationTypes).length === 0);

  return (
    <Dialog
      aria-labelledby={id}
      data-testid={id}
      open={vacationTypesDialogState}
      TransitionComponent={Transition}
      PaperProps={{ sx: { maxWidth: "calc(100% - 64px)", minWidth: "35%" } }}
      keepMounted
      onClose={closeVacationTypesDialog}
    >
      <DialogTitle id={id} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>{t`Vacation Types`}</Box>
        <EventNoteIcon />
      </DialogTitle>
      <DialogContent>
        <List sx={{ display: "flex", flexDirection: "column", paddingBottom: 0 }}>
          {Object.keys(vacationTypesDataState)
            .sort()
            .map((vacationTypeId) => (
              <VacationTypesDialogEntry
                key={vacationTypeId}
                id={vacationTypeId}
                vacationType={vacationTypesDataState[vacationTypeId]}
                addVacationTypeToQueue={addUpdatedVacationType}
                removeVacationTypeFromQueue={() => undefined}
                addEntryInProgress={addEntryInProgress}
                removeEntryInProgress={removeEntryInProgress}
              />
            ))}
          {Object.keys(newVacationTypes)
            .sort()
            .map((vacationTypeId) => (
              <VacationTypesDialogEntry
                key={vacationTypeId}
                id={vacationTypeId}
                vacationType={newVacationTypes[vacationTypeId]}
                addVacationTypeToQueue={updateNewVacationType}
                removeVacationTypeFromQueue={removeNewVacationType}
                addEntryInProgress={addEntryInProgress}
                removeEntryInProgress={removeEntryInProgress}
              />
            ))}
          <ListItem sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
            <IconButton onClick={addNewVacationType}>
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
                setUpdatedVacationTypes({});
                setNewVacationTypes({});
                closeVacationTypesDialog();
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
            closeVacationTypesDialog();
          }}
        >
          {t`Discard`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
VacationTypesDialog.defaultProps = {
  onClick: () => undefined,
};

export default VacationTypesDialog;
