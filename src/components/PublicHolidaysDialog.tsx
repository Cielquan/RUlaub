import { t } from "@lingui/macro";
import { AddCircle as AddIcon, EventBusy as EventBusyIcon } from "@mui/icons-material";
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

import { PublicHolidayData } from "../backendAPI/types/publicHolidaysData.schema";
import { actionCreators, State } from "../state";
import {
  NewPublicHolidayData,
  PublicHolidayDataPayload,
} from "../backendAPI/types/helperTypes";

import PublicHolidaysDialogEntry from "./PublicHolidaysDialogEntry";

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

const PublicHolidaysDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closePublicHolidaysDialog, updatePublicHolidaysData } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const publicHolidaysDialogState = useSelector(
    (state: State) => state.publicHolidaysDialog
  );
  const publicHolidaysDataState = useSelector(
    (state: State) => state.publicHolidaysData
  );

  const [tmpID, setTmpID] = useState(-1);
  const getTmpID = (): string => {
    setTmpID(tmpID - 1);
    return tmpID.toString();
  };

  interface updatedPublicHolidaysQueue {
    [k: string]: PublicHolidayData | undefined;
  }
  const [updatedPublicHolidays, setUpdatedPublicHolidays] =
    useState<updatedPublicHolidaysQueue>({});
  interface newPublicHolidaysQueue {
    [k: string]: NewPublicHolidayData;
  }
  const [newPublicHolidays, setNewPublicHolidays] = useState<newPublicHolidaysQueue>(
    {}
  );

  const addUpdatedPublicHoliday = ([id, publicHolidayData]:
    | PublicHolidayDataPayload
    | [string, undefined]): void => {
    const rv = { ...updatedPublicHolidays };
    rv[id] = publicHolidayData;
    setUpdatedPublicHolidays(rv);
  };
  const removeUpdatedPublicHoliday = (id: string): void => {
    const rv = { ...updatedPublicHolidays };
    delete rv[id];
    setUpdatedPublicHolidays(rv);
  };

  const addNewPublicHoliday = (): void => {
    const rv = { ...newPublicHolidays };
    rv[getTmpID()] = {
      name: "",
    };
    setNewPublicHolidays(rv);
  };
  const updateNewPublicHoliday = ([
    id,
    publicHolidayData,
  ]: PublicHolidayDataPayload): void => {
    const rv = { ...newPublicHolidays };
    rv[id] = publicHolidayData;
    setNewPublicHolidays(rv);
  };
  const removeNewPublicHoliday = (id: string): void => {
    const rv = { ...newPublicHolidays };
    delete rv[id];
    setNewPublicHolidays(rv);
  };

  const saveChanges = (): void => {
    const newEntries =
      Object.keys(newPublicHolidays).length > 0
        ? Object.values(newPublicHolidays)
        : undefined;

    const filteredEntriesToUpdate = Object.keys(updatedPublicHolidays)
      .filter((publicHolidayID) => updatedPublicHolidays[publicHolidayID] !== undefined)
      .map((publicHolidayID) => [
        Number(publicHolidayID),
        updatedPublicHolidays[publicHolidayID],
      ]);
    const entriesToUpdate = Object.fromEntries(filteredEntriesToUpdate);
    const updatedEntries =
      Object.keys(entriesToUpdate).length > 0 ? entriesToUpdate : undefined;

    const entriesToRemove = Object.keys(updatedPublicHolidays)
      .filter((publicHolidayID) => updatedPublicHolidays[publicHolidayID] === undefined)
      .map((id) => Number(id));
    const removedEntries = entriesToRemove.length > 0 ? entriesToRemove : undefined;

    updatePublicHolidaysData({ newEntries, updatedEntries, removedEntries });
  };

  useEffect(() => {
    setUpdatedPublicHolidays({});
    setNewPublicHolidays({});
  }, [publicHolidaysDialogState]);

  const id = "publicHolidays-dialog";

  const saveDisabled =
    Object.keys(updatedPublicHolidays).length === 0 &&
    Object.keys(newPublicHolidays).length === 0;

  return (
    <Dialog
      aria-labelledby={id}
      data-testid={id}
      open={publicHolidaysDialogState}
      TransitionComponent={Transition}
      PaperProps={{ sx: { maxWidth: "calc(100% - 64px)", minWidth: "35%" } }}
      keepMounted
      onClose={closePublicHolidaysDialog}
    >
      <DialogTitle id={id} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>{t`Public Holidays`}</Box>
        <EventBusyIcon />
      </DialogTitle>
      <DialogContent>
        <List sx={{ display: "flex", flexDirection: "column", paddingBottom: 0 }}>
          {Object.keys(publicHolidaysDataState)
            .map((publicHolidayId): [string, number] => [
              publicHolidayId,
              publicHolidaysDataState[publicHolidayId].calc.yearDay,
            ])
            .sort((a, b) => a[1] - b[1])
            .map(([publicHolidayId]) => (
              <PublicHolidaysDialogEntry
                key={publicHolidayId}
                id={publicHolidayId}
                publicHoliday={publicHolidaysDataState[publicHolidayId]}
                addPublicHolidayToQueue={addUpdatedPublicHoliday}
                removePublicHolidayFromQueue={removeUpdatedPublicHoliday}
              />
            ))}
          {Object.keys(newPublicHolidays)
            .sort()
            .map((publicHolidayId) => (
              <PublicHolidaysDialogEntry
                key={publicHolidayId}
                id={publicHolidayId}
                publicHoliday={newPublicHolidays[publicHolidayId]}
                addPublicHolidayToQueue={updateNewPublicHoliday}
                removePublicHolidayFromQueue={removeNewPublicHoliday}
              />
            ))}
          <ListItem sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
            <IconButton onClick={addNewPublicHoliday}>
              <AddIcon fontSize="large" />
            </IconButton>
          </ListItem>
        </List>
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
                setUpdatedPublicHolidays({});
                setNewPublicHolidays({});
                closePublicHolidaysDialog();
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
            closePublicHolidaysDialog();
          }}
        >
          {t`Discard`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
PublicHolidaysDialog.defaultProps = {
  onClick: () => undefined,
};

export default PublicHolidaysDialog;
