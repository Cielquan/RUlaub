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
import React, { forwardRef, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { VacationTypeData } from "../backendAPI/types/vacationTypesData.schema";
import { actionCreators, State } from "../state";
import { NewVacationTypeData, VacationTypeDataPayload } from "../state/utils/types";

import VacationTypesDialogEntry from "./VacationTypesDialogEntry";

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

const VacationTypesDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { addVacationTypesData, closeVacationTypesDialog, updateVacationTypesData } =
    bindActionCreators(actionCreators, dispatch);
  const vacationTypesDialogState = useSelector(
    (state: State) => state.vacationTypesDialog
  );
  const vacationTypesDataState = useSelector((state: State) => state.vacationTypesData);

  const [tmpID, setTmpID] = useState(-1);
  const getTmpID = (): string => {
    setTmpID(tmpID - 1);
    return tmpID.toString();
  };

  interface updatedVacationTypesQueue {
    [k: string]: VacationTypeData;
  }
  const [updatedVacationTypes, setUpdatedVacationTypes] =
    useState<updatedVacationTypesQueue>({});
  interface newVacationTypesQueue {
    [k: string]: NewVacationTypeData;
  }
  const [newVacationTypes, setNewVacationTypes] = useState<newVacationTypesQueue>({});

  const addUpdatedVacationType = ([
    id,
    vacationTypeData,
  ]: VacationTypeDataPayload): void => {
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
  };
  const updateNewVacationType = ([
    id,
    vacationTypeData,
  ]: VacationTypeDataPayload): void => {
    const rv = { ...newVacationTypes };
    rv[id] = vacationTypeData;
    setNewVacationTypes(rv);
  };
  const removeNewVacationType = (id: string): void => {
    const rv = { ...newVacationTypes };
    delete rv[id];
    setNewVacationTypes(rv);
  };

  const saveChanges = (): void => {
    if (Object.keys(updatedVacationTypes).length > 0)
      updateVacationTypesData(
        Object.keys(updatedVacationTypes).map(
          (vacationTypeID) =>
            [
              vacationTypeID,
              updatedVacationTypes[vacationTypeID],
            ] as VacationTypeDataPayload
        )
      );
    if (Object.values(newVacationTypes).length > 0)
      addVacationTypesData(Object.values(newVacationTypes));
  };

  useEffect(() => {
    setUpdatedVacationTypes({});
    setNewVacationTypes({});
  }, [vacationTypesDialogState]);

  const id = "vacationTypes-dialog";

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
        <GroupIcon />
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
        <Tooltip arrow title={t`Save changes to database`}>
          <Button
            data-testid={`${id}-btn-save`}
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
