import { t } from "@lingui/macro";
import { AddCircle as AddIcon, DateRange as DateRangeIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  Slide,
  TextField,
  Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { ReactElement, forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { NewSchoolHolidayData, SchoolHolidayDataPayload } from "../backendAPI/types/helperTypes";
import { SchoolHolidayData } from "../backendAPI/types/schoolHolidaysData.schema";
import { State, actionCreators } from "../state";
import { getDaysForDate } from "../utils/dateUtils";
import SchoolHolidaysDialogEntry from "./SchoolHolidaysDialogEntry";

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

const SchoolHolidaysDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeSchoolHolidaysDialog, updateSchoolHolidaysData, updateSchoolHolidaysLink } =
    bindActionCreators(actionCreators, dispatch);
  const schoolHolidaysDialogState = useSelector((state: State) => state.schoolHolidaysDialog);
  const schoolHolidaysDataState = useSelector((state: State) => state.schoolHolidaysData);
  const schoolHolidaysLinkState = useSelector((state: State) => state.schoolHolidaysLink);

  const [link, setLink] = useState(schoolHolidaysLinkState);
  const [linkForm, setLinkForm] = useState(link);
  const [submittedOnce, setSubmittedOnce] = useState(false);

  type SchoolHolidaysLinkCheckError =
    typeof SchoolHolidaysLinkCheckError[keyof typeof SchoolHolidaysLinkCheckError];
  const SchoolHolidaysLinkCheckError = {
    NONE: "",
    NO_HTTPS: t`The link must start with "https://".`,
    NO_YEAR: t`The link must have a "'%year%'" placeholder.`,
  } as const;
  const [linkFormError, setlinkFormError] = useState<SchoolHolidaysLinkCheckError>(
    SchoolHolidaysLinkCheckError.NONE
  );

  const validateLink = (value: string | null): boolean => {
    if (value === null) {
      setlinkFormError(SchoolHolidaysLinkCheckError.NONE);
      return true;
    }
    if (!value.startsWith("https://")) {
      setlinkFormError(SchoolHolidaysLinkCheckError.NO_HTTPS);
      return false;
    }
    if (!value.includes("%year%")) {
      setlinkFormError(SchoolHolidaysLinkCheckError.NO_YEAR);
      return false;
    }
    setlinkFormError(SchoolHolidaysLinkCheckError.NONE);
    return true;
  };

  const [tmpID, setTmpID] = useState(-1);
  const getTmpID = (): string => {
    setTmpID(tmpID - 1);
    return tmpID.toString();
  };

  interface updatedSchoolHolidaysQueue {
    [k: string]: SchoolHolidayData | undefined;
  }
  const [updatedSchoolHolidays, setUpdatedSchoolHolidays] = useState<updatedSchoolHolidaysQueue>(
    {}
  );
  interface newSchoolHolidaysQueue {
    [k: string]: NewSchoolHolidayData;
  }
  const [newSchoolHolidays, setNewSchoolHolidays] = useState<newSchoolHolidaysQueue>({});

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
  const updateNewSchoolHoliday = ([id, schoolHolidayData]: SchoolHolidayDataPayload): void => {
    const rv = { ...newSchoolHolidays };
    rv[id] = schoolHolidayData;
    setNewSchoolHolidays(rv);
  };
  const removeNewSchoolHoliday = (id: string): void => {
    const rv = { ...newSchoolHolidays };
    delete rv[id];
    setNewSchoolHolidays(rv);
  };

  const snackbarHandles = useSnackbar();

  const schoolHolidaysDataLoadingDepth = useSelector(
    (state: State) => state.schoolHolidaysDataLoadingDepth
  );

  const saveChanges = (): boolean => {
    if (link !== linkForm) {
      if (linkFormError !== SchoolHolidaysLinkCheckError.NONE || !validateLink(linkForm))
        return false;
      setLink(linkForm);
      updateSchoolHolidaysLink(linkForm, snackbarHandles);
    }

    const newEntries =
      Object.keys(newSchoolHolidays).length > 0 ? Object.values(newSchoolHolidays) : undefined;

    const filteredEntriesToUpdate = Object.keys(updatedSchoolHolidays)
      .filter((schoolHolidayID) => updatedSchoolHolidays[schoolHolidayID] !== undefined)
      .map((schoolHolidayID) => [Number(schoolHolidayID), updatedSchoolHolidays[schoolHolidayID]]);
    const entriesToUpdate = Object.fromEntries(filteredEntriesToUpdate);
    const updatedEntries = Object.keys(entriesToUpdate).length > 0 ? entriesToUpdate : undefined;

    const entriesToRemove = Object.keys(updatedSchoolHolidays)
      .filter((schoolHolidayID) => updatedSchoolHolidays[schoolHolidayID] === undefined)
      .map((id) => Number(id));
    const removedEntries = entriesToRemove.length > 0 ? entriesToRemove : undefined;

    updateSchoolHolidaysData(
      { newEntries, updatedEntries, removedEntries },
      snackbarHandles,
      schoolHolidaysDataLoadingDepth
    );
    return true;
  };

  useEffect(() => {
    setUpdatedSchoolHolidays({});
    setNewSchoolHolidays({});
    setLink(schoolHolidaysLinkState ?? "");
    setLinkForm(schoolHolidaysLinkState ?? "");
    setSubmittedOnce(false);

    setlinkFormError(SchoolHolidaysLinkCheckError.NONE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolHolidaysDialogState]);

  const id = "schoolHolidays-dialog";

  const saveDisabled =
    Object.keys(updatedSchoolHolidays).length === 0 &&
    Object.keys(newSchoolHolidays).length === 0 &&
    link === linkForm;

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
        <TextField
          margin="dense"
          id="name"
          label={t`Link`}
          type="text"
          fullWidth
          variant="outlined"
          value={linkForm}
          error={linkFormError !== SchoolHolidaysLinkCheckError.NONE}
          helperText={linkFormError}
          onChange={(event): void => {
            if (submittedOnce) validateLink(event.target.value);
            setLinkForm(event.target.value);
          }}
          sx={{ marginY: 1 }}
        />
        <Divider sx={{ marginY: 1 }} />
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
        <Tooltip arrow title={t`Save changes to database`} disableHoverListener={saveDisabled}>
          <span>
            <Button
              data-testid={`${id}-btn-save`}
              disabled={saveDisabled}
              onClick={() => {
                if (typeof onClick === "function") onClick();
                setSubmittedOnce(true);
                if (!saveChanges()) return;
                setUpdatedSchoolHolidays({});
                setNewSchoolHolidays({});
                closeSchoolHolidaysDialog();
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
