import { t } from "@lingui/macro";
import {
  Cancel as CancelIcon,
  Circle as CircleIcon,
  Create as CreateIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Popover,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useSelector } from "react-redux";

import {
  NewVacationTypeData,
  NewVacationTypeDataPayload,
  VacationTypeDataPayload,
} from "../backendAPI/types/helperTypes";
import { VacationTypeData } from "../backendAPI/types/vacationTypesData.schema";
import { State } from "../state";
import DialogDataEntry, { EntryStyle, getStyles } from "./DialogDataEntry";

const StyledHexColorInput = styled(HexColorInput)(() => ({
  width: "100%",
  borderRadius: 5,
}));

interface Props {
  id: string;
  vacationType: VacationTypeData | NewVacationTypeData;
  addVacationTypeToQueue(
    e: VacationTypeDataPayload | [string, undefined] | NewVacationTypeDataPayload
  ): void;
  removeVacationTypeFromQueue(e: string): void;
  addEntryInProgress(): void;
  removeEntryInProgress(): void;
}

const VacationTypesDialogEntry = ({
  id,
  vacationType,
  addVacationTypeToQueue,
  removeVacationTypeFromQueue,
  addEntryInProgress,
  removeEntryInProgress,
}: Props): ReactElement => {
  const vacationTypesDialogState = useSelector((state: State) => state.vacationTypesDialog);

  const [newEntry] = useState(Number(id) < 0);
  const [editable, setEditable] = useState(newEntry);
  const [savedOnce, setSavedOnce] = useState(false);

  const [name, setName] = useState(vacationType.name);
  const [charge, setCharge] = useState(vacationType.charge);
  const [colorDark, setColorDark] = useState(vacationType.colorDark);
  const [colorLight, setColorLight] = useState(vacationType.colorLight);
  const [active, setActive] = useState(vacationType.active);

  const [nameForm, setNameForm] = useState(name);
  const [chargeForm, setChargeForm] = useState(charge);
  const [colorDarkForm, setColorDarkForm] = useState(colorDark);
  const [colorLightForm, setColorLightForm] = useState(colorLight);

  const [anchorElDark, setAnchorElDark] = React.useState<HTMLButtonElement | null>(null);
  const [anchorElLight, setAnchorElLight] = React.useState<HTMLButtonElement | null>(null);

  type NameFormError = typeof NameFormError[keyof typeof NameFormError];
  const NameFormError = {
    NONE: "",
    EMPTY: t`Vacation Type must have a name.`,
  } as const;
  const [nameFormError, setNameFormError] = useState<NameFormError>(NameFormError.NONE);

  const resetErrorStates = useCallback((): void => {
    setNameFormError(NameFormError.NONE);
  }, [NameFormError.NONE]);

  const validateName = (value: string): boolean => {
    if (value === "") {
      setNameFormError(NameFormError.EMPTY);
      return false;
    }
    setNameFormError(NameFormError.NONE);
    return true;
  };

  const validateForm = (): boolean => {
    let error = false;
    error = !validateName(nameForm) || error;
    return !error;
  };

  useEffect(() => {
    if (!vacationTypesDialogState) {
      setEditable(false);
      setSavedOnce(false);

      setName(vacationType.name);
      setCharge(vacationType.charge);
      setColorDark(vacationType.colorDark);
      setColorLight(vacationType.colorLight);
      setActive(vacationType.active);

      setNameForm(vacationType.name);
      setChargeForm(vacationType.charge);
      setColorDarkForm(vacationType.colorDark);
      setColorLightForm(vacationType.colorLight);

      resetErrorStates();
    }
  }, [vacationType, vacationTypesDialogState, resetErrorStates]);

  let entryStyle;
  if (!active) {
    entryStyle = EntryStyle.HIDDEN;
  } else if (newEntry) {
    entryStyle = EntryStyle.NEW;
  } else {
    entryStyle = EntryStyle.DEFAULT;
  }

  const ContentComponentView = (
    <>
      {Number(id) >= 0 && (
        <Box
          sx={{
            position: "absolute",
            left: -1,
            top: -1,
            paddingTop: "3px",
            paddingX: 1,
            color: "text.disabled",
            border: "1px solid",
            borderColor: getStyles(entryStyle).borderColor,
            borderTopLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          {id}
        </Box>
      )}
      <List
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "auto",
          gridTemplateAreas: `"name charge colorDark colorLight"`,
        }}
        dense
      >
        <ListItem key={`${id}-view-name`} sx={{ gridArea: "name" }}>
          <ListItemText primary={name} secondary={t`Name`} />
        </ListItem>
        <ListItem key={`${id}-view-charge`} sx={{ gridArea: "charge" }}>
          <ListItemText primary={charge ? t`Yes` : t`No`} secondary={t`Charge to annual leave`} />
        </ListItem>
        <ListItem key={`${id}-view-color-dark`} sx={{ gridArea: "colorDark" }}>
          <CircleIcon sx={{ color: colorDark, marginRight: 1 }} />
          <ListItemText primary={colorDark} secondary={t`Color (Dark theme)`} />
        </ListItem>
        <ListItem key={`${id}-view-color-light`} sx={{ gridArea: "colorLight" }}>
          <CircleIcon sx={{ color: colorLight, marginRight: 1 }} />
          <ListItemText primary={colorLight} secondary={t`Color (Light theme)`} />
        </ListItem>
      </List>
    </>
  );

  const ContentComponentEdit = (
    <>
      <List
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "auto",
          gridTemplateAreas: `"name charge colorDark colorLight"`,
        }}
      >
        <ListItem key={`${id}-edit-name`} sx={{ gridArea: "name" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t`Name`}
            type="text"
            variant="outlined"
            value={nameForm}
            error={nameFormError !== NameFormError.NONE}
            helperText={nameFormError}
            onChange={(event): void => {
              validateName(event.target.value);
              setNameForm(event.target.value);
            }}
          />
        </ListItem>
        <ListItem key={`${id}-edit-charge`} sx={{ gridArea: "charge" }}>
          <FormControl
            component="fieldset"
            fullWidth
            sx={{
              marginY: 1,
              padding: 1,
              border: 1,
              borderRadius: 1,
              borderColor: "action.disabled",
              "&:hover": {
                borderColor: "action.active",
              },
            }}
          >
            <FormControlLabel
              label={t`Charge to annual leave`}
              control={
                <Checkbox
                  checked={chargeForm}
                  onChange={(event) => setChargeForm(event.target.checked)}
                />
              }
            />
          </FormControl>
        </ListItem>
        <ListItem key={`${id}-edit-dark-color`} sx={{ gridArea: "colorDark" }}>
          <Button
            aria-describedby={`${id}-edit-charge-dark-color-picker`}
            variant="outlined"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              setAnchorElDark(event.currentTarget)
            }
          >
            {t`Color (Dark theme)`}
            <CircleIcon fontSize="large" sx={{ color: colorDarkForm }} />
          </Button>
        </ListItem>
        <ListItem key={`${id}-edit-light-color`} sx={{ gridArea: "colorLight" }}>
          <Button
            aria-describedby={`${id}-edit-charge-light-color-picker`}
            variant="outlined"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              setAnchorElLight(event.currentTarget)
            }
          >
            {t`Color (Light theme)`}
            <CircleIcon fontSize="large" sx={{ color: colorLightForm }} />
          </Button>
        </ListItem>
      </List>
      <Popover
        id={`${id}-edit-charge-dark-color-picker`}
        open={Boolean(anchorElDark)}
        anchorEl={anchorElDark}
        onClose={() => setAnchorElDark(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <HexColorPicker color={colorDarkForm} onChange={setColorDarkForm} />
        <StyledHexColorInput color={colorDarkForm} onChange={setColorDarkForm} />
      </Popover>
      <Popover
        id={`${id}-edit-charge-light-color-picker`}
        open={Boolean(anchorElLight)}
        anchorEl={anchorElLight}
        onClose={() => setAnchorElLight(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <HexColorPicker color={colorLightForm} onChange={setColorLightForm} />
        <StyledHexColorInput color={colorLightForm} onChange={setColorLightForm} />
      </Popover>
    </>
  );

  const onClickSave = (): void => {
    if (nameFormError !== NameFormError.NONE || !validateForm()) return;
    setName(nameForm);
    setCharge(chargeForm);
    setColorDark(colorDarkForm);
    setColorLight(colorLightForm);
    setEditable(false);
    resetErrorStates();
    setSavedOnce(true);
    addVacationTypeToQueue([
      id,
      {
        ...vacationType,
        name: nameForm,
        charge: chargeForm,
        colorDark: colorDarkForm,
        colorLight: colorLightForm,
      },
    ]);
    removeEntryInProgress();
  };
  const onClickEdit = (): void => {
    setNameForm(name);
    setChargeForm(charge);
    setColorDarkForm(colorDark);
    setColorLightForm(colorLight);
    resetErrorStates();
    setEditable(true);
    addEntryInProgress();
  };
  const onClickCancel = (): void => {
    if (newEntry && !savedOnce) {
      removeVacationTypeFromQueue(id);
    } else {
      setNameForm(name);
      setChargeForm(charge);
      setColorDarkForm(colorDark);
      setColorLightForm(colorLight);
      resetErrorStates();
      setEditable(false);
    }
    removeEntryInProgress();
  };
  // Delete only for new entries, thus not saved in DB yet
  const onClickDelete = (): void => {
    removeVacationTypeFromQueue(id);
  };
  // Deactivate only for existing entries
  const onClickDeactivate = (): void => {
    setActive(false);
    addVacationTypeToQueue([
      id,
      {
        ...vacationType,
        active: false,
      },
    ]);
  };
  const onClickActivate = (): void => {
    setActive(true);
    addVacationTypeToQueue([
      id,
      {
        ...vacationType,
        active: true,
      },
    ]);
  };

  let rightButtonOnClick;
  let rightButtonTooltip;
  let rightButtonIcon;
  if (editable) {
    rightButtonOnClick = onClickCancel;
    rightButtonTooltip = t`Cancel`;
    rightButtonIcon = <CancelIcon />;
  } else if (!active) {
    rightButtonOnClick = onClickActivate;
    rightButtonTooltip = t`Activate`;
    rightButtonIcon = <VisibilityIcon />;
  } else {
    rightButtonOnClick = newEntry ? onClickDelete : onClickDeactivate;
    rightButtonTooltip = newEntry ? t`Delete entry` : t`Deactivate`;
    rightButtonIcon = newEntry ? <DeleteIcon /> : <VisibilityOffIcon />;
  }

  return (
    <DialogDataEntry
      ContentComponent={editable ? ContentComponentEdit : ContentComponentView}
      leftButtonOnClick={editable ? onClickSave : onClickEdit}
      leftButtonTooltip={editable ? t`Save entry` : t`Edit entry`}
      leftButtonIcon={editable ? <SaveIcon /> : <CreateIcon />}
      leftButtonDisabled={!active || nameFormError !== NameFormError.NONE}
      rightButtonOnClick={rightButtonOnClick}
      rightButtonTooltip={rightButtonTooltip}
      rightButtonIcon={rightButtonIcon}
      entryStyle={entryStyle}
    />
  );
};

export default VacationTypesDialogEntry;
