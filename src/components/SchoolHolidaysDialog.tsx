import { t } from "@lingui/macro";
import { AddCircle as AddIcon, DateRange as DateRangeIcon } from "@mui/icons-material";
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

import { SchoolHolidayData } from "../backendAPI/types/schoolHolidaysData.schema";
import { actionCreators, State } from "../state";
import {
  NewSchoolHolidayData,
  SchoolHolidayDataPayload,
} from "../backendAPI/types/helperTypes";
import { getDaysForDate } from "../utils/dateUtils";

import SchoolHolidaysDialogEntry from "./SchoolHolidaysDialogEntry";

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

const SchoolHolidaysDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeSchoolHolidaysDialog, updateSchoolHolidaysData } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const schoolHolidaysDialogState = useSelector(
    (state: State) => state.schoolHolidaysDialog
  );
  const schoolHolidaysDataState = useSelector(
    (state: State) => state.schoolHolidaysData
  );

  const [tmpID, setTmpID] = useState(-1);
  const getTmpID = (): string => {
    setTmpID(tmpID - 1);
    return tmpID.toString();
  };

  interface updatedSchoolHolidaysQueue {
    [k: string]: SchoolHolidayData | undefined;
  }
  const [updatedSchoolHolidays, setUpdatedSchoolHolidays] =
    useState<updatedSchoolHolidaysQueue>({});
  interface newSchoolHolidaysQueue {
    [k: string]: NewSchoolHolidayData;
  }
  const [newSchoolHolidays, setNewSchoolHolidays] = useState<newSchoolHolidaysQueue>(
    {}
  );

  const addUpdatedSchoolHoliday = ([id, schoolHolidayData]:
    | SchoolHolidayDataPayload
    | [string, undefined]): void => {
    const rv = { ...updatedSchoolHolidays };
    rv[id] = schoolHolidayData;
    setUpdatedSchoolHolidays(rv);
  };
  const removeUpdatedSchoolHoliday = (id: string): void => {
    const rv = { ...updatedSchoolHolidays };
    delete rv[id];
    setUpdatedSchoolHolidays(rv);
  };

  const addNewSchoolHoliday = (): void => {
    const rv = { ...newSchoolHolidays };
    rv[getTmpID()] = {
      name: "",
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
    setNewSchoolHolidays(rv);
  };
  const updateNewSchoolHoliday = ([
    id,
    schoolHolidayData,
  ]: SchoolHolidayDataPayload): void => {
    const rv = { ...newSchoolHolidays };
    rv[id] = schoolHolidayData;
    setNewSchoolHolidays(rv);
  };
  const removeNewSchoolHoliday = (id: string): void => {
    const rv = { ...newSchoolHolidays };
    delete rv[id];
    setNewSchoolHolidays(rv);
  };

  const saveChanges = (): void => {
    const newEntries =
      Object.keys(newSchoolHolidays).length > 0
        ? Object.values(newSchoolHolidays)
        : undefined;

    const entriesToUpdate = Object.keys(updatedSchoolHolidays)
      .filter((schoolHolidayID) => updatedSchoolHolidays[schoolHolidayID] !== undefined)
      .map(
        (schoolHolidayID) =>
          [
            schoolHolidayID,
            updatedSchoolHolidays[schoolHolidayID],
          ] as SchoolHolidayDataPayload
      );
    const updatedEntries = entriesToUpdate.length > 0 ? entriesToUpdate : undefined;

    const entriesToRemove = Object.keys(updatedSchoolHolidays).filter(
      (schoolHolidayID) => updatedSchoolHolidays[schoolHolidayID] === undefined
    );
    const removedEntries = entriesToRemove.length > 0 ? entriesToRemove : undefined;

    updateSchoolHolidaysData({ newEntries, updatedEntries, removedEntries });
  };

  useEffect(() => {
    setUpdatedSchoolHolidays({});
    setNewSchoolHolidays({});
  }, [schoolHolidaysDialogState]);

  const id = "schoolHolidays-dialog";

  return (
    <Dialog
      aria-labelledby={id}
      data-testid={id}
      open={schoolHolidaysDialogState}
      TransitionComponent={Transition}
      PaperProps={{ sx: { maxWidth: "calc(100% - 64px)", minWidth: "35%" } }}
      keepMounted
      onClose={closeSchoolHolidaysDialog}
    >
      <DialogTitle id={id} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>{t`School Holidays`}</Box>
        <DateRangeIcon />
      </DialogTitle>
      <DialogContent>
        <List sx={{ display: "flex", flexDirection: "column", paddingBottom: 0 }}>
          {Object.keys(schoolHolidaysDataState)
            .map((schoolHolidayId): [string, number] => [
              schoolHolidayId,
              schoolHolidaysDataState[schoolHolidayId].start.yearDay,
            ])
            .sort((a, b) => a[1] - b[1])
            .map(([schoolHolidayId]) => (
              <SchoolHolidaysDialogEntry
                key={schoolHolidayId}
                id={schoolHolidayId}
                schoolHoliday={schoolHolidaysDataState[schoolHolidayId]}
                addSchoolHolidayToQueue={addUpdatedSchoolHoliday}
                removeSchoolHolidayFromQueue={removeUpdatedSchoolHoliday}
              />
            ))}
          {Object.keys(newSchoolHolidays)
            .sort()
            .map((schoolHolidayId) => (
              <SchoolHolidaysDialogEntry
                key={schoolHolidayId}
                id={schoolHolidayId}
                schoolHoliday={newSchoolHolidays[schoolHolidayId]}
                addSchoolHolidayToQueue={updateNewSchoolHoliday}
                removeSchoolHolidayFromQueue={removeNewSchoolHoliday}
              />
            ))}
          <ListItem sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
            <IconButton onClick={addNewSchoolHoliday}>
              <AddIcon fontSize="large" />
            </IconButton>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Tooltip arrow title={t`Save changes to database`}>
          <Button
            data-testid={`${id}-btn-save`}
            disabled={
              Object.keys(updatedSchoolHolidays).length === 0 &&
              Object.keys(newSchoolHolidays).length === 0
            }
            onClick={() => {
              if (typeof onClick === "function") onClick();
              saveChanges();
              setUpdatedSchoolHolidays({});
              setNewSchoolHolidays({});
              closeSchoolHolidaysDialog();
            }}
          >
            {t`Save`}
          </Button>
        </Tooltip>
        <Button
          data-testid={`${id}-btn-cancel`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeSchoolHolidaysDialog();
          }}
        >
          {t`Discard`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
SchoolHolidaysDialog.defaultProps = {
  onClick: () => undefined,
};

export default SchoolHolidaysDialog;
